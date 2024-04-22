import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import axios from "axios";
import Spinner from "../components/Spinner";
import PhotoCarousel from "../components/PhotoCarousel";


const IndexPage = () => {
  const [places, setPlaces] = useState([]);



  useEffect(() => {
    axios.get('/places').then(({data}) => {
      setPlaces(data);
    }).catch(error => console.log(error.message));
  }, []);
  

  

  if(places.length === 0){
    return <Spinner/>
  }

  

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-10 gap-x-6 mt-4">
        {places.length > 0 && (
          places.map((place, index) => (
            <div  key={place._id}>

              <PhotoCarousel length={places.length} place={place} index={index}/>


              <h2 className="font-semibold mt-4 mb-[1px] truncate">{place.address}</h2>
              <h3 className="truncate text-sm mb-0.5 text-gray-500">{place.title}</h3>
              
              <span className="flex gap-[1px] items-center">
              <MdCurrencyRupee/>
              <span className="mr-1  mt-[1.5px] text-black font-bold text-sm">{place.price}</span>
              <p className="mb-[0.5px] text-sm text-gray-500">per night</p>
              
              </span>
              
            </div>
          ))
        )}



      </div>
    </>
  );
};

export default IndexPage;
