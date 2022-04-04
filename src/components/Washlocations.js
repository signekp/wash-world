import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import info from "../info";
import Washcam from "./Washcam";

export default function Washlocations({
  location,
  setChoseLocation,
  choseLocation,
  setCam,
  cam,
}) {
  function onChoice(event) {
    // console.log(event.target.value);
    setChoseLocation(location[event.target.value - 1]);
  }

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(info.backendUrl + "/cam/" + choseLocation.id).then((result) => {
      // console.log(result.data.response);
      if (result.data.response.lpn) {
        let camdata = result.data.response;
        camdata.lpn = getRandomLPN(camdata.lpn);
        setCam(camdata);
        navigate("/washproducts");
      }
    });
  }, [choseLocation, cam]);

  function getRandomLPN(lpn) {
    const chars = lpn.slice(0, 2);
    const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
    return chars + numbers;
  }

  return (
    <div>
      <div className="pagehero">
        <h2>Vælg bilvask</h2>
      </div>
      <div className="location-container">
        {location.map((location) => {
          return (
            <div key={location.id} className="locations">
              <button
                className={
                  location.status === "maintenance" ? "btn btnDisable" : "btn"
                }
                disabled={location.status !== "maintenance" ? "" : "on"}
                value={location.id}
                onClick={onChoice}
              >
                {location.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
