const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `<i class="bi bi-circle"></i> ${inputBox.value}<span class="delete-btn">&times;</span>`;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

addBtn.addEventListener("click", addTask);

listContainer.addEventListener('click', function(e){
    if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.parentElement; //Find its parent <li> and remove it
        listItem.remove();
        saveData();
    }

    else {
        const listItem = e.target.closest('li');
        if (!listItem){             //Allows to check by clicking at the icon as well,
            return;                 //since .closest starts at the exact element
        }                           //that was clicked and go up to find the closest 'LI'

        listItem.classList.toggle('checked')

        const icon = listItem.querySelector('i');

        if (listItem.classList.contains('checked')){
            icon.classList.remove('bi-circle');
            icon.classList.add('bi-check-circle-fill');
        }else {
            icon.classList.remove('bi-check-circle-fill');
            icon.classList.add('bi-circle');
        }
        saveData();
    }

}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();