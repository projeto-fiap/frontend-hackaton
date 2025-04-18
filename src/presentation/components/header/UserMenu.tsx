import { useAuth } from "../../contexts/AuthContext"; // ajuste o caminho
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        <span>{user?.nome || "Usuário"}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
