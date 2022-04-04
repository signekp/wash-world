import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./style.css";
import Washlocations from "./components/Washlocations";
import info from "./info";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Washproducts from "./components/Washproducts";
import Confirmwash from "./components/Confirmwash";
import Startwash from "./components/Startwash";

function App() {
  // Locations
  const [locations, setLocations] = useState([]);
  // Vælger lovations
  const [choseLocation, setChoseLocation] = useState({});
  // Adgang til kamera
  const [cam, setCam] = useState({});
  //Product
  const [products, setProducts] = useState([]);
  // Når man vælger produkt
  const [choseProduct, setChoseProduct] = useState([]);

  // Henter info om locations
  useEffect(() => {
    axios.get(info.backendUrl + "/locations").then((result) => {
      setLocations(result.data.response.locations);
    });
  }, []);

  useEffect(() => {
    axios.get(info.backendUrl + "/products/" + cam.lpn).then((result) => {
      // console.log(result.data.response);
      //setProducts(result.data.response);
    });
  }, []);

  useEffect(() => {
    // console.log(choseLocation);
  }, [choseLocation]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Washlocations
              key={locations.id}
              location={locations}
              setChoseLocation={setChoseLocation}
              choseLocation={choseLocation}
              setCam={setCam}
              cam={cam}
            />
          }
          exact
        ></Route>
        <Route
          path="/washproducts"
          element={
            <Washproducts
              key={products.id}
              products={products}
              cam={cam}
              choseLocation={choseLocation}
              location={locations}
              setProducts={setProducts}
              choseProduct={choseProduct}
              setChoseProduct={setChoseLocation}
            />
          }
          exact
        ></Route>
        <Route
          path="/confirmwash"
          element={
            <Confirmwash
              key={products.id}
              cam={cam}
              products={products}
              location={locations}
              choseProduct={choseProduct}
              setChoseProduct={setChoseProduct}
            />
          }
        ></Route>
        <Route
          path="/startwash"
          element={
            <Startwash
              key={products.id}
              cam={cam}
              products={products}
              location={locations}
              choseProduct={choseProduct}
              setChoseProduct={setChoseProduct}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
