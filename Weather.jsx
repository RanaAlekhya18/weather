// import React, { useState } from 'react'

// const Weather = () => {
//     let api={
//         key:"df569e6d51c63b636a2dfb0cd8e27954",
//         url:"https://api.openweathermap.org/data/2.5/weather"
//     };
//     let [search,setsearch]=useState("")
//     let [value,setvalue]=useState({})
//      function searchweather(){
//          fetch(`${api.url}?q=${search}&appid=${api.key}`)
//          .then(x=>x.json()).then(x=>setvalue(x))
//      }
//      console.log(value)
//   return (
//     <div id='box'>
//        <div>
//        <h1>Weat </h1>
//       <input type="text" onChange={(e)=>setsearch(e.target.value)}/>
//       <button onClick={searchweather}>search</button>
//        </div>
//      {(value.main !=undefined)?(
//         <>
//         <h2>{value.main}</h2>
//         <h5>{value.main.temp}</h5>
//         </>
//      ):("Data Not found")}
//     </div>
//   )
// }

// export default Weather

import React, { useState } from 'react';

const Weather = () => {    const api = {
       key: "51ae3f7c4b5c795e931cb7846f1f91b3",
        url: "https://api.openweathermap.org/data/2.5/weather"
    };

    const [search, setSearch] = useState("");
    const [value, setValue] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Error state

    function enter(x) {
        if (x.key === "Enter") {
            searchWeather();
        }
    }

    function searchWeather() {
        setLoading(true);
        setError(null); 

        fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(val => {
                setValue(val);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message); 
                setLoading(false); 
            });
    }

    return (
      <>
      
       <h1 id='head'>TODAY WEATHER 🌞🌥️🌦️</h1>
       <div className="sun-container">
      <div className="sun"></div>
      </div>
        <div id='box'>
       
            <section>
              <h1>Weather Report 🌅</h1>
                <input type="text" onChange={(e) => setSearch(e.target.value)} onKeyPress={enter} id='lable'/>
                
                <button onClick={searchWeather} id='butn'>Search</button>
            </section>
            {loading ? ( 
                <p></p>
            ) : error ? ( 
                <p> {error}</p>
            ) : (
                value.main ? ( 
                    <>
                        <p className='para'>{value.name}</p>
                        <p className='para'>{value.main.temp} °C 🌤️</p>
                    </>
                ) : (
                    !error && !loading
                )
            )}
        </div>
        </>
    );
}

export default Weather;
