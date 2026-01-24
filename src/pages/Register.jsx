import {RegisterForm} from "../components/RegisterForm";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate} from 'react-router-dom';

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate("/admin");
    } else if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // If user exists, navigation will happen
  // If user is null, we can safely render the form
  if (user) {
    return <div className="loading">Loading...</div>;
  }

  return <RegisterForm />;
}
