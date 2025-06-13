import { 
  useNavigate, 
  NavLink, 
  useState,
  axios,
  toast,
  logo } from "../utility/libs";


import { SIGNUP } from "../utility/constants";


const Register = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post(SIGNUP,{
        name,
        username,
        email,
        password
    },{
      withCredentials: true 
    })

    console.log(response);
    toast.success(response.data.message);
    navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong")
    }
    setName("");
    setPassword("");
    setEmail("");
    setUsername("");
  };



  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-60  flex  items-center justify-center z-50">
      <div className="bg-black text-white rounded-2xl p-8 w-full max-w-lg relative flex flex-col items-center">
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <img src={logo} alt="" className="w-50 h-auto " />

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            maxLength={25}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
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
            Submit
          </button>
        </form>
                <div className="mt-4">
          Already Registered? 
          <NavLink to={"/login"} className="text-blue-500"> Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
