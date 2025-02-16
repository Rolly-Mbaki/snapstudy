import { SignedOut, SignInButton, SignedIn, UserButton, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";

function App() {
  // send token with each request

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/ss-callback"
          element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"}/>}
        />
        <Route path="auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  )
}

export default App
