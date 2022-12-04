import { ethers } from "ethers";
import CONTRACT from "../../contracts/Prime.json";
import CONTRACT2 from "../../contracts/Upbox.json";
import Web3Modal from "web3modal";
import {
  createUser,
  updateUserProfile,
  getUserDetails,
  checkIfUserExists,
  createNewAdd,
  joinReferral,
} from "./database";
import { async } from "@firebase/util";
import { Web3Storage } from "web3.storage";
import linkCreator from "../../utils/linkCreator";

const toFixed_norounding = (n, p) => {
  var result = n.toFixed(p);
  return result <= n ? result : (result - Math.pow(0.1, p)).toFixed(p);
};

const providerOptions = {
  /* See Provider Options Section */
};

const getProvider = async () => {
  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();
  const accounts = await instance.request({ method: "eth_accounts" });

  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
};

const getAddress = async () => {
  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();
  const accounts = await instance.request({ method: "eth_accounts" });

  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x13881",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        chainName: "Matic Mumbai",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ],
  });

  return accounts[0];
};

const getSigner = async () => {
  const provider = await getProvider();
  return provider.getSigner();
};

const connect = async () => {
  var data = {};
  var address = await getAddress();
  // const condition = await checkIfUserExists(address);
  // if (!condition) await createUser(address);
  // data = await getUserData();
  const balances = await getBalances();
  // data.details.tokenBalance = balances.tokenBalance;
  // data.details.ethBalance = balances.ethBalance;

  const files = await getAllFiles();

  data.tokenBalance = balances.tokenBalance;
  data.ethBalance = balances.ethBalance;
  data.address = address;
  data.files = files;
  return data;
};

const getContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CONTRACT.abi,
    signer
  );
  return contract;
};

const getContract2 = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2,
    CONTRACT2.abi,
    signer
  );
  return contract;
};

//User Auth Functions
const updateUser = async (username, about, profilePic) => {
  const user = await getAddress();
  await updateUserProfile(username, about, profilePic, user);
};

const getUserData = async () => {
  const address = await getAddress();
  const user = await getUserDetails(address);
  return user;
};

const getBalances = async () => {
  const address = await getAddress();
  const contract = await getContract();

  var tokenBalance = await contract.balanceOf(address);
  var ethBalance = await contract.getEthBalance(address);

  tokenBalance = tokenBalance / 10 ** 18;
  tokenBalance = toFixed_norounding(tokenBalance, 3);

  ethBalance = ethBalance / 10 ** 18;
  ethBalance = toFixed_norounding(ethBalance, 3);

  return {
    tokenBalance,
    ethBalance,
  };
};

const buyTokens = async (eth) => {
  var ethAmount = eth.toString();
  const contract = await getContract();

  let txn = await contract.buyTokens({
    value: ethers.utils.parseEther(ethAmount),
  });
  await txn.wait();
};

const updatedBalance = async (user) => {
  var data;
  data = user;
  const balances = await getBalances();
  data.tokenBalance = balances.tokenBalance;
  data.ethBalance = balances.ethBalance;
  return data;
};

const userRefresh = async () => {
  var data;
  data = await getUserData();
  const balances = await getBalances();
  data.tokenBalance = balances.tokenBalance;
  data.ethBalance = balances.ethBalance;
  return data;
};

//Main functions
const startNewAd = async (amount, title, link) => {
  const address = await getAddress();
  const contract = await getContract2();
  const tokenContract = await getContract();

  await tokenContract.approve(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS2,
    ethers.utils.parseEther(amount.toString())
  );
  let txn = await contract.startAd(amount, title, link);
  await txn.wait();
  const details = {
    amount,
    title,
    link,
    owner: address,
    maxClicks: amount * 10,
    clicks: 0,
    participants: {},
    allRefered: [],
  };

  await createNewAdd(details, address);
};

const registerReferal = async (id) => {
  const address = await getAddress();
  await joinReferral(address, id);
};

const getFileData = async (tokens) => {
  const contract = await getContract2();

  const data = [];
  for (var i = 0; i < tokens.length; i++) {
    const tokenUri = await contract.tokenURI(Number(tokens[i]));
    fetch(tokenUri)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        data.push(resp);
      });
  }
  return data;
};

const getAllFiles = async () => {
  const address = await getAddress();
  const contract = await getContract2();

  const allPublicTokens = await contract.getAllPublicTokens();
  const myPublicTokens = await contract.getMyPublicTokens();
  const myPrivateTokens = await contract.getMyPrivateTokens();
  const myRecievedTokens = await contract.getMyRecievedTokens();

  const allPublic = await getFileData(allPublicTokens);
  const userPublic = await getFileData(myPublicTokens);
  const userPrivate = await getFileData(myPrivateTokens);
  const userRecieved = await getFileData(myRecievedTokens);

  const fileData = {
    allPublic,
    userPublic,
    userPrivate,
    userRecieved,
  };

  return fileData;
};

const storeFiles = async (files, description, status) => {
  const contract = await getContract2();

  const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN;
  const client = new Web3Storage({ token });
  const cid = await client.put(files);
  const link = linkCreator(cid, files[0].name);
  const file = {
    name: files[0].name,
    url: link,
    description: description,
    access: status ? "private" : "public",
  };
  const fileToUpload = JSON.stringify(file);
  let txn = await contract.uploadFile(fileToUpload, status);
  await txn.wait();
};

const shareFiles = async (to, token) => {};

export {
  getProvider,
  connect,
  updateUser,
  getUserData,
  getAddress,
  getBalances,
  buyTokens,
  storeFiles,
  getContract2,
};
