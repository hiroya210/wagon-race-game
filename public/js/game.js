import { createSession } from "./ajax.js"


const car1 = document.getElementById("car1")
const car2 = document.getElementById("car2")
const road = document.getElementById("road")
const building = document.getElementById("building")
const finish = document.getElementById("finish")
const wheel1 = document.querySelectorAll(".wheel1")
const wheel2 = document.querySelectorAll(".wheel2")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const winner1 = document.querySelector(".winner")
const startGame = document.querySelector(".start")
const progressBar = document.querySelector("progress")

const playerTag1 = document.getElementById("player1-tag")
const playerTag2 = document.getElementById("player2-tag")
const forms = document.querySelector(".input-names")
const session = document.getElementById("session")
const game = document.getElementById("game")
const progressBar2 = document.querySelector("progress#current-speed2")
const engineBar = document.querySelector("progress#engine")
const engineBar2 = document.querySelector("progress#engine2")
const EngineOverHeat1 = document.querySelector(".overheat.hide")
const EngineOverHeat2 = document.querySelector(".overheat2.hide")
const timer = document.querySelector(".countdown.none")
let winnerFlag = true
let canSpeedUp1 = true
let canSpeedUp2 = true
let canSpeedDown1 = true
let canSpeedDown2 = true
let speed1 = 0
let speed2 = 0
let overHeating1 = false;
let overHeating2 = false;
let running = false
let count = true
let status = true

const collide = () => {
    let car1 = document.getElementById("car1").getBoundingClientRect()
    let car2 = document.getElementById("car2").getBoundingClientRect()
    let finishLine = document.getElementById("finish").getBoundingClientRect()
    if ((finishLine.x < car1.x + car1.width &&
        finishLine.x + finishLine.width > car1.x &&
        finishLine.y < car1.y + car1.height &&
        finishLine.y + finishLine.height > car1.y) &&
        (winnerFlag === true)) {
        winnerFlag = false
        winner1.innerText = `${playerTag1.innerText} won!`
        winner1.classList.add("active")
        status = false
        setTimeout(() => {
            startGame.classList.toggle("none")
            running = true
            startGame.innerText = "PLAY AGAIN?"
        }, 3000)

    }
    else if ((finishLine.x < car2.x + car2.width &&
        finishLine.x + finishLine.width > car2.x &&
        finishLine.y < car2.y + car2.height &&
        finishLine.y + finishLine.height > car2.y) &&
        (winnerFlag === true)) {
        winnerFlag = false
        winner1.innerText = `${playerTag2.innerText} won!`
        winner1.classList.add("active2")
        status = false
        setTimeout(() => {
            startGame.classList.toggle("none")
            running = true
            startGame.innerText = "PLAY AGAIN?"
        }, 3000)

    }
}


const runGame = () => {
    if (running){
        timer.innerText = 3
        timer.classList.toggle("none")
        const countDown = setInterval(() => {
        parseInt( timer.innerText -= 1)
        if ((parseInt( timer.innerText)) === 0){
            timer.innerText = "GO!"
            clearInterval(countDown)
            setTimeout(()=>{timer.classList.toggle("none")},500)
            car1.classList.toggle("active")
            car2.classList.toggle("active")
            road.classList.toggle("active")
            building.classList.toggle("active")
            wheel1.forEach((w)=>{ w.classList.toggle("active")})
            wheel2.forEach((w)=>{ w.classList.toggle("active")})
            setTimeout(() => { 
                finish.classList.add("active")
            }, 25000)
            }
        
        }, 1000)
    }

    else{
        location.reload
    }
    document.addEventListener("keyup", (event) => {
    
        // Player 1
    if ((event.code === "KeyQ") && (canSpeedUp1)){
        speed1 += 100

        if (speed1 >= 600){ 
            speed1 = 600
            canSpeedUp1 = false
            overHeating1 = true

            if (overHeating1 === true) {
                const heating = setInterval(() => { 
                engineBar.value++
                overHeating1 = false

                if (speed1 < 600) { clearInterval(heating) }
                if (engineBar.value === 10) {
                    speed1 = 10
                    canSpeedUp1 = false
                    canSpeedDown1 = false
                    overHeating1 = false
                    EngineOverHeat1.classList.toggle("hide")
                    setTimeout (() => {engineBar.value = 0}, 1000)
                    setTimeout (() => {
                        canSpeedUp1 = true
                        canSpeedDown1 = true
                        EngineOverHeat1.classList.toggle("hide")
                        }, 5000)
                    progressBar.value = speed1
                    player1.setAttribute("style", `left: ${speed1}px`);
                    clearInterval(heating)
                }
                }, 250);
            }
        }
        player1.setAttribute("style", `left: ${speed1}px`);
        progressBar.value = speed1
    
    }
    if ((event.code === "KeyW") && (canSpeedDown1)){
        speed1 -= 100
        canSpeedUp1 = true
        overHeating1 = false

        if (speed1 <= 100){
            speed1 = 100
            overHeating1 = false
        }
        player1.setAttribute("style", `left: ${speed1}px`);
        progressBar.value = speed1
    }

    if (event.code === "KeyZ"){
        speed1 = 2000
        player1.setAttribute("style", `left: ${speed1}px`);
        progressBar.value = speed1
    }
    

    // Player 2
    if ((event.code === "KeyP") && (canSpeedUp2)){
        speed2 += 100

        if (speed2 >= 600){ 
            speed2 = 600
            canSpeedUp2 = false
            overHeating2 = true

            if (overHeating2 === true) {
                const heating = setInterval(() => { 
                engineBar2.value++
                overHeating2 = false

                if (speed2 < 600) { clearInterval(heating) }
                if (engineBar2.value === 10) {
                    speed2 = 10
                    canSpeedUp2 = false
                    canSpeedDown2 = false
                    overHeating2 = false
                    EngineOverHeat2.classList.toggle("hide")
                    // setTimeout (() => {engineBar2.value = 0}, 1000)
                    setTimeout (() => {
                        engineBar2.value = 0
                        canSpeedUp2 = true
                        canSpeedDown2 = true
                        EngineOverHeat2.classList.toggle("hide")
                        }, 5000)
                    progressBar2.value = speed2
                    player2.setAttribute("style", `left: ${speed2}px`);
                    clearInterval(heating)
                }
                }, 250);
            }
        }
        player2.setAttribute("style", `left: ${speed2}px`);
        progressBar2.value = speed2
    
    }
    if ((event.code === "KeyO") && (canSpeedDown2)){
        speed2 -= 100
        canSpeedUp2 = true
        overHeating2 = false
        
        if (speed2 <= 100){
            speed2 = 100
            overHeating2 = false
        }
        player2.setAttribute("style", `left: ${speed2}px`);
        progressBar2.value = speed2
    }

})
setInterval(collide,25) 
}


const createGame = (event, id, p1, p2) => {
    fetch(`/sessions/${id}/games`, {
        method: "POST",
        body: JSON.stringify({ session: event })
      })
        .then(response => response.json())
        .then((data) => {
            const playerTag1 = document.getElementById("player1-tag")
            const playerTag2 = document.getElementById("player2-tag")
            data.game.players[0] = p1
            data.game.players[1] = p2
            game.innerText = data.game.id
            playerTag1.innerText = p1
            playerTag2.innerText = p2
            console.log(data.game.players);
            runGame()
          });
    };


startGame.addEventListener("click",(e) => {
    running = !running
    e.currentTarget.classList.toggle("none")
    if (status === true){
        forms.classList.toggle("hide")
    }
    else{
        location.reload()
    }

})

forms.addEventListener("submit", (e) => {
    e.preventDefault();
    const p1 = e.currentTarget.querySelector("#player1-name")
    const p2 = e.currentTarget.querySelector("#player2-name")
    e.currentTarget.classList.toggle("hide")
    createGame(e,session.innerText,p1.value,p2.value)
    // runGame()
    
})

createSession()