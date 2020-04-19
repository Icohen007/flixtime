import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50rem;
  color: ${({ theme }) => theme.colors.primary};
`;

function Header(props) {
  return (
      <Title> Title </Title>
  );
}

export default Header;
