/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import UploadIcon from "./icons/UploadIcon";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa6";

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoUsingLink = async (event) => {
    event.preventDefault();
    try {
        if(photoLink.trim() != ""){
            const {data: { newName: fileName }} = await axios.post("/upload-by-link", { link: photoLink });
              setAddedPhotos((prev) => [...prev, fileName]);
              setPhotoLink("");
        }else{
            alert("Empty link cannot be uploaded")
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPhoto = async (event) => {
    try {
      const files = [...event.target.files]; // converting the files object to array to use forEach loop
      const data = new FormData();

      files.forEach((file) => {
        data.append("photos", file);
      });

      const { data: filename } = await axios.post("/uploads", data, {
        headers: { "Content-type": "multipart/form-data" },
      });

      setAddedPhotos((prev) => {
        return [...prev, ...filename];
      });
    } catch (error) {
      console.log(error);
    }
  };


  const removePhoto = (ev, filename) => {
    ev.preventDefault();
    setAddedPhotos(addedPhotos.filter(photoName => photoName !== filename));
  }

  const addToCoverPhoto = (ev, filename) => {
    ev.preventDefault();
    setAddedPhotos([filename, ...addedPhotos.filter(photoName => photoName !== filename)]);
  }


  return (
    <div>
      <h2 className="text-2xl ml-2 mt-4">Photos</h2>
      <p className="text-sm text-gray-600 ml-2 -mb-1">more the better</p>

      <div className="flex gap-2">
        <input
          className="w-[80%]"
          type="text"
          placeholder="Add using link"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          onClick={addPhotoUsingLink}
          className=" bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl px-3 py-2 my-[6px]"
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className=" grid grid-cols-2 mt-3 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photoName) => {
            return (
                <div className="relative flex" key={photoName}>
                <img
                src={`http://localhost:4000/uploaded-photos/${photoName}`}
                key={photoName}
                className="rounded-2xl opacity-90 hover:opacity-100 h-32 min-h-[100%] min-w-[100%]"
              />

                <button onClick={(ev) => addToCoverPhoto(ev, photoName)} className=" absolute p-2 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-xl bottom-1 left-1">
                  {photoName !== addedPhotos[0] ? <FaRegStar/> : <FaStar/>}

                </button>

                <button onClick={(ev) => removePhoto(ev, photoName)} className="absolute p-2 text-white bg-black bg-opacity-60 hover:bg-opacity-90 rounded-xl bottom-1 right-1">
                  <FaRegTrashAlt/>
                </button>
                
              </div>
            );
          })}

        <label className="border h-32 flex justify-center items-center bg-transparent rounded-2xl text-2xl cursor-pointer text-gray-500 p-1">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={uploadPhoto}
          />
            <UploadIcon/>
            <p>Upload</p>
          
        </label>
      </div>
    </div>
  );
};


export default PhotosUploader;
