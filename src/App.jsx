import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import HomePage  from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { House } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-orange-100 selection:text-[#E65100]">
      <Navbar />
      <div className=" flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
