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
import StepBar from "../../components/StepBar";
import MOCK_TOKEN_ABI from '../../contracts/MockToken.json';
import { JointVenture } from "../../contracts/types";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useJointVentureContract from "../../hooks/useJointVentureContract";

const CreateProposal = () => {
  const router = useRouter();
  const history = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [ventureAddress, setVentureAddress] = useState<string>("");
  const { account } = useWeb3React();
  const [address, setAddress] = useState("");
  const ventureContract = useJointVentureContract(address);
  const [ventureInfo, setVentureInfo] = useState({});
  const [isModalShown, setIsModalShown] = useState(false);
  const { name } = ventureInfo;
  const jointVentureContract = useJointVentureContract(address) as JointVenture;
  const { proposalActions } = useGlobalContext();
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
        const isVoter = await ventureContract.isVoter(account);
        const isProposer = await ventureContract.isProposer(account);
        const revenueSplit = await ventureContract.getRevenueSplit(
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
    }
    setLoading(false);
  }, [ventureContract]);

  const createClickHandler = async () => {
    setLoading(true);
    const actions = proposalActions as ProposalAction[];
    actions.forEach(async (action) => {
      try {
        const contract = new Contract(action.targetAddress, MOCK_TOKEN_ABI);
        const fragment = contract.interface.getFunction(action.selectedFunction);
        const encodedData = contract.interface.encodeFunctionData(fragment);

        const tnx = await jointVentureContract.submitProposal(action.targetAddress, 0, encodedData);
        const tnxReceipt = await tnx.wait();
        setSuccess(tnxReceipt.status === 1);
      } catch (e) {
        setSuccess(false);
        console.log(e);
      } finally {
        setLoading(false);
      }
    });
  }

  const nextClickHandler = () => {
    const activeIndex = progressSteps.findIndex((step) => step.isActive);

    if (activeIndex + 1 >= progressSteps.length) {
      return;
    }

    const newSteps = [...progressSteps];
    newSteps[activeIndex].isActive = false;
    newSteps[activeIndex + 1].isActive = true;

    setProgressSteps(newSteps);
  };

  const prevClickHandler = () => {
    const activeIndex = progressSteps.findIndex((step) => step.isActive);
    console.log(activeIndex);

    if (activeIndex - 1 < 0) {
      return;
    }

    const newSteps = [...progressSteps];
    newSteps[activeIndex].isActive = false;
    newSteps[activeIndex - 1].isActive = true;

    setProgressSteps(newSteps);
  };

  useEffect(() => {
    setVentureAddress(history.query.id);
  }, [history.query]);

  return (
    <>
      <SideMenu></SideMenu>
      <Wrapper>
        <Title text={name && `My ventures > ${name} > Create proposal`} />
        {loading ? (
          <div className="loader">
            <span>Creating proposal...</span>
            <Loader />
          </div>
        ) : success && !loading ? (
          <div>
            <div className="loader">
              <span>The proposal was successfuly executed!</span>
              <Button
                label={"View"}
                onClick={() => router.push("/proposals")}
              />
            </div>
          </div>
        ) : (
          < div className="inner-wrapper">
            <div className="up">
              <StepBar
                steps={progressSteps}
                prevClickHandler={prevClickHandler}
                nextClickHandler={nextClickHandler}
              ></StepBar>
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

          .loader {
            margin: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .loader > span {
            font-weight: 600;
            font-size: 20px;
            color: #25067d;
            display: inline-block;
            margin-bottom: 60px;
          }
        `}</style>
      </Wrapper>
    </>
  )
};

export default CreateProposal;
