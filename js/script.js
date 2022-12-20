//Define UI Element

let form = document.querySelector('#task-form');
let tasklist = document.querySelector('ul');
let clearbtn = document.querySelector('#clear-task');
let filter = document.querySelector('#task-filter');
let taskinput = document.querySelector('#input-value');


//Define Event Listeners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeli);
clearbtn.addEventListener('click', cleartask);
filter.addEventListener('keyup', filtertask);
document.addEventListener('DOMContentLoaded', getTasks);




//Define function
function addTask(e){
    e.preventDefault();
    if(taskinput.value === ''){
        alert('Add a Task')
    }else{
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskinput.value + ""))
        tasklist.appendChild(li)

        // create a tag
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = "x";
         li.appendChild(link);

         // localstorage save
         storeTaskInLocalStorage(taskinput.value);

         taskinput.value = "";

    }
}

// Remove li

function removeli(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you Sure')){
            let ele = e.target.parentElement;
            ele.remove();
            removefromls(ele);
        }
    }
}

// Clear All Data task

function cleartask(){
    tasklist.innerHTML = '';
    localStorage.clear();

    //faster
    // while(tasklist.firstChild){
    //     tasklist.removeChild(tasklist.firstChild)
    // }
}

// filter data task

function filtertask(e){
    let text = e.target.value.toLowerCase();
    
    //all list data 
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}


// localstorage save

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}   

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach (task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ""))
        tasklist.appendChild(li)

        // create a tag
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = "x";
         li.appendChild(link);
    })
}

// Remove Task
function removefromls(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    let li = taskItem;
    li.removeChild(li.lastChild) ///<a></a>

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}