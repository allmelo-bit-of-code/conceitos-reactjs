import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  // Actual state of the list
  const [ repolist, setRepolist ] = useState([]);

  // Fetch and save repositories list from API 
  useEffect( () => {
    api.get('/repositories')
    .then( response => {  setRepolist(response.data)  } )
  }, []);  

  // Add new repository to API list
  async function handleAddRepository() {
    
    const response = await api.post('/repositories', 
            { 
              "title": "notch",
              "url": "https://github.com/allmelo", 
              "techs": ["javascript", "typescript", "node", "react", "reactnative"]
            });
    
    setRepolist([...repolist, response.data]);

  };

  // Remove old repository from API list
  async function handleRemoveRepository(id) {
    
    const response = await api.delete("/repositories/" + id);
    setRepolist(repolist.filter( repo => repo.id !== id ));
    console.log(response);

  }

  // Render list
  return (
    <div>
      <ul data-testid="repository-list">
        { repolist.map( repo => { 
            return (
              <li id={repo.id} key={repo.id}><a href={repo.url}>{repo.title}</a>
                <button onClick={() => handleRemoveRepository(repo.id)}> Remover </button>
              </li>
            )
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
