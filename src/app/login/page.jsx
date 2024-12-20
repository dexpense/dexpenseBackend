"use client";
import React, { useEffect, useState } from "react";
import {
  decryptObjData,
  encryptObjData,
  getCookie,
} from "../../modules/encryption";
import { useGlobalContext } from "../../context/Store";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { firestore, firbaseAuth } from "../../context/FirbaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import Loader from "../../components/Loader";
import Link from "next/link";
const Login = () => {
  const { state, setState } = useGlobalContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });
  const [errField, setErrField] = useState({
    usernameErr: "",
    passwordErr: "",
  });
  const submitData = async (e) => {
    e.preventDefault();
    if (validForm()) {
      setLoader(true);
      const collectionRef = collection(firestore, "userteachersapp");
      const q = query(
        collectionRef,
        where("username", "==", inputField.username)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs[0].data().pan);
      if (querySnapshot.docs.length > 0) {
        const data = querySnapshot.docs[0].data();

        // if (data.password === inputField.password) {
        if (compare(inputField.password, data.password)) {
          setLoader(false);
          toast.success("Congrats! You are Logined Successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setState({
            USER: {
              name: data.name,
              username: data.username,
              email: data.email,
              id: data.id,
            },
          });
          encryptObjData("uid", data, 10080);
          router.push("/home");
        } else {
          setLoader(false);
          toast.error("Wrong Password!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        setLoader(false);
        toast.error("Invalid Username!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Form Is Invalid", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const inputHandler = (e) => {
    setInputField({
      ...inputField,
      [e.target.name]: removeSpaces(e.target.value),
    });
  };

  const validForm = () => {
    let formIsValid = true;
    setErrField({
      usernameErr: "",
      passwordErr: "",
    });
    if (inputField.username === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        usernameErr: "Please Enter Valid username",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Password",
      }));
    }

    return formIsValid;
  };
  const compare = (userPassword, serverPassword) => {
    let match = bcrypt.compareSync(userPassword, serverPassword);

    return match;
  };

  function removeSpaces(inputString) {
    // Use a regular expression to match all spaces (whitespace characters) and replace them with an empty string
    return inputString.replace(/\s/g, "");
  }
  const addUser = () => {
    router.push("/signup");
  };
  const details = getCookie("uid");
  let userdetails = {
    USER: {
      name: "",
      email: "",
      id: "",
    },
    LOGGEDAT: "",
  };
  if (details) {
    userdetails = decryptObjData("uid");
  }
  useEffect(() => {
    if (userdetails?.USER?.email != "") {
      setState({
        USER: {
          name: userdetails.name,
          username: userdetails.username,
          email: userdetails.email,
          id: userdetails.id,
        },
      });
      router.push("/home");
    }
  }, []);
  return (
    <div className="container my-3">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? <Loader /> : null}
      <h1>Login</h1>
      {/* Login form */}
      <div className="mx-auto col-md-6">
        {" "}
        <form
          autoComplete="off"
          method="post"
          className="mx-auto text-center"
          onSubmit={submitData}
        >
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="form-control"
              value={inputField.username}
              onChange={(e) =>
                setInputField({
                  ...inputField,
                  username: removeSpaces(e.target.value),
                })
              }
            />
            {errField.usernameErr.length > 0 && (
              <span className="error">{errField.usernameErr}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              id="password"
              value={inputField.password}
              onChange={inputHandler}
            />
            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr}</span>
            )}
            <button
              type="button"
              className="btn btn-warning btn-sm mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="mb-3">
            <Link style={{ textDecoration: "none" }} href={"/forgotPassword"}>
              Forgot Password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary m-1"
              onClick={submitData}
            >
              Login <i className="bi bi-box-arrow-in-left"></i>
            </button>
            <button
              type="button"
              id="addUserBtn"
              className="btn btn-success m-1"
              onClick={addUser}
            >
              Register Now <i className="bi bi-person-add"></i>
            </button>
          </div>
        </form>
      </div>
      {/* End of login form */}
    </div>
  );
};

export default Login;
