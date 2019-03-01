import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.svg`
  position: relative;
  animation: rotate 2s linear infinite;
  top: 50%;
  left: 50%;
  transforum: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 1001;

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

const SpinnerBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1000;
`;

// loader actions get passed as props from loader factory
const Spinner = props => (
  <SpinnerBackground>
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  </SpinnerBackground>
);

export default Spinner;
