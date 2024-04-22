/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";


const PhotoGallery = ({place, className}) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-[#101010]  h-screen">
        <div className="mt-">
          <button
            onClick={() => setShowAllPhotos(false)}
            className=" fixed ml-4 mt-2 cursor-pointer bg-white hover:opacity-80  px-4 py-2 rounded-2xl flex items-center gap-1"
          >
            <IoIosArrowBack className="text-xl " />
            <p className=" text-xl">Back</p>
          </button>
          <h2 className="text-white text-3xl text-center p-4 mt-4">
            Images of {place.title}
          </h2>
        </div>
        <div className="mx-auto flex flex-col gap-4 bg-[#101010] mt-4">
          {place.photos?.length > 0 &&
            place.photos.map((photoName) => (
              <div key={photoName}>
                <img
                  className={"mx-auto w-[60%] aspect-[5/3] object-cover " + className}
                  src={`http://localhost:4000/uploaded-photos/${photoName}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }


  return (
    <div>
              <div
      className={
        "mx-auto grid min-[665px]:grid-cols-[1fr_1fr] min-[1150px]:grid-cols-[1fr_1fr_1fr_1fr] gap-2 w-[70vw] mt-4 rounded-2xl overflow-hidden " + className
      }
    >
      {place.photos?.map((photo, index) => {
        const firstImageDiv =
          index === 0
            ? "  flex row-start-1 row-end-3 col-start-1 col-end-3 rounded-l-2xl"
            : "";
        const firstImg = index === 0 ?  " w-full " : "";   
        const hideShowAllPhotoBtn = index !== 4 ? " hidden " : "";
        const lastDivRelativeProperty = index === 4 ? " relative " : "";
        if (index > 4) {
          return;
        }
        return (
          <div className={firstImageDiv + lastDivRelativeProperty} key={index}>
            <img
              onClick={() => setShowAllPhotos(true)}
              className={
                "aspect-[4/3] object-cover hover:opacity-95 cursor-pointer bg-black" + firstImg
              }
              src={`http://localhost:4000/uploaded-photos/${photo}`}
              alt=""
            />
            <div
              onClick={() => setShowAllPhotos(true)}
              className={
                "flex rounded-2xl gap-1 items-center border border-black absolute shadow-lg  bg-white opacity-70 hover:opacity-100 cursor-pointer bottom-4 right-4 px-2 py-1" +
                hideShowAllPhotoBtn
              }
            >
              <CgMenuGridO />
              Show All Photos
            </div>
          </div>
        );
      })}
    </div>
    </div>
  )
}

export default PhotoGallery