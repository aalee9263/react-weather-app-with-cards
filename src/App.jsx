import { useState, useRef } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null);
  const [data, setData] = useState([]);

  
  const getWeather =  async (event) => {
      event.preventDefault();
  const cityName = document.querySelector("#cityName").value;

  // console.log(`getting weather of ${cityName}...`)
  console.log(`getting weather of ${inputRef.current.value}`)

  try {
    
    setIsLoading(true);
    const response = await axios.get (`http://api.weatherapi.com/v1/current.json?key=62ba1f4835a74125a99140600232612&q=${inputRef.current.value}&aqi=no`)
     
    console.log("response:", response.data);
    setIsLoading(false);
// it is spread operator for collection and store data in array
setData([response.data, ...data]);
// it is prevent to finish previous data of user for different cities temperature
  event.target.reset();

      } catch (e) {
    setIsLoading(false)
    console.log(e)
      }
  };

  const changeHandler = (event) => {
    setCityName(event.target.value);
    // console.log(event.target.value)
  }

  return (
    <div> 
      <h1>Weather App</h1>
        <form onSubmit={getWeather}>
          <label htmlFor='cityName'>City: </label>
          <input 
            type="text"
            id="cityName"
            maxLength={20}
            minLength={2}
            required
            onChange={changeHandler}
            ref={inputRef}
          />
          <br/>
          <button type='submit'>
            Get Weather
          </button>
        </form>

        
    {isLoading ? <div>Loading...</div> : null }
  
    {data.length ? ( 

    data.map((eachWeatherData, index) =>(
    <div key={index}>
      cityName:{eachWeatherData?.location?.name} <br /> {eachWeatherData?.location?.country}
      <br />
      temp: {eachWeatherData?.current?.temp_c}
    </div>

    ))
    ) : ( 
    <div>No Data</div>
    )}

    </div>
  );
}

export default App;
