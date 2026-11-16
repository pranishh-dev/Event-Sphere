import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { House } from "lucide-react";

function App() {
  return (
    <main>
      <Navbar />
      <House/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
