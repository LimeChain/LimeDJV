import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Button from "../components/Shared/Button";
import Modal from "../components/Shared/Modal";
import SideMenu from "../components/Shared/SideMenu";
import Title from "../components/Shared/Title";
import Wrapper from "../components/Shared/Wrapper";

const MyVentures = () => {
  const [isModalShow, setIsModalShown] = useState(false);
  const { account } = useWeb3React();
  const router = useRouter();

  const onSubmit = () => {
    setIsModalShown(true);
    console.log("SUBMITTED");
  };

  return (
    <>
      <Modal
        title="Do you want to continue"
        description="Lorem ipsum..."
        show={isModalShow}
        handleClose={() => {
          setIsModalShown(false);
        }}
        onSubmit={onSubmit}
      ></Modal>
      <SideMenu></SideMenu>
      <Wrapper>
        <Title text="My ventures" />
        <Button
          disabled={!account}
          size="sm"
          className="margin-bottom"
          label="Create venture"
          onClick={() => {
            router.push("/create-venture");
          }}
        ></Button>
        <div className="grid">
          {/* TODO: show ventures */}
        </div>
        <style jsx>{`
          .grid {
            display: flex;
            flex-wrap: wrap;
          }
          .loader {
            margin: 0 auto;
          }
        `}</style>
      </Wrapper>
    </>
  );
};

export default MyVentures;
