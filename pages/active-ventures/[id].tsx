import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Accounts from "../../components/Accounts";
import ActiveProposal from "../../components/ActiveProposal";
import Button from "../../components/Shared/Button";
import Loader from "../../components/Shared/Loader";
import Modal from "../../components/Shared/Modal";
import SideMenu from "../../components/Shared/SideMenu";
import Title from "../../components/Shared/Title";
import Wrapper from "../../components/Shared/Wrapper";
import { JointVenture } from "../../contracts/types";
import useJointVentureContract from "../../hooks/useJointVentureContract";

const ActiveVenture = () => {
  const history = useRouter();
  const { account } = useWeb3React();
  const [address, setAddress] = useState("");
  const ventureContract = useJointVentureContract(address) as JointVenture;
  const [ventureInfo, setVentureInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    setAddress(history.query.id);
  }, [history.query]);

  useEffect(() => {
    if (address && ventureContract) {
      setLoading(true);
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
        const voters = await ventureContract.getVoters();
        const proposers = await ventureContract.getProposers();
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
          voters,
          proposers,
        });
      };

      getVentureInfo();
    }
    setLoading(false);
  }, [ventureContract]);

  const splitRevenue = async () => {
    try {
      const tx = await ventureContract.splitRevenue(
        "0x0000000000000000000000000000000000000000"
      );
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        setIsModalShown(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { revenueSplit, name, proposals } = ventureInfo;

  return (
    <>
      <SideMenu />
      <Modal
        description={
          "Splitting the revenue will withdraw the funds from the contract and distribute them to the Voters according to their Power."
        }
        title="Do you want to continue"
        show={isModalShown}
        handleClose={() => {
          setIsModalShown(false);
        }}
        onSubmit={splitRevenue}
      />
      <Wrapper>
        <div className="create">
          <Title text={name && `My ventures > ${ventureInfo.name}`} />
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
                    <div className="value">{ventureInfo?.description}</div>
                  </div>
                </div>
                <div className="split-revenue">
                  <div>
                    <img src="" alt="icon" />
                    <div className="split-revenue--value">
                      <div>Revenue</div>
                      <div className="amount">
                        {revenueSplit && utils.formatEther(revenueSplit)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      onClick={() => setIsModalShown(true)}
                      label="Split"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="title">Active proposals</div>
                <div>
                  {
                    (ventureInfo as any).proposals?.map((proposal, index) => {
                      console.log(JSON.stringify(proposal))
                      return (
                        <ActiveProposal
                          key={index}
                          proposal={proposal}
                          onClick={() =>
                            history.push(`/single-proposal/${address}`)
                          }
                        />
                      );
                    })}
                </div>
                <p className="all" onClick={() => history.push(`/proposals/${address}`)}>
                  See all
                </p>
              </div>
              <div className="accounts-wrapper">
                <Accounts type="Voters" data={ventureInfo.voters} />
                <Accounts type="Proposers" data={ventureInfo.proposers} />
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
