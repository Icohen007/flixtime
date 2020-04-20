import styled from 'styled-components';

const CarouselContainer = styled.div`

`;


const LeftSideDiv = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: 500;
    cursor: default;
`;

const RightSideDiv = styled.div`
color: #999;
    font-size: 17px;
    justify-content: flex-end;
    font-weight: 300;
    padding-top: 2px;
    cursor: pointer;
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
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 0;
    margin-bottom: 35rem;
    padding-right: 17rem;
    padding-left: 10rem;
`;


function Main(props) {
  return (
    <ShowCaseContainer>
      <CarouselContainer>
        <CarouselHeader>
          {' '}
          <LeftSideDiv> Popular Shows</LeftSideDiv>
          <RightSideDiv> See All</RightSideDiv>
        </CarouselHeader>
<Carousel>

</Carousel>
      </CarouselContainer>
    </ShowCaseContainer>
  );
}

export default Main;
