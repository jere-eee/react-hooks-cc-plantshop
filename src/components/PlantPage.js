import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // Initial plants state
  const [plants, setPlants] = useState([])

  // States for adding new plant
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [price, setPrice] = useState("")

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch and render plants on load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(r => r.json())
      .then(data => setPlants(data))
      .catch(err => console.log(err))
      .then(() => alert("Failed to fetch plants, run server."))
  }, [])

  // POST new plant and add to state
  function handleAdd(e) {
    e.preventDefault();
    const newPlant = {
      name,
      image: img,
      price
    }
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify(newPlant)
    })
      .then(r => r.json())
      .then(res => setPlants([...plants, res]))
      .catch(err => console.log(err))
  }

  // Handle deleting, update state
  function handleDel(plant) {
    const newPlants = plants.filter(plt => plt.id !== plant.id)
    setPlants(newPlants)
  }

  // Filter based on search term
  const renderedPlants = plants.filter((plant) => {
    if (searchTerm === "") {
      return plant
    } else if (plant.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return plant
    }
  })

  return (
    <main>
      <NewPlantForm onAdd={handleAdd}
        onName={(e) => setName(e.target.value)}
        onImg={(e) => setImg(e.target.value)}
        onPrice={(e) => setPrice(e.target.value)}
      />
      <Search onSearch={(e) => setSearchTerm(e.target.value)} />
      <PlantList plants={renderedPlants} onDel={handleDel}/>
    </main>
  );
}

export default PlantPage;
