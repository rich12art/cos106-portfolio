/* planner.js
   Academic Planner for the COS 106 term project.

   How it works (the ideas this file is meant to show):
   - Tasks are stored in an array of objects.
   - Functions add, complete and delete tasks.
   - The list is drawn with DOM methods (not hardcoded HTML for each task).
   - The array is saved in localStorage so tasks stay after a refresh.
*/

// The array that holds every task currently in the planner.
var tasks = [];

// The key used to save the array in the browser.
var STORAGE_KEY = "cos106-planner-tasks";

/* ----- Helper functions ----- */

function loadTasks() {
  var saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    tasks = [];
    return;
  }

  try {
    tasks = JSON.parse(saved);
  } catch (error) {
    // If the saved data is damaged, start with an empty list.
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(title, course) {
  return {
    id: Date.now().toString(),
    title: title,
    course: course,
    completed: false
  };
}

/* ----- Rendering (DOM manipulation) ----- */

function renderTasks() {
  var list = document.getElementById("task-list");
  var summary = document.getElementById("task-summary");

  // Clear the current list, then build it again from the array.
  list.innerHTML = "";

  if (tasks.length === 0) {
    summary.textContent = "No tasks yet. Add your first task using the form.";
    return;
  }

  var completedCount = tasks.filter(function (task) {
    return task.completed;
  }).length;

  summary.textContent =
    completedCount + " of " + tasks.length + " task" +
    (tasks.length === 1 ? "" : "s") + " completed.";

  tasks.forEach(function (task) {
    var item = document.createElement("li");
    item.className = "task-item" + (task.completed ? " completed" : "");
    item.dataset.id = task.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark \"" + task.title + "\" as complete");
    checkbox.addEventListener("change", function () {
      toggleComplete(task.id);
    });

    var details = document.createElement("div");
    details.className = "task-details";

    var title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;
    details.appendChild(title);

    if (task.course) {
      var course = document.createElement("p");
      course.className = "task-course";
      course.textContent = task.course;
      details.appendChild(course);
    }

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    item.appendChild(checkbox);
    item.appendChild(details);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

/* ----- Actions ----- */

function addTask(title, course) {
  tasks.unshift(createTask(title, course));
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      // Return a new object with the opposite completed value.
      return {
        id: task.id,
        title: task.title,
        course: task.course,
        completed: !task.completed
      };
    }
    return task;
  });
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

/* ----- Event handling ----- */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("planner-form");
  var titleInput = document.getElementById("task-title");
  var courseInput = document.getElementById("task-course");
  var formError = document.getElementById("planner-error");

  loadTasks();
  renderTasks();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var title = titleInput.value.trim();
    var course = courseInput.value.trim();

    if (title === "") {
      formError.textContent = "Please enter a task title.";
      titleInput.focus();
      return;
    }

    formError.textContent = "";
    addTask(title, course);
    form.reset();
    titleInput.focus();
  });
});
