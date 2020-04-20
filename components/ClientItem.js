import React from 'react';
import styled from 'styled-components';
import StyledClientItem from './ClientItem.style';

const CarouselItemText = styled.div`
background-color: transparent;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
`;

const UpperText = styled.p`
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
    max-width: 168rem;
`;

const LowerText = styled.p`
color: grey;
    font-size: 13px;
    font-weight: 400;
    margin: 0;
    padding-top: 3rem;
    max-width: 168rem;
`;

function ClientItem({ clientName, clientUrl }) {
  return (
    <StyledClientItem>
      <img alt={clientName} src={clientUrl} onContextMenu={(e) => e.preventDefault()} />
      <CarouselItemText>
        <UpperText> {clientName} </UpperText>
        <LowerText> Action </LowerText>
      </CarouselItemText>
    </StyledClientItem>
  );
}

export default ClientItem;
