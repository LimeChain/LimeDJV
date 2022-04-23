import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 16px solid #00e0b8;
          border-radius: 50%;
          border-top: 16px solid #d7fff8;
          width: 90px;
          height: 90px !important;
          -webkit-animation: spin 2s linear infinite; /* Safari */
          animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
