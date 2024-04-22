/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import {differenceInCalendarDays} from "date-fns"
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const BookingWidget = ({place}) => {

    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [noOfGuest, setNoOfGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    
    const {user} = useContext(UserContext);
    useEffect(() => {
        if(user){
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookPlace = async () => {

        if(user){

            if(name && phone && noOfGuest && checkIn && checkOut){
                const booking = await axios.post('/booking', {
                    customer: user.id,
                    place: place._id,
                    checkIn: new Date(checkIn),
                    checkOut: new Date(checkOut),
                    noOfGuest,
                    bookingVal: numberOfNights * place.price,
                    phone
                })
                const bookingId = booking.data._id;
                setRedirect(`/account/booking/${bookingId}`);
            }else{
                alert("All Fields are Required");
            }
            
            
        }else{
            setRedirect("/login");
        }
    };


    if(redirect){
        return <Navigate to={redirect} />
    }


  return (
    <div className="bg-white rounded-2xl mb-6 py-2 px-6 overflow-hidden">
        <h2 className="text-xl flex items-center my-2 justify-start"><MdCurrencyRupee/> {place.price}  per night </h2>
        <div className="flex flex-col border rounded-2xl my-4 -mx-2">
            <div className="flex flex-wrap">
                <div className="flex-grow">
                <div className=" lg:border-r px-3 py-4 text-sm">
                    <label >Check In:</label> <br />
                    <input onChange={ev => setCheckIn(ev.target.value)} value={checkIn} placeholder="Add Date" type="Date" />
                </div>
                </div>

                <div className=" md:border-t flex-grow">
                <div className=" py-4 px-3 text-sm">
                    <label >Check Out:</label> <br/>
                    <input onChange={ev => setCheckOut(ev.target.value)} value={checkOut} placeholder="Add Date" type="Date" />
                </div>
                </div>
            </div>
            <div className="py-4 px-3 border-t">
                    <label >Number of Guests:</label>
                    <input value={noOfGuest} onChange={ev => setNoOfGuests(ev.target.value)} placeholder="1 guest" type="Number" />
            </div>

            {numberOfNights > 0 && (
                <div className="py-4 px-3 border-t">
                    <label >Name: </label>
                    <input value={name} onChange={ev => setName(ev.target.value)}  type="text" />

                    <label >Phone: </label>
                    <input value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone Number" type="tel" />
                </div>
            )}
        </div>

        <button onClick={bookPlace} className="primary flex justify-center items-center">
            Book this place
            <span className=" flex justify-center items-center"> {numberOfNights > 0 && (<> <span className="mx-1"> for </span> <MdCurrencyRupee/> {numberOfNights * place.price}</>)}</span>
        </button>

    </div>
  )
}

export default BookingWidget