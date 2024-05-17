import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  editProduct,
  editVariantStocks,
  getProduct,
} from "../../../../../handlers/products";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import EditProduct from "./EditProduct";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import ResponseModal from "../../../../reusables/ResponseModal";
import AddProductVariant from "./AddProductVariant";
import InventoryTable from "./InventoryTable";
import DeleteProduct from "./DeleteProduct";
import { getTypes } from "../../../../../handlers/types";
import { transformJSONtoFormData } from "../../../../../utils/json";

export const Component = () => {
  const loaderData = useLoaderData();
  const submit = useSubmit();
  const actionData = useActionData();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [types, setTypes] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [redirectPath, setRedirectPath] = useState(".");

  const [dialogState, setDialogState] = useState({
    editProduct: false,
    addProductVariant: false,
    deleteProduct: false,
  });

  const dialogsCloseHandler = (dialog) => {
    setDialogState((prev) => ({
      ...prev,
      [dialog]: false,
    }));
  };

  const actionsHandler = (action) => {
    setDialogState((prev) => ({
      ...prev,
      [action]: true,
    }));
  };
  const [responseModal, setResponseModal] = useState({
    open: false,
    message: "",
    isSuccess: false,
  });

  const closeResponseModal = (path = ".") => {
    setResponseModal((prev) => ({
      ...prev,
      open: false,
    }));
    const redirect = redirectPath || path;
    console.log(redirect);
    // navigate(redirect, { replace: true });
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const imageLink =
    product && product.images
      ? `${import.meta.env.VITE_API_URL}/uploads/${product?.category}/${
          product?.images[0]
        }`
      : "";

  const editHandler = async (form) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    form._id = product._id;
    form.updatedBy = getFromLocalStorage("ls_user").name;
    form.action = "editProduct";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: `/home/inventory/products/${product._id}`,
    });
  };

  const deleteHandler = async (_id) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    const form = {};
    form._id = _id;
    form.action = "deleteProduct";
    const formData = transformJSONtoFormData(form);
    submit(formData, {
      encType: "multipart/form-data",
      method: "POST",
      action: "/home/inventory/products",
    });
    //   submit(form, {
    //     encType: "application/json",
    //     method: "POST",
    //     action: `/home/inventory/products`,
    //   });
  };

  const saveStocksHandler = async (form) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    form.variantId = form._id;
    form._id = product._id;
    form.stocks = parseInt(form.stocks);
    form.updatedBy = getFromLocalStorage("ls_user").name;
    form.action = "saveStocks";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: `/home/inventory/products/${product._id}`,
    });
  };

  const addProductVariantHandler = async (form) => {
    console.log(form);
    // form._id = product._id;
    // form.updatedBy = getFromLocalStorage("ls_user").name;
    // form.action = "addProductVariant";
    // submit(form, {
    //   encType: "application/json",
    //   method: "POST",
    //   action: `/home/inventory/products/${product._id}`,
    // });
  };
  useEffect(() => {
    if (loaderData) {
      setProduct(loaderData.product);
      setTypes(loaderData.types);
    }
  }, [loaderData]);

  useEffect(() => {
    if (actionData) {
      setResponseModal({
        open: true,
        message: actionData.message || actionData.error,
        isSuccess: !actionData.error,
      });
    }
  }, [actionData]);

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => actionsHandler("editProduct")}
        >
          Edit Product
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => actionsHandler("addProductVariant")}
        >
          Add Variant
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setRedirectPath("/home/inventory/products");
            actionsHandler("deleteProduct");
          }}
        >
          Delete Product
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Typography variant="body1" fontWeight={500}>
                Product Name
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                {product.model}
              </Typography>
              <Box>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab label="General Information" value={0} />
                  <Tab label="Inventory" value={1} />
                  <Tab label="Sales" value={2} />
                  <Tab label="Cargos" value={3} />
                </Tabs>
              </Box>

              <GeneralInfo tabValue={tabValue} product={product} />
              <InventoryTable
                tabValue={tabValue}
                product={product}
                saveStocksHandler={saveStocksHandler}
              />
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ width: "fit-content" }}>
                <CardMedia
                  component={"img"}
                  sx={{ width: 300, height: 300 }}
                  image={imageLink}
                />
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EditProduct
        product={product}
        open={dialogState.editProduct}
        dialogsCloseHandler={dialogsCloseHandler}
        editHandler={editHandler}
        types={types}
      />
      <DeleteProduct
        product={product}
        open={dialogState.deleteProduct}
        dialogsCloseHandler={dialogsCloseHandler}
        deleteHandler={deleteHandler}
      />
      <AddProductVariant
        open={dialogState.addProductVariant}
        product={product}
        dialogsCloseHandler={dialogsCloseHandler}
        addProductVariantHandler={addProductVariantHandler}
      />
      <ResponseModal
        open={responseModal.open}
        isSuccess={responseModal.isSuccess}
        message={responseModal.message}
        handleClose={closeResponseModal}
        redirectPath={redirectPath}
      />
    </Box>
  );
};

export const loader = async ({ params }) => {
  const { _id } = params;
  return { product: await getProduct(_id), types: await getTypes() };
};

export const action = async ({ request }) => {
  const json = await request.json();
  const { action, ...formData } = json;
  if (action === "editProduct") {
    return await editProduct(formData);
  }
  if (action === "saveStocks") {
    return await editVariantStocks(formData);
  }
};
