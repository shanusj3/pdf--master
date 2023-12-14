import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppBar />
      <main>
        <Toaster position="top-center" />
        {<Outlet />}
      </main>
    </>
  );
}

export default App;
