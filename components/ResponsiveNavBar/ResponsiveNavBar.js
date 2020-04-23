import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';
import scrollToTop from '../../utils/scrollToTop';

const ResponsiveNavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -100rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30rem, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const toggleNav = () => setOpenNav((open) => !open);

  return (
    <>
      {isMobile ? (
        <NavBar style={barAnimation}>
          <FlexContainer>
            <TitleMobile onClick={scrollToTop(true)} style={{ fontSize: '20rem' }}>FlixTime</TitleMobile>
            <BurgerWrapper>
              <BurgerButton
                openNav={openNav}
                toggleNav={toggleNav}
              />
            </BurgerWrapper>
          </FlexContainer>
          <MobileMenu
            openNav={openNav}
            toggleNav={toggleNav}
          />
        </NavBar>
      )
        : (
          <NavBar style={barAnimation}>
            <FlexContainer>
              <NavLinks style={linkAnimation}>
                <Link href="/">FlixTime</Link>
                <Link href="/movies">Movies</Link>
                <Link href="/shows">Shows</Link>
              </NavLinks>
              <NavLinks style={linkAnimation}>
                <Link href="/">Services</Link>
                <Link href="/">Services</Link>
              </NavLinks>
            </FlexContainer>
          </NavBar>
        )}
    </>
  );
};

export default ResponsiveNavBar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: transparent;
  // #272727ab
  font-size: 16rem;
  z-index: 200;
`;

const FlexContainer = styled.div`
  max-width: 1400rem;
  display: flex;
  align-items: center;
  margin: auto;
  padding: 0 20rem;;
  justify-content: space-between;
  height: 65rem;
  z-index: 200
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    font-weight: 600;
    border-bottom: 1rem solid transparent;
    margin: 0 15rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #adcdfd;
      border-bottom: 1rem solid #adcdfd;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;
  user-select: none;
`;

const TitleMobile = styled.span`
    color: #dfe6e9;
    font-weight: 600;
    font-size: 20rem;
    user-select: none;
    cursor: pointer;
`;
