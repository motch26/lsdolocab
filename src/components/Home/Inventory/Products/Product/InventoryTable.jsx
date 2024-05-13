import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const InventoryTable = ({ tabValue, product, saveStocksHandler }) => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const columns = [
    { field: "_id", headerName: "ID", width: 150, hide: true, flex: 1 },
    {
      field: "color",
      headerName: "Color",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        const colorItem = product.colors.find(
          (item) => item.name === params.value
        );
        const colorCodes = colorItem ? colorItem.colorCodes : [];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }}>{params.value}</Typography>

            {colorCodes.map((colorCode, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: colorCode,
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  marginRight: "5px",
                  borderRadius: "1px",
                  border: "1px solid #000",
                }}
              ></Box>
            ))}
          </Box>
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        if (params.value === null) {
          return <Typography>N/A</Typography>;
        }
        return <Typography>{params.value}</Typography>;
      },
    },
    { field: "stocks", headerName: "Stocks", width: 150, flex: 1 },
    {
      field: "editStocks",
      headerName: "Edit Stocks",
      flex: "auto",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEditStocks(params.row)}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleEditStocks = (row) => {
    setSelectedVariant(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleStocksChange = (e) => {
    setSelectedVariant((prev) => ({
      ...prev,
      stocks: e.target.value,
    }));
  };

  const handleSaveStocks = () => {
    saveStocksHandler(selectedVariant);
    handleCloseDialog();
  };
  useEffect(() => {
    if (product.variants) {
      setVariants(product.variants);
    }
  }, [product]);
  if (tabValue !== 1) return null;
  return (
    <>
      <Box
        sx={{
          p: 3,
          display: tabValue === 1 ? "flex" : "none",
          width: "inherit",
          height: "55vh",
        }}
      >
        <DataGrid
          columns={columns}
          rows={variants}
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
              },
            },
          }}
        />
      </Box>
      <Dialog open={dialogOpen} maxWidth="sm" onClose={handleCloseDialog}>
        <DialogTitle>
          Edit Stocks for {selectedVariant?.color} - {selectedVariant?.size}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the form to edit the stocks for the selected variant.
          </DialogContentText>
          <TextField
            value={selectedVariant?.stocks}
            fullWidth
            onChange={handleStocksChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveStocks}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InventoryTable;
