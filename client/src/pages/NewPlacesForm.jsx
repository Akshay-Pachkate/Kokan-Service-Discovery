import { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const NewPlacesForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState(9);
  const [checkOutTime, setCheckOutTime] = useState(22);
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(5000);
  const [redirect, setRedirect] = useState(false);

  const preInput = (title, description) => {
    return (
      <>
        <h2 className="text-2xl ml-2 mt-4">{title}</h2>
        <p className="text-sm text-gray-600 ml-2 -mb-1">{description}</p>
      </>
    );
  };

  useEffect(() => {
    axios
      .get(`/places/${id}`)
      .then(({ data }) => {

        if(data)
          console.log(data);

        if(data.title) 
          setTitle(data.title);

        if(data.description) 
          setDescription(data.description);

        if(data.extraInfo) 
          setExtraInfo(data.extraInfo);

        if(data.photos) 
          setAddedPhotos(data.photos);

        if(data.perks) 
          setPerks(data.perks);

        if(data.checkIn) 
          setCheckInTime(data.checkIn);

        if(data.checkOut) 
          setCheckOutTime(data.checkOut);

        if(data.MaxGuests) 
          setMaxGuest(data.MaxGuests);

        if(data.address) 
          setAddress(data.address);

        if(data.price) 
          setPrice(data.price);

        console.log("all done");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const savePlace = async (event) => {
    event.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuest,
      price,
    };

    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      await axios.post("/places", placeData);
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <form
      onSubmit={savePlace}
      className="max-w-[95%] md:max-w-[60%] sm:max-w-[90%] mx-auto"
    >
      <div>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy like advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="write title here"
        />
      </div>

      <div>
        {preInput("Address", "Address to the place")}

        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="write address here"
        />
      </div>

      <PhotosUploader
        addedPhotos={addedPhotos}
        setAddedPhotos={setAddedPhotos}
      />

      <div className="mt-10">
        {preInput("Description", "describe the place")}
        <textarea
          rows="6"
          placeholder="..."
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
      </div>

      <Perks selectedPerks={perks} onChange={setPerks} />

      <div className="mt-10">
        {preInput("Extra Info", "house rules ets...")}

        <textarea
          rows="6"
          placeholder="..."
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>
      </div>

      <div className="mt-10">
        {preInput(
          "Check IN, check OUT and Price",
          "Add check in and out times, remember to have a window for cleaning the rooms"
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          <div>
            <h3 className="text-gray-900 text-sm ml-3 -mb-1">Check in time</h3>
            <input
              value={checkInTime}
              onChange={(ev) => setCheckInTime(ev.target.value)}
              type="number"
              placeholder="10"
            />
          </div>

          <div>
            <h3 className="text-gray-900 text-sm ml-3 -mb-1">Check out time</h3>
            <input
              value={checkOutTime}
              onChange={(ev) => setCheckOutTime(ev.target.value)}
              type="number"
              placeholder="19"
            />
          </div>

          <div>
            <h3 className="text-gray-900 text-sm ml-3 -mb-1">
              Max number of guest
            </h3>
            <input
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              type="number"
              placeholder="Some number"
            />
          </div>

          <div>
            <h3 className="text-gray-900 text-sm ml-3 -mb-1">Price</h3>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
              placeholder="Some number"
            />
          </div>
        </div>
      </div>

      <button className="primary my-4 py-3">Save</button>
    </form>
  );
};

export default NewPlacesForm;
