import Web3 from 'web3'


export const getAPYContract = async (provider, abi, networks, chainId, pool_contract) => {
  // return '123'
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, networks[chainId].address)

  let bn_apy = {};
  try {
    bn_apy = await contract.methods.calcuateApy(pool_contract._address).call()
  } catch (error) {
    bn_apy[0] = '0';
  }
  // console.log(bn_apy);
  return bn_apy[0];
}

