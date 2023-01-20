export function passGen(length, charSet = '') {
    console.log('🚀 charSet', charSet);
    if (charSet === '')
        return '****';
    let newPass = '';
    for (let index = 0; index < length; index++) {
        newPass += getRandomChar(charSet);
    }
    return newPass;
}
function getRandomChar(charSet) {
    const randomIndex = (Math.random() * charSet.length) | 0;
    return charSet[randomIndex];
}
