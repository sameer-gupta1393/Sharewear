import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';

const Google = () => {
    const apiKey = "94e4b82bb56d4c239a9b7a80f2b12a5b"; // Replace with your OpenCage API key
    const [inputValue, setInputValue] = useState('');
     const [currentLocation, setCurrentLocation] = useState(false); // Change to boolean
    const [suggestions, setSuggestions] = useState([]);
    const [lat,setLat] = useState("");
    const [long,setLong] = useState("");
  //getting lat and long
    const x = document.getElementById("demo");
 
    function getLocation(e) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
     
    }

    function showPosition(position) {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)
    console.log("Lat:" + position.coords.latitude + 
    "Long:" + position.coords.longitude);
    }
useEffect(()=>{
  document.getElementById('currentLocationCheckbox').value=[lat,long]
},[lat,long])
//auto complete
    const getSuggestions = async (e) => {
        const query = e.target.value;

        setInputValue(query);

        if (query.trim().length < 3) {
            setSuggestions([]);
            return; // Don't make API request for short queries
        }

        try {
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const results = data.results || [];

            const suggestions = results.map(result => {
                const city = result.components.city || result.components.town || result.components.village;
                const state = result.components.state;
                const country = result.components.country;

                return `${city ? city + ', ' : ''}${state}, ${country}`;
            });

            setSuggestions(suggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    return (
        <div>
        <div>
     
            <label htmlFor="locationInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
            <input
                type="text"
                id="locationInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onInput={getSuggestions}
                list="suggestions"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="City State Country"
                required
            />

            <datalist id="suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>
        </div>
        <div className="inline-flex mt-[20px]">
        <label htmlFor="currentLocationCheckbox" className=" inline-block  text-sm font-medium text-gray-900 dark:text-white">
            <sup>
            <Popover>
            <PopoverHandler>
                {/* Use a div instead of Button */}
                <div className=" inline-flex justify-center items-center cursor-pointer">
                    <i className="fa-solid fa-circle-exclamation"></i>
                </div>
            </PopoverHandler>
            <PopoverContent>
                *It will be used to locate nearby items
            </PopoverContent>
        </Popover></sup>Get Current Location:
            
            </label>
            <input
                type="checkbox"
                id="currentLocationCheckbox"
                onChange={(e) => {getLocation(e); setCurrentLocation(!currentLocation) ; }}
                checked={currentLocation}
                className="ml-[10px] "
                required
            />
        
        </div>
           
        </div>
    );
};

export default Google;
