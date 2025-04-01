import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input type="text" placeholder="Username" className="p-2 border mb-2" />
      <input type="password" placeholder="Password" className="p-2 border mb-2" />
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  );
}

export default Login;
