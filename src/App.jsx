import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthProvider";
import Artistas from "./pages/Artistas";
import Generos from "./pages/Generos";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/app" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/app/artistas" element={<Artistas />} />
            <Route path="/app/generos" element={<Generos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
