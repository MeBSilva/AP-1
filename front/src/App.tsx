import React, { useState } from "react";
import logo from "./assets/brasao_ufc.png";

import "./App.css";

import { Input } from "./components/Input";
import { api } from "./services/api";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const clean = async () => {
    await api.patch("/clean");

    setValue("");
    setInputValue("");

    alert("Reiniciado com sucesso!");
  };

  const send = async (number?: string) => {
    try {
      const response = await api.post("/submit", {
        number: Number(number),
      });
      console.log(response.data);
      setValue(response.data.unique);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Menor Valor Único</h1>
      <img className="App-logo" src={logo} alt="logo" />

      <Input
        id="value"
        label="Valor a ser enviado"
        value={inputValue}
        setValue={setInputValue}
      />
      <button className="Button" onClick={() => send(inputValue)}>
        Enviar
      </button>

      <text className="Text">Menor valor único: {value}</text>

      <button className="Button ButtonAux" onClick={() => clean()}>
        Reiniciar Dados
      </button>
    </div>
  );
}

export default App;
