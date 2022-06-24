// getting all required elements
const inputbox = document.getElementById("input");
const addbtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteAllbtn = document.querySelector(".footer");

inputbox.onkeyup = () => {
    let userData = inputbox.value; //getting user to entered value
    if (userData.trim() != 0) { //if user values aren't only spaces
        addbtn.classList.add("active"); //active the add button

    } else {
        addbtn.classList.remove("active"); //unactive the add button
    }
}

showTask(); //calling showTASK Function

// if user click on the add button
addbtn.onclick = () => {
    let userData = inputbox.value; //user entered value
    let getLocalStorage = localStorage.getItem("new todo"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; // create blank array
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push({
        userData
    }); //pushing or adding user data
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTask();
    addbtn.classList.remove("active");
    console.table(listArr);
}

function showTask() {
    let getLocalStorage = localStorage.getItem("new todo");
    if (getLocalStorage == null) {
        listArr = []; // create blank array
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    if (listArr.length > 0) {
        deleteAllbtn.classList.add("active");
    } else {
        deleteAllbtn.classList.remove("active");
    }
    let newLitag = "";
    listArr.forEach((element, index) => {
        newLitag += `<input id="check" type="checkbox"><li>${element.userData}<span onclick="deleteTask(${index})";><i class="bi bi-trash-fill"></i></span></li>`
    });
    todoList.innerHTML = newLitag; //adding new li tag inside ul tag
    inputbox.value = ""; // once task added leave the input field blank0

}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("new todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1) //delete the particular indexed li 
    //after the remove the li again update the local storage
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTask();
}

//delete all task function
deleteAllbtn.onclick = () => {
    listArr = []; //empty the array
    //after delete all task again update the local storage
    localStorage.setItem("new todo", JSON.stringify(listArr));
    showTask(); //calling showtasks function
}



document.querySelector("#sort").addEventListener("click", () => {
    listArr.sort((a, b) => {
        let fa = a.userData.toLowerCase(),
            fb = b.userData.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    let newLitag = "";
    listArr.forEach((element, index) => {
        newLitag += `<input id="check" type="checkbox"><li>${element.userData}<span onclick="deleteTask(${index})";><i class="bi bi-trash-fill"></i></span></li>`
    });
    todoList.innerHTML = newLitag; //adding new li tag inside ul tag
    inputbox.value = ""; // once task added leave the input field blank0
});
//   localStorage.removeItem('new todo')