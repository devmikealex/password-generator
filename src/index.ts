import { passGen } from './passGen.js'

const passList = document.getElementById('passList')

const charSetLatin = 'abcdefghijklmnopqrstuvwxyz'
const charSetNumber = '0123456789'
const charSetSpecial = '_-+()!&*%$'
const opt_letters = document.getElementById('opt_letters') as HTMLInputElement
const opt_letters_big = document.getElementById('opt_letters_big') as HTMLInputElement
const opt_numbers = document.getElementById('opt_numbers') as HTMLInputElement
const opt_spec_symbols = document.getElementById('opt_spec_symbols') as HTMLInputElement

const buttonGenerate = document.getElementById('button_generate')
buttonGenerate!.onclick = () => {
    generatePass()
}

const lengthView = document.getElementById('length_view')
const quantityView = document.getElementById('quantity_view')

const len = document.getElementById('length') as HTMLInputElement
// len.addEventListener('change', () => {
//     generatePass()
// })
len.addEventListener('input', () => {
    generatePass()
})

const quan = document.getElementById('quantity') as HTMLInputElement
// quan.addEventListener('change', () => {
//     generatePass()
// })
quan.addEventListener('input', () => {
    generatePass()
})

generatePass()

function generatePass() {
    passList!.innerHTML = ''

    const passLength = parseInt(len?.value ?? '15')
    const passQuantity = parseInt(quan?.value ?? '6')

    lengthView!.textContent = passLength.toString()
    quantityView!.textContent = passQuantity.toString()

    let charSet = ''
    if (opt_letters.checked) charSet += charSetLatin
    if (opt_letters_big.checked) charSet += charSetLatin.toUpperCase()
    if (opt_numbers.checked) charSet += charSetNumber
    if (opt_spec_symbols.checked) charSet += charSetSpecial

    // Надо включить хотя бы один флаг, если все выключены
    if (charSet === '') {
        opt_letters.checked = true
        charSet += charSetLatin
    }

    for (let index = 0; index < passQuantity; index++) {
        const newPass = passGen(passLength, charSet)

        const newDiv = document.createElement('div')
        newDiv.className = 'password_item'
        newDiv.textContent = newPass
        passList?.append(newDiv)

        const copyButton = document.createElement('button')
        // copyButton.className = '-'
        copyButton.textContent = 'C'
        copyButton.onclick = function () {
            navigator.clipboard.writeText(newPass)
        }
        newDiv.append(copyButton)
    }
}
