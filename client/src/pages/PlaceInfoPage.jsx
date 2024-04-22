import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

// import { CgMenuGridO } from "react-icons/cg";
// import { IoIosArrowBack } from "react-icons/io";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";
import CheckInOutMaxGuests from "../components/CheckInOutMaxGuests";
import PerksToDisplay from "../components/PerksToDisplay";

const PlaceInfoPage = () => {
  
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/places/${id}`)
    .then(({ data }) => {
      setPlace(data);
    })
    .catch((error) => console.log(error.message));
  }, []);
  
  // const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  // if (showAllPhotos) {
  //   return (
  //     <div className="absolute inset-0 bg-[#101010]  h-screen">
  //       <div className="mt-">
  //         <button
  //           onClick={() => setShowAllPhotos(false)}
  //           className=" fixed ml-4 mt-2 cursor-pointer bg-white hover:opacity-80  px-4 py-2 rounded-2xl flex items-center gap-1"
  //         >
  //           <IoIosArrowBack className="text-xl " />
  //           <p className=" text-xl">Back</p>
  //         </button>
  //         <h2 className="text-white text-3xl text-center p-4 mt-4">
  //           Images of {place.title}
  //         </h2>
  //       </div>
  //       <div className="mx-auto flex flex-col gap-4 bg-[#101010] mt-4">
  //         {place.photos?.length > 0 &&
  //           place.photos.map((photoName) => (
  //             <div key={photoName}>
  //               <img
  //                 className="mx-auto w-[60%] aspect-[5/3] object-cover "
  //                 src={`http://localhost:4000/uploaded-photos/${photoName}`}
  //                 alt=""
  //               />
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   );
  // }



  // if(!showAllPhotos){
  //   return '';
  // }

  


  return (
    <div className="bg-gray-100 py-2 px-20 -mx-20 border-t">
      <div className={"mt-4 w-[70vw] mx-auto py-2"}>
        <h1 className=" text-3xl ">{place.title}</h1>
        <AddressLink address={place.address} />
      </div>
{/* 
      <div
      className={
        "mx-auto grid min-[665px]:grid-cols-[1fr_1fr] min-[1150px]:grid-cols-[1fr_1fr_1fr_1fr] gap-2 w-[70vw] mt-4 rounded-2xl overflow-hidden"
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
    </div> */}

    <PhotoGallery place={place} />
      
      <div className={"w-[70vw] gap-2 mx-auto grid grid-cols-[2fr_1fr] mt-8 "}>
        
        <CheckInOutMaxGuests checkIn={place.checkIn} checkOut={place.checkOut} MaxGuests={place.MaxGuests} description={place.description} />

        <div>
          <BookingWidget place={place} />
        </div>
      </div>

      <div className=" bg-white -mx-20 py-4 border-t">

        <div className={"w-[70vw] mx-auto"}>
          <PerksToDisplay perks={place.perks} />
          <h2 className="text-2xl font-semibold my-4">Extra Info</h2>
          <p>{place.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoPage;
