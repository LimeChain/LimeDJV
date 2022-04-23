import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProposalActions from "../../components/Proposal/ProposalActions";
import ProposalDetails from "../../components/Proposal/ProposalDetails";
import ProposalReview from "../../components/Proposal/ProposalReview";
import Button from "../../components/Shared/Button";
import Loader from "../../components/Shared/Loader";
import SideMenu from "../../components/Shared/SideMenu";
import Title from "../../components/Shared/Title";
import Wrapper from "../../components/Shared/Wrapper";

const CreateProposal = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [ventureInfo, setVentureInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { name } = ventureInfo;
  const [progressSteps, setProgressSteps] = useState([
    {
      index: 0,
      title: "Proposal details",
      isActive: true,
      children: <ProposalDetails></ProposalDetails>,
    },
    {
      index: 1,
      title: "Actions",
      isActive: false,
      children: <ProposalActions></ProposalActions>,
    },
    {
      index: 2,
      title: "Review",
      isActive: false,
      children: <ProposalReview></ProposalReview>,
    },
  ]);

  return (
    <>
      <SideMenu></SideMenu>
      <Wrapper>
        <Title text={name && `My ventures > ${name} > Create proposal`} />
        {loading ? (
          <div className="loader">
            <span>Deploying the joint venture contract...</span>
            <Loader />
          </div>
        ) : success && !loading ? (
          <div>
            <div className="loader">
              <span>The joint venture was successfully deployed!</span>
              <Button
                label={"View"}
                onClick={() => router.push("/proposals")}
              />
            </div>
          </div>
        ) : (
          < div className="inner-wrapper">
            <div className="up">
              {/* // Step Bar */}
              <div className="steps-wrapper">
                {progressSteps.map((step) => {
                  return <div hidden={!step.isActive}>{step.children}</div>;
                })}
              </div>
            </div>
            <div className="buttons down">
              <Button
                className="margin-left"
                onClick={prevClickHandler}
                label="Prev"
              ></Button>
              {progressSteps[progressSteps.length - 1].index ==
                progressSteps.findIndex((step) => step.isActive) ? (
                <Button
                  className="margin-right"
                  onClick={createClickHandler}
                  label="Create"
                ></Button>
              ) : (
                <Button
                  className="margin-right"
                  onClick={nextClickHandler}
                  label="Next"
                ></Button>
              )}
            </div>
          </div>
        )}

        < style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: auto auto auto auto;
            grid-row-gap: 75px;
          }
          .inner-wrapper {
            display: flex;
            flex-direction: column;
            height: 90%;
          }
          .steps-wrapper {
            width: 70%;
            margin: 0 auto;
          }
          .buttons {
            display: flex;
            text-align: center;
            margin: 0 auto;
            justify-content: space-between;
            width: 100%;
          }

          .up {
            flex: 1;
          }
          .down {
            flex: none;
          }
        `}</style>
      </Wrapper>
    </>
  )
};

export default CreateProposal;
