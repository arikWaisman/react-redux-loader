import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  top: 50%;
  left: 50%;
  transforum: translate(-50%, -50%);
  width: 25px;
  height: 25px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

// loader actions get passed as props from loader factory
const SmallSpinner = props => (
  <StyledSpinner viewBox="0 0 25 25">
    <circle
      className="path"
      cx="12.5"
      cy="12.5"
      r="10"
      fill="none"
      strokeWidth="2"
    />
  </StyledSpinner>
);

export default SmallSpinner;
