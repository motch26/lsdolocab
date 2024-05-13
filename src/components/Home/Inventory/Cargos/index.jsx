import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getTypes } from "../../../../handlers/types";
import {
  addCargo,
  getCargos,
  receiveCargo,
  unreserveCargo,
} from "../../../../handlers/cargos";
import ResponseModal from "../../../reusables/ResponseModal";
import Loading from "../../../reusables/Loading";
import { getProducts } from "../../../../handlers/products";
import AddCargo from "./AddCargo";

export const Component = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [types, setTypes] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [products, setProducts] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const [redirectPath, setRedirectPath] = useState(".");

  const [dialogState, setDialogState] = useState({
    addCargo: false,
  });

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
    navigate(redirectPath || path);
  };

  const handleBack = () => {
    if (location.pathname !== "/home/inventory/cargos")
      navigate("/home/inventory/cargos");
  };

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

  const addCargoHandler = (v) => {
    const form = {};
    form.action = "addCargo";
    v.totalExpenses =
      parseFloat(v.otherExpenses) + parseFloat(v.productsExpenses);
    v.products = v.products.map((product) => {
      let variants = [];
      if (product.sizes && product.sizes.length > 0) {
        variants = product.sizes.map((size) => ({
          color: product.color,
          size: size,
        }));
      } else {
        variants.push({
          color: product.color,
          size: null,
        });
      }
      return {
        _id: product._id,
        variants: variants,
      };
    });
    // console.log(form);
    form.value = v;
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: "/home/inventory/cargos",
    });
  };

  useEffect(() => {
    if (loaderData) {
      setTypes(loaderData.types);
      setCargos(loaderData.cargos);
      setProducts(loaderData.products);
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
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          endIcon={<Add />}
          onClick={() => actionsHandler("addCargo")}
        >
          New
        </Button>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleBack}
        >
          {isHovered & (location.pathname !== "/home/inventory/cargos") ? (
            <ArrowBack sx={{ mr: 1 }} />
          ) : null}
          <Typography variant="h6" textTransform={"initial"}>
            Cargos
          </Typography>
        </Button>
      </Box>
      <Outlet context={{ types, cargos }} />
      {dialogState.addCargo && (
        <AddCargo
          open={dialogState.addCargo}
          dialogsCloseHandler={dialogsCloseHandler}
          types={types}
          products={products}
          addCargoHandler={addCargoHandler}
        />
      )}
      <ResponseModal
        open={responseModal.open}
        isSuccess={responseModal.isSuccess}
        message={responseModal.message}
        handleClose={closeResponseModal}
      />
      <Loading open={["submitting", "loading"].includes(navigation.state)} />
    </Box>
  );
};

export const loader = async () => {
  return {
    types: await getTypes(),
    cargos: await getCargos(),
    products: await getProducts(),
  };
};

export const action = async ({ request }) => {
  const { action, value } = await request.json();
  console.log(value);
  if (action === "unreserveCargo") {
    return await unreserveCargo(value);
  }
  if (action === "addCargo") {
    return await addCargo(value);
  }
  if (action === "receiveCargo") {
    return await receiveCargo(value);
  }
};
