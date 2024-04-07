import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./About/AboutPage";
import AnimatedPage from "./AnimatedViewer/AnimatedPage";
import Freeview from "./Freeview/Freeview";
import Journey from "./Journey/Journey";
import LandingPage from "./LandingPage/LandingPage";
import ResourcesPage from "./Resources/ResourcesPage";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/ui/navbar";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-full flex flex-col relative">
          <Navbar />
          <Separator />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/journey" element={<Journey />} />
            <Route
              path="/viewer/:shape/:animation_type/:camPos/:variant/"
              element={<AnimatedPage />}
            />

            <Route path="/freeview" element={<Freeview />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            {/* TODO : page not found maybe */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
