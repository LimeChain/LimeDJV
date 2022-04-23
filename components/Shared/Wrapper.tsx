import React from "react";

const Wrapper = ({ children }) => {
  return (
    <>
      <div className="wrapper">{children}</div>
      <style jsx>{`
        .wrapper {
          padding: 30px 20px 30px 20px;
        }
      `}</style>
    </>
  );
};

export default Wrapper;
