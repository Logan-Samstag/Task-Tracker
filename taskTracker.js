// function to run when page is launched 
window.onload = function()
{
    setUpButtons();
};

function setUpButtons(){
    const title = document.getElementById("title");

    title.addEventListener("click", changeTitle);
}

function changeTitle()
{
    const userInput = prompt("Enter a new title:", "Header");
    const title = document.getElementById("title");
    title.innerText = userInput;
}