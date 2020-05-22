import React, {useEffect, useState} from 'react';
import Receipe from './Receipe';
import './App.css';

const App = () => {

    const APP_ID = "3702df22";
    const APP_KEY = "d6ef6ad9a1081e1d21e6ff7e82bd04ba";

    const [receipes, setReceipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    useEffect(() => {
      getReceipes();
    }, [query]);

    const getReceipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json();
        setReceipes(data.hits);
        console.log(data.hits);
    }  
    
    const updateSearch = e => {
      setSearch(e.target.value);
    }

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
              <input className="search-bar" type="text" value={search} onChange={updateSearch} />
              <button className="search-button" type="submit">Search</button>
            </form>
            <div className="recipes">
                {receipes.map(recipe => (
                  <Receipe 
                      key={recipe.recipe.label}
                      title={recipe.recipe.label} 
                      calories={recipe.recipe.calories} 
                      image={recipe.recipe.image} 
                      ingredients={recipe.recipe.ingredients}
                  /> 
                ))}
            </div>
        </div>
    );
}
export default App;
