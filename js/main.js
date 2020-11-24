const inputTask = document.querySelector('.input1');
const btnAdd = document.querySelector('.btn-add');
const tasksList = document.querySelector('.tasks'); //ul
const oneTask = document.querySelector('.task'); //li
const btnDel = document.querySelector('.btn-delete');

inputTask.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) { //eu posso saber o codigo das teclas com um console.log(e) //keyCode:13
    if (!inputTask.value) {
      return;
    }
    createTask(inputTask.value);

  }
});


btnAdd.addEventListener('click', () => {
  if (!inputTask.value) {
    return;
  }
  createTask(inputTask.value);
});

document.addEventListener('click', deleteTask)



function createTask(input) {
  li = document.createElement("li");
  li.innerText = input;
  tasksList.appendChild(li);
  //console.log(tasksList);
  createBtn(li);
  oneTask.classList.add('hide');
  clearInput();
  saveTasks();
  
}



function createBtn(li) {
  button = document.createElement("button");
  button.innerText = 'Apagar';
  button.classList.add('btn', 'btn-danger', 'btn-delete', 'mr-3', 'mt-2', 'float-right')
  li.appendChild(button);
}



function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}


function deleteTask(e) {
  const selectedElement = e.target;
  if (selectedElement.classList.contains('btn-delete')) {
    selectedElement.parentElement.remove();
  }
  saveTasks();
}

function saveTasks() {
  const liTasks = tasksList.querySelectorAll('li');
  const listOfTasks = [];
  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('Apagar', '').trim();
    listOfTasks.push(taskText);

  }
  if (listOfTasks.length === 0) {
    oneTask.classList.remove('hide');
  }

  const tasksJSON = JSON.stringify(listOfTasks);
  localStorage.setItem('tasks', tasksJSON);


}

function refreshSavedTasks() {
  const tasks = localStorage.getItem('tasks');
  const list = JSON.parse(tasks);

  for (let task of list) {
    createTask(task);
  }
};
refreshSavedTasks();