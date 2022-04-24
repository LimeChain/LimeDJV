import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ActiveProposal from "../../components/ActiveProposal";
import Button from "../../components/Shared/Button";
import SideMenu from "../../components/Shared/SideMenu";
import { JointVenture } from "../../contracts/types";
import useJointVentureContract from "../../hooks/useJointVentureContract";

const Proposals = () => {
  const router = useRouter();
  const history = useRouter();
  const [address, setAddress] = useState(history.query.id);
  const [proposals, setProposals] = useState([]);
  const [proposalsCount, setProposalsCount] = useState<number>(0);
  const ventureContract = useJointVentureContract(address) as JointVenture;

  useEffect(() => {
    setAddress(history.query.id);
  }, [history.query]);

  useEffect(() => {
    if (ventureContract) {
      const getProposals = async () => {
        const proposalCount = await ventureContract.proposalCount();
        const proposals = await ventureContract.getProposals(
          0,
          proposalCount,
          true,
          true
        );

        setProposalsCount(proposalCount.toNumber());
        setProposals(proposals);
      };

      getProposals();
    }
  }, [address, ventureContract]);

  return (
    <>
      <SideMenu />
      <div className="wrapper">
        <img src="/svgs/right-purple.svg" />
        <div className="header">
          <div>
            <div className="title">Proposals</div>
            <div className="count">{`Total ${proposalsCount}`}</div>
          </div>
        </div>
        <div className="main">
          {proposals.map((proposal, index) => {
            console.log(proposals);
            return (
              <>
                <ActiveProposal
                  key={proposal}
                  id={proposal.id}
                  proposal={proposal}
                  onClick={() => history.push(`/single-proposal/${address}`)}
                  width="48%"
                />
              </>
            );
          })}
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
