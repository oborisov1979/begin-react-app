import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const addTastBtn=document.getElementById('add-task-btn');
const deskTaskInput=document.getElementById('description-task');
const todosWrapper=document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks=[] : tasks=JSON.parse(localStorage.getItem('tasks'));

let todoItemElems=[];

function Task(description) {
	this.description=description;
	this.completed=false;
};


const createTemplate=(task, index)=>{
	return `
		<div class="todo-item ${task.completed? 'checked':''}">
			<div class="description">${task.description}</div>
			<div class="buttons">
				<input onclick="completeTask(${index})" class="btn-comlete" type="checkbox" ${task.completed? 'checked':''}>
				<button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
			</div>
		</div>
	`
}

const filterTasks=()=>{
	const activeTasks=tasks.length && tasks.filter(item=> item.completed==false);
	const completedTasks=tasks.length && tasks.filter(item=> item.completed==true);
	tasks=[...activeTasks,...completedTasks];
}

const fillHtmlList=()=>{
	todosWrapper.innerHTML="";
	if(tasks.length > 0){
		filterTasks();
		tasks.forEach((item, index)=>{
			todosWrapper.innerHTML+=createTemplate(item, index);
		});
		todoItemElems=document.querySelectorAll('.todo-item');
	}
}

const updateLocal=()=>{	
	localStorage.setItem('tasks',JSON.stringify(tasks));	
}

const completeTask=index=>{	
	tasks[index].completed=!tasks[index].completed;
  if(tasks[index].completed){
  	todoItemElems[index].classList.add('checked');
  	}else{
  		todoItemElems[index].classList.remove('checked');
  	}
  	updateLocal();
  	fillHtmlList();  
}

fillHtmlList();

addTastBtn.addEventListener('click',()=>{
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value='';
})

const deleteTask= index=>{
	todoItemElems[index].classList.add('delition');
	setTimeout(()=>{
     	tasks.splice(index, 1);
			updateLocal();
			fillHtmlList();   
	}, 500)
}

