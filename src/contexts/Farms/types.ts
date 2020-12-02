import { Contract } from "web3-eth-contract"

export interface Farm {
  contract: Contract,
  name: string,
  depositToken: string,
  depositTokenAddress: string,
  earnToken: string,
  earnTokenAddress: string,
  icon: string,
  id: string,
  sort: number,
  href_link?: string
}

export interface FarmsContext {
  farms: Farm[]
}