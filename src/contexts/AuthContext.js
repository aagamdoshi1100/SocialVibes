import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    auth: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: "",
    },
    isLoggedIn: false,
    isNewUser: false,
    newUser: null,
    isValid: false,
    errors: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: "",
      message: "",
    },
  });
  const navigate = useNavigate();
  console.log(user, "31");
  const signUphandler = async () => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.auth.email,
          password: user.auth.password,
          username: user.auth.username,
          firstname: user.auth.firstname,
          lastname: user.auth.lastname,
          profileIcon: "https://shorturl.at/tyEJ9",
        }),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        const { token, createdUser } = responseData.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", createdUser.username);
        localStorage.setItem("userId", createdUser._id);
        localStorage.setItem("followings", createdUser.username);
        setUser({
          ...user,
          auth: {
            email: "",
            password: "",
            username: "",
            firstname: "",
            lastname: "",
          },
          name: createdUser.username,
          isLoggedIn: true,
          isNewUser: true,
          newUser: createdUser,
        });
        navigate("/pages/Avtar/Avtar");
      } else if (response.status === 409) {
        setUser({
          ...user,
          errors: {
            ...user.errors,
            message: responseData.message,
          },
        });
      }
    } catch (e) {
      console.error({ e: e.message });
    }
  };
  const loginHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.auth.username,
          password: user.auth.password,
        }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        const { loggedInUser, token } = responseData;
        localStorage.setItem("token", token);
        localStorage.setItem("username", loggedInUser.username);
        localStorage.setItem("userId", loggedInUser._id);
        localStorage.setItem("followings", loggedInUser.username);
        setUser({
          ...user,
          name: user.auth.username,
          isLoggedIn: true,
          errorMessage: "",
        });
        navigate("/pages/UserFeed/UserFeed");
      } else if (response.status === 404) {
        setUser({
          ...user,
          errors: {
            ...user.errors,
            message: `User not exist. Please signup`,
          },
        });
      } else if (response.status === 401) {
        setUser({
          ...user,
          errors: {
            ...user.errors,
            message: "Invalid credentials",
          },
        });
      }
    } catch (e) {
      console.log("🚀 ~ file: AuthContext.js:13 ~ loginHandler ~ e:", e);
    }
  };

  const validate = (val, type) => {
    switch (type) {
      case "email":
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? setUser({
              ...user,
              errors: { ...user.errors, email: "" },
              auth: { ...user.auth, email: val },
            })
          : setUser({
              ...user,
              errors: {
                ...user.errors,
                email: "Please enter valid email id",
              },
            });
        break;
      case "username":
      case "lastname":
      case "firstname":
        console.log(type, val, "150");
        setUser({
          ...user,
          auth: { ...user.auth, [type]: val },
        });
        break;
      case "password":
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/.test(val)
          ? setUser({
              ...user,
              errors: { ...user.errors, password: "" },
              auth: { ...user.auth, password: val },
            })
          : setUser({
              ...user,
              errors: {
                ...user.errors,
                password: "Req 8 chars with lower,upper,number & special char",
              },
            });
        break;
      case "confirm_password":
        user.auth.password == val
          ? setUser({
              ...user,
              errors: { ...user.errors, confirm_passowrd: "" },
              auth: { ...user.auth, password: val },
            })
          : setUser({
              ...user,
              errors: {
                ...user.errors,
                confirm_passowrd: "Password not matching",
              },
            });
        break;
      case "call":
        if (
          user.errors.email === "" &&
          user.errors.firstname === "" &&
          user.errors.lastname === "" &&
          user.errors.username === "" &&
          user.errors.confirm_passowrd === ""
        ) {
          signUphandler();
        }
        break;
      case "signInCall":
        if (user.errors.username === "" && user.errors.password === "") {
          loginHandler();
        }
        break;
      default:
        setUser(user);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("followings");
    setUser({
      ...user,
      name: "",
      auth: { ...user.auth, username: "", password: "" },
      isLoggedIn: false,
    });
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        navigate,
        loginHandler,
        user,
        setUser,
        logOutHandler,
        setUser,
        signUphandler,
        validate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
