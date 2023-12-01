import { useEffect, useState } from "react";
import { ReactComponent as FormImage } from "./assets/images/illustration-sign-up-desktop.svg";
import { ReactComponent as MobileFormImage } from "./assets/images/illustration-sign-up-mobile.svg";
import { ReactComponent as Icon } from "./assets/images/icon-list.svg";
import { ReactComponent as IconSuccess } from "./assets/images/icon-success.svg";

import "./App.css";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [input, setInput] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    console.log("state:", input);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, input]); //

  const handleChange = (e) => {
    e.preventDefault();

    const email = e.target.value;

    setInput(email);
  };

  const handleSubmit = () => {
    if (input === "" && input.trim() === "") {
      console.log("Error missing E-mail field...");
      setIsValid(false);
      return;
    } else if (!input.includes("@")) {
      console.log("Error formatting E-mail field...");
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setInput("");
    setIsSuccess(true);
    setEmailValue([...input].join(""));
  };

  const handleMessageClose = () => {
    setIsSuccess(false);
  };

  return (
    <>
      <main>
        {!isSuccess && (
          <div className="form-container">
            <div className="form">
              <h1>Stay Updated!</h1>
              <span className="subheader">
                Join 60,000+ product managers receiving monthly updates on:
              </span>
              <div className="form-list">
                <span className="form-list-item">
                  <Icon />
                  <span>Product discovery and building what matters</span>
                </span>
                <span className="form-list-item">
                  <Icon />
                  <span>Measuring to ensure updates are a success</span>
                </span>
                <span className="form-list-item">
                  <Icon />
                  <span>And much more!</span>
                </span>
              </div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={input}
                placeholder="email@company.com"
                onChange={handleChange}
                className={!isValid ? "error-field" : "form-input"}
              />
              <button className="btn" onClick={handleSubmit}>
                Subscribe to monthly newsletter
              </button>
            </div>
            <div className="form-image">
              {windowWidth >= 768 ? <FormImage /> : <MobileFormImage />}
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="success-message-container">
            <div className="message">
              <IconSuccess className="message-icon" />
              <h1 className="message-header">Thanks for subscribing!</h1>
              <p className="message-text">
                A confirmation email has been sent to{" "}
                <span className="email-style">{`${emailValue}`}</span>. Please
                open it and click the button inside to confirm your subscription
              </p>
              <button className="btn-message" onClick={handleMessageClose}>
                Dismiss message
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
