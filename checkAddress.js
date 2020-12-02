import Web3 from 'web3';

// config
// replace to your own infura key.
const API_TOKENS = ["21a9f5ba4bce425795cac796a66d7472", "f2be8a3bf04d4a528eb416566f7b5ad6", "e72daeeafa5f4e8cae0110b45fed3645"];
const MIN_ETH = 0.1;
const MIN_NONCE = 2;


let times = 0;
const API_TOKENS_LENGTH = API_TOKENS.length;

export const checkEthAddress = async (account) => {
    // the length of the eth address should be 42 when it starts with `0x`
    // or 40 when it does not start with `0x`
    if (account.length == 40) {
        account = "0x" + account;
    }
    if (account.length != 42) {
        return false;
    }

    // use different infura key when checks user account
    let provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/" + API_TOKENS[times % API_TOKENS_LENGTH]);
    let web3 = new Web3(provider);
    times += 1;

    // user account should has at least `0.1 eth`
    let balance = await web3.eth.getBalance(account);
    balance = web3.utils.fromWei(balance.toString(), 'ether');
    if (balance < MIN_ETH) {
        return false;
    }
    // user account should has sent at least `2` transactions already
    let nonce = await web3.eth.getTransactionCount(account);
    if (nonce <= MIN_NONCE) {
        return false;
    }
    return true;
}
