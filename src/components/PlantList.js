import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onDel}) {
  return (
    <ul className="cards">
      {plants.map((plt, index) => (
        <PlantCard plant={plt} key={index} onDel={onDel}/>
      ))}
    </ul>
  );
}

export default PlantList;
