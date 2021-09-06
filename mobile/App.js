import React from "react";

import { AuthProvider } from "./src/context/auth/auth.context";
import Navigation from "./src/Screens/Navigation";

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
