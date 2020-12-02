import React, { useCallback, useEffect, useState } from 'react'


import { Contract } from 'web3-eth-contract'

import { yam as yamAddress } from '../../constants/tokenAddresses'
import useYam from '../../hooks/useYam'
import { getPoolContracts } from '../../yamUtils'

import Context from './context'
import { Farm } from './types'

// (to be change)
// no_web3 定义的 数据 对象
const NO_WEB3_FOR_POOL: { [key: string]: string } = {
  USDx_USDC_pool: '',
  USDx_YUAN_pool: '',
  ETH_YUAN_pool: '',
  USDC_ETH_pool: '',
  DAI_ETH_pool: '',
  USDT_ETH_pool: '',
  USDx_ETH_pool: '',
  DF_ETH_pool: '',
  YFI_ETH_pool: '',
  YAM_ETH_pool: '',
  AMPL_ETH_pool: '',
  UNI_ETH_pool: '',
  LINK_ETH_pool: '',
  BAND_ETH_pool: '',
  YFII_ETH_pool: '',
  YUAN_ETH_pool: '',
  YUAN_USDx_pool: ''
}

const NAME_FOR_POOL: { [key: string]: string } = {
  USDx_USDC_pool: '',
  USDx_YUAN_pool: '',
  ETH_YUAN_pool: '',
}

const ICON_FOR_POOL: { [key: string]: string } = {
  USDx_USDC_pool: 'xia',
  USDx_YUAN_pool: 'shang',
  ETH_YUAN_pool: 'zhou',

  USDC_ETH_pool: 'qin',
  DAI_ETH_pool: 'qin',
  USDT_ETH_pool: 'qin',
  USDx_ETH_pool: 'qin',

  YAM_ETH_pool: 'han',
  AMPL_ETH_pool: 'han',

  DF_ETH_pool: 'tang',
  UNI_ETH_pool: 'tang',
  YFI_ETH_pool: 'tang',
  LINK_ETH_pool: 'tang',
  BAND_ETH_pool: 'tang',
  YFII_ETH_pool: 'tang',

  YUAN_ETH_pool: 'zhengcheng',
  YUAN_USDx_pool: 'zhengcheng'
}

const HREF_FOR_POOL: { [key: string]: string } = {
  USDx_USDC_pool: 'https://app.uniswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xeb269732ab75a6fd61ea60b06fe994cd32a83549',
  USDx_YUAN_pool: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/0x4A3e164684812DfB684AC36457E7fA805087c68E',
  ETH_YUAN_pool: 'https://app.uniswap.org/#/add/ETH/0x4A3e164684812DfB684AC36457E7fA805087c68E',

  USDC_ETH_pool: 'https://app.uniswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/ETH',
  DAI_ETH_pool: 'https://app.uniswap.org/#/add/0x6B175474E89094C44Da98b954EedeAC495271d0F/ETH',
  USDT_ETH_pool: 'https://app.uniswap.org/#/add/0xdAC17F958D2ee523a2206206994597C13D831ec7/ETH',
  USDx_ETH_pool: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/ETH',

  YAM_ETH_pool: 'https://app.uniswap.org/#/add/0x0AaCfbeC6a24756c20D41914F2caba817C0d8521/ETH',
  AMPL_ETH_pool: 'https://app.uniswap.org/#/add/0xD46bA6D942050d489DBd938a2C909A5d5039A161/ETH',

  DF_ETH_pool: 'https://app.uniswap.org/#/add/0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0/ETH',
  UNI_ETH_pool: 'https://app.uniswap.org/#/add/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/ETH',
  YFI_ETH_pool: 'https://app.uniswap.org/#/add/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/ETH',
  LINK_ETH_pool: 'https://app.uniswap.org/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/ETH',
  BAND_ETH_pool: 'https://app.uniswap.org/#/add/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/ETH',
  YFII_ETH_pool: 'https://app.uniswap.org/#/add/0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83/ETH',

  YUAN_ETH_pool: 'https://app.uniswap.org/#/add/ETH/0x4A3e164684812DfB684AC36457E7fA805087c68E',
  YUAN_USDx_pool: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/0x4A3e164684812DfB684AC36457E7fA805087c68E'
}

const SORT_FOR_POOL: { [key: string]: number } = {
  USDx_USDC_pool: 0,
  USDx_YUAN_pool: 1,
  ETH_YUAN_pool: 2,

  USDC_ETH_pool: 3,
  USDT_ETH_pool: 4,
  DAI_ETH_pool: 5,
  USDx_ETH_pool: 6,

  YAM_ETH_pool: 7,
  AMPL_ETH_pool: 8,

  UNI_ETH_pool: 9,
  YFI_ETH_pool: 10,
  LINK_ETH_pool: 13,
  BAND_ETH_pool: 12,
  DF_ETH_pool: 11,
  YFII_ETH_pool: 14,

  YUAN_USDx_pool: 15,
  YUAN_ETH_pool: 16
}

const Farms: React.FC = ({ children }) => {

  const [farms, setFarms] = useState<Farm[]>([])
  const yam = useYam()

  const fetchPools = useCallback(async (web3: any) => {
    let pools: any;
    if (web3) {
      pools = await getPoolContracts(yam)
    } else {
      pools = NO_WEB3_FOR_POOL
    }
    // const pools: { [key: string]: Contract } = await getPoolContracts(yam)

    const farmsArr: Farm[] = []
    const poolKeys = Object.keys(pools)
    // console.log(poolKeys)
    // console.log(pools)


    for (let i = 0; i < poolKeys.length; i++) {
      const poolKey = poolKeys[i]
      const pool = pools[poolKey]
      let tokenKey = poolKey.replace('_pool', '')
      // const method = pool.methods[tokenKey]

      try {
        let tokenAddress = web3 ? await pool.methods.uni_lp().call() : '';
        if (tokenKey.indexOf('_') !== -1) {
          tokenKey = tokenKey.replace('_', '-')
        }

        farmsArr.push({
          contract: pool,
          name: NAME_FOR_POOL[poolKey],
          depositToken: tokenKey,
          depositTokenAddress: tokenAddress,
          earnToken: 'yuan',
          earnTokenAddress: yamAddress,
          icon: ICON_FOR_POOL[poolKey],
          href_link: HREF_FOR_POOL[poolKey],
          id: tokenKey,
          sort: SORT_FOR_POOL[poolKey]
        })
      } catch (e) {
        console.log(e)
      }
    }
    farmsArr.sort((a, b) => a.sort > b.sort ? 1 : -1)
    setFarms(farmsArr)
  }, [yam, setFarms])

  useEffect(() => {
    if (yam) {
      fetchPools(true)
    } else {
      fetchPools(false)
    }
  }, [yam, fetchPools])

  return (
    <Context.Provider value={{ farms }}>
      {children}
    </Context.Provider>
  )
}

export default Farms
