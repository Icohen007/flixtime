import styled from 'styled-components';
import Link from 'next/link';

// https://codepen.io/Gingernaut/pen/qOgMLy
const FancyButtonStyled = styled.div`

    margin-top: 0;
    position: relative;
    width: 110px;
    height: 35px;
    display: inline-block;
    border-radius: 3px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;

&:hover #shape {
    stroke-dasharray: 50 0;
    stroke-width: 3px;
    stroke-dashoffset: 0;
    stroke: #06D6A0;
}

.spot {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}

#shape {
    stroke-width: 6px;
    fill: transparent;
    stroke: #007fcd;
    stroke-dasharray: 70 400;
    stroke-dashoffset: -165;
    transition: 1s all ease;
}

#text {
    margin-top: -35px;
    text-align: center;
    user-select: none;
}

#text p {
    color: #9f9f9f;
    text-decoration: none;
    font-size: 16px;
}

`;
function FancyButton({ linkTo }) {
  return (
    <Link href={linkTo}>
      <FancyButtonStyled>
        <svg height="35" width="110" xmlns="http://www.w3.org/2000/svg">
          <rect id="shape" height="35" width="110" />
        </svg>

        <div id="text">
          <p>
            <span className="spot" />
            See All
          </p>
        </div>
      </FancyButtonStyled>
    </Link>
  );
}

export default FancyButton;
