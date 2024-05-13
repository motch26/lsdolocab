import { Cancel, Delete, Download, Visibility } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useOutletContext, useSubmit } from "react-router-dom";
import ViewCargo from "./ViewCargo";
import UnreserveCargo from "./UnreserveCargo";
import ReceiveCargo from "./ReceiveCargo";

dayjs.extend(relativeTime);

export const Component = () => {
  const { cargos } = useOutletContext();
  const submit = useSubmit();

  const [selectedCargo, setSelectedCargo] = useState({});
  const [dialogState, setDialogState] = useState({
    viewCargo: false,
    unreserveCargo: false,
    editCargo: false,
    receiveCargo: false,
  });
  if (!cargos.length) return null;

  const dialogsCloseHandler = (dialog) => {
    setDialogState((prev) => ({
      ...prev,
      [dialog]: false,
    }));
  };
  const actionsHandler = (action, cargo) => {
    setSelectedCargo(cargo);
    setDialogState((prev) => ({
      ...prev,
      [action]: true,
    }));
  };
  // const sortedCargos = cargos.sort((a, b) => {
  //   if (a.received && !b.received) return 1;
  //   if (!a.received && b.received) return -1;
  //   return new Date(b.createdAt) - new Date(a.createdAt);
  // });

  const unreserveCargoHandler = (_id) => {
    const form = {};
    form.value = _id;
    form.action = "unreserveCargo";
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: "/home/inventory/cargos",
    });
  };
  const receiveCargoHandler = (value) => {
    const form = {};
    form.action = "receiveCargo";
    form.value = value;
    submit(form, {
      encType: "application/json",
      method: "POST",
      action: "/home/inventory/cargos",
    });
  };

  const columns = [
    { field: "_id", width: 150, hide: true, flex: 1 },
    { field: "createdAt", width: 150, hide: true, flex: 1 },
    {
      field: "name",
      headerName: "Cargo Name",
      width: 150,
      flex: 1,
    },
    {
      field: "courier",
      headerName: "Courier",
      width: 150,
      flex: 1,
    },
    {
      field: "products",
      headerName: "Variant Count",
      width: 150,
      flex: 1,
      valueGetter: (value) => {
        let count = 0;
        value.forEach(({ variants }) => {
          count += variants.length;
        });
        return count;
      },
    },
    {
      field: "Duration",
      headerName: "Duration",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        const { createdAt, received } = params.row;
        const duration = dayjs(createdAt).fromNow();
        const color =
          !received && dayjs(createdAt).isBefore(dayjs().subtract(1, "week"))
            ? "red"
            : "inherit";
        return (
          <Typography variant="subtitle2" style={{ color }}>
            {duration}
          </Typography>
        );
      },
    },
    {
      field: "totalExpenses",
      headerName: "Total Expenses",
      width: 150,
      flex: 1,
      valueGetter: (value) => `₱${value}`,
    },
    {
      field: "received",
      type: "boolean",
      headerName: "Received",
      width: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          title="View Cargo"
          label="View Cargo"
          onClick={() => actionsHandler("viewCargo", params.row)}
        />,
        <GridActionsCellItem
          sx={params.row.received ? { display: "none" } : { display: "block" }}
          icon={<Download />}
          title="Receive Cargo"
          label="Receive Cargo"
          onClick={() => actionsHandler("receiveCargo", params.row)}
        />,
        <GridActionsCellItem
          sx={params.row.received ? { display: "none" } : { display: "block" }}
          icon={<Cancel />}
          title="Unreserve"
          label="Unreserve"
          onClick={() => actionsHandler("unreserveCargo", params.row)}
        />,
      ],
    },
  ];
  return (
    <>
      <Box
        sx={{
          p: 3,
          width: "inherit",
          height: "55vh",
        }}
      >
        <DataGrid
          columns={columns}
          rows={cargos}
          getRowId={(row) => row._id}
          density="compact"
          sx={{
            "& .MuiDataGrid-topContainer, & .MuiDataGrid-menuIconButton": {
              color: "white",
            },

            height: "100%",
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                _id: false,
                createdAt: false,
              },
            },
          }}
        />
      </Box>
      {dialogState.viewCargo && (
        <ViewCargo
          open={dialogState.viewCargo}
          dialogsCloseHandler={dialogsCloseHandler}
          cargo={selectedCargo}
        />
      )}
      {dialogState.unreserveCargo && (
        <UnreserveCargo
          open={dialogState.unreserveCargo}
          dialogsCloseHandler={dialogsCloseHandler}
          cargo={selectedCargo}
          unreserveCargoHandler={unreserveCargoHandler}
        />
      )}
      {dialogState.receiveCargo && (
        <ReceiveCargo
          open={dialogState.receiveCargo}
          dialogsCloseHandler={dialogsCloseHandler}
          cargo={selectedCargo}
          receiveCargoHandler={receiveCargoHandler}
        />
      )}
    </>
  );
};
