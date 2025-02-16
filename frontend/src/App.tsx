import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./utils/Loader";
import { ErrorBoundary } from "react-error-boundary";
import { AddNew, Auth_Page, Home, Layout } from "./utils/LazyLoading";
import ProtectedRoutes from "./contextapi/ProtectedRoutes";
import "./App.css"
import {ROUTES} from "./utils/routes"
function Fallback({ error }: { error: Error }) {
  let fileName = "Unknown";
  if (error.stack) {
    const regex = /\((.*?):\d+:\d+\)/;
    const match = error.stack.match(regex);

    if (match) {
      const filePath = match[1];
      fileName = filePath.substring(
        filePath.lastIndexOf("/") + 1,
        filePath.indexOf("?")
      );
    }
  }
  return (
    <div
      role="alert"
      className="bg-red-800 flex flex-column w-full h-screen justify-content-center align-items-center"
    >
      <p className="text-white text-5xl text-600">Something went wrong:</p>
      <pre
        style={{ color: "yellow", backgroundColor: "green", padding: "5px" }}
      >
        {error.message}
      </pre>
      <pre
        style={{ color: "yellow", backgroundColor: "green", padding: "5px" }}
      >
        File: {fileName}
      </pre>
    </div>
  );
}
const App = () => {
  return (
    <>
      <Router>
        <Suspense
          fallback={
            <>
              <div
                style={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader />
              </div>
            </>
          }
        >
          <ErrorBoundary FallbackComponent={Fallback}>
          <AppRoutes />
          </ErrorBoundary>
        </Suspense>
      </Router>
    </>
  );
};
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.AUTH} element={<Auth_Page/>} />
        <Route path={"/"} element={<ProtectedRoutes element={<Layout/>}/>}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ADDNEW} element={<AddNew />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
