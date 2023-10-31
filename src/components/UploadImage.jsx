import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { v4 } from "uuid";

// component
import { showToast } from "./../store/slices/toastSlice";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase/firebase-config";

import noImage from "./../assets/No-Image.png";
const UploadImage = ({setImageUrls}) => {
  const [imageUpload, setImageUpload] = useState(null);
  const dispatch = useDispatch();
  const imageListRef = ref(storage, "images-react/");

  const upload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images-react/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        dispatch(showToast("Image uploaded successfully!"));
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
        setImageUpload(null);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast("Failed to upload Image. Please try again."));
      });
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
        </div>
        <button
          onClick={upload}
          className="btn bg-yellow text-white mt-2 w-75 d-flex justify-content-center mx-auto"
        >
          Upload Image
        </button>
      </div>
    </>
  );
};

export default UploadImage;
