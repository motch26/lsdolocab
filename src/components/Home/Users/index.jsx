import {
  Add,
  Apps,
  AttachMoney,
  Inventory,
  People,
  Search,
  Store,
  Work,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SectionBackButton from "../SectionHeader";
import { useEffect, useState } from "react";
import ResponseModal from "../../reusables/ResponseModal";
import Loading from "../../reusables/Loading";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import {
  addUser,
  deleteUser,
  editUser,
  getUsers,
  resetPassword,
  searchUsers,
} from "../../../handlers/users";
import UsersTable from "./UsersTable";
import EditUser from "./EditUser";
import ResetPassword from "./ResetPassword";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/localStorage";
const listItems = [
  {
    icon: <Apps />,
    title: "All",
    key: "all",
  },
  {
    icon: <People />,
    title: "Users",
    key: "users",
  },
  {
    icon: <Inventory />,
    title: "Inventory",
    key: "products",
  },
  {
    icon: <Store />,
    title: "Session",
    key: "store",
  },
  {
    icon: <AttachMoney />,
    title: "Sales",
    key: "sales",
  },
];
export const Component = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const navigate = useNavigate();

  const [lastAction, setLastAction] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [users, setUsers] = useState(loaderData);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const [selectedUser, setSelectedUser] = useState({});

  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    delete: false,
    reset: false,
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
    navigate(path);
  };

  const handleListItemClick = (index, access) => {
    setSelected(index);
    if (access != "all") {
      setFilteredUsers(
        users.filter((user) => user.accessRoles.includes(access))
      );
    } else {
      setFilteredUsers(users.filter((user) => user.accessRoles.length === 4));
    }
  };

  const actionsHandler = (action, user = null) => {
    if (user) setSelectedUser(user);
    setDialogState((prev) => ({
      ...prev,
      [action]: true,
    }));
  };

  const dialogsCloseHandler = (action) => {
    setDialogState((prev) => ({
      ...prev,
      [action]: false,
    }));
  };

  const editHandler = (user) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    setLastAction("edit");
    submit(
      {
        form: user,
        action: "edit",
      },
      {
        action: "/home/users",
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const resetHandler = (user) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    setLastAction("reset");
    submit(
      {
        form: user,
        action: "reset",
      },
      {
        action: "/home/users",
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const deleteHandler = (user) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    setLastAction("delete");
    submit(
      {
        form: user,
        action: "delete",
      },
      {
        action: "/home/users",
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const addHandler = (user) => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    setLastAction("add");
    submit(
      {
        form: user,
        action: "add",
      },
      {
        action: "/home/users",
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const searchHandler = () => {
    if (!getFromLocalStorage("ls_user").username) navigate("/");

    if (search === "") setFilteredUsers(users);
    else {
      setLastAction("search");
      submit(
        {
          form: { search },
          action: "search",
        },
        {
          action: "/home/users",
          method: "POST",
          encType: "application/json",
        }
      );
    }
  };

  useEffect(() => {
    if (loaderData) setUsers(loaderData);
  }, [loaderData]);

  useEffect(() => {
    if (actionData) {
      //If successfuly editting of current user, update the local storage
      if (!actionData.error) {
        if (lastAction === "edit") {
          if (getFromLocalStorage("ls_user")._id === actionData.user._id)
            saveToLocalStorage("ls_user", actionData.user);
        }
        if (lastAction === "search") {
          setSelected(null);
          setFilteredUsers(actionData);
        }
      }
      if (lastAction !== "search") {
        setResponseModal({
          open: true,
          message: actionData.message,
          isSuccess: !actionData.error,
        });
      }
    }
  }, [actionData]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh - 64px)", // Subtract the AppBar height
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SectionBackButton Icon={People} title={"Users"} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              endIcon={<Add />}
              onClick={() => actionsHandler("add")}
            >
              New
            </Button>
            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              placeholder="Search Users"
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={searchHandler}
            >
              <Search />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={2}>
          <Box sx={{ bgcolor: "white", p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Work />
              <Typography variant="body1">Can Access:</Typography>
            </Box>
            <List>
              {listItems.map((item, index) => (
                <ListItemButton
                  key={item.title}
                  selected={selected === index}
                  onClick={() => handleListItemClick(index, item.key)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText secondary={item.title} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ bgcolor: "white", p: 3, height: "100%" }}>
            <UsersTable users={filteredUsers} actionsHandler={actionsHandler} />
          </Box>
        </Grid>
      </Grid>
      <EditUser
        open={dialogState.edit}
        dialogsCloseHandler={dialogsCloseHandler}
        selectedUser={selectedUser}
        editHandler={editHandler}
      />
      <ResetPassword
        open={dialogState.reset}
        dialogsCloseHandler={dialogsCloseHandler}
        selectedUser={selectedUser}
        resetHandler={resetHandler}
      />
      <DeleteUser
        open={dialogState.delete}
        dialogsCloseHandler={dialogsCloseHandler}
        selectedUser={selectedUser}
        deleteHandler={deleteHandler}
      />
      <AddUser
        open={dialogState.add}
        dialogsCloseHandler={dialogsCloseHandler}
        addHandler={addHandler}
      />
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
  return await getUsers();
};

export const action = async ({ request }) => {
  const { action, form } = await request.json();
  if (action === "edit") return await editUser(form);
  if (action === "reset") return await resetPassword(form);
  if (action === "delete") return await deleteUser(form);
  if (action === "add") return await addUser(form);
  if (action === "search") return await searchUsers(form);
  return [];
};
