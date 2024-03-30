document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const todoList = document.getElementById("todoList");
  const dateContainer = document.getElementById("dateContainer");

  function getCurrentDate() {
    const currentDate = new Date();
    const options = {
      /*weekday: "long",*/
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  }
  dateContainer.textContent = "Current Date: " + getCurrentDate();
  /*dateContainer.textContent = "Today's Date: " + getCurrentDate();*/

  addTaskBtn.addEventListener("click", function () {
    const task = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (task !== "") {
      const newTask = document.createElement("li");
      newTask.innerHTML = `
                <div>${task}</div>
                <div>Due Date: ${dueDate}</div>
                <button class="delete-btn">Done</button>
            `;
      todoList.appendChild(newTask);

      taskInput.value = "";
      dueDateInput.value = "";

      sortTasks();
    } else {
      alert("Please enter a valid task.");
    }
  });

  todoList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.remove();
    }
  });

  function sortTasks() {
    const tasks = Array.from(todoList.children);
    tasks.sort((a, b) => {
      const aDueDate = new Date(
        a.querySelector("div:nth-child(2)").textContent.split("Due Date: ")[1]
      );
      const bDueDate = new Date(
        b.querySelector("div:nth-child(2)").textContent.split("Due Date: ")[1]
      );
      return aDueDate - bDueDate;
    });
    todoList.innerHTML = "";
    tasks.forEach((task) => {
      todoList.appendChild(task);
    });
  }
});
