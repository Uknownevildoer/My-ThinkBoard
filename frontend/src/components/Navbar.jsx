import { Link, useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight hover:underline focus:outline-none">ThinkBoard</Link>
        <div className="flex items-center gap-4">
          {token && user && (
            <span className="text-sm text-gray-500 mr-2">
              {user.username || user.email}
            </span>
          )}
          {token ? (
            <>
              <Link to="/profile" className="btn btn-ghost">Profile</Link>
              <Link to={"/create"} className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
