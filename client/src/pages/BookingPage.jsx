import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NightsCheckInOut from "../components/NightsCheckInOut";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";
import { MdCurrencyRupee } from "react-icons/md";
import Spinner from "../components/Spinner";
import CheckInOutMaxGuests from "../components/CheckInOutMaxGuests";
import PerksToDisplay from "../components/PerksToDisplay";

const BookingPage = () => {
  const { id } = useParams();
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`/booking/${id}`)
      .then(({ data }) => {
        setBookingInfo(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  console.log(bookingInfo);

  if (!bookingInfo) {
    return <Spinner />;
  }

  return (
    <div className="w-[70vw] max-[800px]:w-full mx-auto">
      {bookingInfo && (
        <>
          <div className={"mt-4 w-[70vw] max-[800px]:w-full mx-auto py-2"}>
            <h1 className=" text-3xl ">{bookingInfo.place.title}</h1>
            <AddressLink address={bookingInfo.place.address} />
          </div>

          <div className="bg-gray-300 mb-0 p-4 rounded-2xl flex justify-between flex-wrap items-center">
            <div>
              <h2 className="text-2xl mb-2">Your Booking Details</h2>
              <NightsCheckInOut
                checkIn={bookingInfo.checkIn}
                checkOut={bookingInfo.checkOut}
                nights={bookingInfo.bookingVal / bookingInfo.place.price}
                checkInOutOnNextLine={false}
              />
            </div>
            <div className=" bg-primary text-center text-white rounded-2xl p-4">
              <h3 className="text-sm">Total Price</h3>
              <h2 className="text-2xl flex items-center justify-center">
                {" "}
                <MdCurrencyRupee /> {bookingInfo.bookingVal}
              </h2>
            </div>
          </div>
          <PhotoGallery className={" max-[800px]:aspect-20/9"} place={bookingInfo.place} />

          <div className="mt-4">
            <CheckInOutMaxGuests checkIn={bookingInfo.place.checkIn} checkOut={bookingInfo.place.checkOut} MaxGuests={bookingInfo.place.MaxGuests} description={bookingInfo.place.description} />
            <PerksToDisplay perks={bookingInfo.place.perks}/>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingPage;
