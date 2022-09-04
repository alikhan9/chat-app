import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
const Login = ({error, onSubmit, onEmailFocus, usernameError, onPasswordFocus, passwordError, successMessage}) => {

  const navigate = useNavigate();

  const redirectToSignUp = useCallback(() => navigate('/signUp', { replace: true }), [navigate]);

  const handleSignUp = () => {
    redirectToSignUp();
  }

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
                  <p style={{ color: 'green', fontSize: '18px', marginBottom: '10px' }}>
                    {successMessage === '' ? null : successMessage}
                  </p>
                  <span className="padding-bottom--15">
                    Sign in to your account
                  </span>
                  <form id="stripe-login" method="POST" autoComplete="off" onSubmit={onSubmit}>
                    <div className="field padding-bottom--24">
                      <label htmlFor="usernaame">Username</label>
                      <input type="text" name="username" onFocus={onEmailFocus} />
                      {
                        usernameError ? <span style={{ color: 'red', fontSize: '12px' }}>{usernameError}</span> : ''
                      }
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">Password</label>
                      </div>
                      <input type="password" name="password" onFocus={onPasswordFocus} />
                      {
                        passwordError ? <span style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span> : ''
                      }
                    </div>
                    <div className="field padding-bottom--24">
                      <input type="submit" name="submit" value="Continue" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Don't have an account? <a href="#" onClick={handleSignUp}>Sign up</a>
                </span>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;