import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL;

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(removeUser());
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${baseURL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { _id, fullName, email, role } = data.data;

        dispatch(setUser({ _id, fullName, email, role, token }));
      } catch (error) {
        console.log("Invalid token");

        localStorage.removeItem("token");
        dispatch(removeUser());
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return isloading;
};

export default useLoadData;
