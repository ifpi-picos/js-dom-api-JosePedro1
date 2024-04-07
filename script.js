document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskColor = document.getElementById("taskColor");

    addButton.addEventListener("click", function() {
        const taskInputValue = taskInput.value;
        const taskDateValue = taskDate.value;
        const taskColorValue = taskColor.value;

        if (taskInputValue.trim() !== "") {
            addTaskToList(taskInputValue, taskDateValue, taskColorValue);
            saveTaskToLocal(taskInputValue, taskDateValue, taskColorValue);
            clearInputFields();
        } else {
            alert("Por favor, insira uma tarefa válida.");
        }
    });

    function addTaskToList(taskInputValue, taskDateValue, taskColorValue) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("taskItem");
        taskItem.innerHTML = `
            <span>${taskInputValue} - ${taskDateValue}</span>
            <button class="editButton">Editar</button>
            <button class="removeButton">Remover</button>
        `;
        taskItem.style.backgroundColor = taskColorValue;
        taskList.appendChild(taskItem);


        const removeButton = taskItem.querySelector(".removeButton");
        removeButton.addEventListener("click", function() {
            taskItem.remove();
            removeTaskFromLocal(taskInputValue, taskDateValue, taskColorValue);
        });

        const editButton = taskItem.querySelector(".editButton");
        editButton.addEventListener("click", function() {
        
            taskItem.remove();
            taskInput.value = taskInputValue;
            taskDate.value = taskDateValue;
            taskColor.value = taskColorValue;
        });
    }

    function saveTaskToLocal(taskInputValue, taskDateValue, taskColorValue) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ taskInput: taskInputValue, taskDate: taskDateValue, taskColor: taskColorValue });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTaskFromLocal(taskInputValue, taskDateValue, taskColorValue) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => {
            return task.taskInput !== taskInputValue ||
                   task.taskDate !== taskDateValue ||
                   task.taskColor !== taskColorValue;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function clearInputFields() {
        taskInput.value = "";
        taskDate.value = "";
        taskColor.value = "#000000";
    }


    loadTasks();

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToList(task.taskInput, task.taskDate, task.taskColor);
        });
    }
});
