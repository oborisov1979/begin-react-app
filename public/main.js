const addTastBtn=document.querySelector('.input_text_send');
const deskTaskInput=document.querySelector('.input_text_rect');
const todosWrapper=document.querySelector('.todosWrapper');
const titleCountList=document.querySelector('.title_main>span');
const increasDateBtn=document.querySelector('.filter_title');

let dateSort=false;
!localStorage.dateSort?dateSort=true:dateSort=JSON.parse(localStorage.getItem('dateSort'));

let tasks;
!localStorage.tasks ? tasks=[] : tasks=JSON.parse(localStorage.getItem('tasks'));



let todoItemElems=[];
let dateToInteger=0;



function Task(description,date,date_integer) {	
	this.description=description;
	this.completed=false;
	this.date=date;
	this.date_integer=date_integer;		
}

function addZero(n)
 {
	return(parseInt(n, 10)<10? '0':'')+n;
}

const getDateToInteger=(date)=>{
    date = date || new Date();
    let year=date.getFullYear();
    let month=date.getMonth();
    let date_only = date.getDate();
    let hours=date.getHours();
    let minutes=date.getMinutes();    
    return year+addZero(month)+addZero(date_only)+addZero(hours)+addZero(minutes);
}

const getDateToString=(date)=>{
    date = date || new Date();
    let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let months=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    let day = date.getDay();
    let date_only=date.getDate(); 
    let hours=date.getHours();
    let minutes=date.getMinutes();
    
    let time;
    let month=date.getMonth();    
    time=addZero(hours)+':'+addZero(minutes);   
    return addZero(date_only)+' '+months[month]+', '+days[day]+' '+time;
}



const createTemplate=(task, index)=>{
	return `
					<div class="todo-item ${task.completed? 'checked':''}" >
							<div class="business_one">
								<div class="business_one_title">
									<div class="business_one_title_img">
									
									</div>
									<div class="business_one_title_text">
									${task.date}
									</div>
								</div>
								<div class="business_one_content">
									${task.description}						
								</div>
								<div class="business_one_submit">
									<div class="business_one_submit_check" onclick="completeTask(${index})">
									${task.completed? 'Отменить':'Выполнить'}
									</div>
									<div class="business_one_submit_delete" onclick="deleteTask(${index})" >
										<div class="business_one_submit_delete_text">
										Удалить	
										</div>			
									
										<div class="business_one_submit_delete_img">
										
										</div>

									</div>
								</div>

							</div>
						</div>
	`
}


		/*
		<div class="todo-item ${task.completed? 'checked':''}">
			<div class="description">${task.description}</div>
			<div class="buttons">
				<input onclick="completeTask(${index})" class="btn-comlete" type="checkbox" ${task.completed? 'checked':''}>
				<button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
			</div>
		</div>
		*/

const filterTasks=()=>{
	const activeTasks=tasks.length && tasks.filter(item=> item.completed==false);
	const completedTasks=tasks.length && tasks.filter(item=> item.completed==true);
	tasks=[...activeTasks,...completedTasks];
}

const increasDate=()=>{	
	const increasDateTasks=tasks.length && tasks.sort( (a, b) => a.date_integer - b.date_integer );	
	tasks=increasDateTasks;
}


const fillHtmlList=()=>{
	todosWrapper.innerHTML="";
	titleCountList.innerHTML="0";	
	if(tasks.length > 0){
		titleCountList.innerHTML=tasks.length;
		dateSort?increasDate():filterTasks();
		//alert(dateSort);
		tasks.forEach((item, index)=>{
			todosWrapper.innerHTML+=createTemplate(item, index);
		});
		todoItemElems=document.querySelectorAll('.todo-item');
	}
}

const updateLocal=()=>{	
	localStorage.setItem('tasks',JSON.stringify(tasks));
	localStorage.setItem('dateSort',JSON.stringify(dateSort));	
}

const completeTask=index=>{	
	tasks[index].completed=!tasks[index].completed;
  if(tasks[index].completed){
  	todoItemElems[index].classList.add('checked');  	
  	todoItemElems[index].querySelector('.business_one_submit_check').innerHTML="Отменить";
  	}else{
  		todoItemElems[index].classList.remove('checked');  
  		todoItemElems[index].querySelector('.business_one_submit_check').innerHTML="Выполнить";
  	}
  	updateLocal();
  	fillHtmlList();  
}

fillHtmlList();

addTastBtn.addEventListener('click',()=>{
    window.location.reload();
    let date = new Date();	
    tasks.push(new Task(deskTaskInput.value,getDateToString(date),+getDateToInteger(date)));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value='';
});

increasDateBtn.addEventListener('click',()=>{
	increasDate();
	dateSort=true;
	fillHtmlList();
	updateLocal();	
})

const deleteTask= index=>{
	todoItemElems[index].classList.add('delition');
	setTimeout(()=>{
     	tasks.splice(index, 1);
			updateLocal();
			fillHtmlList();   
	}, 500)
}
