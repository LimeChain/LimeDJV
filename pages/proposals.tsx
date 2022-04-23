import { useRouter } from "next/dist/client/router";
import React from "react";
import ActiveProposal from "../components/ActiveProposal";
import Button from "../components/Shared/Button";
import SideMenu from "../components/Shared/SideMenu";

const Proposals = () => {
  const router = useRouter();

  return (
    <>
      <SideMenu />
      <div className="wrapper">
        <img src="/svgs/right-purple.svg" />
        <div className="header">
          <div>
            <div className="title">Proposals</div>
            <div className="count">Total 7</div>
          </div>
          <Button size="sm" label="Create proposal" onClick={() => router.push('/create-proposal')} />
        </div>
        <div className="main">
          <ActiveProposal width="48%" />
          <ActiveProposal width="48%" />
          <ActiveProposal width="48%" />
          <ActiveProposal width="48%" />
          <ActiveProposal width="48%" />
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          background: #f1fffc;
        }
        .wrapper > img {
          position: absolute;
          top: 20%;
        }
        .header {
          display: flex;
          justify-content: space-between;
          width: 70%;
          margin-left: 25%;
          padding-top: 30px;
        }
        .title {
          font-weight: 600;
          font-size: 24px;
          color: #00e0b8;
          margin-bottom: 7px;
        }
        .count {
          font-weight: 600;
          font-size: 16px;
          color: #00e0b8;
        }
        .main {
          width: 70%;
          margin-left: 25%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 35px;
        }
      `}</style>
    </>
  );
};

export default Proposals;
