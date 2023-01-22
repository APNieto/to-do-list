// Elements, variables
const taskTemplatesSelector = document.getElementById('task-templates-selector')
const inputNewTask = document.getElementById('input-new-task')
const buttonAddTask = document.getElementById('button-add-task')
const listSection = document.getElementById('list-section')
let counterId = 0
let taskColor = 0



// Event listeners
taskTemplatesSelector.addEventListener('change', selectTemplate)
inputNewTask.addEventListener('keydown', event => {
    if (event.key == 'Enter' && inputNewTask.value) {createNewTask()}})
buttonAddTask.addEventListener('click', createNewTask)

inputNewTask.focus()



// Functions
function createNewTask() {
    if (inputNewTask.value) {        
        counterId++
        // Create a new task element, sub-container and button container
        let newTaskElement = document.createElement('div')    
        newTaskElement.id = `taskElement-${counterId}`
        newTaskElement.classList.add('task-element') 
        let newTaskButtonContainer = document.createElement('div')    
        newTaskButtonContainer.id = `taskButtonContainer-${counterId}`
        newTaskButtonContainer.classList.add('task-button-container') 
        let newTaskSubContainer = document.createElement('div')    
        newTaskSubContainer.id = `taskSubContainer-${counterId}`
        newTaskSubContainer.classList.add('task-sub-container') 
        // Create and append text of new element
        let newTaskDescription = document.createElement('input')
        newTaskDescription.id = `taskDescription-${counterId}`
        newTaskDescription.classList.add('task-description')
        newTaskDescription.value = inputNewTask.value
        newTaskDescription.disabled = true
        newTaskDescription.style.boxShadow = `-5px 0px 5px -3px hsla(${taskColor}, 100%, 65%, 0.75)`
        taskColor += 20
        newTaskElement.append(newTaskDescription)
        // Create and append lock/unlock button of new element
        let newTaskLockButton = document.createElement('button')
        newTaskLockButton.id = `taskLockButton-${counterId}`
        newTaskLockButton.classList.add('task-lock-button')
        newTaskLockButton.addEventListener('click', lockUnlockTask)
        newTaskButtonContainer.append(newTaskLockButton)    
        // Create and append 'done' button of new element
        let newTaskDoneButton = document.createElement('button')
        newTaskDoneButton.id = `taskDoneButton-${counterId}`
        newTaskDoneButton.classList.add('task-done-button')
        newTaskDoneButton.addEventListener('click', markAsDone)
        newTaskButtonContainer.append(newTaskDoneButton)
        // Create and append 'remove' button of new element
        let newTaskRemoveButton = document.createElement('button')
        newTaskRemoveButton.id = `taskRemoveButton-${counterId}`
        newTaskRemoveButton.classList.add('task-remove-button')
        newTaskRemoveButton.addEventListener('click', removeTask)
        newTaskButtonContainer.append(newTaskRemoveButton)
        newTaskSubContainer.append(newTaskButtonContainer)
        // Create and append timestamp of new element
        let newTaskTimestamp = document.createElement('p')
        newTaskTimestamp.id = `timestamp-${counterId}`
        newTaskTimestamp.textContent = generateTimestamp()
        newTaskTimestamp.classList.add('timestamp')
        newTaskSubContainer.append(newTaskTimestamp)
        newTaskElement.append(newTaskSubContainer)
        // Append the whole container to the list section
        newTaskElement.taskDone = false        
        listSection.appendChild(newTaskElement)
        inputNewTask.value = ''
        inputNewTask.focus()
    }
}

function selectTemplate() {
    let selectedOptionText = taskTemplatesSelector.selectedOptions[0].textContent
    if (selectedOptionText == '--Task templates--') {        
        // If no template is selected, the input content gets erased and focus goes there
        inputNewTask.value = ''
        inputNewTask.focus()
    } else if (selectedOptionText[selectedOptionText.length - 1] == '.') {
        // If the selected template needs completion (ends with '...')
        selectedOptionText = selectedOptionText.slice(0, -3)
        selectedOptionText += ' '
        inputNewTask.value = selectedOptionText
        inputNewTask.focus()
    } else {
        inputNewTask.value = selectedOptionText
        buttonAddTask.focus()
    }   
}

function lockUnlockTask(event) {
    let correspondingDescription = getCorrespondingElement(event, 'taskDescription')
    event.target.classList.toggle('task-lock-button-unlocked')
    if (correspondingDescription.disabled == true) {
        correspondingDescription.disabled = false
        correspondingDescription.focus()
    } else {
        correspondingDescription.disabled = true
    }        
}

function markAsDone(event) {
    // Looks for the containing task element of the clicked 'done' button
    let correspondingElement = getCorrespondingElement(event, 'taskElement')
    let correspondingDescription = getCorrespondingElement(event, 'taskDescription')
    // If done, marks it and sends it to bottom of the list;
    // if resetting to undone, unmarks it and sends it back to its original place
    if (correspondingElement.taskDone == false) {
        correspondingElement.taskDone = true
        correspondingDescription.classList.add('task-done')
        correspondingElement.remove()
        listSection.append(correspondingElement)
    } else {
        correspondingElement.taskDone = false
        correspondingDescription.classList.remove('task-done')
        let corrElementNrId = correspondingElement.id.slice(correspondingElement.id.indexOf('-') + 1)
        for (child of listSection.childNodes) {
            childNrId = child.id.slice(child.id.indexOf('-') + 1)
            if (childNrId > corrElementNrId) {
                child.before(correspondingElement)
                break
            } else {
                // pass
            }
        }
    }    
    event.target.classList.toggle('task-done-button-undo')
}

function removeTask(event) {
    let correspondingElement = getCorrespondingElement(event, 'taskElement')
    correspondingElement.remove()
}

function getCorrespondingElement(event, typeOfElement) {
    let fullElementId = event.target.id
    elementId = fullElementId.slice(fullElementId.indexOf('-') + 1)
    let correspondingElement = document.getElementById(`${typeOfElement}-${elementId}`)
    return correspondingElement
}

function generateTimestamp() {
    let weekdays = {0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat'}
    let date = new Date()
    let timestamp = `Added ${weekdays[date.getDay()]} ${date.getMonth() + 1 }/${date.getDate()},
    ${date.getHours()}:${date.getMinutes()}hs`
    return timestamp
}