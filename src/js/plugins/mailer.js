
/*
При использовании Webpack компилятора Babel
нужно установить глобально  
! исправляет ошибку  Uncaught ReferenceError: regeneratorRuntime is not defined
установка глобальна
https:// www.npmjs.com / package / regenerator - runtime
import "regenerator-runtime/runtime.js";
 */
//=================================================================
"use strict"

// const mailer = require('./js/plugins/sendMailer')

import { ModalBtn } from "./btnModal"

function myValidate() {
    document.addEventListener('DOMContentLoaded', function () {

        console.log('Connected... .')
        const form = document.getElementById('form') //  взял весь обьект формы
        const send = document.getElementById('send')// получаю по ID, 2 модальное окно 
        let sendText = document.querySelector('.send__text') // получил значение информационного модального окна
        // =================================================================
        // инфо для информационного модального окна
        const sendInfo = ({
            MessageSent: 'Дякуємо за Вашу заявку, ми сконтактуємось з Вами найближчим часом!!!', //message sent
            ErrorSending: "Помилка при відправці !!! Перевірте інтернет з'єднання ...",   //Error sending !!! Check your internet connection ...
            FillInRequiredFields: "Заповніть обов'язкові поля !!!", //Fill in required fields!!!
            EnterYourPhoneNumber: "Введіть Ім'я і Прізвище !!!",   // Enter your phone number !!!
            IncorrectNumber: "Некоректний номер телефону !!!", //Incorrect number !!!
        })
        // =================================================================

        // =================================================================
        form.addEventListener('submit', formSend)
        console.log(form)
        //функция formSend
        async function formSend(e) {
            e.preventDefault() // запретил стандартную отправку формы
            //=================================================================
            let error = formValidedate(form) // функция валидация перешла  в переменную error
            let formData = new FormData(form)
            let InternetConnect = navigator.onLine // проверка на подключение интернет соединения
            //=================================================================
            if (error === 0) {
                form.classList.add('__sending') // если нет ошибок  добавляется класс 
                // делаем на проверку подключения интернета
                if (InternetConnect === true) {
                    // производим отправку
                    let response = await fetch('./../send.php', {
                        method: 'POST',
                        body: formData,
                    })
                    // получаем ответ от send.php если окей
                    if (response.ok) {

                        form.reset(); // очистка формы
                        // выводится  окно 
                        //! Дякуємо за Вашу заявку, ми сконтактуємось з Вами найближчим часом!!!
                        sendText.textContent = `${sendInfo.MessageSent}`
                        checkAndDelClass()
                        ModalBtn()
                        form.classList.remove('__sending')
                    } else {
                        form.classList.remove('__sending')
                    }

                } else {
                    //! "Помилка при відправці !!! Перевірте інтернет з'єднання ..."
                    sendText.textContent = `${sendInfo.ErrorSending}`
                    checkAndDelClass()
                    form.classList.remove('__sending')
                }
            }
        }
        //===================================================================================
        // функция  проверки наличие класса send__active и удаление класса send
        function checkAndDelClass() {
            send.classList.add('send')
            if (send.getAttribute("class") === "send") {
                setTimeout(function () {
                    send.classList.add('send__active')
                    setTimeout(function () {
                        send.classList.remove('send__active')
                        setTimeout(() => {
                            send.removeAttribute("class")
                        }, 1500)
                    }, 2800)
                }, 200)
            }
        }
        //===================================================================================
        //функция валидации проверки номера телефона  почты имени и фамилиии
        function formValidedate(item) {
            let error = 0
            let formReq = document.querySelectorAll('.__req') // взял все классы  __req в переменную

            for (let i = 0; i < formReq.length; i++) {
                const input = formReq[i]
                formRemoveError(input)// изначально убрал класс __error

                if (input.classList.contains('__email')) {
                    //===========================
                    // проверка email 
                    if (emailTest(input)) {
                        formAddError(input)
                        error++
                    }
                } else if (input.getAttribute("type") === "tel") {
                    //===========================
                    //проверка теллефона
                    if (phoneTest(input) && input.value !== '') {
                        // !'Не корректный номер!!!
                        sendText.textContent = `${sendInfo.IncorrectNumber}`
                        checkAndDelClass()
                        formAddError(input)
                        error++
                    } else {
                        //===========================
                        // проверка обязательных полей формы заполнение формы  
                        if (input.value === "") {
                            formAddError(input)
                            error++
                            setTimeout(() => {
                                // !Заполните обязательные поля!!!
                                sendText.textContent = `${sendInfo.FillInRequiredFields}`
                                checkAndDelClass()
                            }, 10)
                        }
                    }
                    //===========================
                } else {
                    //===========================
                    // общая проверка пустых инпутов фамилиии и имени
                    if (input.value === "" && input.getAttribute("type") === "text") {
                        // !Заполните обязательные поля!!!
                        formAddError(input)
                        error++
                        sendText.textContent = `${sendInfo.EnterYourPhoneNumber}`
                        checkAndDelClass()
                    }
                }
            }
            return error
        }
        //===================================================================================
        // функция добавление класса самому  обьекту и родительскому  обьекту класс __error
        function formAddError(input) {
            input.parentElement.classList.add('__error')
            input.classList.add('__error')
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('__error')
            input.classList.remove('__error')
        }
        //===================================================================================
        //==============================================================
        //Функция дополнительная регулярного выражения для проверки текста email
        function emailTest(input) {
            return !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.value)
        }
        //==============================================================
        //==============================================================
        //Функция дополнительная регулярного выражения для проверки номера телефона
        function phoneTest(input) {
            return !/^([+]?[0-9]{3,12})*$/i.test(input.value)
        }
        //==============================================================
        console.log('Connected... . END')
    })

}
myValidate()
