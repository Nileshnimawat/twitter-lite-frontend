import {useGetAllUsers, useGetLoggedInUser} from './utility/libs'
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './utility/libs';

const App = () => {

useGetLoggedInUser();
useGetAllUsers();
  return (
    <>
      <AppRoutes />
      <Toaster/>
    </>
  );
};

export default App;

