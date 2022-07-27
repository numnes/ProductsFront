import {
  Box,
  Button,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "components/Icon";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageContent from "components/pageContent";

const ListProducts: React.FC = () => {
  let navigate = useNavigate();

  type SearchInputs = {
    search: string;
    searchBy: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchInputs>();

  const onSubmit: SubmitHandler<SearchInputs> = (data: SearchInputs) => {
    console.log(data);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Id
        </Typography>
      ),
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Product Name
        </Typography>
      ),
      headerAlign: "center",
    },
    {
      field: "category",
      disableColumnMenu: true,
      headerName: "Product Category",
      sortable: false,
      renderHeader: () => (
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Product Category
        </Typography>
      ),
      headerAlign: "center",
      width: 190,
    },
    {
      field: "price",
      disableColumnMenu: true,
      headerName: "Product Category",
      sortable: false,
      renderHeader: () => (
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          Price
        </Typography>
      ),
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      disableColumnMenu: true,
      sortable: false,
      sortingOrder: [],
      field: "",
      width: 80,
      renderCell: (rowData: any) => {
        return (
          <Button
            onClick={() => {
              navigate(`${rowData.id}`);
            }}
          >
            <Icon name="Edit" />
          </Button>
        );
      },
    },
  ];

  const data: any[] = [
    { id: 1, name: "Product 1", category: "Category 1", price: 1.99 },
    { id: 2, name: "Product 2", category: "Category 1", price: 2.99 },
    { id: 3, name: "Product 3", category: "Category 1", price: 3.99 },
    { id: 4, name: "Product 4", category: "Category 1", price: 4.99 },
    { id: 5, name: "Product 5", category: "Category 1", price: 5.99 },
  ];

  return (
    <PageContent>
      <Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name={"Search"} />
                </InputAdornment>
              ),
            }}
            inputProps={register("search", {
              required: "Please enter search value",
            })}
            helperText={errors.search && errors.search.message}
          />
          <TextField
            variant="outlined"
            select
            inputProps={register("searchBy", {
              required: "Please enter search fiels",
            })}
            defaultValue="ProductName"
            style={{ width: "25ch" }}
          >
            <MenuItem value="id">id</MenuItem>
            <MenuItem value="ProductName">Product Name</MenuItem>
            <MenuItem value="ProductCategory">Product Category</MenuItem>
            <MenuItem value="Description">Description</MenuItem>
          </TextField>
          <Button
            style={{
              height: "56px",
            }}
            type="submit"
            variant="contained"
            size="large"
          >
            Search
          </Button>
        </form>
      </Box>
      <Box>
        <DataGrid columns={columns} rows={data} />
      </Box>
      <div />
    </PageContent>
  );
};

export default ListProducts;
