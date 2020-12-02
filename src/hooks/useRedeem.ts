import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { redeem } from '../yamUtils'


const useRedeem = (poolContract: Contract, setShowPopup: any, showPopup: any) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    try {
      await redeem(poolContract, account, setShowPopup, showPopup)
    } catch (error) {
      console.log(error)
    }
  }, [account, poolContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem