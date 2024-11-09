import React, { useState } from "react";

function PlantCard({ plant, onDel }) {
  // State toggler for in/out of stock
  const [stock, setStock] = useState(true)
  
  // State toggler for pricing and price state storer
  const [pricer, setPricer] = useState(false)
  const [currPrice, setCurrPrice] = useState(plant.price)

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {/* Checks if toggler is true, renders input for editing price */}
      {/* on front and backend */}
      {pricer ? (
        <label>New Price: <input
          type="number"
          value={currPrice}
          onBlur={() => setPricer(false)}
          onChange={(e) => {
            setCurrPrice(e.target.value)
            fetch(`http://127.0.0.1:6001/plants/${plant.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "price": Number(e.target.value)
              })
            })
              .then(r => r.json())
              .then(res => console.log(res))
              .catch(err => console.log(err))
          }}>

        </input></label>
      ) : <p>Price: {currPrice}
        <button className="primary" style={{
          padding: "6px",
          marginLeft: "6px"
        }} onClick={() => setPricer(true)}>Edit</button>
      </p>}

      {stock ? (
        <button className="primary" onClick={() => setStock(false)}>In Stock</button>
      ) : (
        <button onClick={() => setStock(true)}>Out of Stock</button>
      )}

      {/* Delete button with fetch for back-end and  "onDel" props to update */}
      {/* front-end state */}
      <button style={{
        padding: "6px",
        marginLeft: "6px",
        backgroundColor: "red"
      }} onClick={() => {
        fetch(`http://127.0.0.1:6001/plants/${plant.id}`, {
          method: "DELETE",
        })
        .then(r => r.json())
        .then(plt => onDel(plant))
        .then(() => alert("Plant Deleted!"))
        .catch(err => console.log(err))
      }}>Delete</button>
    </li>
  );
}

export default PlantCard;
