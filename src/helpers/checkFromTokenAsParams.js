const checkFromToken = (main, param) => {
    // console.log('##########', main, param);
    // console.log(JSON.parse(localStorage.getItem('account')))
    if(JSON.parse(localStorage.getItem('account'))?.token !== param) {
        localStorage.removeItem("user")
        localStorage.removeItem("account")
        return true;
    }

    if(!param || !localStorage.getItem('account') || !localStorage.getItem('user')) {
        localStorage.removeItem("user")
        localStorage.removeItem("account")
        return true;
    }

    return false;
}

export default checkFromToken

