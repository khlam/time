function doCountDown(time) {
    let t = new Date()
    t.setHours(t.getHours()+time[0])
    t.setMinutes(t.getMinutes()+time[1])
    t.setSeconds(t.getSeconds()+time[2] + 2)
    console.log(t.getHours(), t.getMinutes(), t.getSeconds())
    
    let countDownTimer = setInterval(function() {
        let now = new Date().getTime()
        let distance = t - now
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)
        document.getElementById("timeDisplay").innerHTML = `<text x="0" y="15" style="text-align: center;" id="timeDisplay">${hours}:${minutes}:${seconds}</text>`
            
        if (distance < 0) {
            clearInterval(countDownTimer)
            document.getElementById("timeDisplay").innerHTML = `<text x="0" y="15" style="text-align: center;" id="timeDisplay"> - : - : - </text>`
        }
    }, 1000)

    document.getElementById("timeDisplay").ondblclick = function(){ // lol
        clearInterval(countDownTimer)
        setCountDown()
    }
}

function cleanInput(countDownTime) {
    countDownTime = countDownTime.split(":")
    if (countDownTime.length === 3) {
        countDownTime = countDownTime.map(function (x) {
            if (isNaN(x) || x === ""){
                x = 0
            }
            return parseInt(x, 10) 
        })
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