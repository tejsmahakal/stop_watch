const START = document.querySelector("#start");
const PAUSE = document.querySelector("#pause");
const RESET =  document.querySelector("#reset");
const LAP = document.querySelector("#lap");
const LAP_DATA = document.querySelector("#lap-data")

let timeInMs = 0;
let ms = 0;
let sec = 0;
let min = 0;
let timer;

/***************************************************************************
 updateTimer fucntion will update the DOM according to the value calculated  form the timeInMs variable
 @returns none
***************************************************************************/

function updateTimer(){
    sec = Math.floor(timeInMs / 1000) % 60;
    min = Math.floor(timeInMs / (60 * 1000)) % 60;
    ms = Math.floor(timeInMs % 1000);

    document.querySelector("#sec").innerText = sec < 10 ? "0" + sec : sec;
    document.querySelector("#min").innerText = min < 10 ? "0" + min : min;
    document.querySelector("#ms").innerText = ms/10 < 10 ? "0" + ms/10 : ms/10;
}

/**************************************************************************
  startTimer fucntion will start the timer and update timeInMs variable every 10ms and call the updateTimer function to update the DOM
  @returns none
**************************************************************************/
function startTimer(){
    timer = setInterval(() => {
        timeInMs += 10;
        updateTimer();
        
    },10);
    START.disabled = true;
    START.classList.remove("btn-enabled");
    START.classList.add("btn-disabled");
}

/**************************************************************************
 pauseTimer function will pause the timer
 @returns none
**************************************************************************/
function pauseTimer(){
    clearInterval(timer);
    START.disabled = false;
    START.classList.add("btn-enabled")
    START.classList.remove("btn-disabled");
}

/**************************************************************************
 resetTimer function will reset the timer value to its initial state
 @returns none
**************************************************************************/

function resetTimer(){
    pauseTimer();
    timeInMs = 0;
    updateTimer();
    START.disabled = false;
    START.classList.add("btn-enabled")
    START.classList.remove("btn-disabled");
}

/**************************************************************************
 lapTimer function will create a lap time and display it in UI whenever the lap switch is pressed.
 @returns none
***************************************************************************/

function lapTimer(){

    LAP_DATA.classList.remove("hidden");

    let div = document.createElement("div");

    div.innerHTML = `
        <p><span class="lap-min">${min < 10 ? "0" + min : min}</span>: <span id="lap-sec">${sec < 10 ? "0" + sec : sec}</span>: <span id="lap-ms">${ms/10 < 10 ? "0" + ms/10 : ms/10}</span></p>
        <p class="btn-enabled">X</p>
    `

    div.classList.add("lap-card")
    LAP_DATA.appendChild(div)
}

/**************************************************************************
 deleteLap function will delete the lap card when X is pressed
 @param {Object} e - event data of the particular event
 @returns none
***************************************************************************/

function deleteLap(e){
    if(e.target.innerText === "X"){
        if(e.target.parentNode.parentNode.children.length === 1){
            LAP_DATA.classList.add("hidden");
        }
        e.target.parentNode.remove()
    }
}

// eveny listener for starting the timer
START.addEventListener("click",startTimer);

// event listener to pause the timer
PAUSE.addEventListener("click",pauseTimer);

// event listener to reset the timer to zero
RESET.addEventListener("click",resetTimer);

// event listener to create lap time
LAP.addEventListener("click",lapTimer);

// evnet listener to delete lap cards - uses event delegation
LAP_DATA.addEventListener("click",deleteLap);