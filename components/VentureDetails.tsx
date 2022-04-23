import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const VentureDetails = () => {
  const { ventureDetails, setVentureDetails } = useGlobalContext();

  const updateDescription = (val) => {
    const value = val.target.value;
    if (val.target.id == "name") {
      setVentureDetails({
        name: value,
        description: ventureDetails.description,
      });
    }

    if (val.target.id == "description") {
      setVentureDetails({
        name: ventureDetails.name,
        description: value,
      });
    }
  };

  return (
    <>
      <div className="wrapper">
        <form>
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <br></br>
          <input
            onChange={(val) => updateDescription(val)}
            className="form-input"
            type="text"
            id="name"
            name="name"
          ></input>
          <br></br>
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <br></br>
          <textarea
            onChange={(val) => updateDescription(val)}
            className="textarea-input"
            id="description"
          ></textarea>
          <br></br>
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
          text-align: left;
        }
      `}</style>
    </>
  );
};

export default VentureDetails;
