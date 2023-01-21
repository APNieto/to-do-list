// Elements
const taskTemplatesSelector = document.getElementById('task-templates-selector')
const inputNewTask = document.getElementById('input-new-task')
const buttonAddTask = document.getElementById('button-add-task')
const listSection = document.getElementById('list-section')




// Event listeners
buttonAddTask.addEventListener('click', createNewTask)


// Functions
function createNewTask() {
    let newTaskElement = document.createElement('div')
    let descriptionInput = document.createElement('input')
    let selectedOptionText = taskTemplatesSelector.selectedOptions[0].textContent
    descriptionInput.value = `${selectedOptionText == '*None selected*' ? '' : selectedOptionText}${inputNewTask.value}`    // TEST LINE
    descriptionInput.disabled = true
    newTaskElement.append(descriptionInput)
    listSection.appendChild(newTaskElement)
}


// Executions
