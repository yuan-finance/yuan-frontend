import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'


const useGet__decimals = (tokenContract: any, token_address: string) => {
  const [decimals, setDecimals] = useState(18);
  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const fetchBalance = useCallback(async () => {
    if (token_address) {
      const decimals = await tokenContract.methods.decimals().call();
      // console.log(decimals)
      setDecimals(decimals)
    }
  }, [account, ethereum, token_address])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
      let refreshInterval = setInterval(fetchBalance, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [account, ethereum, setDecimals, token_address])

  return decimals
}


export default useGet__decimals