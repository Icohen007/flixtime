const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Exercise the actual server-side client with a fake fetch, without installing
// dependencies or using a real API credential.
const source = fs.readFileSync(path.join(__dirname, '../utils/fetchData.js'), 'utf8')
  .replace(/export async function /g, 'async function ')
  .concat('\n({ getAll, getDetails, getList, getSearch })');

const movie = {
  id: 550,
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  original_title: 'Fight Club',
  release_date: '1999-10-15',
  genre_ids: [18],
  media_type: 'movie',
};
const show = {
  id: 1399,
  poster_path: '/tv.jpg',
  original_name: 'Game of Thrones',
  first_air_date: '2011-04-17',
  media_type: 'tv',
};

function reply(url) {
  if (url.pathname.includes('/genre/')) return { genres: [{ id: 18, name: 'Drama' }] };
  if (url.pathname.includes('/search/')) return { results: [movie, show, { media_type: 'person' }] };
  if (url.pathname.endsWith('/movie/550') || url.pathname.endsWith('/tv/1399')) {
    return { id: 550, credits: { cast: [movie], crew: [] }, videos: { results: [movie] }, reviews: { results: [movie] } };
  }
  return { results: [url.pathname.includes('/tv') ? show : movie], total_pages: 5 };
}

function createClient(handler = reply) {
  const calls = [];
  const errors = [];
  const fetch = async (input, options) => {
    const url = new URL(input);
    calls.push({ url, options });
    const data = await handler(url, options);
    return {
      ok: !data.__httpStatus,
      status: data.__httpStatus || 200,
      json: async () => data,
    };
  };
  const client = vm.runInNewContext(source, {
    fetch,
    URL,
    AbortController,
    setTimeout,
    clearTimeout,
    process: { env: { API_KEY: 'test-only-key' } },
    console: { error: (message) => errors.push(message) },
  });
  return { client, calls, errors };
}

async function run() {
  {
    const { client, calls } = createClient();
    const result = await client.getAll();
    assert.strictEqual(calls.length, 8);
    assert.strictEqual(result.popularMovies[0].title, 'Fight Club');
    assert.strictEqual(result.popularShows[0].title, 'Game of Thrones');
    assert.strictEqual(result.genresMovieMap[18], 'Drama');
    assert.strictEqual(result.isPartial, false);
    const discoverCalls = calls.filter(({ url }) => url.pathname.includes('/discover/'));
    assert.strictEqual(discoverCalls.length, 6);
    discoverCalls.forEach(({ url, options }) => {
      assert.strictEqual(url.searchParams.get('api_key'), 'test-only-key');
      assert.strictEqual(url.searchParams.getAll('language').length, 1);
      assert.strictEqual(url.searchParams.get('language'), 'en-US');
      assert.strictEqual(options.headers.Accept, 'application/json');
      assert.strictEqual(options.signal.aborted, false);
      if (url.pathname.endsWith('/movie')) {
        assert.strictEqual(url.searchParams.has('include_null_first_air_dates'), false);
        assert.strictEqual(url.searchParams.has('timezone'), false);
      } else {
        assert.strictEqual(url.searchParams.get('include_null_first_air_dates'), 'false');
        assert.strictEqual(url.searchParams.get('timezone'), 'America/New_York');
      }
    });
    assert.strictEqual(discoverCalls[5].url.searchParams.get('sort_by'), 'first_air_date.desc');
  }

  {
    const { client, errors } = createClient((url) => {
      if (url.pathname.endsWith('/discover/movie') && url.searchParams.get('sort_by') === 'popularity.desc') {
        return { __httpStatus: 400 };
      }
      return reply(url);
    });
    const result = await client.getAll();
    assert.strictEqual(result.isPartial, true);
    assert.strictEqual(result.popularMovies.length, 0);
    assert.strictEqual(result.newReleaseMovies.length, 1);
    assert.strictEqual(errors.length, 1);
    assert.strictEqual(errors[0].includes('test-only-key'), false);
    assert.strictEqual(errors[0].includes('HTTP 400'), true);
  }

  {
    const { client, errors } = createClient(() => ({ __httpStatus: 503 }));
    await assert.rejects(client.getAll(), /home-page data is unavailable/);
    assert.strictEqual(errors.length, 8);
  }

  {
    const { client, calls } = createClient();
    const details = await client.getDetails(550, 'movie');
    assert.strictEqual(calls.length, 1);
    assert.strictEqual(calls[0].url.pathname, '/3/movie/550');
    assert.strictEqual(calls[0].url.searchParams.get('append_to_response'), 'credits,videos,reviews');
    assert.strictEqual(details.credits.cast.length, 1);
    assert.strictEqual(details.trailers.length, 1);
    assert.strictEqual(details.reviews.length, 1);
    await assert.rejects(client.getDetails('../secret', 'movie'), /Invalid TMDB media identifier/);
    assert.strictEqual(calls.length, 1);
  }

  {
    const { client, errors } = createClient(() => Promise.reject(new Error('Request failed: api_key=test-only-key')));
    await assert.rejects(client.getDetails(1399, 'tv'), (error) => !error.message.includes('test-only-key'));
    assert.strictEqual(errors.length, 1);
    assert.strictEqual(errors[0].includes('test-only-key'), false);
    assert.strictEqual(errors[0].includes('unavailable'), true);
  }

  {
    const { client } = createClient(() => ({ __httpStatus: 404 }));
    await assert.rejects(client.getDetails(1399, 'tv'), (error) => error.status === 404);
  }

  {
    const { client, calls } = createClient();
    const list = await client.getList('2', 'vote_average.desc', '28', 'movie');
    assert.strictEqual(calls.length, 2);
    assert.strictEqual(calls[0].url.searchParams.get('vote_count.gte'), '200');
    assert.strictEqual(calls[0].url.searchParams.get('with_genres'), '28');
    assert.strictEqual(calls[0].url.searchParams.get('with_original_language'), 'en');
    assert.strictEqual(list.totalPages, 5);
    assert.strictEqual(list.genresOptions[0].label, 'Drama');
  }

  {
    const { client, calls } = createClient();
    const search = await client.getSearch('Rock & Roll? #film');
    assert.strictEqual(calls[0].url.pathname, '/3/search/multi');
    assert.strictEqual(calls[0].url.searchParams.get('query'), 'Rock & Roll? #film');
    assert.strictEqual(search.searchResults.length, 2);
    assert.strictEqual(search.searchResults[1].mediaType, 'show');
  }

  {
    const responseSource = fs.readFileSync(path.join(__dirname, '../utils/serverResponse.js'), 'utf8')
      .replace('export default function ', 'function ')
      .concat('\nunavailableProps');
    const unavailableProps = vm.runInNewContext(responseSource);
    const headers = {};
    const res = { statusCode: 200, setHeader: (name, value) => { headers[name] = value; } };
    const response = unavailableProps({ res });
    assert.strictEqual(res.statusCode, 503);
    assert.strictEqual(headers['Cache-Control'], 'no-store');
    assert.strictEqual(response.props.tmdbUnavailable, true);
  }

  process.stdout.write('TMDB client tests passed\n');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
