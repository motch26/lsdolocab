import {
  AttachMoney,
  Delete,
  Edit,
  Inventory,
  Key,
  People,
  Store,
} from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React from "react";
import dayjs from "dayjs";
const iconMapping = [
  {
    icon: <People />,
    has: "users",
  },
  {
    icon: <Inventory />,
    has: "products",
  },
  {
    icon: <Store />,
    has: "store",
  },
  {
    icon: <AttachMoney />,
    has: "sales",
  },
];
const UsersTable = ({ users, actionsHandler }) => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "canAccess",
      headerName: "Access Roles",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.accessRoles.map((access) => {
              const icon = iconMapping.find((icon) => icon.has === access).icon;
              return (
                <span key={access} style={{ marginRight: 5 }}>
                  {icon}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 200,
      valueFormatter: (params) => {
        const date = dayjs(params);
        return date.format("MMMM D, YYYY");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          title="Edit User"
          label="Edit User"
          onClick={() => actionsHandler("edit", params.row)}
        />,
        <GridActionsCellItem
          icon={<Key />}
          title="Reset Password"
          label="Reset Password"
          onClick={() => actionsHandler("reset", params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          title="Delete User"
          label="Delete User"
          onClick={() => actionsHandler("delete", params.row)}
        />,
      ],
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={users}
      getRowId={(row) => row._id}
      sx={{
        "& .MuiDataGrid-topContainer": {
          color: "white",
        },
      }}
    />
  );
};

export default UsersTable;
