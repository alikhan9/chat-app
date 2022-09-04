
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState, useCallback } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { createUser } from '../client';
import { useNavigate } from 'react-router-dom';
const SignUp = ({ error, setError, setSuccessMessage }) => {

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();


  const redirectToLogin = useCallback(() => navigate('/', { replace: true }), [navigate]);

  const performCreateUser = (e) => {
    e.preventDefault();
        if (
            e.target.username.value === "" ||
            e.target.firstname.value === "" ||
            e.target.lastname.value === "" ||
            e.target.email.value === "" ||
            e.target.password.value === "" ||
            e.target.dateofbirth.value === "") {
            setError("Please fill in all fields");
            return;
        }
        if (!validateEmail(e.target.email.value)) {
            setError("Please enter a valid email");
            return;
        }

        createUser(
            e.target.username.value,
            e.target.firstname.value,
            e.target.lastname.value,
            e.target.password.value,
            e.target.email.value,
            e.target.dateofbirth.value)
            .then((data) => {
                setError("");
                setSuccessMessage("Account created successfully, please log in");
                redirectToLogin();
            })
            .catch((err) => {
            });

  }

  function validateEmail(emailAdress) {
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

  const handleChangeDate = (value) => {
      setStartDate(value);
  }

  const styleInput = {
    width: '100%',
  };

  return (
    <div>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a href="">
                  ChatApp
                </a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <p style={{ color: 'red', fontSize: '18px', marginBottom: '10px' }}>
                    {error === '' ? null : error}
                  </p>
                  <span className="padding-bottom--15">
                    Sign up
                  </span>
                  <form id="stripe-login" method="POST" autoComplete="off" onSubmit={performCreateUser}>
                    <div className="field padding-bottom--24">
                      <label htmlFor="username">Username</label>
                      <input type="text" name="username" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="firstname">First Name</label>
                      <input type="text" name="firstname" />
                    </div>
                    <div className="field padding-bottom--24">
                      <label htmlFor="lastname">Last Name</label>
                      <input type="text" name="lastname" />
                    </div>
                    <div className=" padding-bottom--24">
                      <label htmlFor="dob">Date of birth</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DesktopDatePicker
                          inputFormat="yyyy-MM-dd"
                          value={startDate}
                          onChange={handleChangeDate}
                          renderInput={(params) => <TextField {...params} align="center" sx={styleInput} name="dateofbirth" />}
                        />
                      </LocalizationProvider>

                    </div>
                    <div className="field padding-bottom--24">
                      <input type="submit" name="submit" value="Create" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  You have an account already? <a href="#" onClick={redirectToLogin}>Sign in</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;