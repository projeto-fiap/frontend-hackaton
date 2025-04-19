import { AppRouter } from "./presentation/router";
import { AuthProvider } from "./presentation/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
