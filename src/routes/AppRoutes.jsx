import {
  Routes,
  Route,
  Home,
  Register,
  Login,
  MainContent,
  UserProfile,
  MainLayout,
} from "../utility/libs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      
      <Route path="/tweets" element={<MainContent />} />
      <Route path="/follower" element={<MainContent />} />
      <Route path="/following" element={<MainContent />} />
      <Route path="/liked" element={<MainContent />} />
      <Route path="/editprofile" element={<UserProfile />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/:id/followers" element={<UserProfile />} />
      <Route path="/:id/followings" element={<UserProfile />} />
      <Route path="/explore" element={<MainLayout />} />

    </Routes>
  );
};

export default AppRoutes;
