import { Contract } from "ethers";
import { useState } from "react";
import Toggle from "react-toggle";
import MOCK_TOKEN_ABI from '../../contracts/MockToken.json';
import { useGlobalContext } from "../../hooks/useGlobalContext";

const ProposalActions = () => {
  const { proposalActions, setProposalActions } = useGlobalContext();
  const [contractFunctions, setContractFunctions] = useState<string[]>([]);

  const updateProposalAction = (val) => {
    const value = val.target.value;
    const [property, index] = val.target.id.split("-");
    const newActions = [...proposalActions];

    const itemToUpdate = newActions[index];

    if (val.target.type === "checkbox") {
      itemToUpdate[property] = val.target.checked;
    } else {
      itemToUpdate[property] = value;
    }

    setProposalActions(newActions);
  };

  const addProposalHandler = (e) => {
    e.preventDefault();

    const newIndex = proposalActions.length + 1;
    let newProposalActions = [...proposalActions] as ProposalAction[];

    newProposalActions.push({
      targetAddress: "",
      isProxyAddress: false,
      shouldAddValueAttribute: false,
      numberOfZeroes: 0,
      shouldAddFunctionCall: false,
      selectedFunction: "",
    });

    setProposalActions(newProposalActions);
  };

  const loadContractFunctions = (address: string) => {
    const contract = new Contract(address, MOCK_TOKEN_ABI);
    const functonFragments = contract.interface.functions;

    setContractFunctions(
      Object
        .keys(contract.interface.functions)
        .map(key => {
          const fragment = functonFragments[key];
          return fragment.name;
        })
    );
  }

  return (
    <>
      <div className="wrapper">
        <form>
          {proposalActions.map((action: ProposalAction, index) => {
            return (
              <>
                <label
                  className="form-label"
                  htmlFor="targetAddress"
                  style={{
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  {`Action ${index + 1}`}
                </label>
                <br></br>
                <div>
                  <label className="form-label" htmlFor="targetAddress">
                    Target address
                  </label>
                  <br></br>
                  <input
                    onChange={(val) => {
                      updateProposalAction(val);
                      loadContractFunctions(val.target.value);
                    }}
                    className="form-input"
                    type="text"
                    id={`targetAddress-${index}`}
                    name="targetAddress"
                  ></input>
                </div>

                <br></br>

                <label className="form-label inner-wrapper">
                  <span> Is this a proxy address?</span>
                  <Toggle
                    defaultChecked={false}
                    onChange={(val) => updateProposalAction(val)}
                    icons={false}
                    id={`isProxyAddress-${index}`}
                  />
                </label>
                <br></br>
                <label className="form-label inner-wrapper">
                  <span> Add a value attribute?</span>
                  <Toggle
                    defaultChecked={false}
                    onChange={(val) => updateProposalAction(val)}
                    icons={false}
                    id={`shouldAddValueAttribute-${index}`}
                  />
                </label>
                <br></br>
                <input
                  hidden={!action.shouldAddValueAttribute}
                  onChange={(val) => updateProposalAction(val)}
                  className="form-input"
                  type="number"
                  id={`numberOfZeroes-${index}`}
                  name="numberOfZeroes"
                  placeholder="Enter number of zeroes"
                ></input>
                <br></br>
                <label className="form-label inner-wrapper">
                  <span> Add a function call?</span>
                  <Toggle
                    defaultChecked={false}
                    onChange={(val) => updateProposalAction(val)}
                    icons={false}
                    id={`shouldAddFunctionCall-${index}`}
                  />
                </label>
                <select
                  hidden={!action.shouldAddFunctionCall}
                  onChange={(val) => updateProposalAction(val)}
                  className="form-input"
                  id={`selectedFunction-${index}`}
                  name="selectedFunction"
                >
                  {
                    contractFunctions
                      .map((functionName) => {
                        return (
                          <>
                            <option value={functionName}>{functionName}</option>
                          </>
                        )
                      })
                  }
                </select>
                <br></br>
              </>
            );
          })}
          <br></br>
          <div className="add-action">
            <img src="/svgs/plus-icon.svg" onClick={addProposalHandler} />
            <p>Add new action</p>
          </div>
        </form>
      </div>
      <style jsx>{`
        .wrapper {
          text-align: center;
        }

        form {
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 50px;
          text-align: left;
        }

        .form-checkbox {
          width: 20px;
          height: 20px;
          border: 1px solid #cacaca;
          border-radius: 10px;
          margin-left: 50%;
          margin-bottom: 30px;
        }
        .add-action {
          display: flex;
          font-weight: 500;
          font-size: 14px;
          color: #00e0b8;
          cursor: pointer;
        }

        .add-action p {
          margin-left: 15px;
        }
        .inner-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default ProposalActions;
