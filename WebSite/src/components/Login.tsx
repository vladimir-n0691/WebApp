import React, { useRef } from "react";

export const Login = () => {
  const inputLoginRef = useRef(null);
  const inputPasswordRef = useRef(null);

  async function handleClick() {
    var login: String | null = inputLoginRef.current
      ? inputLoginRef.current["value"]
      : null;

    var password: String | null = inputPasswordRef.current
      ? inputPasswordRef.current["value"]
      : null;

    console.log("login: " + login);
    console.log("password: " + password);

    const response = await fetch(`/api/auth/login?user=${login}&password=${password}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    if (response.ok === true) {
      sessionStorage.setItem("accessToken", data.access_token);
      console.log(data.access_token);
      window.location.href = '/';
    }
    else {
      alert("Error")
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        placeContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div>
        <h3>Login Page</h3>
        <label>login:</label>
        <br />
        <input ref={inputLoginRef} type="text" id="login" /> <br />
        <br />
        <label>password:</label>
        <br />
        <input ref={inputPasswordRef} type="password" />
        <br />
        <br />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};
