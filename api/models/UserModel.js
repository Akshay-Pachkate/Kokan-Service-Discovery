import { mongoose, Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type: String,
        isRequired: true,
    }, 
    email:{
        type: String,
        isRequired: true,
        unique: true,
    },
    password:{
        type: String,
        isRequired: true,
    }
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;