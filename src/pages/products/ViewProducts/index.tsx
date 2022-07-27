import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, width } from "@mui/system";
import { Icon } from "components/Icon";
import PageContent from "components/pageContent";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import React from "react";
import { Product } from "types/Product";

// import { Container } from './styles';

const ViewProducts: React.FC = () => {
  const { size } = useLayoutSize();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const requestDelete = () => {
    setOpen(true);
  };

  const productData: Product = {
    id: 1,
    name: "Product 1",
    description: "Product 1 description",
    category: "Category 1",
    price: 1.99,
    barcode: "123456789",
    image: "https://picsum.photos/500",
  };

  return (
    <PageContent>
      <Stack
        style={{
          display: size === "small" ? "flex" : "grid",
          width: "100%",
          height: "100%",
          gridTemplateColumns: "1fr 5fr",
        }}
      >
        <Stack
          style={{
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
            src={productData.image}
            alt={productData.name}
          />
          <Button
            style={{
              display: "flex",
              gap: "0.8rem",
              width: size === "small" ? "50%" : "90%",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
            variant="outlined"
          >
            Change Image
            <Icon name="Image" size={20} />
          </Button>
        </Stack>
        <Stack
          style={{
            padding: "1rem",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            gap: "1rem",
            margin: size === "small" ? "10px 0 0 0" : "0 0 0 0.5rem",
          }}
        >
          <Stack
            style={{
              flexDirection: size === "small" ? "column" : "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField fullWidth variant="outlined" label="Product Name" />
            <TextField fullWidth variant="outlined" label="Product Category" />
          </Stack>
          <Stack
            style={{
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField variant="outlined" label="Product id" />
            <TextField fullWidth variant="outlined" label="Product Barcode" />
          </Stack>
          <Stack
            style={{
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name={"DollarSign"} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              label="Price"
            />
          </Stack>
          <Stack
            style={{
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Product Description"
            />
          </Stack>
          <Stack
            style={{
              flexDirection: "row",
              gap: "1rem",
              width: "100%",
              justifyContent: size === "small" ? "center" : "flex-end",
              marginTop: "4rem",
            }}
          >
            <Button
              variant="contained"
              style={{ display: "flex", gap: "10px" }}
            >
              Save <Icon name="Save" size={20} />
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ display: "flex", gap: "5px" }}
              onClick={requestDelete}
            >
              Delete <Icon name="Trash" size={20} />
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", padding: "2.5rem 1rem" }}
          >
            <Typography variant="h6">
              Are you sure you want to delete this product?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Delete{" "}
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            color="error"
          >
            Cancell
          </Button>
        </DialogActions>
      </Dialog>
    </PageContent>
  );
};

export default ViewProducts;
