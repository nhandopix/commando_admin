import React from 'react';
import styled from 'styled-components';

export default () => (
  <LoaderComponent>
    <svg className="loaderContent" viewBox="0 0 50 50">
      <circle
        className="loaderContentCircle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="3.6"
      />
    </svg>
  </LoaderComponent>
);

const LoaderComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10000000000;
  top: 0;
  right: 0;

  .loaderContent {
    width: 50px;
    height: 50px;
    animation: svgSpinner 1.4s linear infinite;
  }

  .loaderContentCircle {
    animation: svgSpinnerCircle 1.4s ease-in-out infinite;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    stroke: ${props => props.theme.palette.primary[0]};
    stroke-linecap: round;
  }

  @keyframes svgSpinner {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes svgSpinnerCircle {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -120px;
    }
  }
`;