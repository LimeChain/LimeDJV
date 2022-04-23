import React from "react";

const Wrapper = ({ children }) => {
  return (
    <>
      <div className="wrapper">{children}</div>
      <style jsx>{`
        .wrapper {
          padding: 58px 70px 50px 60px;
        }
      `}</style>
    </>
  );
};

export default Wrapper;
