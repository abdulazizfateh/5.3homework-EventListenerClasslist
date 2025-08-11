const toDoListEl = document.querySelector(".to_do_list");
const noToDoListEl = document.querySelector(".no_to_do_list");
const toDoListsWrapperEl = document.querySelector(".to_do_list_wrapper");
const addBtn = document.querySelectorAll(".add_btn");
const checklistEl = document.querySelector(".checklist");

let toDoData = JSON.parse(localStorage.getItem("data")) || [];
const renderToDoData = () => {
    if (!toDoData.length) {
        toDoListEl.style.display = "none";
        noToDoListEl.style.display = "flex";
    } else {
        noToDoListEl.style.display = "none";
        toDoListEl.style.display = "flex";
    }
    toDoListsWrapperEl.innerHTML = toDoData.map(item => {
        return `
                <div class="to_do" data-id="${item.id}">
                    <p>
                        <span>${item.desc}</span>
                    </p>
                    <div class="flex items-center gap-4">
                        <button class="toggle_to_do border border-gray-400 size-6 flex items-center justify-center text-red-500">
                           ${item.done ? `<img class="toggle_to_do size-5" src="./src/assets/checked.svg" alt="">` : ``}
                        </button>
                        <button class="delete_btn text-red-500">Delete</button>
                    </div>
                </div>
        `
    }).join("");
}
renderToDoData();


addBtn.forEach(item => {
    item.addEventListener("click", () => {
        const toDoInput = prompt("Add a new to do");
        if (!toDoInput) {
            return
        }
        const newTodo = {
            desc: toDoInput,
            id: new Date().getTime(),
            done: false
        }
        toDoData.push(newTodo);
        localStorage.setItem("data", JSON.stringify(toDoData));
        renderToDoData();
        countCheckedToDo();
    })
})


toDoListsWrapperEl.addEventListener("click", (e) => {
    const eventTarget = e.target
    if (eventTarget.classList.contains("delete_btn")) {
        const datasetID = eventTarget.closest(".to_do").dataset.id;
        toDoData = toDoData.filter((item) => {
            return item.id != datasetID
        });
        localStorage.setItem("data", JSON.stringify(toDoData));
        renderToDoData();
        countCheckedToDo();
    }

    if (eventTarget.classList.contains("toggle_to_do")) {
        console.log(eventTarget);
        const datasetID = eventTarget.closest(".to_do").dataset.id;
        let toDo = toDoData.find(item => item.id == datasetID);
        toDo.done = (!toDo.done);
        toDoData = toDoData.map((item) => item.id === datasetID ? toDo : item);
        localStorage.setItem("data", JSON.stringify(toDoData));
        renderToDoData();
        countCheckedToDo();
    }
})


const countCheckedToDo = () => {
    const checklistData = toDoData.filter(item => item.done === true);
    checklistEl.textContent = `${checklistData.length}/${toDoData.length} done`;
}
countCheckedToDo();
