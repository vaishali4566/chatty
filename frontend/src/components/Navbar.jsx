import { RiMessage3Fill } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full px-8 py-4 border-b shadow-sm">
      <div className="flex items-center gap-10">
        
        {/* Left: Navigation */}
        <ul className="flex gap-8 items-center shrink-0 text-sm font-medium">
          <li className="text-lg font-bold">
            <Link to="/" className="hover:text-red-600 transition">LOGO</Link>
          </li>
          <li><Link to="/" className="hover:text-red-600 transition">Home</Link></li>
          <li><Link to="/today" className="hover:text-red-600 transition">Today</Link></li>
          <li><Link to="/create" className="hover:text-red-600 transition">Create</Link></li>
        </ul>

        {/* Middle: Search */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border border-red-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        {/* Right: Icons */}
        <div className="flex gap-6 items-center shrink-0">
          <Link to="/notification" className="hover:text-red-600 transition">
            <IoNotificationsOutline className="size-6" />
          </Link>
          <Link to="/message" className="hover:text-red-600 transition">
            <RiMessage3Fill className="size-6" />
          </Link>
          <Link to="/profile" className="hover:text-red-600 transition">
            <FaUserCircle className="size-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
