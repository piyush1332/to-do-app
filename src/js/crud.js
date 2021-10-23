
export const createTask = (taskText) => {
    const localData = getTaskData();
    console.log(getUpdatedId());
    const taskId = parseInt(getUpdatedId()) + 1;
    const temp = { id: taskId , task: taskText , source: 'pending' };
    localData.push(temp);
    setTaskData(localData);
    setUpdatedId();
}

export const readTask = () => {
    const localDataString = localStorage.getItem('task-list') === null ? '[]' : localStorage.getItem('task-list');
    const localData = JSON.parse(localDataString);
    return localData;
}

export const deleteTask = (taskId) => {
    const localData = getTaskData();
    const temp = [];
    localData.map((value) => parseInt(value.id) !== taskId && temp.push(value));
    setTaskData(temp);
}

export const updateTask = (taskObj) => {
    const localData = getTaskData();
    localData.map((value) => {
        if(value.id === taskObj.taskId) {
            value.task = taskObj.taskText;
            value.source = taskObj.source;
        }
    });
    setTaskData(localData);
}

export const updateTaskStatus = (id , status) => {
    const localData = getTaskData();
    localData.map((value) => { 
        if(value.id === parseInt(id)) value.source = status 
    });
    setTaskData(localData);
}

export const getUpdatedId = () => {
    return localStorage.getItem('task-counter') === null ? 0 : localStorage.getItem('task-counter');
}

const getTaskData = () => {
    const localDataString = localStorage.getItem('task-list') === null ? '[]' : localStorage.getItem('task-list');
    const localData = JSON.parse(localDataString);
    return localData;
}

const setTaskData = (taskData) => {
    localStorage.setItem('task-list', JSON.stringify(taskData));
}

const setUpdatedId = () => {
    const taskCounter = localStorage.getItem('task-counter') === null ? 1 : parseInt(localStorage.getItem('task-counter')) + 1;
    localStorage.setItem('task-counter', taskCounter);
}