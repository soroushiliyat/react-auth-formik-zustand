import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Auth App</h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </button>
      </div>
      {token && (
        <p className="mt-4 text-sm text-gray-700">
          ✅ You are logged in with token: <span className="font-mono">{token}</span>
        </p>
      )}
    </div>
  );
}
