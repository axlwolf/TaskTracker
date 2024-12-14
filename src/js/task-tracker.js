export const TaskTracker = (() => {
  console.log("TaskTracker"); // Initializes the TaskTracker and logs it to the console

  // DOM references
  const $input = document.querySelector(".add-task");
  const $addTaskBtn = document.querySelector(".add-task-button");
  const $taskList = document.querySelector(".task-tracker__list ul");

  // Initializes the task list
  let tasks = [];

  // App initialization function
  const init = async () => {
    console.log("Init app"); // Logs to console that the app is initialized
    await loadTasks(); // Loads tasks from cache or localStorage
    renderTasks(); // Renders the tasks in the list
    eventHandlers(); // Sets up event handlers
  };

  // Sets up event handlers
  const eventHandlers = () => {
    $addTaskBtn.addEventListener("click", addTask); // Event to add a task
    $input.addEventListener("keydown", handleKeyPress);
  };

  // Handles key press events on the input
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      event.preventDefault(); // Prevents default action to avoid form submission
      addTask(); // Triggers addTask function on Enter/Return key press
    }
  };

  // Adds a new task to the list
  const addTask = async () => {
    const taskName = $input.value; // Gets the task name from the input
    if (taskName) {
      tasks.push({
        id: uuidv4(), // Generates a unique ID for the task
        creationDate: new Date().toISOString(), // Creation date
        completed: false, // Sets the completed status to false
        taskName, // Task name
        tags: [], // Associated tags (initially empty)
      });
      await saveTasks(); // Saves tasks to cache or localStorage
      renderTasks(); // Renders the updated tasks in the list
      $input.value = ""; // Clears the input
    }
  };

  // Deletes a task from the list by ID
  const deleteTask = async (id) => {
    tasks = tasks.filter((task) => task.id !== id); // Filters and removes the task with the specified ID
    await saveTasks(); // Saves the updated tasks
    renderTasks(); // Renders the updated tasks in the list
  };

  // Generates a unique ID for each task
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // Toggles the completed status of a task by ID
  const taskCompleted = async (id) => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await saveTasks(); // Saves the updated tasks
    renderTasks(); // Renders the updated tasks in the list
  };

  // Renders the tasks in the list
  const renderTasks = () => {
    $taskList.innerHTML = ""; // Clears the task list

    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-tracker__item");
      if (task.completed) {
        taskItem.classList.add("task-tracker__item--completed"); // Adds the 'completed' class if the task is completed
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      checkbox.checked = task.completed; // Sets the checkbox state based on the task's completed status
      checkbox.addEventListener("click", () => {
        taskCompleted(task.id); // Toggles the completed status of the task on click
      });

      taskItem.appendChild(checkbox); // Adds the checkbox to the task element

      const taskTitle = document.createElement("span");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = task.taskName; // Sets the task name
      taskItem.appendChild(taskTitle); // Adds the task name to the element

      const deleteTaskBtn = document.createElement("i");
      deleteTaskBtn.classList.add("fas", "fa-trash", "delete-task");
      deleteTaskBtn.addEventListener("click", () => deleteTask(task.id)); // Adds event to delete the task
      taskItem.appendChild(deleteTaskBtn); // Adds the delete button to the element

      $taskList.appendChild(taskItem); // Adds the task element to the list
    });
  };

  // Saves tasks to Cache API or localStorage
  const saveTasks = async () => {
    const data = JSON.stringify(tasks);
    if ("caches" in window) {
      try {
        const cache = await caches.open("task-cache");
        const response = new Response(data, {
          headers: { "Content-Type": "application/json" },
        });
        await cache.put("/tasks", response);
      } catch (error) {
        console.warn("Cache API failed, using localStorage", error);
        localStorage.setItem("tasks", data); // Saves to localStorage if Cache API fails
      }
    } else {
      localStorage.setItem("tasks", data); // Saves to localStorage if Cache API is not supported
    }
  };

  // Loads tasks from Cache API or localStorage
  const loadTasks = async () => {
    if ("caches" in window) {
      try {
        const cache = await caches.open("task-cache");
        const response = await cache.match("/tasks");
        if (response) {
          tasks = await response.json();
        } else {
          const data = localStorage.getItem("tasks");
          if (data) {
            tasks = JSON.parse(data); // Loads from localStorage if there's no cache
          }
        }
      } catch (error) {
        console.warn("Cache API failed, using localStorage", error);
        const data = localStorage.getItem("tasks");
        if (data) {
          tasks = JSON.parse(data); // Loads from localStorage if Cache API fails
        }
      }
    } else {
      const data = localStorage.getItem("tasks");
      if (data) {
        tasks = JSON.parse(data); // Loads from localStorage if Cache API is not supported
      }
    }
  };

  return {
    init,
  };
})();
