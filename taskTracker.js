// function to run when page is launched 
window.onload = function()
{
    setUpButtons();

    let currentTasks = localStorage.getItem("taskList");
    if (currentTasks != null)
    {
        let taskArray = JSON.parse(currentTasks);
        for (let taskIndex = 0; taskIndex < taskArray.length; taskIndex++)
        {
            renderTask(taskArray[taskIndex]);
        }
    }
};

function setUpButtons(){
    const title = document.getElementById("title");
    const addButton = document.getElementById("addItem");
    const removeButton = document.getElementById("removeItem");
    if (localStorage.getItem("title") != "")
    {
        title.innerHTML = localStorage.getItem("title");
    }
    else
    {
        title.innerHTML = "Click to Change Title";
    }

    title.addEventListener("click", changeTitle);
    addButton.addEventListener("click", addTask);
    removeButton.addEventListener("click", removeItem);

}

function changeTitle()
{
    let userInput = prompt("Enter a new title:", "Header");
    const title = document.getElementById("title");
    if (userInput != null)
    {
        title.innerText = userInput;
        localStorage.setItem("title", userInput);

    }
}

function addTask() {
    let userInput = prompt("Enter a new task:");
    while (userInput == '')
    {
        userInput = prompt("ERROR: Empty task not allowed, please enter a new string:");
    }

    renderTask(userInput);

    // if the array for storing my tasks does not exist
    if(localStorage.getItem("taskList") == null)
    {
        const newArray = [userInput];
        let string = JSON.stringify(newArray);
        localStorage.setItem("taskList", string);
    }

    // otherwise, array exists
    else
    {
        let retString = localStorage.getItem("taskList");
        let retArray = JSON.parse(retString);
        retArray.push(userInput);
        retString = JSON.stringify(retArray);
        localStorage.setItem("taskList", retString);
    }
}

function renderTask(userInput) 
{
    const taskList = document.getElementById("mainList");
    const newTask = document.createElement("label");
    newTask.setAttribute("id", userInput);
    newTask.classList.add("listItem");
    newTask.innerHTML = `   <input type=\"checkbox\">
                            ${userInput}
                            <span class=\"checkmark\"></span>`
    taskList.appendChild(newTask);
}

function removeItem()
{
    const taskList = document.getElementById("mainList");
    const children = taskList.children;
    let currentTasks = localStorage.getItem("taskList");

    if (currentTasks != null)
    {
        let taskArray = JSON.parse(currentTasks);
        for (let i = children.length - 1; i >= 0; i--)
        {
            // if the check box is checked
            if(children[i].children[0].checked)
            {
                children[i].remove();
                taskArray.splice(i,1);
            }
        }
        
        // rewrite array with removed items 
        let retString = JSON.stringify(taskArray);
        localStorage.setItem("taskList", retString);
    }

}
// possible extension: make this page work without webstorage support