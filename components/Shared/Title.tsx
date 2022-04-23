import React from "react";

const Title = ({ text }) => {

  return (
    <div className="title-wrapper">
      <div>
        <h2>{text}</h2>
      </div>
     
      <style jsx>{`
        .title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        h2 {
          font-weight: 600;
          font-size: 24px;
          color: #25067d;
        }
      `}</style>
    </div>
  );
};

export default Title;
