import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setData } from "../store";
import { ACCESS_TOKEN_KEY } from "../common/Constants";

export const Settings = () => {
  console.log("Rendering Main")

  const dispath = useDispatch();

  const data = useSelector((state: AppState) => state.common.data);
  const [lData, setLData] = useState(data);
  const setDataFunc = () => dispath(setData(lData));

  useEffect(() => {
    console.log("Data was changed: " + data);
  }, [data]);


  console.log(localStorage.getItem(ACCESS_TOKEN_KEY))

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ marginTop: "10px" }}>Main Page</div>
      <div style={{ marginTop: "10px" }}>APP state: {data}</div>
      <div>--------------------------------------------</div>
      <div style={{ marginTop: "10px" }}>
      </div>
      <div style={{ marginTop: "20px" }}>
       
      </div>
    </div>
  );
};
