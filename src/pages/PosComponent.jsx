import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function PosComponent() {
  const [open, setOpen] = useState(false);
  const [matingProduct, setMatingProduct] = useState(null);
  const [productId, setProductId] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const submitBtnOnClick = () => {
    fetch(
      `https://animated-cosmic-pomegranate.glitch.me/get-data?id=${productId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMatingProduct(data);
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Button variant="contained" onClick={() => setOpen(true)}>
        scan
      </Button>

      {matingProduct && <h1>Product Details</h1>}
      {matingProduct?.map((elm, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              width: "600px",
              justifyContent: "space-between",
              border: "1px solid grey",
              padding: "5px 20px",
              marginTop: "10px",
            }}
          >
            <p>{elm.sku_id}</p>
            <p>{elm.product_name}</p>
            <p>{elm.price}</p>
          </div>
        );
      })}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Enter Product Details</DialogTitle>

        <DialogContent sx={{ padding: "20px ", minWidth: "400px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="id"
            variant="outlined"
            name="id"
            sx={{ mt: 2 }}
            onChange={(e) => setProductId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={() => submitBtnOnClick()}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
