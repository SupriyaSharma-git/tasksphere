import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmail(parsedUser.email); // ✅ fix
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };
  return (
    <div className="bg-black text-white">
      {/* small screen */}
      <div className="w-full h-16 flex justify-between items-center md:hidden">
        <div className="ml-5 font-sans font-bold text-blue-700">Taskify</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-5 cursor-pointer"
        >
          <FaBars />
        </button>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex justify-between items-center bg-black text-white h-16">
        <div className="ml-5 font-sans font-bold text-blue-700">FocusHub</div>
        <div className="flex flex-1 justify-center space-x-20">
          <div className="cursor-pointer hover:underline">home</div>
          <div className="cursor-pointer hover:underline">About</div>
          <div className="cursor-pointer hover:underline">contact</div>
        </div>
        <div className="cursor-pointer hover:underline font-serif mr-2">
          {email}
        </div>
        <button
          className="bg-red-600 rounded-xl text-white px-3 py-1.5 font-bold cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {/* Mobile links (shown when open) */}
      {isOpen && (
        <div className="flex flex-col mt-2 space-y-2 p-2 md:hidden">
          <span className="cursor-pointer hover:underline font-serif mr-2">{email}</span>
          <span className="cursor-pointer hover:underline">Home</span>
          <span className="cursor-pointer hover:underline">About</span>
          <span className="cursor-pointer hover:underline">Contact</span>
          <button
            className="cursor-pointer text-red-600 flex"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
