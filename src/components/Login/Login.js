import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../context/auth-context";
import Input from "../UI/Input/Input";
const emailReducer = (state, action) => {
  if (action.type === "email-change") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "email-valid") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [emailState, dispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const indentifier = setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") && enteredPassword.trim().length > 6
      );
    }, 1000);
    return () => {
      console.log("Clear");
      clearTimeout(indentifier);
    };
  }, [emailState.value, enteredPassword]);

  const emailChangeHandler = (event) => {
    console.log(event.target.value);
    dispatch({
      type: "email-change",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatch({
      type: "email-valid",
    });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
