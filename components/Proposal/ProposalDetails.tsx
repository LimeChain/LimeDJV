import { useGlobalContext } from "../../hooks/useGlobalContext";

const ProposalDetails = () => {
  const { proposalDetails, setProposalDetails } = useGlobalContext();

  const updateProposalDetails = (val) => {
    const value = val.target.value;
    if (val.target.id == "title") {
      setProposalDetails({
        title: value,
        description: proposalDetails.description,
      });
    }

    if (val.target.id == "description") {
      setProposalDetails({
        title: proposalDetails.name,
        description: value,
      });
    }
  };

  return (
    <>
      <div className="wrapper">
        <form>
          <label className="form-label" htmlFor="name">
            Title
          </label>
          <br></br>
          <input
            onChange={(val) => updateProposalDetails(val)}
            className="form-input"
            type="text"
            id="title"
            name="title"
          ></input>
          <br></br>
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <br></br>
          <textarea
            onChange={(val) => updateProposalDetails(val)}
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
}

export default ProposalDetails;