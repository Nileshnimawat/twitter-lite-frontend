import { 
  useLocation, 
  Profile,
  MainLayout,
  EditProfile,
  FollowTabs,
  useParams,
  useNavigate
 } from "../utility/libs";

const UserProfile = () => {
  const location = useLocation();
  const { id } = useParams();
    const navigate = useNavigate();

  if(!loggedInUser) {
    navigate("/");
  }

  return (
    <MainLayout>
      {location.pathname === "/editprofile" && <EditProfile />}
      {(location.pathname.endsWith("/followers") || location.pathname.endsWith("/followings")) && <FollowTabs />}
      {location.pathname.startsWith("/profile/") && id && <Profile />}
    </MainLayout>
  );
};

export default UserProfile;
