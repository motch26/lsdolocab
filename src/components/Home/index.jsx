import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MainAppBar from "../reusables/MainAppBar";
import EditUser from "./EditUser";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import {
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { editUser } from "../../handlers/users";
import Loading from "../reusables/Loading";
import ResponseModal from "../reusables/ResponseModal";

export const Component = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [showEditUser, setShowEditUser] = useState(false);

  const [userInfo, setUserInfo] = useState(loaderData);

  const [responseModal, setResponseModal] = useState({
    open: false,
    message: "",
    isSuccess: false,
  });

  const closeResponseModal = () => {
    setResponseModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const submitEditUser = (form) => {
    submit(form, {
      method: "POST",
      encType: "application/json",
      action: "/home",
    });
  };

  useEffect(() => {
    if (loaderData) setUserInfo(loaderData);
    else navigate("/");
  }, [loaderData]);

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        setResponseModal((prev) => ({
          ...prev,
          open: true,
          message: actionData.error,
        }));
      } else {
        saveToLocalStorage("ls_user", actionData);
        setResponseModal((prev) => ({
          ...prev,
          open: true,
          isSuccess: true,
          message: "Saved Successfully!",
        }));
      }
    }
  }, [actionData]);

  return (
    <>
      <MainAppBar setShowEditUser={setShowEditUser} userInfo={userInfo} />
      <EditUser
        showEditUser={showEditUser}
        setShowEditUser={setShowEditUser}
        userInfo={userInfo}
        submitEditUser={submitEditUser}
      />
      <Outlet context={userInfo} />

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

export const loader = () => {
  const res = getFromLocalStorage("ls_user");
  return res;
};

export const action = async ({ request }) => {
  const { username, password, name } = await request.json();
  const cleaned = { username, password, name };
  return await editUser(cleaned);
};
