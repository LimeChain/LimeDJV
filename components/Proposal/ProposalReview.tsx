import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ProposalAction } from "../../types";
import { FunctionParam } from "./ProposalActions";

const ProposalReview = () => {
  const { proposalDetails, proposalActions }: any = useGlobalContext();
  console.log(proposalDetails);

  const details = proposalDetails.proposalDetails;

  return (
    <>
      <div className="wrapper">
        <div className="inner-wrapper">
          <div className="label">Title</div>
          <p id="name">{details.title}</p>
        </div>

        <div className="inner-wrapper">
          <div className="label">Description</div>
          <p id="description">{details.description}</p>
        </div>

        <div className="inner-wrapper" style={{ flexWrap: "wrap" }}>
          {proposalActions.map((action: ProposalAction, index: any) => {
            return (
              <>
                <div className="inner-wrapper">
                  <div className="label">{`Action ${index + 1}`}</div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <div className="label">Target</div>
                      <p id="targetAddress">{action.targetAddress}</p>
                    </div>
                    {action.functionParams.map((param: FunctionParam) => {
                      return (
                        <>
                          <div style={{ display: "flex" }}>
                            <div className="label">{param.name}</div>
                            <p id="valueAttribute">{param.value}</p>
                          </div>
                        </>
                      );
                    })}
                    {/* <div style={{ display: "flex" }}>
                      <div className="label">Value attribute</div>
                      <p id="valueAttribute">{`${action.numberOfZeroes} zeroes`}</p>
                    </div> */}
                    <div style={{ display: "flex" }}>
                      <div className="label">Function call</div>
                      <p id="functionCall">{action.selectedFunction}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 80%;
        }
        .inner-wrapper {
          display: flex;
          min-width: 500px;
          margin-bottom: 30px;
        }
        p {
          font-weight: 500;
          font-size: 15px;
          color: #25067d;
          margin: 0;
          padding: 0;
        }
        .label {
          font-weight: 500;
          font-size: 14px;
          color: #7f72a2;
          min-width: 90px;
          margin-right: 100px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default ProposalReview;
