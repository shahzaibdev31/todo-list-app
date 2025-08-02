// Get All Elements 
const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const activeBtn = document.querySelector('#filter-active');
const allBtn = document.querySelector('#filter-all');
const completeBtn = document.querySelector('#filter-completed');
const taskCount = document.querySelector('#tasks-count');
const clearBtn = document.querySelector('#clear-completed');
const defaultList = document.querySelector('#todo-list');
const emptyMsg = document.querySelector('#msg');

// Create Two More Lists
const activeList = document.createElement('ul');
const completedList = document.createElement('ul');

// By Default
activeList.style.display = 'none';
completedList.style.display = 'none';

// Apply Styles to Both new Lists
activeList.classList.add('todo-list');
completedList.classList.add('todo-list');

// Append the Lists
defaultList.parentElement.appendChild(activeList);
defaultList.parentElement.appendChild(completedList);

// Create Three Variables for Counting Tasks in Each List
let countDefaultItems = 0;
let countActiveItems = 0;
let countCompletedItems = 0;

// Create Message Tags
const defualtMsg = document.createElement('span');
defualtMsg.classList.add('msg');
defaultList.appendChild(defualtMsg);
const activeMsg = document.createElement('span');
activeMsg.classList.add('msg');
activeList.appendChild(activeMsg);
const completeMsg = document.createElement('span');
completeMsg.classList.add('msg');
completedList.appendChild(completeMsg);

// Message Display Function
function Message(count) {
    if (allBtn.classList.contains('active')) {
        defualtMsg.textContent = 'No Pending Tasks';     // Defualt-Message
        if (count === 0) {
            defualtMsg.style.display = 'block';
        } else {
            defualtMsg.style.display = 'none';
        }
    }

    if (activeBtn.classList.contains('active')) {
        activeMsg.textContent = 'No Active-Tasks';        // Active-Message
        if (count === 0) {
            activeMsg.style.display = 'block';
        } else {
            activeMsg.style.display = 'none';
        }
    }
    if (completeBtn.classList.contains('active')) {
        completeMsg.textContent = 'No Completed-Tasks';          // Completed-Message
        if (count === 0) {
            completeMsg.style.display = 'block';
        } else {
            completeMsg.style.display = 'none';
        }
    }
}

updateCounter();

// Task Count Tracking
function trackCount(num) {
    if (num === 0) {
        taskCount.textContent = 'No Tasks';
    } else {
        taskCount.textContent = num === 1 ? `${num} Task` : `${num} Tasks`;
    }
}

//  Arrange Tracking of Correct number of tasks
function updateCounter() {
    if (allBtn.classList.contains('active')) {
        trackCount(countDefaultItems);
        Message(countDefaultItems);
    } else if (activeBtn.classList.contains('active')) {
        trackCount(countActiveItems);
        Message(countActiveItems);
    } else if (completeBtn.classList.contains('active')) {
        trackCount(countCompletedItems);
        Message(countCompletedItems);
    }
}

// Check Whether A task is Already Added
function taskCheck(task) {
    const allDefaultTasks = defaultList.querySelectorAll('.todo-text');
    for (let defaultTask of allDefaultTasks) {
        if (defaultTask.textContent === task) {
            alert(`${task} is already added.`);
            return false;
        }
    }
    return true;
}


// Add a new Task Dynamically
function addTask(taskName) {
    const defualtListItem = document.createElement('li');
    defualtListItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-checkbox');    // CHECKBOX
    const label = document.createElement('span');
    label.textContent = taskName;
    label.classList.add('todo-text');   // LABEL
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');  // DELETE-BTN

    defualtListItem.appendChild(checkbox);
    defualtListItem.appendChild(label);
    defualtListItem.appendChild(deleteBtn);

    defaultList.append(defualtListItem);
    countDefaultItems++;

    // Add Task to Active List
    addToActiveList(taskName);

    updateCounter();  // Update Task Counter
    showTaskDialog('✅ Task Added Successfully');   // Show Success Message
}

// Add Task to Active List
function addToActiveList(taskName) {
    const activeListItem = document.createElement('li');
    activeListItem.classList.add('todo-item');

    const label = document.createElement('span');
    label.textContent = taskName;
    label.classList.add('todo-text');       // LABEL
    const text = document.createElement('h3');
    text.textContent = 'ACTIVE-TASK';
    text.style.color = '	#fd7e14';      // TEXT-DISPLAY

    activeListItem.appendChild(label);
    activeListItem.appendChild(text);

    activeList.append(activeListItem);
    countActiveItems++;

    updateCounter();  // Update Task Counter
}

// Add a new Item to Completed List
function addToCompleteList(taskName) {

    const completeListItem = document.createElement('li');
    completeListItem.classList.add('todo-item');

    const label = document.createElement('span');
    label.textContent = taskName;
    label.classList.add('todo-text');       // LABEL
    const text = document.createElement('h3');
    text.textContent = 'TASK COMPLETED';
    text.style.color = 'green';      // TEXT-DISPLAY

    completeListItem.appendChild(label);
    completeListItem.appendChild(text);

    completedList.append(completeListItem);
    countCompletedItems++;

    updateCounter();  // Update Task Counter
}

defaultList.addEventListener('click', (eventTrigger) => {
    if (eventTrigger.target.classList.contains('todo-checkbox')) {
        const CHECKBOX = eventTrigger.target;
        const TASK = CHECKBOX.nextElementSibling;
        CHECKBOX.disabled = true;   // keep checked
        if (CHECKBOX.checked) {
            TASK.style.textDecoration = 'line-through';
            TASK.style.opacity = '0.8';
            addToCompleteList(TASK.textContent);            // Add to Complete List
            removeFromActive(TASK.textContent);             // remove From Active List
        }
        return;
    }
    if (eventTrigger.target.closest('.delete-btn')) {
        const delItem = eventTrigger.target.closest('li');
        const delTASK = delItem.querySelector('.todo-text');
        showTaskDialog(`${delTASK.textContent} has been Deleted Successfully`);
        delItem.remove();       // Remove that Element
        countDefaultItems--;

        updateCounter();  // Update Task Counter
        const checkbox = delItem.querySelector('.todo-checkbox');
        if (checkbox.checked) {
            removeFromComplete(delTASK.textContent);
        } else {
            removeFromActive(delTASK.textContent);
        }
    }
})

// Delete A task From Active List
function removeFromActive(deltask) {
    const allActiveTasks = activeList.querySelectorAll('.todo-text');
    allActiveTasks.forEach(activeTask => {
        if (activeTask.textContent == deltask) {
            activeTask.closest('li').remove();  // remove element
            countActiveItems--;

            updateCounter();  // Update Task Counter
        }
    })
}

// Delete A Task From Completed List
function removeFromComplete(deltask) {
    const allCompleteTasks = completedList.querySelectorAll('.todo-text');
    allCompleteTasks.forEach(completeTask => {
        if (completeTask.textContent == deltask) {
            completeTask.closest('li').remove();        // remove That Element
            countCompletedItems--;

            updateCounter();  // Update Task Counter
        }
    })
}

// Functional All Buttons
allBtn.addEventListener('click', () => {
    if (!allBtn.classList.contains('active'))
        allBtn.classList.add('active');     // Activate Defualt Btn
    if (completeBtn.classList.contains('active'))
        completeBtn.classList.remove('active');
    if (activeBtn.classList.contains('active'))
        activeBtn.classList.remove('active');

    defaultList.style.display = 'block';
    activeList.style.display = 'none';
    completedList.style.display = 'none';

    clearBtn.textContent = 'Clear Completed';
    clearBtn.disabled = false;

    updateCounter();  // Update Task Counter
})

activeBtn.addEventListener('click', () => {
    if (!activeBtn.classList.contains('active'))
        activeBtn.classList.add('active');     // Activate Defualt Btn
    if (completeBtn.classList.contains('active'))
        completeBtn.classList.remove('active');
    if (allBtn.classList.contains('active'))
        allBtn.classList.remove('active');

    defaultList.style.display = 'none';
    activeList.style.display = 'block';
    completedList.style.display = 'none';

    clearBtn.textContent = 'Active-Status';
    clearBtn.disabled = true;

    updateCounter();  // Update Task Counter
})

completeBtn.addEventListener('click', () => {
    if (!completeBtn.classList.contains('active'))
        completeBtn.classList.add('active');     // Activate Complete Btn
    if (allBtn.classList.contains('active'))
        allBtn.classList.remove('active');
    if (activeBtn.classList.contains('active'))
        activeBtn.classList.remove('active');

    defaultList.style.display = 'none';
    activeList.style.display = 'none';
    completedList.style.display = 'block';

    clearBtn.textContent = 'Clear Completed';
    clearBtn.disabled = false;

    updateCounter();  // Update Task Counter
})

// Add Button Functionality
addBtn.addEventListener('click', () => {
    if (input.value.trim() === '') {
        alert('Enter Some Task ...');
    } else {
        if (taskCheck(input.value))
            addTask(input.value);
    }
})

// DialogBox Function
function showTaskDialog(message) {
    const dialogBox = document.getElementById('task-dialog');
    const dialogMsg = document.getElementById('dialog-message');
    dialogMsg.textContent = message;

    dialogBox.style.display = 'flex';

    // Auto-hide after 0.4 seconds
    setTimeout(() => {
        dialogBox.style.display = 'none';
    }, 1500);
}

clearBtn.addEventListener('click', () => {
    const defaultListItems = defaultList.querySelectorAll('.todo-checkbox');
    defaultListItems.forEach(defaultItem => {
        if (defaultItem.checked) {
            const labelFor = defaultItem.nextElementSibling;
            defaultItem.closest('li').remove();                     // remove from lists
            removeFromComplete(labelFor.textContent);
            countDefaultItems--;
            updateCounter(countDefaultItems);
            showTaskDialog('All Completed Tasks Removed Successfully');
        }
    })
})