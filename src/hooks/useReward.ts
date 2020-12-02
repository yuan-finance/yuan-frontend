import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"

import { harvest } from '../yamUtils'

const useReward = (poolContract: Contract, setShowPopup: any, showPopup: any) => {
  const { account } = useWallet()

  const handleReward = useCallback(async () => {
    await harvest(poolContract, account, setShowPopup, showPopup)
  }, [account, poolContract])

  return { onReward: handleReward }
}

export default useReward
