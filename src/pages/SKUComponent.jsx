import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

import React, { useEffect, useState } from "react";

// import javascriptBarcodeReader from "javascript-barcode-reader";

export default function SKUComponent() {
  const [open, setOpen] = useState(false);
  const [savedProduct, setSavedProduct] = useState(null);

  const getProducts = () => {
    fetch(`https://animated-cosmic-pomegranate.glitch.me/get-data`)
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

  async function imageUrlToUint8ClampedArray(imageUrl) {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create an image element
    const imageElement = new Image();

    // Create a canvas to draw the image on
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Wait for the image to load
    return new Promise((resolve, reject) => {
      imageElement.onload = function () {
        // Set the canvas size to the size of the image
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;

        // Draw the image on the canvas
        context.drawImage(
          imageElement,
          0,
          0,
          imageElement.width,
          imageElement.height
        );

        // Get the image data from the canvas
        const imageData = context.getImageData(
          0,
          0,
          imageElement.width,
          imageElement.height
        );

        // Return the Uint8ClampedArray representation of the image data
        resolve(imageData.data);
      };
      imageElement.onerror = reject;
      imageElement.src = URL.createObjectURL(blob);
    });
  }

  const imgSource = imageUrlToUint8ClampedArray(
    `https://i.imgur.com/8fvpGtY.jpeg`
  );

  // javascriptBarcodeReader({
  //   /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
  //   image: imgSource,
  //   barcode: "code-2of5",
  //   // barcodeType: 'industrial',
  //   options: {
  //     useAdaptiveThreshold: true,
  //     // for images with sahded portions
  //     singlePass: true,
  //   },
  // })
  //   .then((code) => {
  //     console.log("Invoked");
  //     console.log(code);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  useEffect(() => {
    getProducts();

    // javascriptBarcodeReader();
  }, []);

  const formOnSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    const payload = JSON.stringify(formObject);

    fetch("https://animated-cosmic-pomegranate.glitch.me/add-product", {
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
