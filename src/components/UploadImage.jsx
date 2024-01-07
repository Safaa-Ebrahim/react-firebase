import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { v4 } from "uuid";

// component
import { showToast } from "./../store/slices/toastSlice";

import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./../firebase/firebase-config";

import noImage from "./../assets/No-Image.png";
const UploadImage = ({ setImageUrls }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const imageListRef = ref(storage, "images-react/");

  const upload = () => {
    if (imageUpload == null) {
      setMessage(true);
      return;
    }
    setMessage(false);
    const imageRef = ref(storage, `images-react/${imageUpload.name + v4()}`);
    setUploading(true);
    setProgress(0);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        dispatch(showToast("Failed to upload Image. Please try again."));
        setUploading(false);
        setProgress(0);
      },
      () => {
        dispatch(showToast("Image uploaded successfully!"));
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setImageUrls((prev) => [...prev, url]);
          })
          .catch((err) => {
            console.log(err);
          });
        setImageUpload(null);
        setUploading(false);
        setProgress(100);
      }
    );
  };
  //  display all the images in the fiebase storage
  useEffect(() => {
    listAll(imageListRef)
      .then((res) => {
        const urlsPromises = res.items.map((item) => getDownloadURL(item));
        Promise.all(urlsPromises)
          .then((urls) => {
            setImageUrls(urls);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="bg-dark rounded py-4">
        <div className="w-75 d-flex justify-content-center align-items-center mx-auto">
          <img
            src={
              imageUpload !== null ? URL.createObjectURL(imageUpload) : noImage
            }
            alt={`upload ${imageUpload?.name}`}
            className="form-group rounded image-upload"
          />
        </div>
        <div className="form-group mt-2 mx-auto w-75">
          <input
            type="file"
            className="form-control"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          {message ? <div className="text-danger">*Image Required</div> : ""}
        </div>
        {imageUpload && uploading ? (
          <div className="progress my-2 w-75 mx-auto">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated progress-color"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        ) : null}
        <button
          onClick={upload}
          className="btn bg-yellow text-white mt-2 w-75 d-flex justify-content-center mx-auto"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </>
  );
};

export default UploadImage;
