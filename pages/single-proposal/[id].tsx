import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SideMenu from "../../components/Shared/SideMenu";
import Wrapper from "../../components/Shared/Wrapper";
import { GlobalContext } from "../../context/GlobalContext";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useJointVentureContract from "../../hooks/useJointVentureContract";

const SingleProposal = () => {
  const history = useRouter();
  const [address, setAddress] = useState();
  const [propId, setPropId] = useState();
  const { account, library } = useWeb3React();
  const ventureContract = useJointVentureContract(address);
  const { isWalletConnected } = useGlobalContext();
  const [ventureInfo, setVentureInfo] = useState({});

  useEffect(() => {
    setAddress(history.query.id);
    setPropId(history.query.propId);

  }, [history.query]);

  useEffect(() => {
   
    if(!account || !ventureContract) {
      return;
    }
    const getVentureInfo = async () => {
     
      const proposals = await ventureContract.proposals(
        propId
      );
      const voters = await ventureContract.getVoters();
      const description = await ventureContract.description();
      const name = await ventureContract.name();

      setVentureInfo({
        name,
        description,   
        proposals,
        voters,
      });
    };

    getVentureInfo();



  },[address, propId, ventureContract, account, library, isWalletConnected])

  return (
    <>
      <SideMenu></SideMenu>
      <Wrapper>
        <div className="wrapper">
          <div className="owner">
            <div className="inner">
              <div className="label">Title</div>
              <div className="title">{ventureInfo.name}</div>
            </div>
            <div className="inner">
              <div className="label">By</div>
              <div className="title">
                {ventureInfo.proposals?.creator}
              </div>
            </div>
          </div>
          <div className="voters">
            <div className="inner">
              <div className="label">Partners</div>
              <div>
                <div className="title">
                  {ventureInfo.voters}
                </div>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="inner">
              <div className="label">Description</div>
              <div>
                <div className="title">
                  {ventureInfo.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <style jsx>{`
        .owner {
          height: 107px;
          background: #f1fffc;
          border-radius: 20px;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .voters {
          height: 107px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .description {
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50px;
        }
        .inner {
          display: flex;
          margin-left: 50px;
          line-height: 1.5;
        }
        .label {
          margin-right: 100px;
          font-weight: 600;
          font-size: 18px;
          color: #00e0b8;
          width: 40px;
        }
        .title {
          font-weight: 600;
          font-size: 16px;
          color: #59a99a;
        }
      `}</style>
    </>
  );
};

export default SingleProposal;
