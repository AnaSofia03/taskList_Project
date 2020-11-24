function TaskList() {
  this.inputTask = document.querySelector('.input1');
  this.oneTask = document.querySelector('.task'); //li


  this.iniciateList = () => {
    this.btnAddClick();
    this.keypressAdd();
  };



  this.btnAddClick = () => {
    document.addEventListener('click', e => {
      const el = e.target;
      if (el.classList.contains('btn-add')) {
        let task = this.inputTask.value;
        if (!task) {
          return
        } this.createTask(this.inputTask.value);
      }

      if (el.classList.contains('btn-delete')) {
        this.deleteTask(e);
      }
    })
  }

  this.keypressAdd = () => {
    this.inputTask.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        if (!this.inputTask.value) {
          return
        } this.createTask(this.inputTask.value);
      }
    });
  };


  this.deleteTask = (e) => {
    const selectedElement = e.target;
    if (selectedElement.classList.contains('btn-delete')) {
      selectedElement.parentElement.remove(); //parentElement é o li, ou seja, a tarefa
    }
    this.saveTasks();
  }


  this.createTask = (inputValue) => {
    this.tasks = document.querySelector('.tasks')
    li = document.createElement("li");
    li.innerText = inputValue;
    this.tasks.appendChild(li);
    this.clearInput();
    this.createDelBtn(li);
    this.oneTask.classList.add('hide');
    this.saveTasks();
  };

  this.clearInput = () => {
    this.inputTask.value = '';
    this.inputTask.focus();
  };

  this.createDelBtn = (li) => {
    button = document.createElement("button");
    button.innerText = "Apagar";
    button.classList.add('btn', 'btn-danger', 'btn-delete', 'mr-3', 'mt-2', 'float-right')
    li.appendChild(button);
  };


  this.saveTasks = () => {
    const liTasks = this.tasks.querySelectorAll('li');
    const listOfTasks = [];
    for (let task of liTasks) {
      let tasktext = task.innerText;
      tasktext = tasktext.replace('Apagar', '').trim();
      listOfTasks.push(tasktext);

    }

    if (listOfTasks.length === 0) {
      this.oneTask.classList.remove('hide');
    }

    const taskJson = JSON.stringify(listOfTasks);
    localStorage.setItem('tasks', taskJson);

  }

  this.refreshSavedTasks = () => {
    const tasks = localStorage.getItem('tasks');
    const list = JSON.parse(tasks);
    for (let task of list) {
      this.createTask(task);
    }
  }
  this.refreshSavedTasks();

}

const list = new TaskList();
list.iniciateList();