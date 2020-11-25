"use strict"
//=================================================================================
//COD для  кнопки в модальном окне (улетает конверт)
const ModalBtn = () => {
    function mailBtn() {
        let mail = document.querySelector('.mail-btn');
        mail.classList.add('fly');

        setTimeout(function () {
            mail.classList.remove('fly');
        }, 5400);
        // очистка полей формы  (инпутовб и  текстерия)
        // let clearFormsText = document.querySelectorAll("input, textarea");
        // for (let i = 0; i < clearFormsText.length; i++) {
        //     clearFormsText[i].value = '';
        // }
    }
    document.querySelector('.mail-btn').onclick = mailBtn;
};

export { ModalBtn }