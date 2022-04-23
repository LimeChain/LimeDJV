import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Proposers = () => {
  const { proposers, setProposers } = useGlobalContext();

  const addProposerHandler = (e: any) => {
    e.preventDefault();

    const newIndex = proposers.length + 1;
    let newProposers = [...proposers];

    newProposers.push({
      address: `address${newIndex}`,
      placeholder: `Address ${newIndex}`,
    });

    setProposers(newProposers);
  };

  const removeProposerHandler = (e: any) => {
    e.preventDefault();

    let newProposers = [...proposers];
    newProposers.pop();

    setProposers(newProposers);
  };

  const updateAddress = (val) => {
    const value = val.target.value;
    console.log(val);
    let newProposers = [...proposers];

    newProposers.map((proposer, key) => {
      if (val.target.id == key) {
        proposer.address = value;
      }
    });

    setProposers(newProposers);
    console.log(newProposers);
  };

  return (
    <>
      <div className="wrapper">
        <form>
          {proposers.map((proposer, index) => {
            return (
              <>
                {index === 0 && (
                  <>
                    <label key={index} className="form-label">Proposers</label>
                    <br></br>
                  </>
                )}
                <input
                  onChange={(val) => updateAddress(val)}
                  className="input"
                  type="text"
                  key={index}
                  id={index}
                  name={proposer.address}
                  placeholder={proposer.placeholder}
                ></input>
                <br></br>
              </>
            );
          })}
          <img src="/svgs/plus-icon.svg" onClick={addProposerHandler} />
          <img src="/svgs/trash-icon.svg" onClick={removeProposerHandler} />
        </form>
      </div>

      <style jsx>{`
        .heading {
          width: 100px;
          height: 30px;
          font-family: "Poppins", sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 17px;
          color: #25067d;
        }

        .input {
          width: 350px;
          height: 40px;
          left: 615px;
          top: 318px;
          border: 1px solid #cacaca;
          box-sizing: border-box;
          border-radius: 10px;
          margin-bottom: 15px;
        }
        .wrapper {
          text-align: center;
        }
        form {
          display: inline-block;
          margin-left: auto;
          margin-right: auto;
          text-align: left;
        }
        img {
          margin-right: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Proposers;
