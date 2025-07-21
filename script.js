const input = document.querySelector(".input");
const addBtn = document.querySelector(".btnAdd");

const tasklist = document.querySelector(".task-list");


function deleteTask(taskElement){
    taskElement.remove();
}

function editTask(taskElement){
    const editInput = document.createElement("input");
    editInput.classList.add("input");
    editInput.setAttribute("type","text");

    let taskContent = taskElement.innerText;

    editInput.value = taskContent;

    taskElement.innerHTML = '';
    taskElement.appendChild(editInput);
    editInput.focus();

    editInput.addEventListener("keypress",(e)=>{
        if(e.key == "Enter"){
            let finalTaskValue = editInput.value.trim();
            if(finalTaskValue){
                taskElement.innerText = finalTaskValue;
            }  
        }
    });
    editInput.addEventListener("keydown",(e)=>{
        if(e.key == "Escape"){
            taskElement.innerText = taskContent;
        }
    }); 
}

function createTask(taskText){
    const maindiv = document.createElement("div");
    maindiv.classList.add("task");


    const leftDiv =  document.createElement("div");
    leftDiv.classList.add("left-div");

    const rightDiv =  document.createElement("div");
    rightDiv.classList.add("left-div");


    const li = document.createElement("li");
    li.classList.add("taskname");
    li.innerText = taskText;

    const inputcheck = document.createElement("input");
    inputcheck.setAttribute("type","checkbox");
    inputcheck.classList.add("checkbox");



    const deletebtn = document.createElement("button");
    deletebtn.classList.add("btn");
    deletebtn.innerText = "Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.innerText = "Edit";


    leftDiv.appendChild(inputcheck);
    leftDiv.appendChild(li);

    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deletebtn);


    maindiv.appendChild(leftDiv);
    maindiv.appendChild(rightDiv);
    
   
    deletebtn.addEventListener("click",()=>{
        deleteTask(maindiv);
    });

    editBtn.addEventListener("click",()=>{
        editTask(li);
    });

    inputcheck.addEventListener("change",()=>{
        li.classList.toggle("completed");
        if (inputcheck.checked) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
            li.style.color = "#888";
        } else {
                li.style.textDecoration = "none";
                li.style.opacity = "1";
                li.style.color = "black";
        }
        editBtn.remove();
        inputcheck.disabled = true;
    });

    return maindiv;
}



addBtn.addEventListener("click",()=>{
   
    const existingError = document.querySelector(".error-msg");
    if (existingError) {
        existingError.remove();
    }
    
    let value = input.value.trim();
    if (!value) {
        const errorMsg = document.createElement("p");
        errorMsg.innerText = "Please enter a valid task!";
        errorMsg.classList.add("error-msg");
        errorMsg.style.color = "red";
        errorMsg.style.margin = "5px 0";
        
       
        // tasklist.parentNode.insertBefore(errorMsg, tasklist);
        tasklist.insertAdjacentElement('beforebegin', errorMsg);
        input.value = '';

        return;
    } else {
        const div = createTask(value);
        tasklist.insertAdjacentElement('afterbegin',div);
        input.value = '';
        input.focus();
    }
});

input.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        const existingError = document.querySelector(".error-msg");
    if (existingError) {
        existingError.remove();
    }
    
    let value = input.value.trim();
    if (!value) {
        const errorMsg = document.createElement("p");
        errorMsg.innerText = "Please enter a valid task!";
        errorMsg.classList.add("error-msg");
        errorMsg.style.color = "red";
        errorMsg.style.margin = "5px 0";
        
       
        tasklist.insertAdjacentElement('beforebegin', errorMsg);
        input.value = '';

        return;
    } else {
        const div = createTask(value);
        tasklist.insertAdjacentElement('afterbegin',div);
        input.value = '';
        input.focus();
    }
    }
});


