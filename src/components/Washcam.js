import info from "../info";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Washcam(data) {
  useEffect(() => {
    axios.get(info.backendUrl + "/cam/" + data.locationID).then((result) => {
      console.log(result.data.response);
      //   data.setProducts(result.data.response.locationID);
    });
  }, []);

  return <div></div>;
}
