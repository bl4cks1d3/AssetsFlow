import { useContext, useState, useEffect } from "react";
import { WalletContext } from "./WalletContext";
import { ethers } from "ethers";
import contractInfo from "./abi"; // Importe as informações do contrato aqui

const useContractInteraction = () => {
  const { connected, signer } = useContext(WalletContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (connected) {
    }
  }, [connected]);

  const callContractView = async (functionName, ...args) => {
    try {
      if (!connected) {
        throw new Error("Wallet not connected");
      }

      // Instancie o contrato com o signer
      const contract = new ethers.Contract(contractInfo.contractAddress, contractInfo.contractABI, signer);

      // Chame a função com os argumentos
      const result = await contract[functionName](...args);
    

      return result;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred");
    }
  };

  const callContractTx = async (functionName, ...args) => {
    try {
      if (!connected) {
        throw new Error("Wallet not connected");
      }

	  const provider = new ethers.providers.Web3Provider(window.ethereum);
	  const signer = provider.getSigner();
	  const contract = new ethers.Contract(contractInfo.contractAddress, contractInfo.contractABI, signer);
	  
        // Se for uma função de leitura, chamar com ou sem argumentos
          const transaction = await contract[functionName](...args);
          const result = await transaction.wait();

      return result.transactionHash;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred");
    }
  };

  return { callContractView, callContractTx , error };
};

export default useContractInteraction;
