import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config"; // to properly get the MONGO_URL value from .env file
import UserModel from "./models/UserModel.js";
import PlaceModel from "./models/PlacesModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import path, { resolve } from "path";
import BookingModel from "./models/BookingModel.js";
const __dirname = path.resolve();

const app = express();
const PORT = 4000;
const photosMiddleWare = multer({ dest: "uploads/" });
const bcryptSalt = await bcrypt.genSaltSync(8);
const jwtSecret = "dioadkjaiodermkqweopjskcmjdlksfjwoief";

app.use(express.json()); // to support JSON-encoded bodies

app.use(cookieParser());
app.use("/uploaded-photos", express.static(path.join(__dirname, "/uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("successfully connected to database");
} catch (error) {
  console.log(error);
}


const getUserDataFromToken = async (req) => {
  try {
    const userData = await jwt.verify(req.cookies.token, jwtSecret);
    return userData;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(422).json(error.message);
  }
});
// q0MaWg9Az7U6mcZH

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await UserModel.findOne({ email });
  // console.log(userDoc);

  if (userDoc) {
    const isPassOk = bcrypt.compareSync(password, userDoc.password);

    if (isPassOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(404).json("pass not ok");
    }
  } else {
    res.status(404).json("Not Found");
  }
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "Photo_" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json({ newName });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;

      const { name, email, id } = await UserModel.findById(userData.id);

      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

// https://www.npmjs.com/package/multer
app.post("/uploads", photosMiddleWare.array("photos", 100), (req, res) => {
  const newFileNames = [];
  req.files.forEach((file) => {
    const { path } = file;
    const ext = file.originalname.split(".").slice(-1);
    const newPath = path + "." + ext;
    const newName = file.filename + "." + ext;
    newFileNames.push(newName);
    fs.renameSync(path, newPath);
  });
  res.json(newFileNames);
});

app.post("/places", (req, res) => {
  try {
    const { token } = req.cookies;
    const {
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
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const user = await UserModel.findById(userData.id);

      const placeDoc = await PlaceModel.create({
        owner: user.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn: checkInTime,
        checkOut: checkOutTime,
        maxGuest,
        price,
        dp: 0,
      });

      res.json(placeDoc);
    });
  } catch (error) {
    res.json({ error });
  }
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const userDoc = await PlaceModel.find({ owner: userData.id });
    res.json(userDoc);
  });
});


app.get('/places', async (req, res) => {
  try{
    res.json(await PlaceModel.find({}));
  }catch(error){
    console.log(error.message);
    res.json({error: error.message});
  }
})


app.get("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const placeData = await PlaceModel.findById(id);
    res.json(placeData);
  } catch (error) {
    res.json(error);
  }
});

app.put("/places", (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuest,
      price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const placeDoc = await PlaceModel.findById(id);
      if(userData.id === placeDoc.owner.toString()){
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn: checkInTime,
          checkOut: checkOutTime,
          MaxGuests: maxGuest,
          price
        })
        const response = await placeDoc.save();
      }
      // console.log(userData.id === placeDoc.owner());
      res.json("ok");
    });
  } catch (error) {
    res.json(error);
  }
});




app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);
    const bookings = await BookingModel.find({customer: userData.id}).populate('place');
    res.json(bookings);
  } catch (error) {
    res.json({message: error.message})
  }
})




app.post('/booking', async (req, res) => {
  try{
    const {
      customer,
      place,
      checkIn,
      checkOut,
      noOfGuest,
      bookingVal, 
      phone
    } = req.body;
    
    const booking = await BookingModel.create({
      customer,
      place,
      checkIn,
      checkOut,
      noOfGuest,
      bookingVal, 
      phone,
    })

    res.json(booking);
  }catch(error){
    console.log(error);
    res.json(error.message);
  }

})





app.get('/booking/:id', async (req, res) => {
 try{
  const userData = await getUserDataFromToken(req);
  const {id} = req.params;
  const bookingInfo = await BookingModel.findById(id).populate('place');
  // console.log(id, bookingInfo);
  // console.log(userData.id, bookingInfo.customer.toString());
  if(userData.id === bookingInfo.customer.toString()){
    res.json(bookingInfo);
  }else{
    res.json("Invalid User");
  }
 }catch(error){
  console.log(error.message);
  res.json(error);
 }

})




app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(PORT, (req, res) => {
  console.log(`listening at port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.json("test ok");
});
