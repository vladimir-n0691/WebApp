import React from "react";

export const General = () => {
  async function testAuthApiClick() {
    const token = sessionStorage.getItem("accessToken");

    const response = await fetch("/api/test/GetAuthTestData", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token, // передача токена в заголовке
      },
    });
    if (response.ok === true) {
      const data = await response.json();
      alert(data);
    } else {
      console.log("Status: ", response.status);
      alert("Error, status: " + response.status);
    }
  }

  return (
    <div style={{ margin: "10px" }}>
      <h4 style={{ margin: "10px" }}>General</h4>
      <div style={{ margin: "10px" }}>
        <a href="login">Login</a>
      </div>
      <div style={{ margin: "10px" }}>
        <a href="register">Register</a>
      </div>
      <div style={{ margin: "10px" }}>
        <a href="main">Main</a>
      </div>

      <div style={{ margin: "10px" }}>
        <a href="api/test/gettestdata">Test API</a>
      </div>

      <button onClick={testAuthApiClick}>Test auth api</button>
    </div>
  );
};
