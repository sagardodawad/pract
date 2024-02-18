// import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const addCar = async () => {
    const modelName = document.getElementById('addmodelName').value;
    const  year_manufacturer= document.getElementById('addyear').value;
   
    const speed = document.getElementById('addspeed').value;
    const price = document.getElementById('addprice').value;
    const custId = document.getElementById('addcustId').value;
    const response = await axios.post('http://localhost:5000', {

     modelName,
     year_manufacturer,
     speed,
     price,
     custId,
    });
    console.log(response.data);
  };

  

  const getAllcars = async ()=>{
    const allcars = document.getElementById('allcars');
    allcars.innerHTML = '';
    const response = await axios.get('http://localhost:5000');
    console.log(response.data);
    for(let i=0; i<response.data.length; i++){
      allcars.innerHTML += `<li>
     <p>car id: ${response.data[i].carId}</p>
      <p>car Name: ${response.data[i].modelName}</p>
      <p>Year of Manufacture:${response.data[i].year_manufacturer}</p>
      <p>speed: ${response.data[i].speed}</p>
      <p>price: ${response.data[i].price}</p>
      <p>cust Id: ${response.data[i].custId}</p>
      </li>`
      response.data[i].carId;
    }
  }
  const getAllcarwith2019 = async ()=>{
    const allcars = document.getElementById('allcarswith2019');
    allcars.innerHTML = '';
    const response = await axios.get('http://localhost:5000/carswith2019');
    console.log(response.data);
    for(let i=0; i<response.data.length; i++){
      allcars.innerHTML += `<li>
      <p>car id: ${response.data[i].carId}</p>
      <p>car Name: ${response.data[i].modelName}</p>
      <p>Year of Manufacture:${response.data[i].year_manufacturer}</p>
      <p>speed: ${response.data[i].speed}</p>
      <p>price: ${response.data[i].price}</p>
      <p>cust Id: ${response.data[i].custId}</p>
      </li>`
      response.data[i].carId;
    }
  }


  const deletecarById = async()=>{
    const deletecarId = document.getElementById('deletecarId').value;
    const response = await axios.delete(`http://localhost:5000/${deletecarId}`);
    console.log(response.data);
  }
  const deleteoldcar = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/deleteoldcar');
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting old cars:', error);
    }
  };
  
  
  const display = async()=>{
    const allcars = document.getElementById('display');
    allcars.innerHTML = '';
    const response = await axios.get('http://localhost:5000/display');
    console.log(response.data);
    for(let i=0; i<response.data.length; i++){
      allcars.innerHTML += `<li>
      <p>car id: ${response.data[i].carId}</p>
      <p>car Name: ${response.data[i].modelName}</p>
      <p>Year of Manufacture:${response.data[i].year_manufacturer}</p>
      <p>speed: ${response.data[i].speed}</p>
      <p>price: ${response.data[i].price}</p>
      <p>cust Id: ${response.data[i].custId}</p>
      </li>`
      response.data[i].carId;
    }
    }
  

  return (
    <>
      <h1>Car Management System</h1>
      <hr />
      <h3>Add a new car</h3>
      car Name: <input type="text" id="addmodelName" />
      <br />
      <br />
      Year of Manufacture: <input type="number" id="addyear" />
      <br />
      <br />
      speed: <input type="number" id="addspeed" />
      <br />
      <br />
      price: <input type="number" id="addprice" />
      <br />
      <br />
      cust Id: <input type="number" id="addcustId" />
      <br />
      <br />
      <button type="button" onClick={addCar}>
        Add a car details
      </button>

      <br />
      <br />
      <p id="getmodelName"></p>
      <p id="getyear_manufacture"></p>
      <p id="getspeed"></p>
      <p id="getprice"></p>
      <p id="getcustId"></p>
      <hr />
      <h3>Get all cars</h3>
      <button type="button" onClick={getAllcars}>Get all cars details</button>
      
      <ul id='allcars'>

      </ul>
      <br />
      <hr />
      <h3>Get all cars Manufactured in 2019</h3>
      <button type="button" onClick={getAllcarwith2019}>Get all cars details</button>
      
      <ul id='allcarswith2019'>

      </ul>
      <br />
      <hr />
      <h3>Delete car by id</h3>
      id: <input id='deletecarId' type="number" />
      <br />
      <br />
      <button type="button" onClick={deletecarById}>Delete car</button>
      <hr />
      <h3>Delete old cars</h3>

      <button type="button" onClick={deleteoldcar}>Delete old cars</button>
      <hr />
      <br />
      <h3>display latest 5 car</h3>

      <button type="button" onClick={display}>display</button>
      <ul id='display'>

</ul>
      <br />
      <hr />

    </>
  );
}

export default App;
