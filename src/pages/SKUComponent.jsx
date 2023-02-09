import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

import React, { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";

export default function SKUComponent() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const [savedProduct, setSavedProduct] = useState(null);

  const getProducts = () => {
    fetch("http://localhost:3000/get-product")
      .then((response) => response.json())
      .then((data) => setSavedProduct(data))
      .catch((error) => console.error(error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScan = (data) => {
    setState({
      result: data,
    });
  };
  const handleError = (err) => {
    console.error(err);
  };

  // useEffect(() => {
  //   setState(true);
  // }, [state]);

  useEffect(() => {
    getProducts();
  }, []);

  const formOnSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    const payload = JSON.stringify(formObject);

    fetch("http://localhost:3000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getProducts();
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Enter SKU
      </Button>
      <div
        style={{
          height: "70vh",
          border: "2px solid green",
          marginTop: "30px",
          borderRadius: "5px",
          padding: "20px 30px",
        }}
      >
        {console.log(savedProduct, "savedProduct")}

        {savedProduct?.map((elm, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid grey",
              }}
            >
              <p>{elm.sku_id}</p>
              <p>{elm.product_name}</p>
              <p>{elm.price}</p>
            </div>
          );
        })}
        {/* <BarcodeReader onError={handleError} onScan={handleScan} /> */}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Product Details</DialogTitle>

        <form onSubmit={formOnSubmit}>
          <DialogContent sx={{ padding: "20px " }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="id"
              variant="outlined"
              name="id"
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="productName"
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Price"
              variant="outlined"
              name="price"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" autoFocus>
              OK
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
