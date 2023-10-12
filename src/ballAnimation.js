// BallAnimation.js
import React from 'react';
import './ballAnimation.css';

const BallAnimation = () => {
  const ballCount = 10; // Number of balls to create

  const createRandomBall = (index) => {
    const size = Math.floor(Math.random() * 20) + 20; // Random size between 10 and 30 pixels
    const left = Math.random() * 100; // Random horizontal position
    const animationDelay = Math.random() * 2; // Random animation delay (between 0 and 2 seconds)

    const top = Math.random() * 100;

    return (
      <div
        key={index}
        className="ball"
        style={{
            width: size + 'px',
            height: size + 'px',
            left: left + 'vw',
            top: top + 'vh',
            animationDelay: animationDelay + 's',
        }}
      ></div>
    );
  };

  const balls = Array.from({ length: ballCount }, (_, index) => createRandomBall(index));

  return <div className="ball-container">{balls}</div>;
};

export default BallAnimation;
