import React from "react";
import { shortenEthereumAddress } from "../../utils";

const ActiveProposal = ({ width }:any) => {
  return (
    <>
      <div className="wrapper">
        <div className="title">Transfer contract ownership</div>
        <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, qui... <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
        <div className="proposer">
          <div className="by">By:</div>
          <div className="address">
            {shortenEthereumAddress(
              "0x7fbbb9d0963e185c0f1f48ac53a00d570901a676"
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          background: #ffffff;
          border-radius: 20px;
          padding: 17px 31px;
          margin-bottom: 37px;
          flex-basis: ${width || "auto"};
        }
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #00e0b8;
          margin-bottom: 25px;
        }
        .description {
          margin-bottom: 25px;
          font-size: 14px;
        }
        .proposer {
          display: flex;
          align-items: center;
        }
        .by {
          color: #00e0b8;
          font-size: 14px;
          font-weight: 600;
          margin-right: 8px;
        }
        .description,
        .address {
          font-weight: 600;
          color: #59a99a;
        }
      `}</style>
    </>
  );
};

export default ActiveProposal;
