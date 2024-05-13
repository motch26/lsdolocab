import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import ResponseModal from "../../../reusables/ResponseModal";
import Loading from "../../../reusables/Loading";
import {
  addTypeValue,
  deleteTypeValue,
  editTypeValue,
  getTypes,
} from "../../../../handlers/types";
import AddTypeValue from "./AddTypeValue";
import { getFromLocalStorage } from "../../../../utils/localStorage";

export const Component = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const actionData = useActionData();
  const submit = useSubmit();

  const [types, setTypes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const [dialogState, setDialogState] = useState({
    addTypeValue: false,
  });
  const [responseModal, setResponseModal] = useState({
    open: false,
    message: "",
    isSuccess: false,
  });

  const actionsHandler = (action) => {
    setDialogState((prev) => ({
      ...prev,
      [action]: true,
    }));
  };
  const dialogsCloseHandler = (dialog) => {
    setDialogState((prev) => ({
      ...prev,
      [dialog]: false,
    }));
  };
  const closeResponseModal = (path = ".") => {
    setResponseModal((prev) => ({
      ...prev,
      open: false,
    }));
    navigate(path);
  };
  const handleBack = () => {
    if (location.pathname !== "/home/inventory/configuration")
      navigate("/home/inventory/configuration");
  };

  const addTypeValueHandler = (form) => {
    setDialogState((prev) => ({
      ...prev,
      addTypeValue: false,
    }));

    form.createdBy = getFromLocalStorage("ls_user").name;
    form.action = "addTypeValue";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: `/home/inventory/configuration`,
    });
  };

  useEffect(() => {
    if (loaderData) setTypes(loaderData);
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
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          endIcon={<Add />}
          onClick={() => actionsHandler("addTypeValue")}
        >
          New
        </Button>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleBack}
        >
          {isHovered &
          (location.pathname !== "/home/inventory/configuration") ? (
            <ArrowBack sx={{ mr: 1 }} />
          ) : null}
          <Typography variant="h6" textTransform={"initial"}>
            Configuration
          </Typography>
        </Button>
      </Box>
      <Outlet context={types} />
      <AddTypeValue
        open={dialogState.addTypeValue}
        addTypeValueHandler={addTypeValueHandler}
        dialogsCloseHandler={dialogsCloseHandler}
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

export const loader = async () => {
  return await getTypes();
};
export const action = async ({ request }) => {
  const json = await request.json();
  const { action, ...formData } = json;
  if (action === "editTypeValue") {
    return await editTypeValue(formData);
  }
  if (action === "deleteTypeValue") {
    return await deleteTypeValue(formData);
  }
  if(action === "addTypeValue") {
    return await addTypeValue(formData);
  }
};
