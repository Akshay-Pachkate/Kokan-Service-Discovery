import {Schema, model} from 'mongoose';


const placeSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    MaxGuests: Number,
    price: Number,
    dp: Number, 
});


const PlaceModel = model('Place', placeSchema);

export default PlaceModel;



