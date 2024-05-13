import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useActionData, useOutletContext, useSubmit } from "react-router-dom";
import EditTypeValue from "./EditTypeValue";
import {
  getAccessRoles,
  getFromLocalStorage,
} from "../../../../utils/localStorage";
import DeleteTypeValue from "./DeleteTypeValue";

export const Component = () => {
  const types = useOutletContext();
  const submit = useSubmit();

  const columns = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Value",
      width: 150,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      flex: 1,
      valueGetter: (value) => dayjs(value).format("MMM DD, YYYY"),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          title="Edit"
          label="Edit"
          onClick={() => actionsHandler("editTypeValue", params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          title="Delete"
          label="Delete"
          onClick={() => actionsHandler("deleteTypeValue", params.row)}
        />,
      ],
    },
  ];

  const [tabValue, setTabValue] = useState("category");
  const [typeData, setTypeData] = useState([]);
  const [selectedType, setSelectedType] = useState({});

  const [dialogState, setDialogState] = useState({
    editTypeValue: false,
    deleteTypeValue: false,
    addTypeValue: false,
  });

  const dialogsCloseHandler = (dialog) => {
    setDialogState((prev) => ({
      ...prev,
      [dialog]: false,
    }));
  };
  const actionsHandler = (action, row) => {
    setSelectedType(row);
    setDialogState((prev) => ({
      ...prev,
      [action]: true,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const editTypeValueHandler = (value) => {
    setDialogState((prev) => ({
      ...prev,
      editTypeValue: false,
    }));
    const form = {};
    form.entryName = value;
    form.typeName = tabValue;
    form._id = selectedType._id;
    form.createdBy = getFromLocalStorage("ls_user").name;
    form.action = "editTypeValue";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: `/home/inventory/configuration`,
    });
  };

  const deleteTypeValueHandler = () => {
    setDialogState((prev) => ({
      ...prev,
      deleteTypeValue: false,
    }));
    const form = {};
    form._id = selectedType._id;
    form.typeName = tabValue;
    form.action = "deleteTypeValue";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: `/home/inventory/configuration`,
    });
  };

  useEffect(() => {
    const defaultType = types?.find((type) => type.name === tabValue);
    if (defaultType) {
      setTypeData(defaultType.values);
    }
  }, [tabValue, types]);

  return (
    <Box sx={{ p: 1, mt: 1, maxHeight: "75vh" }}>
      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Category" value={"category"} />
            <Tab label="Brands" value={"brand"} />
            <Tab label="Use For" value={"useFor"} />
            <Tab label="Courier" value={"courier"} />
          </Tabs>
          <DataGrid
            columns={columns}
            rows={typeData}
            getRowId={(row) => row._id}
            sx={{
              "& .MuiDataGrid-topContainer, & .MuiDataGrid-menuIconButton": {
                color: "white",
              },
              height: "100%",
              mt: 1,
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  _id: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>
      <EditTypeValue
        open={dialogState.editTypeValue}
        dialogsCloseHandler={dialogsCloseHandler}
        value={selectedType}
        editTypeValueHandler={editTypeValueHandler}
      />
      <DeleteTypeValue
        open={dialogState.deleteTypeValue}
        dialogsCloseHandler={dialogsCloseHandler}
        value={selectedType}
        deleteTypeValueHandler={deleteTypeValueHandler}
      />
    </Box>
  );
};
