import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  Treasury as TreasuryAddress,
  usdx_adress as USDX_Address,
  yam as YUAN_Address,
  oracle_address as ORACLE_address
} from '../../constants/tokenAddresses'
import { getBalance, getOraclePrice } from '../../utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [usdxBalance, setUsdxBalance] = useState<BigNumber>()
  const [yuanBalance, setYuanBalance] = useState<BigNumber>()
  const [oraclePrice, setoraclePrice] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, TreasuryAddress, USDX_Address),
      await getBalance(provider, TreasuryAddress, YUAN_Address),
      await getOraclePrice(provider, ORACLE_address, USDX_Address)
    ])
    setUsdxBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)))
    setYuanBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setoraclePrice(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setUsdxBalance,
    setYuanBalance,
    setoraclePrice
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  return (
    <Context.Provider value={{
      usdxBalance,
      yuanBalance,
      oraclePrice,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider