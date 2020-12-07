import { ethers } from 'ethers'

import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (poolContract, tokenDecimals, amount, account, onDismiss, setShowPopup, showPopup) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals))).toString())
      .send({ from: account })
      .on('transactionHash', tx => {
        console.log('transactionHash: ', tx)
        onDismiss();
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'stake' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt) {
        console.log('receipt: ', receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'stake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'stake' })
        }, 3000)
      })
      // error
      .on('error', function (error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'stake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'stake' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (poolContract, tokenDecimals, amount, account, onDismiss, setShowPopup, showPopup) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals))).toString())
      .send({ from: account })
      .on('transactionHash', tx => {
        console.log(tx)
        onDismiss();
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'unstake' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'unstake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'unstake' })
        }, 3000)
      })
      // error
      .on('error', function (error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'unstake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'unstake' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (poolContract, account, setShowPopup, showPopup) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account })
      .on('transactionHash', tx => {
        console.log(tx)
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'harvest' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'harvest' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'harvest' })
        }, 3000)
      })
      // error
      .on('error', function (error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'harvest' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'harvest' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (poolContract, account, setShowPopup, showPopup) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', tx => {
        console.log(tx)
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'harvest__withdraw' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'harvest__withdraw' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'harvest__withdraw' })
        }, 3000)
      })
      // error
      .on('error', function (error) {
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        // console.log(str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3))

        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'harvest__withdraw' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'harvest__withdraw' })
        }, 3000)
      });
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract, poolContract, account, setShowPopup, showPopup) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
    .on('transactionHash', tx => {
      console.log(tx)
      setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'approve' })
    })
    // tx 交易成功
    .on('receipt', function (receipt) {
      console.log(receipt);
      setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'approve' })
      setTimeout(() => {
        setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'approve' })
      }, 3000)
    })
    // error
    .on('error', function (error) {
      console.log('error', error)
      let str_err = JSON.stringify(error);
      let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
      setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'approve' })
      setTimeout(() => {
        setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'approve' })
      }, 3000)
    });
}

export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yam.methods.yuansScalingFactor().call())
  const earned = new BigNumber(await pool.methods.earned(account).call())
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (yam) => {
  // FORBROCK: get current YAM price
  return yam.toBigN(await yam.contracts.rebaser.methods.getCurrentExchangeRate().call())
}

export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getScalingFactor = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yam.methods.yuansScalingFactor().call())
  return scalingFactor.dividedBy(new BigNumber(10).pow(18)).toFixed(2)
}

export const getCirculatingSupply = async (yam) => {
  console.log("yam")
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yam.methods.yuansScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  let timePassed = now["timestamp"] - starttime;
  if (timePassed < 0) {
    return 0;
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  let starttimePool2 = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  timePassed = now["timestamp"] - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10 ** 36).toFixed(2)
  return circulating
}
//配置 rebase 时间轴
export const interval = 43200
//配置 rebase 时间轴
export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
    // let interval = 1800; // 12 hours
    // let offset = 300; // 8am/8pm utc
    // let secondsToRebase = 0;
    // let windowLength = 1200; // await rebaser.rebaseWindowLengthSec().call()
    let interval = 43200; // 12 hours
    let offset = 7200; // 8am/8pm utc
    let secondsToRebase = 0;
    let windowLength = 3600;
    let rebasable = false;
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
        secondsToRebase = (interval - (now % interval)) + offset;
      } else {
        secondsToRebase = offset - (now % interval);
      }
      // lastRebaseTimestampSec.add(minRebaseTimeIntervalSec) < now
      let lastRebaseTimestamp = Number(await yam.contracts.rebaser.methods.lastRebaseTimestampSec().call())
      if (now % interval >= offset && now % interval < offset + windowLength && lastRebaseTimestamp + interval < now) {
        rebasable = true;
      }
    } else {
      let twap_init = yam.toBigN(await yam.contracts.rebaser.methods.timeOfTWAPInit().call()).toNumber();
      if (twap_init > 0) {
        let delay = yam.toBigN(await yam.contracts.rebaser.methods.rebaseDelay().call()).toNumber();
        let endTime = twap_init + delay;
        if (endTime % interval > offset) {
          secondsToRebase = (interval - (endTime % interval)) + offset;
        } else {
          secondsToRebase = offset - (endTime % interval);
        }
        return endTime + secondsToRebase;
      } else {
        return now + 13 * 60 * 60; // just know that its greater than 12 hours away
      }
    }
    return new Array(secondsToRebase, rebasable)
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  return await yam.contracts.yam.methods.totalSupply().call();
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  const scalingFactor =await getScalingFactor(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
    scalingFactor
  }
}
