import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import FAQPage from "scenes/FAQPage/FAQPage";
import ReportPage from "scenes/ReportPage/ReportPage";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import AllReportPage from "scenes/allReportPage/AllReportPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/generatereport"
              element={isAuth ? <ReportPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route 
              path="/generateAllPDF"
              element={isAuth ? <AllReportPage /> : <Navigate to="/" />}
              />
            <Route
              path="/faq"
              element={isAuth ? <FAQPage /> : <Navigate to="/" />}
            />
            {/* New route for creating a post */}
            <Route path="/create-post" element={<MyPostWidget />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;