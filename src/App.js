import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [ repolist, setRepolist ] = useState([]);
  
  useEffect( () => {
    api.get('/repositories')
    .then( response => {
      setRepolist(response.data)})
    }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repolist.map( repo => {
          return (
            <li key={repo.id}> {repo.title}
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
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
