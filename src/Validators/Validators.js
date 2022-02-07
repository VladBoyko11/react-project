export const required = (value) => {
    if(value) return undefined
    return 'This field is required'
}

export const maxLength = (length) => (value) => {
    if(value.length <= length) return undefined
    return `max length is ${length}`
}