import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { unstake } from '../yamUtils'


const useUnstake = (poolContract: Contract, tokenContract: Contract, setShowPopup: any, showPopup: any) => {
  const { account } = useWallet()

  const handleUnstake = useCallback(async (amount: string, onDismiss, setShowPopup, showPopup) => {
    if (Number(amount) === 0 || amount === '') {
      return onDismiss()
    }


    let tokenDecimals = await tokenContract.methods.decimals().call()
    await unstake(poolContract, tokenDecimals, amount, account, onDismiss, setShowPopup, showPopup)
  }, [account, poolContract])

  return { onUnstake: handleUnstake }
}

export default useUnstake
