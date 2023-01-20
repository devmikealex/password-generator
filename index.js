import { passGen } from './passGen.js';
const passList = document.getElementById('passList');
const charSetLatin = 'abcdefghijklmnopqrstuvwxyz';
const charSetNumber = '0123456789';
const charSetSpecial = '_-+()!&*%$';
const opt_letters = document.getElementById('opt_letters');
const opt_letters_big = document.getElementById('opt_letters_big');
const opt_numbers = document.getElementById('opt_numbers');
const opt_spec_symbols = document.getElementById('opt_spec_symbols');
const buttonGenerate = document.getElementById('button_generate');
buttonGenerate.onclick = () => {
    generatePass();
};
const lengthView = document.getElementById('length_view');
const quantityView = document.getElementById('quantity_view');
const len = document.getElementById('length');
len.addEventListener('input', () => {
    generatePass();
});
const quan = document.getElementById('quantity');
quan.addEventListener('input', () => {
    generatePass();
});
generatePass();
function generatePass() {
    var _a, _b;
    const passLength = parseInt((_a = len === null || len === void 0 ? void 0 : len.value) !== null && _a !== void 0 ? _a : '15');
    const passQuantity = parseInt((_b = quan === null || quan === void 0 ? void 0 : quan.value) !== null && _b !== void 0 ? _b : '6');
    lengthView.textContent = passLength.toString();
    quantityView.textContent = passQuantity.toString();
    let charSet = '';
    if (opt_letters.checked)
        charSet += charSetLatin;
    if (opt_letters_big.checked)
        charSet += charSetLatin.toUpperCase();
    if (opt_numbers.checked)
        charSet += charSetNumber;
    if (opt_spec_symbols.checked)
        charSet += charSetSpecial;
    // Надо включить хотя бы один флаг, если все выключены
    if (charSet === '') {
        opt_letters.checked = true;
        charSet += charSetLatin;
    }
    passList.innerHTML = '';
    const divCharSet = document.createElement('div');
    divCharSet.className = 'charset_item';
    divCharSet.textContent = 'Character set: ' + charSet;
    passList === null || passList === void 0 ? void 0 : passList.append(divCharSet);
    for (let index = 0; index < passQuantity; index++) {
        const newPass = passGen(passLength, charSet);
        const newDiv = document.createElement('div');
        newDiv.className = 'password_item';
        newDiv.textContent = newPass;
        passList === null || passList === void 0 ? void 0 : passList.append(newDiv);
        const icon = document.createElement('img');
        icon.src = './assets/clipboard.svg';
        icon.width = 26;
        icon.height = 26;
        const copyButton = document.createElement('button');
        copyButton.className = 'copyButton';
        // copyButton.textContent = ''
        copyButton.append(icon);
        copyButton.onclick = function () {
            navigator.clipboard.writeText(newPass);
        };
        newDiv.append(copyButton);
    }
}
