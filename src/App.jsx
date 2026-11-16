import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home} from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { House } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
