import styled from 'styled-components';

const Message = styled.main`
  max-width: 800rem;
  margin: 120rem auto 80rem;
  padding: 0 24rem;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 32rem;
  }

  p {
    font-size: 18rem;
    color: #d2d2d2;
  }
`;

export default function ServiceUnavailable() {
  return (
    <Message role="alert">
      <h1>Movies and shows are temporarily unavailable</h1>
      <p>We couldn&apos;t load the latest data from TMDB. Please try again shortly.</p>
    </Message>
  );
}
