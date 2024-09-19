import { useContext } from "react"
import { alertContext } from "../context/alertContext";

export const useAlertHooks = () => {
    const context = useContext(alertContext);

    // console.log(context.show);

    if(!context) {
        throw Error("useAlertHooks does not work");
    }

    return context
}