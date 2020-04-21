import styled from 'styled-components';
import Link from 'next/link';

import Carousel from './Carousel';

const CarouselContainer = styled.div`
 max-width: 1130rem;
 width: 100%;
`;

const LeftSideDiv = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: 500;
`;

const RightSideDiv = styled.div`
    color: #999;
    font-size: 17rem;
    cursor: pointer;
    align-self: flex-end;
    transition: filter .2s;
    &:hover {
        filter: brightness(1.3);
    }
`;

const ShowCaseContainer = styled.div`
background: transparent;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;

const CarouselHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
    margin-bottom: 10rem;
    padding-right: 17rem;
    padding-left: 10rem;
    width: 100%;
`;


function CarouselContent({ content, header, path }) {
  return (
    <ShowCaseContainer>
      <CarouselContainer>
        <CarouselHeader>
          <LeftSideDiv>
            {header}
          </LeftSideDiv>
          <Link href={path}>
            <RightSideDiv> See All</RightSideDiv>
          </Link>
        </CarouselHeader>
        <Carousel content={content} />
      </CarouselContainer>
    </ShowCaseContainer>
  );
}

export default CarouselContent;