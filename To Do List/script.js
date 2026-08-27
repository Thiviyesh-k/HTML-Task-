function addTask() {

    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();

    if (taskText == "") {
        alert("Please enter a task");
        return;
    }

    var taskDiv = document.createElement("div");
    taskDiv.className = "task";
    
    var taskSpan = document.createElement("span");
    taskSpan.innerText = taskText;

    var actions = document.createElement("div");
    actions.className = "task-actions";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() {
        taskDiv.classList.toggle("done");
    };

    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = function() {
        var newText = prompt("Edit your task:", taskSpan.innerText);
        if (newText != null && newText.trim() != "") {
            taskSpan.innerText = newText.trim();
        }
    };

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        taskDiv.remove();
    };

    actions.appendChild(checkbox);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(actions);

    document.getElementById("taskList").appendChild(taskDiv);

    input.value = "";
    input.focus();
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});