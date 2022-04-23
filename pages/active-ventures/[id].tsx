import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import SideMenu from "../../components/Shared/SideMenu";
import Title from "../../components/Shared/Title";
import Wrapper from "../../components/Shared/Wrapper";
import { useRouter } from "next/router";
import Loader from "../../components/Shared/Loader";

const ActiveVenture = () => {
  const history = useRouter();
  const [address, setAddress] = useState("");

  return (
    <>
      <SideMenu />
    
      <Wrapper>
        <div className="create">
          <Title text={`My ventures > title of venture`} />
          <Button
            size="sm"
            label="Create proposal"
            onClick={() => history.push(`/create-proposal/${address}`)}
          />
        </div>

        <div className="wrapper">
          {loading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <>
              <div className="left">
                <div className="proposal">
                  <div className="contract flex">
                    <div className="label">Address</div>
                    <div className="value">
                      {address}
                      <img src="" alt="icon" />
                      <img src="" alt="icon" />
                    </div>
                  </div>
                  <div className="description">
                    <div className="label">Description</div>
                  </div>
                </div>
                <div className="split-revenue">
                  <div>
                    <img src="" alt="icon" />
                    <div className="split-revenue--value">
                      <div>Revenue</div>
                      <div className="amount">
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* TODO: add button */}
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="title">Active proposals</div>
                <div>
                 {/* TODO: show active proposals */}
                </div>
                <p className="all" onClick={() => history.push("/proposals")}>
                  See all
                </p>
              </div>
              <div className="accounts-wrapper">
                {/* TODO: Accounts */}
              </div>
            </>
          )}
        </div>
      </Wrapper>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .flex {
          display: flex;
          justify-content: space-between;
        }
        .left,
        .right {
          flex-basis: 48%;
        }
        .right {
          padding: 35px 25px;
        }
        .proposal,
        .split-revenue {
          background: #7f72a2;
          box-shadow: 0px 0px 10px rgba(233, 198, 255, 0.1);
          border-radius: 20px;
          padding: 35px 25px;
        }
        .split-revenue--value {
          display: flex;
          flex-direction: column;
        }
        .right {
          background: #f1fffc;
          border-radius: 20px;
        }
        .contract {
          margin-bottom: 8px;
          justify-content: flex-start;
        }
        .contract .label {
          margin-right: 51px;
        }
        .label,
        .value {
          color: #ffffff;
          font-weight: 600;

          color: #f6f3ff;
        }
        .label {
          font-size: 18px;
          margin-right: 25px;
        }
        .description {
          display: flex;
        }
        .description .value {
          width: 75%;
        }
        .title {
          font-weight: 600;
          font-size: 24px;
          color: #00e0b8;
          margin-bottom: 20px;
        }
        .all {
          font-weight: 600;
          font-size: 18px;
          text-align: center;
          color: #00e0b8;
          cursor: pointer;
        }
        .all:hover {
          text-decoration: underline;
        }
        .split-revenue {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          padding: 17px 35px;
          color: #fff;
          font-weight: 600;
          font-size: 18px;
        }
        .amount {
          font-weight: 600;
          font-size: 24px;
        }
        .split-revenue > div {
          display: flex;
        }
        .split-revenue img {
          margin-right: 54px;
        }
        .accounts-wrapper {
          width: 100%;
        }
        .loader {
          margin: 0 auto;
        }
        .create {
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};

export default ActiveVenture;
