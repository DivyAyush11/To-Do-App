const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

function addTask(){
    if (inputBox.value === ''){
        alert("You must write something!")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `<i class="bi bi-circle"></i><span class="task-text">${inputBox.value}</span><i class="bi bi-pencil-square edit-btn"></i><span class="delete-btn">&times;</span>`;
        // li.innerHTML = `<i class="bi bi-circle"></i> ${inputBox.value}<span class="delete-btn">&times;</span>`;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

addBtn.addEventListener("click", addTask);

listContainer.addEventListener('click', function(e){
    const listItem = e.target.closest('li');
    if (!listItem) return;      // Exit if the click was not inside an LI

    const taskTextSpan = listItem.querySelector('.task-text');
    const editIcon = listItem.querySelector('.edit-btn');

    // DELETE LOGIC
    if (e.target.classList.contains('delete-btn')) {
        listItem.remove();
        saveData();
    }
    // EDIT / SAVE LOGIC
    else if (e.target.classList.contains('edit-btn')) {
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            // Currently in Edit Mode, so SAVE
            taskTextSpan.contentEditable = 'false';
            listItem.classList.remove('editing');
            editIcon.classList.remove('bi-save'); // Change icon back to pencil
            editIcon.classList.add('bi-pencil-square');
            saveData();
        } else {
            // Not in Edit Mode, so EDIT
            taskTextSpan.contentEditable = 'true';
            taskTextSpan.focus();           // Place the cursor in the editable area
            listItem.classList.add('editing');
            editIcon.classList.remove('bi-pencil-square'); // Change icon to save
            editIcon.classList.add('bi-save');
        }
    }
    //CHECK / UNCHECK LOGIC
    else {
        // Don't allow checking/unchecking while in edit mode
        if (!listItem.classList.contains('editing')) {
            listItem.classList.toggle('checked');
            const checkIcon = listItem.querySelector('i:first-child');

            if (listItem.classList.contains('checked')) {
                checkIcon.classList.remove('bi-circle');
                checkIcon.classList.add('bi-check-circle-fill');

                listContainer.appendChild(listItem); 

            } else {
                checkIcon.classList.remove('bi-check-circle-fill');
                checkIcon.classList.add('bi-circle');

                listContainer.prepend(listItem);
            }
            saveData();
        }
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();