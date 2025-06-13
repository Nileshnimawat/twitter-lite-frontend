import 
{  
  useDispatch, 
  NavLink, 
  useNavigate,
  toast,
  axios,
  useState,
  logo
   } from "../utility/libs";

import { LOGIN } from "../utility/constants";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN, {
        email,
        password,
      },{ withCredentials: true });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/tweets");
        window.location.reload();
      }, 200);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setPassword("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black flex items-center flex-col text-white rounded-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <img src={logo} alt="Logo" className="w-50 h-auto" />

        <h2 className="text-center text-xl font-bold mb-6">
          Login to your account
        </h2>

        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-700 rounded pr-10 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="w-full bg-white text-black font-bold rounded-full py-2 hover:bg-gray-300">
            Login
          </button>
        </form>

        <div className="mt-8">
          Don’t have an account?{" "}
          <NavLink to={"/register"} className="text-blue-500">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
