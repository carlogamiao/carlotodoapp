const taskInput=document.getElementById("task-input");
const taskDate=document.getElementById("task-date");
const taskPriority=document.getElementById("task-priority");
const taskCategory=document.getElementById("task-category");
const taskNotes=document.getElementById("task-notes");
const addBtn=document.getElementById("add-btn");
const taskList=document.getElementById("task-list");
const completedList=document.getElementById("completed-list");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
renderTasks();

addBtn.onclick=addTask;

function addTask(){
 let name=taskInput.value.trim();
 if(!name)return;
 let newTask={id:Date.now(),name,date:taskDate.value,priority:taskPriority.value,category:taskCategory.value,notes:taskNotes.value,completed:false};
 tasks.push(newTask);saveTasks();renderTasks();
 taskInput.value="";taskNotes.value="";
}

function renderTasks(){
 taskList.innerHTML="";completedList.innerHTML="";
 tasks.forEach(t=>{
  let li=document.createElement("li");
  li.className="task-card"+(t.completed?" completed-card":"");
  li.innerHTML=`<div class="task-top"><span>${t.name}</span>
  <div class="task-actions">
    <i class="fas fa-edit"></i>
    <i class="fas fa-check"></i>
    <i class="fas fa-trash"></i>
  </div></div>
  <div class="task-meta">${t.category} · ${t.priority} Priority · Due: ${t.date||"None"}</div>
  ${t.notes?`<div class="task-notes">Notes: ${t.notes}</div>`:""}`;

  li.querySelector(".fa-edit").onclick=()=>editTask(t.id);
  li.querySelector(".fa-check").onclick=()=>toggleComplete(t.id);
  li.querySelector(".fa-trash").onclick=()=>deleteTask(t.id);

  (t.completed?completedList:taskList).appendChild(li);
 });
}

function toggleComplete(id){
 let t=tasks.find(x=>x.id===id);
 t.completed=!t.completed;saveTasks();renderTasks();
}

function deleteTask(id){
 tasks=tasks.filter(t=>t.id!==id);
 saveTasks();renderTasks();
}

function editTask(id){
 let t=tasks.find(x=>x.id===id);
 taskInput.value=t.name;
 taskDate.value=t.date;
 taskPriority.value=t.priority;
 taskCategory.value=t.category;
 taskNotes.value=t.notes;
 deleteTask(id);
}

function saveTasks(){
 localStorage.setItem("tasks",JSON.stringify(tasks));
}