
import {useState} from 'react';
import { FiSearch} from 'react-icons/fi'
import './styles.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

  async function handleSearch(){ //porque demora um pouquinho as vezes.
    if(input === ''){
      alert("preencha algum CEP valido!")
      setInput("")
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
    }catch{
      alert("Ops erro ao buscar");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu cep..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && ( // pra ler so quando houver alguma requisição
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
  
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Estado: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

      
    </div>
  );
}

export default App;
