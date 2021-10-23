import { structureElements } from "./createElement.js";
import { createTask , deleteTask , readTask , getUpdatedId , updateTask , updateTaskStatus } from "./crud.js";
import { openEditModal , closeEditModal } from "./modal.js";
import { validateTask } from "./validate.js";

export const createTaskHandler = async (taskObj , cacheRecord) => {
    let taskText = taskObj === undefined ? document.getElementById('create-task-input').value : taskObj.task;
    if(validateTask(taskText , cacheRecord)) return false;
    const taskHolder = (taskObj === undefined || taskObj.source === 'pending') ? document.getElementById('task-list-holder') : document.getElementById('completed-task-holder') ;
    const variableName = [ 'parentDiv' , 'taskCheckboxSpan' , 'taskEditSpan' , 'taskTrashSpan' , 'trashSpan' , 'inputCheckbox' , 'editIcon' , 'deleteIcon' ];
    const elementProperties = elementProperty();
    const finalElement = structureElements(variableName , elementProperties , taskText);
    finalElement[variableName[0]].id = taskObj === undefined ? parseInt(getUpdatedId()) + 1 : taskObj.id;
    finalElement[variableName[5]].checked = taskObj !== undefined && taskObj.source === 'done' && true; 
    finalElement[variableName[0]].setAttribute('status', taskObj !== undefined ? taskObj.source : 'pending' );
    taskHolder.appendChild(finalElement[variableName[0]]);
    taskObj === undefined && createTask(taskText);
    document.getElementById('create-task-input').value = '';
}

export const deleteTaskHandler = (element) => {
    const taskParent = element.parentElement;
    const taskId = taskParent.id;
    const taskHolder = taskParent.parentElement;
    taskHolder.removeChild(taskParent);
    deleteTask(parseInt(taskId));
}

export const editTaskHandler = (element) => {
    const taskParent = element.parentElement;
    const taskId = taskParent.id;
    openEditModal(taskId);
}

export const updateTaskHandler = () => {
    const taskId = document.getElementById('edit-modal-parent').getAttribute('task-id');
    const taskText = document.getElementById('edit-task-input').value;
    const temp = { taskId: parseInt(taskId) , taskText: taskText , source: document.getElementById(taskId).getAttribute('status') };
    const updatedElement = document.getElementById(taskId);
    updatedElement.children[1].innerHTML = taskText;
    updateTask(temp);
    closeEditModal();
}

const checkTaskHandler = (element) => {
    const completeTaskHolder = document.getElementById('completed-task-holder');
    const pendingTaskHolder = document.getElementById('task-list-holder');
    const checkbox = element.children[0];
    const taskParent = element.parentElement;
    const taskStatus = taskParent.getAttribute('status') === 'pending' ? 'done' : 'pending';
    taskParent.setAttribute('status' , taskParent.getAttribute('status') === 'pending' ? 'done' : 'pending' );
    updateTaskStatus(taskParent.id , taskStatus);
    if(checkbox.checked == true) completeTaskHolder.appendChild(taskParent);
    else pendingTaskHolder.appendChild(taskParent);
}

const elementProperty = () => {
    return [ 
        { 'element': 'div', 'attribute': { 'class': 'task-list' } },
        { 'element': 'span', 'attribute': { 'class': 'task-block' }, 'event': { 'onchange': checkTaskHandler } },
        { 'element': 'span', 'attribute': { 'class': 'task-block' }, 'event': { 'onclick': editTaskHandler } },
        { 'element': 'span', 'attribute': { 'class': 'task-block' }, 'event': { 'onclick': deleteTaskHandler } },
        { 'element': 'span', 'attribute': { 'class': 'task-text' } },
        { 'element': 'input', 'attribute': { 'type': 'checkbox' } },
        { 'element': 'i', 'attribute': { 'class': 'fa fa-pencil', 'aria-hidden': 'true' } },
        { 'element': 'i', 'attribute': { 'class': 'fa fa-trash-o', 'aria-hidden': 'true' } }
    ];
}

export const createCashedTask = () => {
    const localData = readTask();
    localData.map((value) => {
        createTaskHandler(value , true);
    });
}
