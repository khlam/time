function doCountDown(time) {
    let t = new Date()
    let hours
    let minutes
    let seconds
    let distance
    t.setHours(t.getHours()+time[0])
    t.setMinutes(t.getMinutes()+time[1])
    t.setSeconds(t.getSeconds()+time[2] + 2) // +2 for lag correction
    console.log(t.getHours(), t.getMinutes(), t.getSeconds())
    
    let countDownTimer = setInterval(function() {
        let now = new Date().getTime()
        distance = t - now
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        seconds = Math.floor((distance % (1000 * 60)) / 1000)
        document.getElementById("timeDisplay").innerHTML = `<text x="0" y="15" style="text-align: center;" id="timeDisplay">${hours}:${minutes}:${seconds}</text>`
            
        if (distance < 0) {
            clearInterval(countDownTimer)
            document.getElementById("timeDisplay").innerHTML = `<text x="0" y="15" style="text-align: center;" id="timeDisplay">end</text>`
        }
    }, 1010) // lag correction

    document.getElementById("timeDisplay").ondblclick = function(){ // lol
        clearInterval(countDownTimer)
        setCountDown()
    }
}

function cleanInput(countDownTime) {
    countDownTime = countDownTime.split(":")

    countDownTime = countDownTime.map(function (x) { // convert input to int, reload page if not int
        if (isNaN(x) || x === ""){
            location.reload() // bad input
        }
        return parseInt(x, 10) 
    })

    console.log(countDownTime.length)
    console.log(countDownTime)

    if (countDownTime.length === 1) {
        return [0,0,countDownTime[0]]
    }else if(countDownTime.length === 2) {
        return [0,countDownTime[0],countDownTime[1]]
    }else if (countDownTime.length === 3) {
        return countDownTime
    }else {
        console.log('bad input')
        location.reload()
    }
}

function setCountDown() {
    document.getElementById('timeDisplay').innerHTML = `
    <foreignObject width="90%" height="110%">
        <input type="text" placeholder="h:m:s" id="countdown"></input>
    </foreignObject>
    `

    document.getElementById("countdown").addEventListener("keyup", function(event) {
    event.preventDefault()
        if (event.keyCode === 13) {
            let countDownTime = document.getElementById('countdown').value
            document.getElementById("countdown").blur()
            countDownTime = cleanInput(countDownTime)
            doCountDown(countDownTime)
        }
    })
}