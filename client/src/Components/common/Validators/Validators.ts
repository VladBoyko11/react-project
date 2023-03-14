export const required = (value: any) => {
    if(value) return undefined
    return 'This field is required'
}

export const maxLength = (length: number) => (value: any) => {
    if(value.length <= length) return undefined
    return `max length is ${length}`
}

export const checkEmail = (value: any) => {
    let str = []
    if(value) {
        str = value.split('@')
    }
    if(str.length === 0) return undefined
    if(str.length > 1) return undefined
    return `incorrect email`
}