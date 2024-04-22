/* eslint-disable no-unused-vars */
import { useEffect, useContext, useState } from "react"
import NavLinks from "../components/NavLinks"
import axios from "axios";
import Spinner from "../components/Spinner";
import NightsCheckInOut from "../components/NightsCheckInOut";
import { MdCurrencyRupee } from "react-icons/md";
import { Navigate, redirect } from "react-router-dom";

const BookingsPage = () => {

  const [bookingInfo, setBookingInfo] = useState(null);
  const [redirect, setRedirect] = useState("");
  
  useEffect(() => {
    axios.get("/bookings").then(({data}) => {
      console.log(data);
      if(data){
        setBookingInfo(data.reverse());
      }else{
        return <Spinner/>
      }
    }).catch(err => console.log(err.message));
  }, []);

  if(redirect !== ""){
    return <Navigate to={`/account/booking/${redirect}`} />;
  }

  return (
    <div>
        <NavLinks />
        <h1 className="text-center text-3xl my-4">Your Bookings</h1>
        <div className="flex flex-col mx-auto w-full md:w-[80%] lg:w-[70%] gap-10">
           {bookingInfo && (
            bookingInfo.map(booking => 
            <div onClick={() => setRedirect(booking._id)} className="cursor-pointer bg-gray-300 mb-0 justify-start p-4 rounded-2xl flex flex-wrap-reverse overflow-hidden gap-5 items-center" key={booking._id}>
              
              
              <div className="aspect-[20/9] lg:aspect-[4/3] w-[100%] lg:w-[30%] flex flex-col justify-center align-middle rounded-2xl overflow-hidden ">
                <img className="object-cover h-full" src={`http://localhost:4000/uploaded-photos/${booking.place.photos[0]}`} alt="" />
              </div>




            <div className=" flex flex-col items-center">


            <div className=" flex-grow ">
                <h2 className="text-2xl font-semibold ">{booking.place.title}</h2>
                <NightsCheckInOut
                  nights={booking.bookingVal / booking.place.price}
                  checkIn={booking.checkIn}
                  checkOut={booking.checkOut}
                  checkInOutOnNextLine={true}
                />
            </div>




            <div className=" bg-primary text-center max-w-full self-start mt-4 flex flex-wrap items-center min-w-32 text-white rounded-2xl p-4">
              <h3 className="text-2xl whitespace-nowrap">Total Price:</h3>
              <h2 className="text-2xl flex items-center justify-center">
                {" "}
                <MdCurrencyRupee /> {booking.bookingVal}
              </h2>
            </div>



            </div>




              </div>
              )
           )}
          </div>
    </div>
  )
}

export default BookingsPage