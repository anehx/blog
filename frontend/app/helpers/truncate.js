function truncate(str, len) {
    var trimmed = str.substr(0, len)
    return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + '...'
}
