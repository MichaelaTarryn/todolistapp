// getting all required elements
const inputbox=document.getElementById("input");
const addbtn=document.querySelector(".inputfield button");
const todoList=document.querySelector(".todoList");
const deleteAllbtn=document.querySelector(".footer");

inputbox.onkeyup =()=>{
    let userData =inputbox.value;//getting user to entered value
    if(userData.trim()!=0){//if user values aren't only spaces
        addbtn.classList.add("active");//active the add button

    } else{
        addbtn.classList.remove("active");//unactive the add button
    }
}

showTask();//calling showTASK Function

// if user click on the add button
addbtn.onclick=()=>{
    let userData=inputbox.value;//user entered value
    let getLocalStorage=localStorage.getItem("new todo");//getting localstorage
    if(getLocalStorage==null){
    listArr=[];// create blank array
    }else {
        listArr=JSON.parse(getLocalStorage);
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("new todo",JSON.stringify(listArr));
    showTask();
    addbtn.classList.remove("active");
}
function showTask(){
    let getLocalStorage=localStorage.getItem("new todo");
    if(getLocalStorage==null){
        listArr=[];// create blank array
        }else {
            listArr=JSON.parse(getLocalStorage);
        }
        const pendingNumb= document.querySelector(".pendingNumb");
        pendingNumb.textContent=listArr.length;
        if(listArr.length>0){
            deleteAllbtn.classList.add("active");
        }else{
            deleteAllbtn.classList.remove("active");
        }
    let newLitag="";
    listArr.forEach((element,index )=> {
        newLitag +=`<li>${element}<span onclick="deleteTask(${index})";><i class="bi bi-trash-fill"></i></span></li>`
    });
    todoList.innerHTML=newLitag;//adding new li tag inside ul tag
    inputbox.value="";
}

//delete task function
function deleteTask(index){
    let getLocalStorage=localStorage.getItem("new todo");
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index,1)//delete index 1
    localStorage.setItem("new todo",JSON.stringify(listArr));
    showTask();
}

//delete all task function
deleteAllbtn.onclick=()=>{
    listArr=[];
    localStorage.setItem("new todo",JSON.stringify(listArr));
    showTask();
}