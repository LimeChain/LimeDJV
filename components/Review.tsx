import { useGlobalContext } from "../hooks/useGlobalContext";

const Review = () => {
  const { ventureDetails, voters, proposers } = useGlobalContext();

  return (
    <>
      <div className="wrapper">
        <div className="inner-wrapper">
          <div className="label">Name</div>
          <p id="name">{ventureDetails.name}</p>
        </div>

        <div className="inner-wrapper">
          <div className="label">Description</div>
          <p id="description">{ventureDetails.description}</p>
        </div>

        <div className="inner-wrapper">
          <div className="label">Voters</div>
          <div>
            <p id="voters">{voters.address1}</p>
            <p id="voters">{voters.address2}</p>
          </div>
        </div>

        <div className="inner-wrapper">
          <div className="label">Proposers</div>
          <div>
            {proposers.map((proposer, index) => {
              return <p key={index} id="proposers">{proposer.address}</p>;
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 80%;
        }
        .inner-wrapper {
          display: grid;
          grid-template-columns: 180px auto;
          margin-bottom: 20px;
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
        }
      `}</style>
    </>
  );
};

export default Review;
