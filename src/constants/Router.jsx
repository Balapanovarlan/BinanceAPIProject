import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout/PageLayout";
import { PageRoutes } from "./PageRoutes";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: PageRoutes.COMMON.MAIN,
                element: <Home />,
            },
            {
                path: PageRoutes.AUTH.LOGIN,
                element: <Auth/>
            },
        ],
    }
]);

export default Router;