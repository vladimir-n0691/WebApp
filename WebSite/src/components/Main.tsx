import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setData } from "../store";

export const Main = () => {
  const dispath = useDispatch();

  const data = useSelector((state: AppState) => state.common.data);
  const [lData, setLData] = useState(data);
  const setDataFunc = () => dispath(setData(lData));

  useEffect(() => {
    console.log("Data was changed: " + data);
  }, [data]);

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
