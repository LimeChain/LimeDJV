import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import useJointVentureContract from "../hooks/useJointVentureContract";
import { shortenEthereumAddress } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VentureCard = ({ address, onClick }) => {
  const { account } = useWeb3React();
  const ventureContract = useJointVentureContract(address);
  const [ventureInfo, setVentureInfo] = useState({});

  useEffect(() => {
    if (!account) {
      return;
    }
    const getVentureInfo = async () => {
      const name = await ventureContract.name();
      const description = await ventureContract.description();
      const proposalCount = await ventureContract.proposalCount();
      const proposals = await ventureContract.getProposals(
        0,
        proposalCount,
        true,
        true
      );
      const isVoter = await ventureContract.isVoter(account);
      const isProposer = await ventureContract.isProposer(account);
      const revenueSplit = await ventureContract.getRevenue(
        "0x0000000000000000000000000000000000000000"
      );
      setVentureInfo({
        name,
        description,
        proposalCount: proposalCount.toString(),
        proposals,
        isVoter,
        isProposer,
        revenueSplit: revenueSplit.toString(),
      });
    };

    getVentureInfo();
  }, [account]);

  return (
    <>
      <div onClick={onClick} className="container">
        {!ventureInfo?.name ? (
          <Skeleton count={3} />
        ) : (
          <>
            <div className="top">
              <div className="title font-main font-600">{ventureInfo.name}</div>
              <div className="contract font-secondary font-600">
                {shortenEthereumAddress(address)}
              </div>
              <div className="flex">
                <div className="font-secondary font-600">Your role</div>
                <div className="font-main-2 font-600">
                  {ventureInfo.isVoter
                    ? "Voter"
                    : ventureInfo.isProposer
                    ? "Proposer"
                    : ""}
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="flex">
                <div className="font-secondary font-600">Revenue</div>
                <div className="font-main-2 font-600">
                  ${ventureInfo.revenueSplit}
                </div>
              </div>
              <div className="flex">
                <div className="font-secondary font-600">Active proposals</div>
                <div className="font-main-2 font-600">
                  {ventureInfo.proposalCount}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 30%;
          padding: 14px 31px;
          background: #f6f3ff;
          box-shadow: 0px 1px 10px rgba(249, 211, 255, 0.25);
          border-radius: 20px;
          margin-bottom: 40px;
          margin-right: 40px;
          cursor: pointer;
        }
        .flex {
          display: flex;
          justify-content: space-between;
        }
        .top {
          height: 148px;
          margin-bottom: 8px;
          line-height: 1.6;
        }
        .bottom {
          line-height: 1.6;
        }
        .font-main {
          font-weight: 600;
          font-size: 20px;
        }
        .font-secondary {
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default VentureCard;
