import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
// import Quagga from "quagga";
import jsQR from "jsqr";

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

  // const takePhoto = async () => {
  //   const constraints = {
  //     video: { facingMode: "environment" },
  //     audio: false,
  //   };

  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     const video = document.createElement("video");
  //     video.srcObject = stream;
  //     document.body.appendChild(video);

  //     // Wait for the video to start playing
  //     await new Promise((resolve) => {
  //       video.addEventListener("canplay", resolve);
  //     });

  //     // Start playing the video
  //     video.play();

  //     // Create a canvas and draw the video frame onto it
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.getContext("2d").drawImage(video, 0, 0);

  //     // Return the video element and the canvas as a base64 encoded string
  //     return { video, photo: canvas.toDataURL("image/jpeg") };
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  const takePhoto = async () => {
    const constraints = {
      video: { facingMode: "environment" },
      audio: false,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.createElement("video");
      video.style.position = "absolute";
      video.style.top = 0;
      video.style.width = "100px";
      video.style.height = "100px";

      video.srcObject = stream;
      document.body.appendChild(video);

      // Wait for the video to start playing
      await new Promise((resolve) => {
        video.addEventListener("canplay", resolve);
      });

      // Start playing the video
      video.play();

      // Create a canvas and draw the video frame onto it
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      setTimeout(() => {
        // Stop the video stream and remove the video element from the document
        stream.getTracks().forEach((track) => track.stop());
        video.remove();
      }, 4000);
      // Return the canvas as a base64 encoded string
      return canvas.toDataURL("image/jpeg");
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // function readBarcode(imageData) {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.src = imageData;
  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0, img.width, img.height);
  //       const imageData = ctx.getImageData(0, 0, img.width, img.height);
  //       Quagga.decodeSingle(
  //         {
  //           src: imageData,
  //           numOfWorkers: 0,
  //           decoder: {
  //             readers: ["ean_reader"],
  //           },
  //           locate: true,
  //           locateBarcodes: ["EAN_13"],
  //         },
  //         (result) => {
  //           if (result.codeResult) {
  //             resolve(result.codeResult.code);
  //           } else {
  //             reject("No barcode found");
  //           }
  //         }
  //       );
  //     };
  //   });
  // }

  function readBarcode(imageData) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          resolve(code.data);
        } else {
          reject("No barcode found");
        }
      };
    });
  }
  const cameraBtnOnClick = async () => {
    const result = await takePhoto();
    // if (result) {
    //   document.body.appendChild(result.video);

    //   console.log(result.photo, "PHOTO......................");
    // }
    if (result) {
      console.log(result);
      // const blobImage = new Blob([result], { type: "image/png" });
      debugger;
      readBarcode(result)
        .then((code) => {
          console.log("Barcode code:", code);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          scan
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => cameraBtnOnClick()}
        >
          camera
        </Button>
      </div>

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
