import { createBrowserRouter } from "react-router-dom";
import MyForm from "./components/forms/MyForm";
import About from "./components/About";
import Contact from "./components/Contact";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <MyForm />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/contact",
        element: <Contact />
    }
]);

export default router;