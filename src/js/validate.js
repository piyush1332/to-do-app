export const validateTask = (task , cacheRecord) => {
    if(task !== '' && task.length > 2) {
        return false;
    } else {
        if(cacheRecord !== true) showErrorMessage();
        return true;
    }
}

export const showErrorMessage = () => {
    document.getElementById('error-message').style.display = 'block';
    setTimeout(()=>{
        document.getElementById('error-message').style.display = 'none';
    },3000);
}