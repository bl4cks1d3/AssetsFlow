import React, { useEffect, useState } from 'react';
import useContractInteraction from "src/@core/context/ContractContext";
import {
  Card, Grid, Button, Divider, MenuItem, TextField, FormControl, InputLabel,
  Select, CardHeader, Typography, CardContent, CardActions, OutlinedInput
} from '@mui/material';

const FormLayoutsSeparator = () => {
  const { callContractTx, callContractView } = useContractInteraction();
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [valueAssets, setValueAssets] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await callContractView('getAllCategory');
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [callContractView]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      await callContractTx("registerAsset", description, currentLocation, "1" , 0);
    } catch (error) {
      console.error("Error registering asset:", error);
    }
  };

  return (
    <Card>
      <CardHeader title='Register Assets' titleTypographyProps={{ variant: 'h6' }} />
      <Divider />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Description'
                placeholder='Description of the asset'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Current Location'
                placeholder='Current location of the asset'
                value={currentLocation}
                onChange={e => setCurrentLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Value'
                placeholder='Value of the asset'
                value={valueAssets}
                onChange={e => setValueAssets(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={e => setCategoryId(e.target.value)}
                  label="Category"
                  onChange={e => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default FormLayoutsSeparator;
