import React, { useEffect, useState } from 'react';
import useContractInteraction from "src/@core/context/ContractContext";
import {
  Box, Card, Table, TableRow, TableHead, TableBody, TableCell, Typography, TableContainer
} from '@mui/material';

const DashboardTable = () => {
  const { callContractView, error } = useContractInteraction();
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const fetchedAssets = await callContractView("getAllAssets");
        setAssets(fetchedAssets);  // Atualiza o estado com as categorias recebidas
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const intervalId = setInterval(fetchAssets, 10000);  // Chamar a cada minuto

    // Lembre-se de limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [callContractView]);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='Categories Table'>
          <TableHead>
            <TableRow>
              <TableCell>registrationDate</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>currentLocation</TableCell>
              <TableCell>value</TableCell>
              <TableCell>status</TableCell>
              <TableCell>currentOwner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index}>
                <TableCell>{asset.registrationDate}</TableCell>
                <TableCell>{asset.description}</TableCell>
                <TableCell>{asset.currentLocation}</TableCell>
                <TableCell>{asset.value}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.currentOwner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
