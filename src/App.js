import { FiSearch } from 'react-icons/fi';
import './Style/styles.css'
import { useState } from 'react';
import api from './services/api';

function App() {
  const[input, setInput] = useState('');
  const[cep, setCep] = useState({});

  async function handleSearch() {
    if(input === ""){
        alert("Preencha alguma informação");
    }
    try {
      const response = await api.get(`${input}/json`); 
      setCep(response.data)
      setInput("")
      console.log(cep);

    } catch (error) {
      alert("Erro ao buscar cep, talvez este cep não exista");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Zip Search</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Search your ZIP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button 
        className="buttonSearch"
        onClick={handleSearch}
        >
          <FiSearch
            size={25}
            color="#f2f2f2"
          />
        </button>
      </div>

      <main className='main'>
        <h2>Cep: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.uf} - {cep.localidade}</span>
      </main>
    </div>
  );
}

export default App;