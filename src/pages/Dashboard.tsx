// src/pages/Dashboard.tsx
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
      <p className="mb-6">You are successfully logged in.</p>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;