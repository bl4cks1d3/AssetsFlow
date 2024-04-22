import React, { useEffect, useState } from 'react';
import useContractInteraction from "src/@core/context/ContractContext";
import {
  Box, Card, Table, TableRow, TableHead, TableBody, TableCell, Typography, TableContainer
} from '@mui/material';

const DashboardTable = () => {
  const { callContractView, error } = useContractInteraction();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await callContractView("getAllCategory");
        setCategories(fetchedCategories);  // Atualiza o estado com as categorias recebidas
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const intervalId = setInterval(fetchCategories, 10000);  // Chamar a cada minuto

    // Lembre-se de limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [callContractView]);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='Categories Table'>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Number of Assets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.assets.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
