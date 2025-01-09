import { useState } from "react";
import { UserContext } from "./context";

export const UserProvider = ({ children }) => {

    const [example, setExample] = useState(0)

    const toggleExample = () => {
        setExample(example + 1)
    }

    return (
        <UserContext.Provider value={{ example, toggleExample }}>
            {children}
        </UserContext.Provider>
    )
}