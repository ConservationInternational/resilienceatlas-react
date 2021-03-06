import React from 'react';

const Chapter = ({ background, title, content }) => (
  <div className={`m-journey--chapter ${background}`}>
    <div className="chapter-mask--1 is-stretch">
      <div className="wrapper">
        <div className="chapter-intro">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Chapter;
