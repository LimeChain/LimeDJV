import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/Shared/Button";
import Loader from "../components/Shared/Loader";
import SideMenu from "../components/Shared/SideMenu";
import Title from "../components/Shared/Title";
import Wrapper from "../components/Shared/Wrapper";
import StepBar from "../components/StepBar";

const CreateVenture = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progressSteps, setProgressSteps] = useState([
    {
      index: 0,
      title: "Venture details",
      isActive: true,
      children: "",
    },
    {
      index: 1,
      title: "Voters",
      isActive: false,
      children: "",
    },
    {
      index: 2,
      title: "Proposers",
      isActive: false,
      children: "",
    },
    {
      index: 3,
      title: "Review",
      isActive: false,
      children: "",
    },
  ]);

  const nextClickHandler = () => {
    const activeIndex = progressSteps.findIndex((step) => step.isActive);
    console.log(activeIndex);

    if (activeIndex + 1 >= progressSteps.length) {
      return;
    }

    const newSteps = [...progressSteps];
    newSteps[activeIndex].isActive = false;
    newSteps[activeIndex + 1].isActive = true;

    setProgressSteps(newSteps);
  };

  const prevClickHandler = () => {
    const activeIndex = progressSteps.findIndex((step) => step.isActive);
    console.log(activeIndex);

    if (activeIndex - 1 < 0) {
      return;
    }

    const newSteps = [...progressSteps];
    newSteps[activeIndex].isActive = false;
    newSteps[activeIndex - 1].isActive = true;

    setProgressSteps(newSteps);
  };

  const createClickHandler = async () => {
    
  };

  return (
    <>
      <SideMenu></SideMenu>
      <Wrapper>
        <Title text="Create joint venture" />
        {loading ? (
          <div className="loader">
            <span>Deploying the joint venture contract...</span>
            <Loader />
          </div>
        ) : success && !loading ? (
          <div>
            <div className="loader">
              <span>The joint venture was successfully deployed!</span>
              <Button
                label={"View"}
                onClick={() => router.push("/my-ventures")}
              />
            </div>
          </div>
        ) : (
          <div className="inner-wrapper">
            <div className="up">
              <StepBar
                steps={progressSteps}
                prevClickHandler={prevClickHandler}
                nextClickHandler={nextClickHandler}
              ></StepBar>
              <div className="steps-wrapper">
                {progressSteps.map((step) => {
                  return <div hidden={!step.isActive}>{step.children}</div>;
                })}
              </div>
            </div>
            <div className="buttons down">
              <Button
                className="margin-left"
                onClick={prevClickHandler}
                label="Prev"
                color="transparent"
              ></Button>
              {progressSteps[progressSteps.length - 1].index ==
              progressSteps.findIndex((step) => step.isActive) ? (
                <Button
                  className="margin-right"
                  onClick={createClickHandler}
                  label="Create"
                ></Button>
              ) : (
                <Button
                  className="margin-right"
                  onClick={nextClickHandler}
                  label="Next"
                ></Button>
              )}
            </div>
          </div>
        )}

        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: auto auto auto auto;
            grid-row-gap: 75px;
          }
          .inner-wrapper {
            display: flex;
            flex-direction: column;
            height: 90%;
          }
          .steps-wrapper {
            width: 70%;
            margin: 50px auto 0;
          }
          .buttons {
            display: flex;
            text-align: center;
            margin: 0 auto;
            justify-content: space-between;
            width: 100%;
          }

          .up {
            flex: 1;
          }
          .down {
            flex: none;
          }
          .loader {
            margin: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .loader > span {
            font-weight: 600;
            font-size: 20px;
            color: #25067d;
            display: inline-block;
            margin-bottom: 60px;
          }
        `}</style>
      </Wrapper>
    </>
  );
};

export default CreateVenture;
