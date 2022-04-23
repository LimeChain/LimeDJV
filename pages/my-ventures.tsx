import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Shared/Button";
import Loader from "../components/Shared/Loader";
import Modal from "../components/Shared/Modal";
import SideMenu from "../components/Shared/SideMenu";
import Title from "../components/Shared/Title";
import Wrapper from "../components/Shared/Wrapper";
import StepBar, { StepBarProps } from "../components/StepBar";
import VentureCard from "../components/VentureCard";
import { NETWORK_CONFIG } from "../config/network";
import useFactoryContract from "../hooks/useFactoryContract";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { mappingChainIdConfig } from "../utils";

const MyVentures = () => {
  const [isModalShow, setIsModalShown] = useState(false);
  const { account, library, chainId } = useWeb3React();
  const router = useRouter();
  const [myVentures, setMyVentures] = useState([]);
  const { isWalletConnected } = useGlobalContext();
  const factoryContract = useFactoryContract();

  const onSubmit = () => {
    setIsModalShown(true);
    console.log("SUBMITTED");
  };

  useEffect(() => {
    const loadVentures = async () => {
      setMyVentures([])
    

      if (!account) return;
      if (!isWalletConnected) return;
      const instantiations = await factoryContract.getInstantiations(account);
      setMyVentures(instantiations);
    };
    loadVentures();
  }, [account, library, isWalletConnected]);

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
          {myVentures.map((venture) => {
            return (
              <VentureCard
                onClick={() => router.push(`/active-ventures/${venture}`)}
                address={venture}
              />
            );
          })}
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
