import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "components/Icon";
import PageContent from "components/pageContent";
import { useLayoutSize } from "contexts/hooks/useLayoutSize";
import { useSession } from "contexts/session";
import { ProductController } from "controllers/ProductController";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { HttpService } from "services/httpService";
import { Product } from "types/Product";
import { useSnackbar } from "notistack";

const ViewProducts: React.FC = () => {
  // Hooks
  const { size } = useLayoutSize();
  const { id } = useParams();
  const { register, handleSubmit, reset, watch } = useForm<Product>();
  const { httpService, checkLogin } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // States
  const [open, setOpen] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // Effects
  React.useEffect(() => {
    if (!loaded) return;
    if (isNew) {
      reset(productData);
      return;
    }
    (async () => {
      const productController = new ProductController(
        httpService as HttpService
      );
      const { data } = await productController.getProduct(
        parseInt(id as string)
      );

      reset(data);
    })();
  }, [loaded]);

  React.useEffect(() => {
    if (!id) setIsNew(true);
  }, [id]);

  React.useEffect(() => {
    if (loaded) return;
    (async () => {
      if (!(await checkLogin())) {
        navigate("/login");
        return;
      }
      setLoaded(true);
    })();
  }, [id]);

  // Functions
  const handleClose = () => {
    setOpen(false);
  };

  const requestDelete = () => {
    setOpen(true);
  };

  const onSubmit = async (data: Product) => {
    const productController = new ProductController(httpService as HttpService);
    if (isNew) {
      try {
        const { status } = await productController.postProduct(data);
        if (status === 201) {
          enqueueSnackbar("Product created", {
            variant: "success",
          });
          navigate("/products");
        }
      } catch (error: any) {
        console.error(error);
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        navigate("/products");
      }
    } else {
      const { status } = await productController.patchProduct(data);
      if (status === 200) {
        enqueueSnackbar("Product updated", {
          variant: "success",
        });
      }
    }
  };

  const onDelete = async () => {
    const productController = new ProductController(httpService as HttpService);
    try {
      const { status } = await productController.deleteProduct(
        watch("id") as number
      );
      if (status === 200) {
        enqueueSnackbar("Product deleted", {
          variant: "success",
        });
        navigate("/products");
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  const productData: Product = {
    id: 0,
    name: "",
    description: "",
    category: "",
    price: 0.0,
    barCode: "",
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
          {/* <Button
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
          </Button> */}
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <TextField
                fullWidth
                variant="outlined"
                label="Product Name"
                defaultValue={"a"}
                inputProps={register("name", {
                  required: "Please enter product name",
                })}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Product Category"
                defaultValue={"a"}
                inputProps={register("category", {
                  required: "Please enter product category",
                })}
              />
            </Stack>
            <Stack
              style={{
                flexDirection: "row",
                width: "100%",
                gap: "1rem",
              }}
            >
              {isNew ? (
                <></>
              ) : (
                <TextField
                  variant="outlined"
                  label="Product id"
                  disabled
                  defaultValue={0}
                  inputProps={register("id")}
                  type="number"
                />
              )}
              <TextField
                fullWidth
                variant="outlined"
                label="Product Barcode"
                defaultValue={"a"}
                inputProps={register("barCode", {
                  required: "Please enter product barcode",
                })}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon name={"DollarSign"} />
                    </InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                label="Price"
                defaultValue={0.0}
                inputProps={{
                  ...register("price", {
                    required: "Please enter product price",
                  }),
                  step: "0.05",
                }}
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
                defaultValue={"a"}
                label="Product Description"
                inputProps={register("description", {
                  required: "Please enter product description",
                })}
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
                type="submit"
              >
                Save <Icon name="Save" size={20} />
              </Button>
              {isNew ? (
                <></>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  style={{ display: "flex", gap: "5px" }}
                  onClick={requestDelete}
                >
                  Delete <Icon name="Trash" size={20} />
                </Button>
              )}
            </Stack>
          </Stack>
        </form>
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
          <Button
            onClick={() => {
              handleClose();
              onDelete();
            }}
            variant="contained"
          >
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
