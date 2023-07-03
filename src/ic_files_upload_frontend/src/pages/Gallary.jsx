import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ic_files_upload_backend } from "../../../declarations/ic_files_upload_backend/index";
import {
  fetchMediaFiles,
  getAllAssets,
  getFileNameWithoutExtension,
  getVersion,
  initActors,
  uploadFile,
} from "../storage/functions";
import { useLocation } from "react-router-dom";

const Gallary = () => {
  const [showForm, setShowForm] = useState(false);
  const [initiated, setInit] = useState(false);
  const location = useLocation();
  const [urls, setUrls] = useState(null);
  const [loading, setLoading] =  useState(false)
  const [uploading, setUpLoading] =  useState(false)

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [image1, setImage1] = useState(null);
  // const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);
  // const [image1Link, setImage1Link] = useState("");
  // const [image2Link, setImage2Link] = useState("");
  // const [image3Link, setImage3Link] = useState("");

  const [mediaFiles, setMediaFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [uploads, setUploads] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selected = files.slice(0, 2);
    setUploads(selected);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const input = {
  //     id: uuidv4(),
  //     name: name,
  //     description: description,
  //     images: {
  //       image1: image1Link,
  //       image2: image2Link,
  //       image3: image3Link,
  //     },
  //   };
  //   console.log(input);
  // };

  const getImages = async () => {
    const res = await getAllAssets();
    if (res.ok) {
      setImages(res.ok);
    }
  };

  useEffect(() => {
    if (initiated) {
      getImages();
      setLoading(false)
    }
  }, [initiated]);

  useEffect(() => {
    setLoading(true)
    const init = async () => {
      const res = await initActors();
      if (res) {
        setInit(true);
      }
    };
    init();
  }, []);

  const uploadAssets = async (e) => {
    e.preventDefault();
    if (initiated && uploads) {
      setUpLoading(true)
      const file_path = location.pathname;
      const assetsUrls = [];

      for (const image of uploads) {
        try {
          const assetUrl = await uploadFile(image, file_path);
          assetsUrls.push(assetUrl);
          console.log("This file was successfully uploaded:", image.name);
          getImages()
          setUpLoading(false)
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
        }
      }
      setUrls(assetsUrls);
      console.log("Assets urls here", assetsUrls);
  
    }
  };

  console.log(urls);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-5">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 p-2 text-white rounded-lg"
        >
          Upload images
        </button>
        {showForm && (
          <form onSubmit={uploadAssets} className="mt-5">
            {/* <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 rounded w-full py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-400 rounded w-full py-2 px-3"
              ></textarea>
            </div> */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        )}
      </div>
      <div className="flex">
        {images.length == 0 && (
          <h3 className="text-center">{loading ? "Loading ..." : "No images uploaded yet"}</h3>
        )}
        {images?.map((image) => (
          <div key={image.id} className="">
            <img src={image.url} className="h-[200px] w-[200px]" alt="Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallary;
