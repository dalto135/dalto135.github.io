//Global variables defined
let h = moment().format("h");
let a = moment().format("A");
let row = document.querySelectorAll(".row");
let array = [];
let save = document.querySelectorAll(".saveBtn");
let today = document.querySelector("#currentDay");
today.innerHTML = moment().format("dddd, MMMM Do");

//Populates an array with text elements of the times of each row
for (i = 0; i < row.length; i++) {
    let time = row[i].children[0];
    array.push(time);
}

//Loops through the hours in the working day and color codes them based on whether they are in the past,
//present or future
for (i = 0; i < array.length; i++) {
    let text = array[i].innerHTML;
    let textarea = array[i].parentNode.children[1];

    if (a[0] === text[text.length - 2]) {
        if (parseInt(text) % 12 > h % 12) {
            textarea.classList.add("future");
        } else if (parseInt(text) % 12 < h % 12) {
            textarea.classList.add("past");
        } else {
            textarea.classList.add("present");
        }
    } else if (a === "AM") {
        textarea.classList.add("future");
    } else {
        textarea.classList.add("past");
    }
}

//Creates an event listener for the save button of each hour and saves inputed text into local storage
for (i = 0; i < save.length; i++) {
    let time = save[i].parentNode.children[0].innerHTML;
    let date = save[i].parentNode.children[1];
    date.value = localStorage.getItem(time);

    save[i].addEventListener("click", function() {    
        date.value = this.parentNode.children[1].value;
        localStorage.setItem(time, date.value);
    })
}
