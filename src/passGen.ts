export function passGen(length: number, charSet: string = ''): string {
    console.log('🚀 charSet', charSet)

    if (charSet === '') return '****'

    let newPass = ''
    for (let index = 0; index < length; index++) {
        newPass += getRandomChar(charSet)
    }

    return newPass
}

function getRandomChar(charSet: string): string {
    const randomIndex = (Math.random() * charSet.length) | 0
    return charSet[randomIndex]
}
