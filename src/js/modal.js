export const openEditModal = (taskId) => {
    const editModalParent = document.getElementById('edit-modal-parent');
    const editTaskInput = document.getElementById('edit-task-input');
    const taskText = document.getElementById(taskId).children[1].innerHTML;
    editTaskInput.value = taskText;
    editModalParent.style.display = 'block';
    editModalParent.setAttribute('task-id', taskId);
}

export const closeEditModal = () => {
    const editModalParent = document.getElementById('edit-modal-parent');
    const editTaskInput = document.getElementById('edit-task-input');
    editTaskInput.value = '';
    editModalParent.style.display = 'none';
    editModalParent.setAttribute('task-id', '');
}
