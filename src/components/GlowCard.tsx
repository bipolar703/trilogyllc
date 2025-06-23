import React from "react";
import styled from "styled-components";

interface GlowCardProps {
  title: string;
  description: string;
  colorIndex: number;
}

const GlowCard: React.FC<GlowCardProps> = ({
  title,
  description,
  colorIndex,
}) => {
  // Generate random animation duration between 4 and 7 seconds
  const duration = 4 + Math.random() * 3;
  // Randomly decide animation direction
  const isReverse = Math.random() > 0.5;

  return (
    <StyledWrapper
      colorIndex={colorIndex}
      duration={duration}
      reverse={isReverse}
      data-oid="1jaelfw"
    >
      <div className="card" data-oid="iixl.kh">
        <div className="bg" data-oid="3m05it:">
          <h3
            className="text-xl font-bold text-gray-900 mb-2"
            data-oid=".i7srdn"
          >
            {title}
          </h3>
          <p className="text-gray-600 text-sm" data-oid="12o0dhb">
            {description}
          </p>
        </div>
        <div className="blob" data-oid="xat56iw" />
      </div>
    </StyledWrapper>
  );
};

const gradients = [
  "linear-gradient(135deg, #F2EA79, #D9981E)",
  "linear-gradient(135deg, #D9981E, #A67E33)",
  "linear-gradient(135deg, #A67E33, #F2EA79)",
  "linear-gradient(135deg, #F2EA79, #A67E33)",
  "linear-gradient(135deg, #D9981E, #F2EA79)",
];

const StyledWrapper = styled.div<{
  colorIndex: number;
  duration: number;
  reverse: boolean;
}>`
  .card {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 14px;
    z-index: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow:
      20px 20px 60px #bebebe,
      -20px -20px 60px #ffffff;

    @media (max-width: 640px) {
      height: 180px;
    }
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 2px solid white;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 640px) {
      padding: 1rem;
    }

    h3 {
      @media (max-width: 640px) {
        font-size: 1rem;
      }
    }

    p {
      @media (max-width: 640px) {
        font-size: 0.875rem;
      }
    }
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${(props) => gradients[props.colorIndex]};
    opacity: 0.8;
    filter: blur(12px);
    animation: blob-bounce-${(props) => (props.reverse ? "reverse" : "normal")}
      ${(props) => props.duration}s infinite ease;
    animation-direction: ${(props) => (props.reverse ? "reverse" : "normal")};

    @media (max-width: 640px) {
      width: 120px;
      height: 120px;
    }
  }

  @keyframes blob-bounce-normal {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }

  @keyframes blob-bounce-reverse {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }
`;

export default GlowCard;
