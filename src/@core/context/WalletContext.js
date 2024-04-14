import React, { createContext, useState, useCallback } from "react";
import { ethers } from "ethers";
import { Modal, message } from "antd";

export const WalletContext = createContext();

const desiredNetwork = 8082;
const rpcUrl = 'http://18.185.76.64:8080'; // Define o URL do RPC

export const WalletProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [connected, setConnected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [signer, setSigner] = useState(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        // Define o provedor com o URL do RPC
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

        const chainId = await provider
          .getNetwork()
          .then((network) => network.chainId);
        if (chainId !== desiredNetwork) {
          Modal.warning({
            title: "Wrong Network",
            content: "Please connect to the Shardeum Sphinx network.",
          });

          return;
        }

        // Altera a rede para a rede do provedor
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${desiredNetwork.toString(16)}` }],
        });

        // Set signer
        const signerInstance = provider.getSigner();
        setSigner(signerInstance);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setSelectedAddress(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      Modal.error({
        title: "Metamask is not installed",
        content: "Please install it from https://metamask.io",
      });
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setSelectedAddress(null);
    setBalance(null);
    setConnected(false);
    setSigner(null);
    message.success("Wallet disconnected");
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        selectedAddress,
        balance,
        visible,
        signer,
        setConnected,
        setVisible,
        connectWallet,
        disconnectWallet,
        setSelectedAddress,
        setBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
