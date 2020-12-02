import { useCallback, useState } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"

import { stake } from '../yamUtils'

const useStake = (poolContract: Contract, tokenContract: Contract, setShowPopup: any, showPopup: any) => {
  const { account } = useWallet();

  const handleStake = useCallback(async (amount: string, onDismiss, setShowPopup, showPopup) => {
    if (Number(amount) === 0 || amount === '') {
      return onDismiss()
    }

    let tokenDecimals = await tokenContract.methods.decimals().call()
    await stake(poolContract, tokenDecimals, amount, account, onDismiss, setShowPopup, showPopup)
  }, [account, poolContract])

  return { onStake: handleStake }
}

export default useStake
