import React from 'react';
import styled from 'styled-components';

import { useSpring, animated } from 'react-spring';
import Link from 'next/link';

const MobileMenu = ({ toggleNav, openNav }) => {
  const { open } = useSpring({ open: openNav ? 0 : 1 });

  if (openNav) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate((openValue) => `translate3d(0, ${openValue}rem, 0`),
      }}
      >
        <NavLinks>
          <li>
            <Link href="/"><span onClick={toggleNav}>Home</span></Link>
          </li>
          <li>
            <Link href="/movies"><span onClick={toggleNav}>Movies</span></Link>
          </li>
          <li>
            <Link href="/shows"><span onClick={toggleNav}>Shows</span></Link>
          </li>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default MobileMenu;

const CollapseWrapper = styled(animated.div)`
  background: #0d0d0d;
  position: fixed;
  top: 45rem;
  left: 0;
  right: 0;
  z-index: 200;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0 15rem;
  margin: 5rem;

  & li {
    text-align: center;
    transition: all 300ms linear 0s;
    padding: 5rem 0;
    
    :not(:last-child) {
    border-bottom: rgba(108,108,108,0.2) solid 1rem;
    }
  }

  & span {
    font-size: 14rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #adcdfd;
      border-bottom: 1rem solid #adcdfd;
    }
  }
`;
