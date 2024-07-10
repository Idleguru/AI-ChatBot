import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("")
    const [prevPrompt, setprevPrompt] = useState([])
    const [Showresult, setShowresult] = useState(false)
    const [loading, setloading] = useState(false)
    const [resulData, setresulData] = useState("")
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setresulData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        setloading(false)
        setShowresult(false)
    }

    const onSent = async (prompt) => {
        setresulData("")
        setloading(true)
        setShowresult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setrecentPrompt(prompt)
        } else {
            setprevPrompt(prev => [...prev, input])
            setrecentPrompt(input)
            response = await runChat(input)
        }
        let responseArray = response.split("**");

        let boldResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                boldResponse += responseArray[i];
            } else {
                boldResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let finalResponse = boldResponse.split("*").join("<br/>")

        let newResponseArray = finalResponse.split(" ");
        for (let i = 1; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setloading(false)
        setinput("")
    }

    const contextValue = {
        prevPrompt,
        setprevPrompt,
        onSent,
        setrecentPrompt,
        recentPrompt,
        Showresult,
        loading,
        resulData,
        input,
        setinput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;