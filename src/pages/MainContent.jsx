import { 
  useGetAllTweets,
  MainLayout,
  MainFeed 
} from '../utility/libs';

import LoadingSpinner from '../components/LoadingSpinner'; // Make sure this exists

const MainContent = () => {
  const { loading } = useGetAllTweets();

  return (
    <MainLayout>
      {loading ? <LoadingSpinner /> : <MainFeed />}
    </MainLayout>
  );
};

export default MainContent;


