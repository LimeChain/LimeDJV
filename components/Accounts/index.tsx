import React from "react";
import Button from "../Shared/Button";

enum AccountsType {
  Voters,
  Proposers,
}

const Accounts = ({ type, data }: any) => {
  let description = "";
  if (type === "Voters") {
    description =
      "Voters have the right to receive part of the revenue, vote on proposals and create proposals";
  } else if (type === "Proposers") {
    description = "Proposers have the right to create proposals.";
  }

  if (!data?.length) return null;
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="left">
            <div className="type">{type}</div>
            <div className="description">{description}</div>
          </div>
          <div className="right">
            {/* <Button label="Manage" size="sm" color="transparent" /> */}
          </div>
        </div>
        <div className="top">
          <p>Address</p>
        </div>
        <div className="list">
          <ul>
            {data?.map((voter:any) => {
              return <li key={voter}>{voter}</li>;
            })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          margin-top: 40px;
        }
        .header {
          display: flex;
          justify-content: space-between;
        }
        .type {
          font-weight: 500;
          font-size: 18px;
          color: #25067d;
          margin-bottom: 7px;
        }
        .description {
          font-weight: 500;
          font-size: 12px;
          color: #b5b5c3;
        }
        .top {
          background: #f6f3ff;
          border-radius: 6px;
          height: 43px;
        }
        .top > p {
          margin-left: 57px;
          line-height: 3.7;
          color: #7f72a2;
          font-size: 12px;
          font-weight: 600;
        }
        ul {
          list-style: none;
          margin-top: 23px;
        }
        li {
          font-weight: 600;
          font-size: 14px;
          color: #25067d;
          margin-bottom: 7px;
        }
      `}</style>
    </>
  );
};

export default Accounts;
