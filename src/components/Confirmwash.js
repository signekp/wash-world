import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import info from "../info";
import Washcam from "./Washcam";

export default function Confirmwash(data) {
  return <div>{data.product.name}</div>;
}
