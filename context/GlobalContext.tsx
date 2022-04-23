import { Web3ReactProvider } from "@web3-react/core";
import React, { createContext, useState } from "react";
import getLibrary from "../getLibrary";

const initialState: AppContext = {
  
}

export const GlobalContext = createContext<AppContext>(
  initialState as AppContext
);

export const UpdateGlobalContext = createContext<UpdateAppContext>({
  
});

export function GlobalProvider({
  children,
}: {
  children?: React.ReactChild | React.ReactChild[];
}) {
  
  );

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalContext.Provider
        value={{
         
        }}
      >
        <UpdateGlobalContext.Provider
          value={{
            
          }}
        >
          {children}
        </UpdateGlobalContext.Provider>
      </GlobalContext.Provider>
    </Web3ReactProvider>
  );
}
