import { useGetAllTweets, MainLayout, MainFeed } from "../utility/libs";

import Loader from "../components/layout/Loader";

const MainContent = () => {
  useGetAllTweets();

  return (
    <MainLayout>
      <MainFeed />
    </MainLayout>
  );
};

export default MainContent;
