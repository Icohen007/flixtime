import styled from 'styled-components';

const CreditContainer = styled.div`
    padding-top: 10px;
    margin-bottom: 10px;
    max-width: 110px;
    justify-self: center;
`;

const CreditImageContainer = styled.div`
overflow: hidden;
    max-height: 110px;
    max-width: 110px;
    border-radius: 50%;
`;

const CreditImage = styled.img`
    width: 110px;
    height: 110px;
    object-fit: cover;
    ${(props) => props.imageDefined && 'object-position: 0px -14.5px;'}
`;

const CreditText = styled.div`
    margin-top: 9px;
    font-weight: 500;
    font-size: 13px;
    opacity: .85;
    color: #bdbdbd;
`;

const CreditTitle = styled.div`
font-size: 16rem;
`;

const NOT_DEFINED_GENDER = 0;
const FEMALE_GENDER = 1;
const MALE_GENDER = 2;

function Credit({
  title, imageUrl, text, gender,
}) {
  let crewImage = `https://image.tmdb.org/t/p/w300_and_h450_face${imageUrl}`;
  if (!imageUrl) {
    if (gender === NOT_DEFINED_GENDER || gender === MALE_GENDER) {
      crewImage = '/man-placeholder.jpg';
    } else if (gender === FEMALE_GENDER) {
      crewImage = '/woman-placeholder.jpg';
    }
  }

  return (
    <CreditContainer>
      <CreditTitle>{title}</CreditTitle>
      <CreditImageContainer>
        <CreditImage src={crewImage} imageDefined={!!imageUrl} />
      </CreditImageContainer>
      <CreditText>{text}</CreditText>
    </CreditContainer>
  );
}

export default Credit;
