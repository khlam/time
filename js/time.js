function showCurrentTime(timer){
    let f = false
    let time

    let hours 
    let minutes
    let ampm
    
    return timer = setInterval(function(){
        f = !f
        let date = new Date()
        hours = date.getHours()
        minutes = date.getMinutes()
        ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? '0'+minutes : minutes;

        if (f) {
            time = `${hours}:${minutes} ${ampm}`
        }else {
            time = `${hours} ${minutes} ${ampm}`
        }
        document.getElementById('timer').innerHTML = time
    },1000)
}