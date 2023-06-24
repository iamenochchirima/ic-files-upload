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

const Chunks = () => {
  const [showForm, setShowForm] = useState(false);
  const [initiated, setInit] = useState(false);
  const location = useLocation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image1Link, setImage1Link] = useState("");
  const [image2Link, setImage2Link] = useState("");
  const [image3Link, setImage3Link] = useState("");

  const [mediaFiles, setMediaFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [dogs, setDogs] = useState(null);

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    const firstFourImages = images.slice(0, 2);
    setImages(firstFourImages);
    // setImage1(e.target.files[0]);
    // setImage2(e.target.files[1]);
    // setImage3(e.target.files[3]);
    // const reader = new FileReader();

    // reader.onload = (event) => {
    //   setImages([...images, event.target.result]);
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      id: uuidv4(),
      name: name,
      description: description,
      images: {
        image1: image1Link,
        image2: image2Link,
        image3: image3Link,
      },
    };
    console.log(input);
    // const res = await ic_files_upload_backend.saveDog(input);
    // console.log(res)
  };

  useEffect(() => {
    const getDogs = async () => {
      const res = await ic_files_upload_backend.getDogs();
      setDogs(res);
    };
    getDogs();
  }, []);

  useEffect(() => {
    const init = async () => {
      const res = await initActors();
      if (res) {
        setInit(true);
      }
    };
    init();
  }, []);

  const runFunctions = async () => {
    if (initiated) {
      const res = await getAllAssets();
      console.log(res);
    } else {
      console.log("Intiating...");
    }
  };
  const uploadAndGet = async (e) => {
    e.preventDefault();
    if (initiated && images) {
      const file_path = location.pathname;

      for (const image of images) {
        try {
          await uploadFile(image, file_path);
          console.log("This file was successfully uploaded:", image.name);
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
        }
      }

      const result = await fetchMediaFiles(file_path);
      if (result.ok) {
        setMediaFiles(result.ok);
      } else {
        console.error("Error fetching media files:", result.err);
      }
    } else {
      console.log("Intiating...");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-5">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 p-2 text-white rounded-lg"
        >
          Create a post
        </button>
        <button
          onClick={runFunctions}
          className="bg-green-500 p-2 text-white rounded-lg"
        >
          Run functions
        </button>
        {showForm && (
          <form onSubmit={uploadAndGet} className="mt-5">
            <div className="mb-4">
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
            </div>
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
              {images.length > 0 && (
                <div className="mt-2 flex">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Uploaded"
                      className="w-10 h-10 object-cover object-center"
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chunks;
