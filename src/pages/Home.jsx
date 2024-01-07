import React, { useState } from "react";

// component
import UploadImage from "../components/UploadImage";

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-10 col-sm-8 col-md-5 col-lg-4">
        <UploadImage setImageUrls={setImageUrls} />
      </div>
      {imageUrls.length !== 0 ? (
        <div className="mt-4 col-10">
          <h2 className="text-center fw-bold">
            The image that storage in the firebase
          </h2>
          <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
            {imageUrls.map((url, index) => {
              return (
                <div
                  className="d-flex justify-content-center align-items-center"
                  height={"200px"}
                  key={index}
                >
                  <img
                    src={url}
                    alt="storage url from firebase"
                    className="rounded image-upload border"
                    style={{ height: "150px" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
