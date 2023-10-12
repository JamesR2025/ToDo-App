
// Global variable to store tasks
const tasks = [];

// Function to add a new todo
const addTodo = () => {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  const prioritySelect = document.getElementById('prioritySelect');
  const selectedPriority = prioritySelect.value;

    if (todoInput.value.trim() === '' || prioritySelect.value.trim() === '') {
    alert('Both fields must be filled in to create a task.');
    return; // Prevent further execution if fields are empty
  }

  const newTask = {
    text: todoText,
    priority: selectedPriority,
    completed: false, // Add a completed flag
    // You can also include a unique ID here
  };

  tasks.push(newTask);

  // Clear input fields
  todoInput.value = '';
  prioritySelect.value = ''; // Clear the priority selection

  tasks.sort((a, b) => {
    const priorityOrder = ['low', 'medium', 'high'];
    return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
  });

  renderTaskList();
}



const clearList = () => {
  /*const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; // Clear the list*/
  tasks.length = 0; // Clear the task array
  renderTaskList()
}



const renderTaskList = () => {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.text}, ${task.priority} priority`;

    if (task.completed) {
      li.style.textDecoration = 'line-through'; // Apply strikethrough
    }

    
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
      // Delete the task from the array and re-render the list
      tasks.splice(index, 1);
      renderTaskList();
    };

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete-button';
    completeButton.onclick = () => {
        task.completed = !task.completed;
        renderTaskList(); // Re-render the list to update the completed status
      /*const li = completeButton.parentElement; // Get the parent list item
      li.classList.toggle('completed');
      task.completed = !task.completed;*/
    }

    li.appendChild(completeButton);
    
  });
}

const todoInput = document.getElementById('todoInput');
todoInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTodo();
  }
});