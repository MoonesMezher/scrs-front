const checkFromToken = (main, param) => {
    if(main?.token !== param) {
        localStorage.removeItem("user")
        localStorage.removeItem("account")
        return true;
    }

    if(!param || !main) {
        localStorage.removeItem("user")
        localStorage.removeItem("account")
        return true;
    }

    return false;
}

export default checkFromToken

