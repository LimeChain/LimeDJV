import React from "react";
import Button from "./Button";

const Modal = ({ title, description, show = false, onSubmit, handleClose }:any) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="close-button">
            <img
              className="close-icon"
              src="/svgs/close.svg"
              onClick={handleClose}
            />
          </div>
          <div className="content">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
          </div>
          <div className="button-wrapper">
            <Button
              color="purple"
              size="sm"
              label="Yes"
              onClick={onSubmit}
            ></Button>
            <Button
              color="gray"
              size="sm"
              label="Close"
              onClick={handleClose}
            ></Button>
          </div>
        </section>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 9999;
        }

        .modal-main {
          padding: 20px;
          position: fixed;
          background: white;
          width: 50%;
          height: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 16px;
        }

        .button-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }

        .close-button {
          display: flex;
          justify-content: flex-end;
        }

        .close-icon {
          cursor: pointer;
        }

        .title {
          font-weight: 600;
          font-size: 20px;
          text-align: center;
          color: #25067d;
        }

        .description {
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          color: #7f72a2;
        }

        .content {
          text-align: center;
          padding: 20px;
          margin: 20px;
          border-radius: 16px;
          background: #faf9ff;
        }

        .display-block {
          display: block;
        }

        .display-none {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Modal;
