import { useEffect, useState } from "react";
import "./App.css";
import 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [results, setResults] = useState(undefined);
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/?name="+search+"&?page=");
  const [info, setInfo] = useState("https://rickandmortyapi.com/api/character/?name="+search+"&?page=");

  useEffect(() => {
    /*fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results[0].name);
        setResults(data.results);
      });*/

      const getPersonajes = async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character/?name="+search)
        const personajes = await response.json()
        setInfo(personajes.info)
        setResults(personajes.results)
        console.log(personajes);
      }

      getPersonajes()
  }, [search]);

  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <h1 className='col-12'>Rick & Morty</h1>
        <input className='col-5 col-lg-4 search' type="text" onChange={(e)=> {setSearch(e.target.value)}} value={search} placeholder='Buscar personajes'/>
        {results && (
          <div className='row col-10'>
            {results.map((personaje, index) => (
              <div className='col-6 col-lg-3'>
                <img src={personaje.image} className='imgP' alt="" />
                <p className='name' key={index}>{personaje.name}</p>
                <p className="location">Specie: {personaje.species}</p>
                <p className="location">From {personaje.location.name}</p>
                <p className={`desc ${personaje.status}`}>Is {personaje.status}</p>
              </div>
            ))}
          </div>
        )}
      </header>
      <button onClick={()=>{setUrl(info.next+"?name="+search)}}>Next</button>
    </div>
  );
}

export default App;
