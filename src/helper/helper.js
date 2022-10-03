export function CurrentDate(props) {
    
    const {separator} = props.propriete
    const currentDate = new Date()

    const element = {
        date : currentDate.getDate(),
        month : currentDate.getMonth() + 1,
        year : currentDate.getFullYear(),
        hours : currentDate.getHours(),
        minutes : currentDate.getMinutes(),
        seconds : currentDate.getSeconds(),
    }
    
    return `${element.date}${separator}${element.month < 10 ? `0${element.month}` : `${element.month}`}${separator}${element.year} ${element.hours}:${element.minutes}:${element.seconds}`
}