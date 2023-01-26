import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/styles/materialStyles";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import "./styles/global.css";
function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
