import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const goToSignup = () => {
    navigate("/signup"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Enter a valid email");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    alert("Form is valid, proceed with login!");
    console.log("Form submitted:", formData);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Logged in successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        alert(data.error || "Login Falied");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("something went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f3f4f6]">
      <div className="bg-[#f5f5f3] p-5 h-auto w-full sm:w-2/3 md:w-1/2 lg:w-2/7 shadow-2xl">
        <h1 className="text-2xl font-semibold font-serif p-2">Log in</h1>

        {/* Buttons */}
        <div className="flex p-2 w-full">
          <button className="text-white bg-green-700 font-bold p-2 cursor-pointer hover:bg-green-600 rounded m-1 w-1/2">
            Login
          </button>
          <button
            className="text-white bg-green-700 font-bold p-2 cursor-pointer hover:bg-green-600 rounded m-1 w-1/2"
            onClick={goToSignup}
          >
            Sign Up
          </button>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <div className="flex flex-col my-1">
              <label className="font-semibold">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Alice@gmail.com"
                className="bg-white focus:outline-none p-2 m-2 ml-0"
              />
            </div>
            <div className="flex flex-col my-1">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder=".........."
                className="bg-white focus:outline-none p-2 m-2 ml-0"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}


          <button
            className="w-full text-white bg-green-700 font-bold p-2 w-2/2 cursor-pointer hover:bg-green-600 rounded my-2"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="flex p-2">
          <p>Need an account ?</p>
          <a onClick={goToSignup} className="text-blue-600 underline cursor-pointer">
            create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
