import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState("");

  const handleCancel = () => {
    navigate(-1);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.phone || !formData.name) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Enter a valid email");
      return;
    }
    if (formData.password.length < 6 ) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.phone.length != 10 || !/^\+?\d{10,13}$/.test(formData.phone)) {
      setError("Provide a valid Phone number");
      return;
    }

    setError("");
    alert("Form is valid, proceed with login!");
    
    try {
      const res = await fetch(`https://tasksphere-qjf5.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#f5f5f3] p-5 h-auto w-full sm:w-2/3 md:w-1/2 lg:w-2/6 shadow-2xl">
        <div
          className="h-10 w-10 flex justify-center items-center hover:bg-white cursor-pointer ml-auto"
          onClick={handleCancel}
        >
          X
        </div>
        <h1 className="text-2xl font-semibold font-serif p-2">Sign Up</h1>
        <div className="flex p-2 w-full">
          <button className="text-white bg-green-700 font-bold p-2 cursor-pointer hover:bg-green-600 rounded m-1 w-1/2">
            Sign Up
          </button>
          <button
            className="text-white bg-green-700 font-bold p-2 cursor-pointer hover:bg-green-600 rounded m-1 w-1/2"
            onClick={goToLogin}
          >
            Login
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <div className="flex flex-col my-1">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                placeholder="Alice"
                name="name"
                onChange={handleChange}
                className="bg-white focus:outline-none p-2 m-2 ml-0"
              />
            </div>
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
                type="text"
                name="password"
                onChange={handleChange}
                placeholder=".........."
                className="bg-white focus:outline-none p-2 m-2 ml-0"
              />
            </div>
            <div className="flex flex-col my-1">
              <label className="font-semibold">Phone</label>
              <input
                type="text"
                placeholder="9075XXXXXX"
                name="phone"
                onChange={handleChange}
                className="bg-white focus:outline-none p-2 m-2 ml-0"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <button
            className="text-white bg-green-700 font-bold w-2/2 p-2 cursor-pointer hover:bg-green-600 rounded my-1"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="flex p-2">
          <p>Already have account ?</p>
          <a className="text-blue-600 underline cursor-pointer" onClick={goToLogin}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
