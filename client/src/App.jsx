import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import NewPlacesForm from "./pages/NewPlacesForm";
import BookingsPage from "./pages/BookingsPage";
import PlaceInfoPage from "./pages/PlaceInfoPage";
import BookingPage from "./pages/BookingPage";
import {SnackbarProvider} from "notistack";

// make default base url for axios
axios.defaults.baseURL = 'http://localhost:4000';

// allows cookie to be passed in the header
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <SnackbarProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account" element={<AccountPage/>} />  
          <Route path="/account/bookings" element={<BookingsPage/>} />  
          <Route path="/account/places" element={<PlacesPage/>} />  
          <Route path="/account/places/new" element={<NewPlacesForm/>} />  
          <Route path="/account/places/:id" element={<NewPlacesForm/>} />
          <Route path="/place/:id" element={<PlaceInfoPage/>} /> 
          <Route path="/account/booking/:id" element={<BookingPage/>}/>
        </Route>
      </Routes>
      </SnackbarProvider>
    </UserContextProvider>
  );
};

export default App;
