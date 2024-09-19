export const startTimer = (func, delay) => {
    let timeoutId;
    timeoutId = setTimeout(function timer() {
        func();
        timeoutId = setTimeout(timer, delay);
    }, delay);
}
