import { useGetAllTweets, MainLayout, MainFeed } from "../utility/libs";

import Loader from "../components/layout/Loader";

const MainContent = () => {
  const { loading } = useGetAllTweets();

  useGetAllTweets();

  return <MainLayout>{loading ? <Loader /> : <MainFeed />}</MainLayout>;
};

export default MainContent;
