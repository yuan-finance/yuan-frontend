import { useCallback, useState } from 'react'


const useNotify = () => {
  const [num, setNum] = useState(0)

  const handleNum = useCallback((v) => {
    // let tokenDecimals = await tokenContract.methods.decimals().call()
    // const txHash = await stake(poolContract, tokenDecimals, amount, account)
    setNum(v);
  }, [num, setNum])

  return { num, handleNum }
}

export default useNotify
