import { createBrowserRouter, Navigate } from "react-router";
import {
  AdminSubjectsView,
  AdminUsersView,
  AdminView,
  AllUsersView,
  Auth,
  HomeContent,
  ItemProfessorSpecificGroupStudentsInfo,
  LoginView,
  ProfesorView,
  ProfessorGroupsView,
  ProfessorResourceView,
  ProfessorSectionsView,
  RegisterInfoView,
  RegisterView,
  StudentCurrentSubjectView,
  StudentSubjectsView,
  StudentView,
} from "..";
import { ProtectedRoute } from "./protected.route";
import { NotAutorizedRoute, NotFoundError } from "../common";
import { StudentProtectedRoute } from "./student.protected.route";
import { AdminProtectedRoute } from "./admin.protected.route";
import { ProfessorProtectedRoute } from "./professor.protected.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
      {
        path: "info",
        element: <RegisterInfoView />,
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomeContent />,
        children: [
          {
          path: "student",
          element: (
            <StudentProtectedRoute>
              <StudentView />
            </StudentProtectedRoute>
          ),
            children: [
              {
                index: true,
                element: <AllUsersView />,
              },
              {
                path: "enabledSubjects",
                element: <StudentSubjectsView/>
              },
              {
                path: "subject/:currentSubject",
                element: <StudentCurrentSubjectView/>
              },
            ],
          },
          {
            path: "professor",
            element: (
              <ProfessorProtectedRoute>
               <ProfesorView />
              </ProfessorProtectedRoute>
            ),
            children: [
              {
                index: true,
                element: <AllUsersView />,
              },
              {
                path: "sections",
                element: <ProfessorSectionsView/>,
              },
              {
                path: "groups",
                element: <ProfessorGroupsView/>,
              },
              {
                path: "resources",
                element: <ProfessorResourceView/>,
              },
              {
                path: "group/:specificGroupInfo",
                element: <ItemProfessorSpecificGroupStudentsInfo/>,
              },
            ],
          },
          {
            path: "admin",
            element: (
              <AdminProtectedRoute>
                <AdminView />,
              </AdminProtectedRoute>
            ),
            children: [
              {
                index: true,
                element: <AllUsersView />,
              },
              {
                path: "users",
                element: <AdminUsersView />,
              },
              {
                path: "signatures",
                element: <AdminSubjectsView />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/not_autorized",
    element: <NotAutorizedRoute/>,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);

export default router;
