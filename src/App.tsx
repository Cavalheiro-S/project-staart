import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import "./styles/global.css";
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  )
}

export default App
