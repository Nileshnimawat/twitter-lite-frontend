
import { 
  NavLink, 
  Outlet, 
  logo } from '../utility/libs';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white font-sans relative">
     
      <div className=" sm:flex sm:flex-1 items-center justify-center">
        <img src={logo} alt="logo" className=" font-bold text-gray-300 w-[20%] sm:w-[50%] md:w-[90%] lg:w-[70%] h-auto" />
      </div>

  
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Happening now</h1>
        <h2 className="text-2xl font-bold mb-6">Join today.</h2>

        {/* Create Account */}
        <NavLink to="/register" className="w-full max-w-sm text-center bg-blue-500 text-white rounded-full py-4 font-bold hover:bg-blue-600 transition">
          Create account
        </NavLink>

        <p className="text-xs text-gray-500 mt-2 w-full max-w-sm text-center">
          By signing up, you agree to the <NavLink to="/" className="text-blue-500 underline">Terms of Service</NavLink> and
          <NavLink to="/" className="text-blue-500 underline"> Privacy Policy</NavLink>, including
          <NavLink to="/" className="text-blue-500 underline"> Cookie Use</NavLink>.
        </p>

        {/* Sign In */}
        <div className="mt-10 text-center w-full max-w-sm flex flex-col items-center gap-0.5">
          <p className="text-gray-400 mb-2">Already have an account?</p>
          <NavLink to="/login" className="w-45 block border border-gray-500 text-white text-center py-2 rounded-full hover:bg-gray-800 transition">
            Sign in
          </NavLink>
        </div>
      </div>

      {/* Register modal will appear here if /register is active */}
      <Outlet />
    </div>
  );
};

export default Home;

