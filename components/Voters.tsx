import { useGlobalContext } from "../hooks/useGlobalContext";

const Voters = () => {
  const { voters, setVoters } = useGlobalContext();

  const updateAddress = (val) => {
    const value = val.target.value;
    if (val.target.id == "address1") {
      setVoters({
        address1: value,
        address2: voters.address2,
      });
    }

    if (val.target.id == "address2") {
      setVoters({
        address1: voters.address1,
        address2: value,
      });
    }
  };

  return (
    <>
      <div className="wrapper">
        <form>
          <label className="form-label">Voters</label>
          <br />
          <input
            onChange={(val) => updateAddress(val)}
            className="form-input"
            type="text"
            id="address1"
            name="address1"
            placeholder="Address 1"
          ></input>
          <br></br>
          <input
            onChange={(val) => updateAddress(val)}
            className="form-input"
            type="text"
            id="address2"
            name="address2"
            placeholder="Address 2"
          ></input>
          <br></br>
        </form>
      </div>

      <style jsx>
        {`
          .wrapper {
            text-align: center;
          }
          form {
            display: inline-block;
            margin-left: auto;
            margin-right: auto;
            text-align: left;
          }
        `}
      </style>
    </>
  );
};

export default Voters;
