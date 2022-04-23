import { useEffect, useState } from "react";
import Button from "./Shared/Button";

export type StepBarProps = {
  // steps: {
  //   index: number;
  //   title: string;
  //   isActive: boolean;
  //   children?: any;
  // }[];
};

const StepBar = ({ steps }: StepBarProps) => {
  return (
    <>
      <div className="stepper-wrapper">
        {steps.map((step) => {
          return (
            <>
              <div
                key={step.index}
                className={`stepper-item ${
                  step.isActive ? "completed" : "active"
                }`}
              >
                <div className="step-counter">
                  <div className="inner-circle"></div>
                </div>
                <div className="step-name">{step.title}</div>
              </div>
            </>
          );
        })}
      </div>
      {/* <div className="button-wrapper"> */}

      {/* </div> */}

      <style jsx>{`
        .stepper-wrapper {
          margin-top: 50px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .stepper-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;

          // @media (max-width: 768px) {
          //   font-size: 12px;
          // }
        }

        .stepper-item::before {
          position: absolute;
          content: "";
          border-bottom: 2px solid #ccc;
          width: 100%;
          top: 20px;
          left: -50%;
          z-index: 2;
        }

        .stepper-item::after {
          position: absolute;
          content: "";
          border-bottom: 2px solid #ccc;
          width: 100%;
          top: 20px;
          left: 50%;
          z-index: 2;
        }

        .stepper-item .step-counter {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-bottom: 6px;
          border: 2px solid #cecece;
          background: #fff;
        }

        .stepper-item .step-counter .inner-circle {
          position: relative;
          z-index: 6;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-bottom: 0px;
          background: #ccc;
        }

        .stepper-item.active {
          font-weight: bold;
        }

        .stepper-item.completed .step-counter {
          border: 2px solid #04e0b8;
        }

        .stepper-item.completed .step-counter .inner-circle {
          background-color: #04e0b8;
        }

        .stepper-item.completed::after {
          position: absolute;
          content: "";
          border-bottom: 2px solid #00e0b8;
          width: 100%;
          top: 20px;
          left: 50%;
          z-index: 3;
        }

        .stepper-item:first-child::before {
          content: none;
        }
        .stepper-item:last-child::after {
          content: none;
        }
      `}</style>
    </>
  );
};

export default StepBar;
