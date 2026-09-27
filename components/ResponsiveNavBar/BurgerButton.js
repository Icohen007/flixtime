import React from 'react';
import styled from 'styled-components';

const BurgerButton = ({ openNav, toggleNav }) => (
  <Wrapper type="button" onClick={toggleNav} aria-label="Toggle navigation" aria-expanded={openNav}>
    <div className={openNav ? 'open' : ''}>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
    </div>
  </Wrapper>
);

export default BurgerButton;

const Wrapper = styled.button`
  position: relative;
  padding: 7rem 0 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: block;

  & span {
    background: #fdcb6e;
    display: block;
    position: relative;
    width: 35rem;
    height: 4rem;
    margin-bottom: 7rem;
    transition: all ease-in-out 0.2s;
  }

  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 11rem;
  }
  .open span:nth-child(2) {
      opacity: 0;
    }
  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -11rem;
  }
`;
