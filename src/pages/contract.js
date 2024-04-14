import React, { useState } from "react";
import useContractInteraction from "src/@core/context/ContractContext";

const AnotherComponent = () => {
  const { callContractView, callContractTx, error } = useContractInteraction();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setLoading(true);

      // Exemplo de chamada de função do contrato
      const functionName = "";

      const params = [0];
      const result = await callContractView(functionName, ...params);
      setResult(result); // Atualizando o estado com o resultado da chamada
      setLoading(false  );
    } catch (error) {
      console.error("Error calling contract function:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? "Calling..." : "Call Contract Function"}
      </button>
      {error && <p>Error: {error}</p>}
      {result !== null && ( // Exibindo o resultado se estiver definido
        <div>
          <p>Function call successful!</p>
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default AnotherComponent;
