import React from "react";
import useEagerConnect from "../../hooks/useEagerConnect";
import Account from "../Account";

const Title = ({ text }:any) => {
  const triedToEagerConnect = useEagerConnect();

  return (
    <div className="title-wrapper">
      <div>
        <h2>{text}</h2>
      </div>
      <div>
        <Account triedToEagerConnect={triedToEagerConnect} />
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
