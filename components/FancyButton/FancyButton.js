import styled from 'styled-components';

const FancyButtonStyled = styled.div`

    margin-top: 0;
    position: relative;
    width: 110px;
    /*make sure to use same height/width as in the html*/
    height: 35px;
    display: inline-block;
    border-radius: 3px;
    margin-left: 5px;
    margin-right: 5px;

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
}
/*
    This is the outer svg wrapper that the SVG itself will
    fill. Multiple svg-wrapper classes can be put side by side.
*/



#shape {
    stroke-width: 6px;
    fill: transparent;
    stroke: #007fcd;
    stroke-dasharray: 70 400;
    stroke-dashoffset: -165;
    transition: 1s all ease;
}
/*
    Pushing the text up into the SVG. Without this the
    text would be below the div's.
*/

#text {
    margin-top: -35px;
    text-align: center;
}

#text a {
    color: #9f9f9f;
    text-decoration: none;
    font-size: 16px;
}
/*
    Changing the shape on hover. I change the color of the stroke,
make it thinner, then set it to again wrap around the entire parent element.
*/

`;

function FancyButton() {
  return (
    <FancyButtonStyled>
      <svg height="35" width="110" xmlns="http://www.w3.org/2000/svg">
        <rect id="shape" height="35" width="110" />
      </svg>
      <div id="text">
        <a href=""> //TODO : add link
          <span className="spot" />
          See All
        </a>
      </div>
    </FancyButtonStyled>
  );
}

export default FancyButton;
