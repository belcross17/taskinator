var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;



var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(taskNameInput === "" || taskTypeInput === "") {
        alert("you need to fill out the task form!");
        return false;
    }
  
    formEl.reset();

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;


    //package up data as an Object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    // give it class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='tasl-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editbuttonEl = document.createElement("button");
    editbuttonEl.textContent = "Edit";
    editbuttonEl.className = "btn edit-btn";
    editbuttonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editbuttonEl);

    //Create delete button
    var deletebuttonEl = document.createElement("button");
    deletebuttonEl.textContent = "Delete";
    deletebuttonEl.className = "btn delete-btn";
    deletebuttonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deletebuttonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
        for (var i = 0; i < statusChoices.length; i++) {
            //create option element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);

            // append to select
            statusSelectEl.appendChild(statusOptionEl);
        }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);