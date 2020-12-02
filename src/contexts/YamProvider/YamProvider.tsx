import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

// import { Yam } from '../../yam'

import { Yam } from '../../yam-sdk/lib'

export interface YamContext {
  // yam?: typeof Yam
  yam?: any
}

export const Context = createContext<YamContext>({
  yam: undefined,
})

declare global {
  interface Window {
    yamsauce: any
  }
}


const YamProvider: React.FC = ({ children }) => {
  const { ethereum, chainId, account, connect, connector, status } = useWallet()
  const [yam, setYam] = useState<any>()
  // alert(window.ethereum.isImToken);
  const signout = window.sessionStorage.getItem("SignOut")
  if (!account && (connector === null) && (status === "disconnected") && !signout) {
    connect('injected')
  }
  useEffect(() => {
    if (ethereum) {
      const yamLib = new Yam(
        ethereum,
        chainId,
        false, {
        defaultAccount: "",
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: "6000000",
        defaultGasPrice: "1000000000000",
        accounts: account,
        ethereumNodeTimeout: 10000
      }
      )
      setYam(yamLib)
      window.yamsauce = yamLib
    }
  }, [ethereum, account])

  return (
    <Context.Provider value={{ yam }}>
      {children}
    </Context.Provider>
  )
}

export default YamProvider
