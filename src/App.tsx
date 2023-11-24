import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import Navbar from "./navbar";
import Viewer from "./Viewer";
import ChallengesPage from "./Challenges/ChallengesPage";
import AboutPage from "./About/AboutPage";
import ResourcesPage from "./Resources/ResourcesPage";
import { Toaster } from "./components/ui/toaster";
import Freeview from "./Freeview/Freeview";
import AnimatedView from "./AnimatedTemp/AnimatedView";
import AnimatedPage from "./AnimatedTemp/AnimatedPage";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className="h-full flex flex-col relative">
                    <Navbar />
                    <Separator />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/challenges"
                            element={<ChallengesPage />}
                        />
                        {/* <Route
                            path="/viewer/:shape/:camPos/:rotation_axis/"
                            element={<Viewer />}
                        /> */}

                        <Route
                            path="/viewer/:shape/:camPos/:animation_type/:variant/"
                            element={<AnimatedPage />}
                        />
                        <Route path="/freeview" element={<Freeview />} />
                        <Route path="/animated" element={<AnimatedPage />} />
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
