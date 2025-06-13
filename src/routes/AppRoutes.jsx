import {
  Routes,
  Route,
  Home,
  Register,
  Login,
  MainContent,
  UserProfile,
  PrivateRoute
} from "../utility/libs";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/tweets"
        element={
          <PrivateRoute>
            <MainContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/follower"
        element={
          <PrivateRoute>
            <MainContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/following"
        element={
          <PrivateRoute>
            <MainContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/liked"
        element={
          <PrivateRoute>
            <MainContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/editprofile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/:id/followers"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/:id/followings"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
