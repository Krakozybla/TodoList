let btnAddTask = document.querySelector('.add-task');
let input = document.querySelector('.disignaed-task');
let allData = JSON.parse(localStorage.getItem('task')) || [];
let inpVal = '';

btnAddTask.addEventListener('click', function(){
   if(input.value == ''){
       alert('Writte in input your task!!!')
       return '';
   }
    inpVal = input.value;
    allData.push({
        name: inpVal,
        isCheked: false,
    })
    input.value = '';
    upDateLocalStorage();
    fillHTML();
})

window.addEventListener('load', function(){
    allData = JSON.parse(localStorage.getItem('task'));
    fillHTML();
    upDateLocalStorage();
})

const createTemplates = (item, index) =>{
    return `
    <div class="task-list" ${item.isCheked ? 'checked' : ''}>
    <input onclick="completeTask(${index})"  ${item.isCheked ? 'checked' : ''}  type="checkbox">
    <div class="task-description">${item.name}</div>
    <button onclick="deliteTask(${index})" class="task-delite">&#10060;</button>
    </div>
    `
}

const fillHTML = () =>{
    const taskContainer = document.querySelector('.taskList-container');
    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }

    allData.forEach((item, index)=>{
        taskContainer.innerHTML += createTemplates(item, index);
    })
    upDateLocalStorage();
}

const  upDateLocalStorage = () =>{
    localStorage.setItem('task', JSON.stringify(allData));
}

const completeTask = index =>{
    allData[index].isCheked = !allData[index].isCheked 
    let complitedTasks = [];
    let activeTasks = [];
    allData.forEach((el, index)=>{
        if(el.isCheked){
            complitedTasks.push(el)
        }else{
            activeTasks.push(el);
        }
    })
    allData = [...activeTasks, ...complitedTasks];
    fillHTML();
    upDateLocalStorage();
}

const deliteTask = index =>{
    let allTask = document.querySelectorAll('.task-list');
    let animate = allTask[index].animate([
        {"transform":"translateX(1000px)"},
        //{transfrom: 'translateY(250px)'},
    ],{duration: 300})

    animate.addEventListener('finish', function(){
        allData.splice(index, 1);
        upDateLocalStorage();
        fillHTML();
    })
}
