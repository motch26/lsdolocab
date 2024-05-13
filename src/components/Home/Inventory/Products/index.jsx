import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Icon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ResponseModal from "../../../reusables/ResponseModal";
import Loading from "../../../reusables/Loading";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import AddProduct from "./AddProduct";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../../../../handlers/products";
import { getFromLocalStorage } from "../../../../utils/localStorage";
import { transformJSONtoFormData } from "../../../../utils/json.js";
import { ArrowBack } from "@mui/icons-material";
import { getTypes } from "../../../../handlers/types.js";

export const Component = () => {
  const navigation = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);

  const [responseModal, setResponseModal] = useState({
    open: false,
    message: "",
    isSuccess: false,
  });

  const [dialogState, setDialogState] = useState({
    addProduct: false,
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

  const closeResponseModal = (path = ".") => {
    setResponseModal((prev) => ({
      ...prev,
      open: false,
    }));
    navigate(path);
  };

  const addHandler = async (form) => {
    const formData = transformJSONtoFormData(form);
    submit(formData, {
      encType: "multipart/form-data",
      method: "POST",
      action: "/home/inventory/products",
    });
  };

  useEffect(() => {
    if (actionData) {
      setResponseModal({
        open: true,
        message: actionData.message || actionData.error,
        isSuccess: !actionData.error,
      });
    }
  }, [actionData]);

  useEffect(() => {
    if (loaderData) {
      setProducts(loaderData.products);
      setTypes(loaderData.types);
    }
  }, [loaderData]);

  const handleBack = () => {
    if (location.pathname !== "/home/inventory/products")
      navigate("/home/inventory/products");
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          endIcon={<Add />}
          onClick={() => actionsHandler("addProduct")}
        >
          New
        </Button>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleBack}
        >
          {isHovered & (location.pathname !== "/home/inventory/products") ? (
            <ArrowBack sx={{ mr: 1 }} />
          ) : null}
          <Typography variant="h6" textTransform={"initial"}>
            Products
          </Typography>
        </Button>
      </Box>
      <Outlet context={products} />
      <AddProduct
        open={dialogState.addProduct}
        dialogsCloseHandler={dialogsCloseHandler}
        addHandler={addHandler}
        types={types}
      />
      <ResponseModal
        open={responseModal.open}
        isSuccess={responseModal.isSuccess}
        message={responseModal.message}
        handleClose={closeResponseModal}
      />
      <Loading open={["submitting", "loading"].includes(navigation.state)} />
    </>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData(); // getting error if from json
  if (formData.get("action") === "deleteProduct") {
    return await deleteProduct(formData.get("_id"));
  } else {
    formData.delete("dataURLs");
    formData.append("updatedBy", getFromLocalStorage("ls_user").name);

    return await addProduct(formData);
  }
};

export const loader = async () => {
  return { products: await getProducts(), types: await getTypes() };
};
