const todoform = document.querySelector('form');
const todoinput = document.getElementById('input-todo');
const todoListUL = document.getElementById('todo-list');
let alltodo = getTODo();
updateTodoList();

todoform.addEventListener('submit', function(e){
    e.preventDefault();
    // alert("test");
    addTodo();
})
function addTodo(){
    const todotext = todoinput.value.trim();
    // alert(todotext);
    if(todotext.length >0){
        const todoobject = {
            text : todotext,
            completed : false,
        }

        alltodo.push(todoobject);
       // createTodoitem(todotext);
        updateTodoList();
        savetodo();
        todoinput.value = "";
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    alltodo.forEach((todo, todoIndex)=>{
        todoItem = createTodoitem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoitem(todo, todoIndex){
    const todoId = "todo-"+ todoIndex;
    const todo1 = document.createElement("li");
    const todotxt = todo.text;
    todo1.className = "todo";
    todo1.innerHTML = `<input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#000000">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todotxt}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px"
                        viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>`

    const delButton = todo1.querySelector(".delete-button");
    delButton.addEventListener('click', ()=>{
        delTodo(todoIndex);
    })
    const chkbox = todo1.querySelector("input");
    chkbox.addEventListener("change", ()=>{
        alltodo[todoIndex].completed = chkbox.checked;
        savetodo();
    })
    //todoListUL.append(todo1);
    chkbox.checked = todo.completed;
    
    return todo1;
}

function delTodo(todoIndex){
    alltodo = alltodo.filter((_, i)=> i !== todoIndex);
    savetodo();
    updateTodoList();
}

function savetodo(){
    // localStorage.setItem("test", "124345")
    const todoJSOn = JSON.stringify(alltodo);
    localStorage.setItem("todos", todoJSOn);
}

function getTODo(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
