import info from "../info";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Washproducts(data) {
  useEffect(() => {
    axios.get(info.backendUrl + "/products/" + data.cam.lpn).then((result) => {
      data.setProducts(result.data.response.products);
    });
  }, [data.cam]);

  // timer clock
  const [timer, setTimer] = React.useState(0);
  const [showTimer, setShowTimer] = React.useState(false);
  const [min, setMin] = React.useState(0);
  const [sec, setSec] = React.useState(0);
  const [startWash, setStartWash] = React.useState(false);
  const [showTimeLeft, setShowTimeLeft] = React.useState(false);
  const [washFinish, setWashFinish] = React.useState("");
  const [showWashFinish, setShowWashFinish] = React.useState(false);

  function handleClick(productprogram) {
    axios
      .post(
        info.backendUrl +
          "/" +
          data.choseLocation.id +
          "/start/" +
          productprogram
      )
      .then((result) => {
        console.log(result.data);
        console.log(result.data.status);
        console.log(result.data.response.estimated_duration);
        // setTimer(result.data.response.estimated_duration);
        // setShowTimer(true);
        if (result.data.status === undefined) {
          setTimer("No program");
          console.log(timer);
        } else if (result.data.status === "success") {
          setTimer(result.data.response.estimated_duration);
        }
        setShowTimer(true);
        setStartWash(true);
      });
  }

  // start

  function starttimer() {
    if (startWash) {
      const startingMinutes = parseInt(timer); //state timer
      console.log(timer);
      let time = startingMinutes * 60;

      const startInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setMin(minutes);
        setSec(seconds);
        time--;
        setShowTimeLeft(true);

        if (minutes <= 0 && seconds <= 0) {
          clearInterval(startInterval);
          console.log("wash is now finished!");
          setWashFinish("Din vask er færdig!");
          setShowWashFinish(true);
        }
      }, 1000);
    }
  }

  // slut

  return (
    <div>
      <div className="pagehero">
        {showTimer && <h2>Din vask</h2>}
        {!showTimer && <h2>Vælg pakke</h2>}
        <p className="licenseplate">Til {data.cam.lpn}</p>
      </div>
      <div>
        {!showTimer && (
          <div className="product-container">
            {data.products.map((product, index) => {
              let Pricetag = product.price;
              let pricedkk = false;
              if (index === 1 || index === 3) {
                Pricetag = "Ikke tilgængelig";
              } else if (data.cam.lpn === "BV99123") {
                Pricetag = "Free with premium";
              } else {
                pricedkk = true;
              }

              return (
                <div
                  key={product.productid}
                  className={
                    product.name === "Premium"
                      ? "product title-border"
                      : "product"
                  }
                >
                  <div className="description">
                    <h3 className="product-title">{product.name}</h3>
                    <p
                      className={
                        pricedkk ? "product-price" : "product-specielprice"
                      }
                    >
                      <span
                        className={
                          Pricetag === "Free with premium" ? "premium" : ""
                        }
                      >
                        {Pricetag}
                      </span>
                      <span className="minitext">{pricedkk ? "kr." : ""}</span>
                    </p>
                    <p className="products-description">
                      {product.description}
                    </p>
                  </div>
                  <button
                    disabled={index === 3 || index === 1 ? "on" : ""}
                    className={
                      index === 3 || index === 1
                        ? "btn-products btnDisable"
                        : "btn-products"
                    }
                    onClick={() => {
                      handleClick(product.program);
                    }}
                    value={product.program}
                  >
                    Vælg vask
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {showTimer && (
          <div className="timer-container">
            {showWashFinish && (
              <div>
                <p className="washtext">{washFinish}</p>
              </div>
            )}
            {!showWashFinish && (
              <div>
                <div className={!showTimeLeft ? "timer" : "displaynone"}>
                  <p className="washtext">Din vask varer:</p> {timer}
                  <span className="washtext"> min.</span>
                </div>
                <div className={showTimeLeft ? "timer" : "displaynone"}>
                  <p className="washtext">Tid tilbage af din vask:</p>
                  {min}:{sec}
                  <span className="washtext"> min.</span>
                </div>

                <button
                  disabled={showTimeLeft ? "on" : ""}
                  className={showTimeLeft ? "displaynone" : "btn-startwash"}
                  onClick={starttimer}
                >
                  Start vask
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
