import { createBrowserRouter, redirect } from "react-router-dom";
import { getAuth } from "../api/account";
import { CreateAccount, Login } from "./main";

export const authLoader =
  ({ isPrivate }: { isPrivate: boolean }) =>
  async () => {
    if (isPrivate) {
      return getAuth()
        .then(() => {
          return null;
        })
        .catch(() => {
          history.replaceState(null, "", "/");
          return redirect("/");
        });
    } else {
      return getAuth()
        .then(() => {
          history.replaceState(null, "", "/dashboard/users");
          return redirect("/dashboard/users");
        })
        .catch(() => {
          return null;
        });
    }
  };

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/signup",
        element: <CreateAccount />,
      },
    ],
    loader: authLoader({ isPrivate: false }),
  },
]);
