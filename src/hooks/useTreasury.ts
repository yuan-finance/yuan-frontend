import { useMemo } from 'react'

import {
  Treasury as TreasuryAddress,
  usdx_adress as USDX_Address,
  yam as YUAN_Address,
  oracle_address as ORACLE_address
} from '../constants/tokenAddresses'

// import usePrices from 'hooks/usePrices'
import useTokenBalance from '../hooks/useTreasuryTokenBalance'

// const treasuryAddress = '0x97990b693835da58a281636296d2bf02787dea17'

const useTreasury = () => {
  // const { yamTwap } = usePrices()
  const usdxBalance = useTokenBalance(TreasuryAddress, USDX_Address)
  const yuanBalance = useTokenBalance(TreasuryAddress, YUAN_Address)
  const oraclePrice = useTokenBalance(USDX_Address, ORACLE_address)
  // const totalYUsdValue = useMemo(() => {
  //   const yamYUsdValue = yamTwap && yamBalance ? yamTwap * yamBalance : 0
  //   return yUsdBalance ? yUsdBalance + yamYUsdValue : yamYUsdValue
  // }, [
  //   yamBalance,
  //   yamTwap,
  //   yUsdBalance,
  // ])

  return {
    // totalYUsdValue,
    usdxBalance,
    yuanBalance,
    oraclePrice,
  }
}

export default useTreasury
