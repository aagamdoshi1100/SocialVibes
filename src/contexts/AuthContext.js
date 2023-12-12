import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      errorEmail: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirm_passowrd: "",
    },
  });
  const navigate = useNavigate();

  const signUphandler = async () => {
    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: user.auth.email,
          password: user.auth.password,
          username: user.auth.username,
          firstName: user.auth.firstname,
          lastName: user.auth.lastname,
          profileIcon: "https://shorturl.at/tyEJ9",
        }),
      });
      if (response.status === 422) {
      } else if (response.status === 201) {
        const { encodedToken, createdUser } = await response.json();
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("Username", createdUser.username);
        localStorage.setItem("Followings", createdUser.username);
        setUser({
          ...user,
          name: createdUser.username,
          isLoggedIn: true,
          errorMessage: "",
          isNewUser: true,
          newUser: createdUser,
        });
        navigate("/pages/Avtar/Avtar");
      }
    } catch (e) {
      console.log("🚀 ~ file: AuthContext.js:20 ~ signUphandler ~ e:", e);
    }
  };
  const loginHandler = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: user.auth.username,
          password: user.auth.password,
        }),
      });
      if (response.status === 404) {
      } else if (response.status === 200) {
        const { encodedToken } = await response.json();
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("Username", user.auth.username);
        localStorage.setItem("Followings", user.auth.username);
        setUser({
          ...user,
          name: user.auth.username,
          isLoggedIn: true,
          errorMessage: "",
        });
        navigate("/pages/UserFeed/UserFeed");
      }
    } catch (e) {
      console.log("🚀 ~ file: AuthContext.js:13 ~ loginHandler ~ e:", e);
    }
  };

  const validate = (val, type) => {
    console.log(val, "val");
    switch (type) {
      case "Email":
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? setUser({
              ...user,
              errors: { ...user.errors, errorEmail: "" },
              auth: { ...user.auth, email: val },
            })
          : setUser({
              ...user,
              errors: {
                ...user.errors,
                errorEmail: "Please enter valid email id",
              },
            });
        break;
      case "username":
      case "lastname":
      case "firstname":
        val.length > 2
          ? setUser({
              ...user,
              errors: { ...user.errors, [type]: "" },
              auth: { ...user.auth, [type]: val },
            })
          : setUser({
              ...user,
              errors: {
                ...user.errors,
                [type]: "Minimum 3 characters required",
              },
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
          user.errors.errorEmail === "" &&
          user.errors.firstname === "" &&
          user.errors.lastname === "" &&
          user.errors.username === "" &&
          user.errors.confirm_passowrd === ""
        ) {
          signUphandler();
        }
        break;
      case "signInCall":
        console.log("1");
        if (user.errors.username === "" && user.errors.password === "") {
          console.log("2");
          loginHandler();
        } else {
          console.log("3");
        }
        break;
      default:
        setUser(user);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("Username");
    localStorage.removeItem("Followings");
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
