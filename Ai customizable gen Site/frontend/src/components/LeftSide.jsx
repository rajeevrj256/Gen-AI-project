import React, { useContext } from 'react';
import styles from './LeftSide.module.css';
import { UserInput } from '../store/Input_data';
import { fetchDataFromAPI } from './Api';

const LeftSide = () => {
  const { aiInput, setAiInput, userInput, setUserInput, fetchdata, setfetchdata ,setFetching} = useContext(UserInput);

  const handleInput1Change = (e) => setAiInput(e.target.value);
  const handleInput2Change = (e) => setUserInput(e.target.value);
  
 
  const handleFetchData = async () => {
    //console.log(aiInput);
    //console.log(userInput);
    try {
      //console.log("first")
      setFetching(true);
      await fetchDataFromAPI(aiInput, userInput, setfetchdata); 
      setFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className={styles.LeftSide}>
      <label className={styles.Label}>System Prompt:</label>
      <input
        type="text"
        value={aiInput}
        onChange={handleInput1Change}
        placeholder="Act like a travel advisor"
      />
      <label className={styles.Label}>User Prompt:</label>
      <input
        type="text"
        value={userInput}
        onChange={handleInput2Change}
        placeholder="Enter your prompt"
      />
      <button onClick={handleFetchData}>Generate Data</button>
    </div>
  );
};

export default LeftSide;
