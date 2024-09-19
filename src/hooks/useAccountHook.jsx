import { useContext } from "react"
import { accountContext } from "../context/accountContext";

export const useAccountHook = () => {
    const context = useContext(accountContext);

    if(!context) {
        throw Error("useAccountHook does not work");
    }

    return context
}