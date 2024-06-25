import { useEffect, useState } from "react";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
import AUTH_URL from "../constants/localUrl";

function Auth({ title, subTitle, type, bottomText, next, onPress = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { email } = location.state || {};
  const [data, setData] = useState({
    email: email,
    password: null,
  });
  const [error, setError] = useState({
    email: null,
    password: null,
    api: null,
  });
  useEffect(() => {
    if (localStorage.getItem("id")) navigate("/dashboard");
    setError((prevState) => ({ ...prevState, api: null }));
  }, [this]);
  useEffect(() => {
    setTimeout(() => {
      setError((prevState) => ({ ...prevState, api: null }));
    }, 2000);
  }, [error.api]);
  const submit = () => {
    if (isDataValid(data, setError)) {
      if (type === "register") register(data, setError, setLoading, navigate);
      else login(data, setError, setLoading, navigate);
    }
  };
  return (
    <div className="w-full h-screen">
      <p className="text-4xl font-bold mb-5">
        <span className="text-orange-500">To</span>-<span>Do</span>
      </p>
      <p className="text-3xl font-semibold font-sans">{title}</p>
      <p className="my-8 text-sm text-gray-500">{subTitle}</p>
      {!!error.api && (
        <Alert
          severity={
            error.api == "Account create success, redirecting to login page..."
              ? "success"
              : "error"
          }
        >
          {error.api}
        </Alert>
      )}
      <Input
        placeholder="example@gmail.com"
        type="email"
        onInput={(e) => {
          setData((prevState) => ({ ...prevState, email: e.target.value }));
        }}
        disabled={loading}
        error={error.email}
        value={email}
        onFocus={() => setError((prevState) => ({ ...prevState, email: null }))}
      />
      <Input
        placeholder="*********"
        type="password"
        onInput={(e) => {
          setData((prevState) => ({ ...prevState, password: e.target.value }));
        }}
        error={error.password}
        onFocus={() =>
          setError((prevState) => ({ ...prevState, password: null }))
        }
        disabled={loading}
      />
      {type == "register" && (
        <>
          <div className="flex mt-5">
            <input
              type="checkbox"
              className="w-8 h-6 bg-pink-300 border-[2px] border-black rounded-2xl focus:ring-gray-500"
            />
            <span className="text-sm text-gray-500 underline">
              I agree to privacy policy & terms
            </span>
          </div>
        </>
      )}

      <button
        className={`my-5 ${
          !loading ? "bg-orange-500" : "bg-orange-300"
        } text-white w-full h-14 rounded-2xl`}
        onClick={() => {
          submit();
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Continue"}
      </button>
      <p className="text-sm text-gray-500">
        {bottomText[0]}{" "}
        <a className="text-orange-500 text-sm" href={`/${next}`}>
          {bottomText[1]}
        </a>
      </p>
    </div>
  );
}

const isDataValid = (data, setError) => {
  let isValid = true;
  if (!data?.email) {
    isValid = false;
    setError((prevState) => ({ ...prevState, email: "Email required" }));
  } else if (!data?.email.match(/\S+@\S+\.\S+/)) {
    isValid = false;
    setError((prevState) => ({ ...prevState, email: "Invalid email" }));
  }
  if (!data?.password) {
    isValid = false;
    setError((prevState) => ({ ...prevState, password: "Password required" }));
  } else if (data?.password?.length < 8) {
    isValid = false;
    setError((prevState) => ({ ...prevState, password: "Password too short" }));
  }
  return isValid;
};

const register = async (UserData, setError, setLoading, navigate) => {
  setLoading(true);
  try {
    const response = await fetch(AUTH_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", ...UserData }),
    });
    const data = await response.json();
    if (response.status > 500) {
      setError((prevState) => ({
        ...prevState,
        api: "Aww, our servers are down we are working to get it back up",
      }));
      return;
    }
    if (!response.ok) {
      console.log(data);
      Object.keys(data.error).forEach((key) => {
        console.log(key);
        setError((prevState) => ({ ...prevState, [key]: data.error[key] }));
      });
      return;
    }
    localStorage.setItem("id", data.id);
    setError((prevState) => ({
      ...prevState,
      api: "Account create success, redirecting to login page...",
    }));
    setTimeout(() => {
      navigate("/login", {
        state: {
          email: data.email,
        },
      });
    }, 3000);
    return;
  } catch (error) {
    setError((prevState) => ({ ...prevState, api: String(error.message) }));
  } finally {
    setLoading(false);
  }
};
const login = async (UserData, setError, setLoading, navigate) => {
  setLoading(true);
  try {
    const response = await fetch(AUTH_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", ...UserData }),
    });
    const data = await response.json();
    if (response.status > 500) {
      setError((prevState) => ({
        ...prevState,
        api: "Aww, our servers are down we are working to get it back up",
      }));
      return;
    }
    if (!response.ok) {
      Object.keys(data.error).forEach((key) => {
        console.log(key);
        setError((prevState) => ({ ...prevState, [key]: data.error[key] }));
      });
      return;
    }
    localStorage.setItem("id", data.id);
    navigate("/dashboard");
    return;
  } catch (error) {
    setError((prevState) => ({ ...prevState, api: String(error.message) }));
  } finally {
    setLoading(false);
  }
};
export default Auth;
