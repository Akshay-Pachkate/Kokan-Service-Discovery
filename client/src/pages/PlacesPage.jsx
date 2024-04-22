import { Link } from "react-router-dom";
import PlusIcon from "../components/icons/PlusIcon";
import NavLinks from "../components/NavLinks";
import { useEffect, useState } from "react";
import axios from "axios";
// import NewPlacesForm from "../components/NewPlacesForm";

const PlacesPage = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then((response) => {
      setPlaces(response.data);
    });
  }, []);


  return (
    <div>
      <NavLinks/>
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex bg-primary text-white px-4 py-2 rounded-full gap-2"
        >
          <PlusIcon />
          Add new place
        </Link>
      </div>

      <div>
        {places?.map((place) => {
          return(
            <Link to={`/account/places/${place._id}`} key={place.owner} >
              <div className=" bg-gray-200 rounded-2xl  mt-4 p-4 flex cursor-pointer">
               <div className="grow shrink-0" >
               {place.photos?.length > 0 && ( 
                  <img className="h-40 w-40 object-fill rounded-md" src={`http://localhost:4000/uploaded-photos/${place.photos[0]}`} alt="" />
                )}
               </div>
               <div className=" mx-3 grow-0 shrink">
                {<h2 className="text-2xl">{place.title}</h2>}
                {<p className="mt-2 text-sm">{place.description}</p>}
               </div>
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  );
};

export default PlacesPage;
