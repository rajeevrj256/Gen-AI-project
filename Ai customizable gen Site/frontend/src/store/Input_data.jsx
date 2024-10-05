import { Children, createContext, useReducer, useState } from "react";


export const UserInput = createContext({
    aiInput: '',
    userInput: '',
    setAiInput: () => { },
    setUserInput: () => { },
    fetchdata:'',
    setfetchdata:()=>{},
    fetching:'',
    setFetching:()=> {}
});

const UserInputProvider = ({ children }) => {
    const [aiInput, setAiInput] = useState('');
    const [userInput, setUserInput] = useState('');
    const [fetchdata, setfetchdata] = useState('Hi how I help You');
    const [fetching, setFetching] = useState(false);

    return (
        <UserInput.Provider value={{ aiInput, setAiInput, userInput, setUserInput,fetchdata,setfetchdata,fetching,setFetching }}>
            {children}
        </UserInput.Provider>
    )
}

export default UserInputProvider