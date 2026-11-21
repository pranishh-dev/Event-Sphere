import { Route, Routes, useLocation } from "react-router";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import { useCallback, useEffect, useState } from "react";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EventCard } from "./components/events/eventCard";
import EventDetailsPage from "./pages/EventDetailsPage";
import { Toaster } from "sonner";
import "./App.css"

function App() {
  

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }, [pathname]);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-orange-100 selection:text-[#E65100]">
      <Toaster position="top-right" richColors/>
      <ScrollToTop />
      <Navbar />
      <div className=" flex-1">
        <Routes>
          <Route path="/" element={<HomePage  />} />
          <Route path="/events/:slugId" element={<EventDetailsPage  />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
}

export default App;
