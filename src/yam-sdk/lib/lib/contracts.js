import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import * as Types from "./types.js";
import { SUBTRACT_GAS_LIMIT, addressMap, addressMapJSON } from './constants.js';

import ERC20Json from '../clean_build/contracts/IERC20.json';
import YAMJson from '../clean_build/contracts/YAMDelegator.json';
import YAMRebaserJson from '../clean_build/contracts/YAMRebaser.json';
import YAMReservesJson from '../clean_build/contracts/YAMReserves.json';
import YAMGovJson from '../clean_build/contracts/GovernorAlpha.json';
import YAMGovJson_YIP003 from '../clean_build/contracts/GovernorAlpha_YIP003.json';
import YAMTimelockJson from '../clean_build/contracts/Timelock.json';
import WETHJson from './weth.json';
import UNIFactJson from './unifact2.json';
import UNIPairJson from './uni2.json';
import UNIRouterJson from './uniR.json';
import LENDPoolJson from '../clean_build/contracts/YAMLENDPool.json';


// (to be change)
import MKRPoolJson from '../clean_build/contracts/YAMMKRPool.json';
import DFPoolJson from '../clean_build/contracts/YAMDFPool.json';
import DUSDTPoolJson from '../clean_build/contracts/YAMdUSDTPool.json';

//增加 governance vote start
import YAMv2Json from '../clean_build/contracts/YAMv2.json';
import YAMv2MigrationJson from '../clean_build/contracts/YAMv2Migration.json';
import MigratorJson from "../clean_build/contracts/Migrator.json"
import YAMv3Json from "../clean_build/contracts/YAMDelegatorV3.json"
//增加 governance vote end

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.uni_pair = new this.web3.eth.Contract(UNIPairJson);
    this.uni_router = new this.web3.eth.Contract(UNIRouterJson);
    this.uni_fact = new this.web3.eth.Contract(UNIFactJson);
    this.yfi = new this.web3.eth.Contract(ERC20Json.abi);
    this.UNIAmpl = new this.web3.eth.Contract(ERC20Json.abi);
    this.ycrv = new this.web3.eth.Contract(ERC20Json.abi);
    this.yam = new this.web3.eth.Contract(YAMJson.abi);

    // 夏 商 周
    this.USDx_USDC_pool = new this.web3.eth.Contract(MKRPoolJson.abi);
    this.USDx_YUAN_pool = new this.web3.eth.Contract(DFPoolJson.abi);
    this.ETH_YUAN_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    // qin
    this.USDC_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.DAI_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.USDT_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.USDx_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    // han
    this.YAM_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.AMPL_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    // tang
    this.UNI_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.YFI_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.DF_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.LINK_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.BAND_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.YFII_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    // 远大征程
    this.YUAN_ETH_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);
    this.YUAN_USDx_pool = new this.web3.eth.Contract(DUSDTPoolJson.abi);

    this.comp = new this.web3.eth.Contract(ERC20Json.abi);
    this.link = new this.web3.eth.Contract(ERC20Json.abi);
    this.lend = new this.web3.eth.Contract(ERC20Json.abi);
    this.USDx_USDC = new this.web3.eth.Contract(ERC20Json.abi);
    this.yam_ycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi);
    // this.yam_yycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi);

    this.erc20 = new this.web3.eth.Contract(ERC20Json.abi);
    this.pool = new this.web3.eth.Contract(LENDPoolJson.abi);

    this.USDx_YUAN = new this.web3.eth.Contract(ERC20Json.abi);
    this.ETH_YUAN = new this.web3.eth.Contract(ERC20Json.abi);

    this.rebaser = new this.web3.eth.Contract(YAMRebaserJson.abi);
    this.reserves = new this.web3.eth.Contract(YAMReservesJson.abi);
    this.gov = new this.web3.eth.Contract(YAMGovJson.abi);
    this.gov003 = new this.web3.eth.Contract(YAMGovJson_YIP003.abi);
    this.timelock = new this.web3.eth.Contract(YAMTimelockJson.abi);
    this.weth = new this.web3.eth.Contract(WETHJson);

    //增加 gov vote start
    this.yamV2 = new this.web3.eth.Contract(YAMv2Json.abi);
    this.yamV2migration = new this.web3.eth.Contract(YAMv2MigrationJson.abi);

    this.yamV3 = new this.web3.eth.Contract(YAMv3Json.abi);
    this.migrator = new this.web3.eth.Contract(MigratorJson.abi);
    //增加 gov vote end

    this.setProvider(provider, networkId);
    this.setDefaultAccount(this.web3.eth.defaultAccount);
  }


  setProvider(
    provider,
    networkId
  ) {
    this.yam.setProvider(provider);
    this.rebaser.setProvider(provider);
    this.reserves.setProvider(provider);
    this.gov.setProvider(provider);
    this.gov003.setProvider(provider);
    this.timelock.setProvider(provider);

    const contracts = [
      { contract: this.yam, json: YAMJson },
      { contract: this.rebaser, json: YAMRebaserJson },
      { contract: this.reserves, json: YAMReservesJson },
      { contract: this.gov, json: YAMGovJson },
      { contract: this.gov003, json: YAMGovJson_YIP003 },
      { contract: this.timelock, json: YAMTimelockJson },

      // (to be change)
      // 夏 商 周
      { contract: this.USDx_USDC_pool, json: MKRPoolJson },
      { contract: this.USDx_YUAN_pool, json: DFPoolJson },
      { contract: this.ETH_YUAN_pool, json: DUSDTPoolJson },
      // qin
      { contract: this.USDC_ETH_pool, json: addressMapJSON.USDC_ETH },
      { contract: this.DAI_ETH_pool, json: addressMapJSON.DAI_ETH },
      { contract: this.USDT_ETH_pool, json: addressMapJSON.USDT_ETH },
      { contract: this.USDx_ETH_pool, json: addressMapJSON.USDx_ETH },
      // han
      { contract: this.YAM_ETH_pool, json: addressMapJSON.YAM_ETH },
      { contract: this.AMPL_ETH_pool, json: addressMapJSON.AMPL_ETH },
      // tang
      { contract: this.YFI_ETH_pool, json: addressMapJSON.YFI_ETH },
      { contract: this.DF_ETH_pool, json: addressMapJSON.DF_ETH },
      { contract: this.UNI_ETH_pool, json: addressMapJSON.UNI_ETH },
      { contract: this.LINK_ETH_pool, json: addressMapJSON.LINK_ETH },
      { contract: this.BAND_ETH_pool, json: addressMapJSON.BAND_ETH },
      { contract: this.YFII_ETH_pool, json: addressMapJSON.YFII_ETH },
      // 远大征程
      { contract: this.YUAN_ETH_pool, json: addressMapJSON.YUAN_ETH },
      { contract: this.YUAN_USDx_pool, json: addressMapJSON.YUAN_USDx },
    ]

    contracts.forEach(contract => this.setContractProvider(contract.contract, contract.json, provider, networkId));

    this.uni_fact.options.address = addressMap["uniswapFactoryV2"];
    this.uni_router.options.address = addressMap["UNIRouter"];
    this.USDx_USDC.options.address = addressMap["USDx_USDC"];
    this.USDx_YUAN.options.address = addressMap["USDx_YUAN"];
    this.ETH_YUAN.options.address = addressMap["ETH_YUAN"];
    this.pools = [
      // (to be change)
      // 夏 商 周
      { "tokenAddr": this.USDx_USDC.options.address, "poolAddr": this.USDx_USDC_pool.options.address },
      { "tokenAddr": this.USDx_YUAN.options.address, "poolAddr": this.USDx_YUAN_pool.options.address },
      { "tokenAddr": this.ETH_YUAN.options.address, "poolAddr": this.ETH_YUAN_pool.options.address },
      // qin
      { "tokenAddr": this.USDC_ETH_pool.options.address, "poolAddr": this.USDC_ETH_pool.options.address },
      { "tokenAddr": this.DAI_ETH_pool.options.address, "poolAddr": this.DAI_ETH_pool.options.address },
      { "tokenAddr": this.USDT_ETH_pool.options.address, "poolAddr": this.USDT_ETH_pool.options.address },
      { "tokenAddr": this.USDx_ETH_pool.options.address, "poolAddr": this.USDx_ETH_pool.options.address },
      // han
      { "tokenAddr": this.YAM_ETH_pool.options.address, "poolAddr": this.YAM_ETH_pool.options.address },
      { "tokenAddr": this.AMPL_ETH_pool.options.address, "poolAddr": this.AMPL_ETH_pool.options.address },
      // tang
      { "tokenAddr": this.YFI_ETH_pool.options.address, "poolAddr": this.YFI_ETH_pool.options.address },
      { "tokenAddr": this.DF_ETH_pool.options.address, "poolAddr": this.DF_ETH_pool.options.address },
      { "tokenAddr": this.UNI_ETH_pool.options.address, "poolAddr": this.UNI_ETH_pool.options.address },
      { "tokenAddr": this.LINK_ETH_pool.options.address, "poolAddr": this.LINK_ETH_pool.options.address },
      { "tokenAddr": this.BAND_ETH_pool.options.address, "poolAddr": this.BAND_ETH_pool.options.address },
      { "tokenAddr": this.YFII_ETH_pool.options.address, "poolAddr": this.YFII_ETH_pool.options.address },
      // 远大征程
      { "tokenAddr": this.YUAN_ETH_pool.options.address, "poolAddr": this.YUAN_ETH_pool.options.address },
      { "tokenAddr": this.YUAN_USDx_pool.options.address, "poolAddr": this.YUAN_USDx_pool.options.address },
    ]

    this.names = {};
    this.names[this.yam.options.address] = "YAMv1";
    this.names[this.rebaser.options.address] = "Rebaser";
    this.names[this.reserves.options.address] = "Reserves";
    this.names[this.gov.options.address] = "Previous Governor";
    this.names[this.gov003.options.address] = "Previous Governor";
    this.names[this.timelock.options.address] = "Timelock Governance";
    this.names[this.migrator.options.address] = "Migrator";
  }

  setDefaultAccount(account) {
    this.yfi.options.from = account;
    this.ycrv.options.from = account;
    this.yam.options.from = account;
    this.weth.options.from = account;
  }

  async callContractFunction(method, options) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const { from, value } = options;
          const to = method._parent._address;
          error.transactionData = { from, value, data, to };
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return { gasEstimate, g };
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = '0';
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          promi.on('transactionHash', (txHash) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.RESOLVED;
              resolve(txHash);
              if (t !== Types.ConfirmationType.Both) {
                const anyPromi = promi;
                anyPromi.off();
              }
            }
          });
        },
      );
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (
              (t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED)
              && confirmationOutcome === OUTCOMES.INITIAL
            ) {
              confirmationOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          const desiredConf = confirmations || this.defaultConfirmations;
          if (desiredConf) {
            promi.on('confirmation', (confNumber, receipt) => {
              if (confNumber >= desiredConf) {
                if (confirmationOutcome === OUTCOMES.INITIAL) {
                  confirmationOutcome = OUTCOMES.RESOLVED;
                  resolve(receipt);
                  const anyPromi = promi;
                  anyPromi.off();
                }
              }
            });
          } else {
            promi.on('receipt', (receipt) => {
              confirmationOutcome = OUTCOMES.RESOLVED;
              resolve(receipt);
              const anyPromi = promi;
              anyPromi.off();
            });
          }
        },
      );
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash };
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(
    method,
    options
  ) {
    const m2 = method;
    const { blockNumber, ...txOptions } = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest');
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(
    contract,
    contractJson,
    provider,
    networkId,
  ) {
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId]
        && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
