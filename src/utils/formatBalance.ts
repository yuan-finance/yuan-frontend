import BigNumber from 'bignumber.js'

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2)
  }
}

export const format_Balance_to_K = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  // return displayBalance

  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    // return displayBalance.toFixed(2)
    return format_num_to_K(displayBalance.toFixed(2));
  }
}

const format_num_to_K = (str_num: string) => {
  var part_a = str_num.split('.')[0];
  var part_b = str_num.split('.')[1];

  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  part_a = (part_a + '').replace(reg, '$&,');

  return part_a + '.' + part_b;
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}