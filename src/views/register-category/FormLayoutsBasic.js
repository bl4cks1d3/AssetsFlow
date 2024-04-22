import React, { useState } from "react";
import useContractInteraction from "src/@core/context/ContractContext";
import {
  Box, Card, Grid, Button, TextField, CardHeader, Typography, CardContent,
  CircularProgress, FormHelperText
} from '@mui/material';

const FormRegisterCategory = () => {
  const { callContractTx, error } = useContractInteraction();
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleButtonClick = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário
    setLoading(true);

    try {
      const functionName = "registerCategory";
      const params = [category, details];
      const transactionResult = await callContractTx(functionName, ...params);
      setResult(transactionResult); // Atualizando o estado com o resultado da chamada
      setLoading(false);
    } catch (ex) {
      console.error("Error calling contract function:", ex);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title='Register Category' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleButtonClick}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Category Name'
                placeholder='e.g., Electronics'
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Category Details'
                placeholder='Describe the category, e.g., Devices, Gadgets...'
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Button type='submit' variant='contained' size='large' disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
                {error && <FormHelperText error>{error}</FormHelperText>}
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormRegisterCategory;
