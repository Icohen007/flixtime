import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { Icon, Pagination } from 'semantic-ui-react';

import scrollToTop from '../utils/scrollToTop';
import * as S from './PopularPage.style';
import ContentItem from './ContentItem';
import { getYear } from '../utils/formatUtils';
import useDidMountEffect from '../utils/useDidMountEffect';

const customStyles = {
  container: (provided) => ({
    ...provided,
    marginBottom: '40rem',
    display: 'flex',
    justifyContent: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'gray',
    backgroundColor: state.isSelected ? 'rgba(48,48,48,0.74)' : state.isFocused ? '#161616' : '#0d0d0d',
    width: 200,

    ':active': {
      backgroundColor: '#a4a4a4',
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: 200,
    backgroundColor: '#0d0d0d',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#0d0d0d',
    width: 200,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

const mediaPath = (mediaType) => (mediaType === 'movie' ? 'movies' : 'shows');
export const getOption = (options, value) => options.find((option) => option.value === value);

function SortPage({
  results, sortOptions, mediaType, totalPages,
}) {
  const router = useRouter();
  const { page = '1', sortBy = sortOptions[0].value } = router.query;
  const sortOption = getOption(sortOptions, sortBy);
  const [dropdownValue, setDropdownValue] = useState(sortOption || sortOptions[0]);

  const handPageChange = (event, data) => {
    if (data.activePage === 1 && sortBy === sortOptions[0].value) {
      router.push(`/${mediaPath(mediaType)}`).then(scrollToTop());
    } else {
      router.push(`/${mediaPath(mediaType)}?sortBy=${sortBy}&page=${data.activePage}`).then(scrollToTop());
    }
  };

  const handleDropdownChange = (selectedOption) => setDropdownValue(selectedOption);

  useDidMountEffect(() => {
    router.push(`/${mediaPath(mediaType)}?sortBy=${dropdownValue.value}&page=1`).then(scrollToTop());
  }, [dropdownValue]);

  return (
    <S.GridContainer>
      <S.FireText>
        <h2>
          <span>{mediaPath(mediaType)}</span>
        </h2>
      </S.FireText>
      <span style={{ color: 'white' }}> Sort By </span>
      <Select
        styles={customStyles}
        options={sortOptions}
        value={dropdownValue}
        onChange={handleDropdownChange}
        placeholder="Sort by..."
      />
      <S.ContentGrid>
        {results.map((elem) => (
          <ContentItem
            key={elem.id}
            id={elem.id}
            clientName={elem.title}
            mediaType={mediaType}
            releaseDate={getYear(elem.releaseDate)}
            clientUrl={`https://image.tmdb.org/t/p/w300/${elem.imageUrl}`}
          />
        ))}
      </S.ContentGrid>
      <Pagination
        defaultActivePage={page}
        totalPages={totalPages}
        onPageChange={handPageChange}
        siblingRange={2}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
      />
    </S.GridContainer>
  );
}


export default SortPage;
