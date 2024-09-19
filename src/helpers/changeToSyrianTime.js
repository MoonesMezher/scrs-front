const changeToSyrianTime = (time) => {
    if(!time) {
        return;
    }    
    // const syrianTimezoneOffset = 3 * 60 * 60 * 1000; // 3 hours ahead of UTC

    const originalDate = new Date(time);
    const syrianDate = new Date(originalDate.getTime());

    const syrianTime = syrianDate.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return syrianTime
}

export default changeToSyrianTime