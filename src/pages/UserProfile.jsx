import { 
  useLocation, 
  Profile,
  MainLayout,
  EditProfile,
  FollowTabs,
  useParams,
 } from "../utility/libs";

const UserProfile = () => {
  const location = useLocation();
  const { id } = useParams();


 

  return (
    <MainLayout>
      {location.pathname === "/editprofile" && <EditProfile />}
      {(location.pathname.endsWith("/followers") || location.pathname.endsWith("/followings")) && <FollowTabs />}
      {location.pathname.startsWith("/profile/") && id && <Profile />}
    </MainLayout>
  );
};

export default UserProfile;
