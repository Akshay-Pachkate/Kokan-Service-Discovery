import mongoose, { Schema } from "mongoose";


const BookingSchema = new mongoose.Schema({
    customer: {type: Schema.Types.ObjectId, isRequired: true, ref:'User'},
    place: {type: Schema.Types.ObjectId, isRequired: true, ref:'Place'},
    checkIn: Date,
    checkOut: Date,
    noOfGuest: Number,
    bookingVal: Number,
    phone: Number,
})


const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;