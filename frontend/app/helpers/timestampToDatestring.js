function timestampToDatestring(timestamp) {
    var date    = new Date(timestamp * 1000)
    var dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    var timeStr = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`

    return `${dateStr} um ${timeStr}`
}
