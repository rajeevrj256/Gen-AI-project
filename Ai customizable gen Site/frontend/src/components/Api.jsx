import { useContext } from 'react';
import { UserInput } from '../store/Input_data';

export const fetchDataFromAPI = async (aiInput, userInput, setfetchdata) => {
 
  try {
    //console.log("second")
    //console.log(aiInput);
    //console.log(userInput);
    const response = await fetch('https://ai-generating-site.onrender.com/generate-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({  
        systemPrompt:aiInput,
        userPrompt:userInput,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    //console.log("response",data.response);
   if(data.response){
     setfetchdata(data.response);

   }
    //console.log(aiInput);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    setfetchdata("Too many request,Try after few Minutes")
  }
};
