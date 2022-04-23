import { Contract } from "ethers";
import { useState } from "react";
import Toggle from "react-toggle";
import MOCK_TOKEN_ABI from "../../contracts/MockToken.json";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { ProposalAction } from "../../types";

export interface FunctionParam {
  name: string;
  value: any;
}

const ProposalActions = () => {
  const { proposalActions, setProposalActions } = useGlobalContext();
  const [contractFunctions, setContractFunctions] = useState<string[]>([]);
  const [functionInputs, setFunctionInputs] = useState([]);
  const [parameterValues, setParameterValues] = useState<FunctionParam[]>([]);

  const updateFunctionParam = (actionIndex, paramName, event) => {
    event.preventDefault();

    const value = event.target.value;
    const index = parameterValues.findIndex(param => param.name == paramName);

    const newParamValues = [...parameterValues];

    if (index > -1) {
      newParamValues[index].value = value;
    } else {
      newParamValues.push({
        name: paramName,
        value
      })
    }

    const newActions = [...proposalActions] as ProposalAction[];
    newActions[actionIndex].functionParams = newParamValues;

    setParameterValues(newParamValues);
    setProposalActions(newActions);
  }

  const updateProposalAction = (event) => {
    event.preventDefault();

    const value = event.target.value;
    const [property, index] = event.target.id.split("-");
    const newActions = [...proposalActions] as ProposalAction[];

    console.log(proposalActions);

    const itemToUpdate = newActions[index];

    if (event.target.type === "checkbox") {
      itemToUpdate[property] = event.target.checked;
    } else {
      itemToUpdate[property] = value;
    }

    itemToUpdate.functionParams = functionInputs;
    setProposalActions(newActions);
  };

  const addProposalHandler = (e) => {
    e.preventDefault();

    let newProposalActions = [...proposalActions] as ProposalAction[];

    newProposalActions.push({
      targetAddress: "",
      isProxyAddress: false,
      shouldAddValueAttribute: false,
      numberOfZeroes: 0,
      shouldAddFunctionCall: false,
      selectedFunction: "",
      functionParams: []
    });

    setProposalActions(newProposalActions);
  };

  const loadContractFunctions = (address: string) => {
    const contract = new Contract(address, MOCK_TOKEN_ABI);
    const functionFragments = contract.interface.functions;

    setContractFunctions(
      Object
        .keys(functionFragments)
        .map(key => functionFragments[key].name));
  }

  const loadFunctionInputs = (address, functionName: string) => {
    const contract = new Contract(address, MOCK_TOKEN_ABI);
    const functionFragment = contract.interface.getFunction(functionName);
    const inputs = functionFragment.inputs.map(input => {
      return `${input.type} ${input.name}`;
    });

    setFunctionInputs(inputs);
    setParameterValues(inputs.map(input => { return { name: input, value: '' } }));
  }

  return (
    <>
      <div className="wrapper">
        <form>
          {proposalActions.map((action: ProposalAction, actionIndex) => {
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
                  {`Action ${actionIndex + 1}`}
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
                    id={`targetAddress-${actionIndex}`}
                    name="targetAddress"
                  ></input>
                </div>

                <br></br>

                <label className="form-label inner-wrapper">
                  <span> Add a function call?</span>
                  <Toggle
                    defaultChecked={false}
                    onChange={(val) => {
                      updateProposalAction(val);
                    }}
                    icons={false}
                    id={`shouldAddFunctionCall-${actionIndex}`}
                  />
                </label>
                <select
                  hidden={!action.shouldAddFunctionCall}
                  onChange={(val) => {
                    setFunctionInputs([]);
                    setParameterValues([]);
                    updateProposalAction(val);
                    loadFunctionInputs(action.targetAddress, val.target.value);
                  }}
                  className="form-input"
                  id={`selectedFunction-${actionIndex}`}
                  name="selectedFunction"
                >
                  {contractFunctions.map((functionName) => {
                    return (
                      <>
                        <option value={functionName}>{functionName}</option>
                      </>
                    );
                  })}
                </select>
                <br></br>
                {
                  functionInputs.map(input => {
                    return (
                      <>
                        <input
                          hidden={!action.shouldAddFunctionCall}
                          onInput={(e) => updateFunctionParam(actionIndex, input, e)}
                          className="form-input"
                          type="text"
                          id={input}
                          name={input}
                          placeholder={input}
                        ></input>
                        <br></br>
                      </>
                    )
                  })
                }
              </>
            );
          })}
          <br></br>
          {!proposalActions.length && (
            <div className="add-action">
              <img src="/svgs/plus-icon.svg" onClick={addProposalHandler} />
              <p>Add new action</p>
            </div>
          )}
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
