import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate} from "react-router-dom";
import axios from "axios";
import NavLinks from "../components/NavLinks";

const AccountPage = () => {
  const { user, setUser, isUserInfoReady } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  
  let subPage = 'profile';



  if (!isUserInfoReady) {
    return <div className="text-5xl">loading...</div>;
  }

  if (!user && isUserInfoReady && !redirect) {
    return <Navigate to="/login" />;
  }



  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <NavLinks/>

      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <p>
            logged in as {user.name} ({user.email})
          </p>
          <br />
          <button
            onClick={logout}
            className=" bg-primary py-2 px-4 w-40 text-white rounded-full"
          >
            Logout
          </button>
        </div>
      )}



    </div>
  );
};

export default AccountPage;
