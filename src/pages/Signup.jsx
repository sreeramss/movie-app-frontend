import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../assets/logo.svg";
import { signupAPICall } from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) setConfirmPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError("Can't be empty");
      valid = false;
    }

    if (!password) {
      setPasswordError("Can't be empty");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Can't be empty");
      valid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (valid) {
      try {
        const res = await signupAPICall({ username: email, password });
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          toast.success("Signup successful!");
          navigate("/home");
        } else {
          toast.error(res.data.message || "Signup failed!");
        }
      } catch (e) {
        toast.error("An error occurred during signup. Please try again.");
        console.error(e);
      }
    } else {
      if (emailError) toast.error(emailError);
      if (passwordError) toast.error(passwordError);
      if (confirmPasswordError) toast.error(confirmPasswordError);
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-20">
      <img src={logo} alt="logo" className="h-10 w-12" />
      <div className="w-72 rounded-lg bg-col-light p-6 sm:w-96">
        <h2 className="mb-6 text-2xl text-white">Sign Up</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                emailError ? "border-b-col-red border-opacity-80" : "border-b-white"
              }`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            {emailError && (
              <span className="absolute text-red-500 text-sm">
                {emailError}
              </span>
            )}
          </div>

          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                passwordError ? "border-b-col-red border-opacity-80" : "border-b-white"
              }`}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            {passwordError && (
              <span className="absolute text-red-500 text-sm">
                {passwordError}
              </span>
            )}
          </div>

          <div className="relative flex flex-row-reverse">
            <input
              className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl2 ${
                confirmPasswordError ? "border-b-col-red border-opacity-80" : "border-b-white"
              }`}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />
            {confirmPasswordError && (
              <span className="absolute text-red-500 text-sm">
                {confirmPasswordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-col-red px-4 py-2 text-white outline-none hover:bg-white hover:text-black"
          >
            Create Account
          </button>

          <h3 className="mx-auto text-base text-white text-opacity-75">
            Already have an account?
            <span
              className="cursor-pointer text-col-red"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h3>
        </form>
      </div>
    </main>
  );
};

export default Signup;
