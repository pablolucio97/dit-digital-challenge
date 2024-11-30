import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums from "../pages/Albums";
import Photos from "../pages/Photos";
import Users from "../pages/Users";

const appRoutes = [
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/albums",
    element: <Albums />,
  },
  {
    path: "/photos",
    element: <Photos />,
  },
];

const appRouter = createBrowserRouter(appRoutes);

const AppRouter: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRouter;
