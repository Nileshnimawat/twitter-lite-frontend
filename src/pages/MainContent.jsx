import { 
  useGetAllTweets,
  MainLayout,
  MainFeed } from '../utility/libs';

const MainContent = () => {
    useGetAllTweets();
  return (
    <MainLayout>
      <MainFeed />
    </MainLayout>
  );
};

export default MainContent;

