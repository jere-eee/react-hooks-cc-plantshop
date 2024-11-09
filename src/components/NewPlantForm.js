import React from "react";

function NewPlantForm({ onAdd, onName, onImg, onPrice }) {
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onAdd}>
        <input type="text" name="name" placeholder="Plant name" onChange={onName} />
        <input type="text" name="image" placeholder="Image URL" onChange={onImg} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={onPrice} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
