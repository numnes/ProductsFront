import {
  Box,
  Button,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  styled,
  TextField,
  PaginationItem,
  Typography,
} from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "components/Icon";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageContent from "components/pageContent";
import { Product } from "types/Product";
import { useSession } from "contexts/session";
import { ProductController } from "controllers/ProductController";
import { HttpService } from "services/httpService";
import { useSnackbar } from "notistack";

const ListProducts: React.FC = () => {
  // Hooks
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchInputs>();
  const { size } = useLayoutSize();
  const { checkLogin, httpService } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  // Functions
  const onSubmit: SubmitHandler<SearchInputs> = (data: SearchInputs) => {
    console.log(data);
    setPage(1);
    searchProducts(1, perPage, data.searchBy, data.search);
  };
  const searchProducts = async (
    _page?: number,
    _perPage?: number,
    _searchField?: string,
    _search?: string
  ) => {
    const productController = new ProductController(httpService as HttpService);
    try {
      const { data } = await productController.getProducts(
        _page,
        _perPage,
        _searchField,
        _search
      );
      console.log("DATA");
      console.log(data);
      setProducts(data?.data as Product[]);
      setTotal(data?.total as number);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  //States
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(100);

  // Effects
  React.useEffect(() => {
    if (loaded) return;
    (async () => {
      const logged = await checkLogin();
      if (!logged) {
        navigate("/login");
        return;
      }
      setLoaded(true);
    })();
  });

  React.useEffect(() => {
    if (!loaded) return;

    (async () => {
      await searchProducts();
    })();
  }, [loaded]);

  // Data
  type SearchInputs = {
    search: string;
    searchBy: string;
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

  return (
    <PageContent>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack
            style={{
              flexDirection: "row",
              gap: size === "small" ? "0.2rem" : "1rem",
              alignItems: "center",
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
              inputProps={register("search")}
              helperText={errors.search && errors.search.message}
            />
            <TextField
              variant="outlined"
              select
              inputProps={register("searchBy", {
                required: "Please enter search fiels",
              })}
              defaultValue="name"
              style={{ width: "25ch" }}
            >
              <MenuItem value="id">id</MenuItem>
              <MenuItem value="name">Product Name</MenuItem>
              <MenuItem value="category">Product Category</MenuItem>
              <MenuItem value="description">Description</MenuItem>
            </TextField>
            <Button
              style={{
                height: "56px",
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              {size === "small" ? <Icon name="Search" /> : "Search"}
            </Button>
          </Stack>
        </form>
        <Stack
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              height: "56px",
              display: "flex",
              gap: "0.8rem",
              marginLeft: "5px",
            }}
            type="submit"
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/products/new");
            }}
          >
            <Icon name="Plus" size={20} />
            {size === "small" ? "" : "Add Product"}
          </Button>
        </Stack>
      </Box>
      <Box>
        <DataGrid
          columns={columns}
          rows={products}
          page={page}
          paginationMode="server"
          hideFooter={true}
        />
        <Stack
          style={{
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Pagination
            color="primary"
            showFirstButton
            showLastButton
            page={page}
            count={total / perPage}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </Box>
      <div />
    </PageContent>
  );
};

export default ListProducts;
