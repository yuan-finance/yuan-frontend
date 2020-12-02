import BigNumber from 'bignumber.js'

export interface ContextValues {
  usdxBalance?: BigNumber,
  yuanBalance?: BigNumber,
  oraclePrice?: BigNumber
}