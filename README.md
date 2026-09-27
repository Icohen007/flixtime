# FlixTime

This is the repository for https://flixtime.vercel.app.

you can get all the movies and tv shows you ever wanted in a beautiful design.

made with NextJS, React, styled-components and TMDB API.

### Key Features
- Design UI without any component system, only pure CSS (Styled Components).
- 100% Responsive, using Media queries, Grid & Flexbox layouts.
- Built with React Hooks and wrote custom hooks to create reusable functionality
- Server side rendered app, with serverless functions to fetch the data.
- Using TMDB API as the data source, with server-side requests and partial fallbacks.
- Functionality: Searching, Filtering and Sorting

### Run locally

Use Node.js 22 and a TMDB API v3 key. Create an ignored `.env.local` file with
`API_KEY=your_tmdb_api_key`; the key is read only on the server. On Vercel,
configure `API_KEY` separately for both Preview and Production environments.

Then run:

```bash
npm install
npm test
npm run dev
```

Run `npm run build` before deploying. Production currently uses a legacy Vercel
deployment; pushing to GitHub alone does not replace it.
