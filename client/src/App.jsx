import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddQuiz,
  AllQuizzes,
  Profile,
  Quiz,
  EditQuiz,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as deleteQuizAction } from "./pages/DeleteQuiz";
import { loader as editQuizLoader } from "./pages/EditQuiz";
import { loader as runQuizLoader } from "./pages/Quiz";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as quizzesLoader } from "./pages/AllQuizzes";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddQuiz />,
          },
          {
            path: "all-quizzes",
            element: <AllQuizzes />,
            loader: quizzesLoader,
          },
          {
            path: "edit-quiz/:id",
            element: <EditQuiz />,
            loader: editQuizLoader,
          },
          {
            path: "run-quiz/:id",
            element: <Quiz />,
            loader: runQuizLoader,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          { path: "delete-quiz/:id", action: deleteQuizAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
