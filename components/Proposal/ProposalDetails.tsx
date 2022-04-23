import { useGlobalContext } from "../../hooks/useGlobalContext";

const ProposalDetails = () => {
  const { proposalDetails, setProposalDetails }:any = useGlobalContext();

  const updateProposalDetails = (e:any) => {
    const value = e.target.value;
    const key = e.target.id;

    const proposalDetailsClone = { ...proposalDetails.proposalDetails };

    const state = {
      ...proposalDetailsClone,
      [key]: value,
    };

    setProposalDetails({
      ...proposalDetails,
      proposalDetails: state,
    });
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
};

export default ProposalDetails;
