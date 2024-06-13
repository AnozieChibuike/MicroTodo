import { useState } from "react";
import Auth from "../components/auth";
import { useNavigate } from "react-router-dom";
function Landing({ type }) {
  const navigate = useNavigate();
  const signUpBottom = ["Already have an account?", "Sign in instead"];
  const signInBottom = ["Don't have an account?", "Sign up instead"];
  return (
    <>
      {type == "register" ? (
        <>
          <Auth
            title="Create Account👋"
            subTitle="Please register on our Streamline, where you can continue using our service."
            next="login"
            type="register"
            bottomText={signUpBottom}
            onPress={() => navigate('/dashboard')}
          />
        </>
      ) : (
        <>
          <Auth
            title="Sign in"
            subTitle="Please sign in to continue using our service."
            next="register"
            type="login"
            bottomText={signInBottom}
            onPress={() => navigate('/dashboard')}
          />
        </>
      )}
    </>
  );
}

export default Landing;
