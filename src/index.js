"use strict";
// импортировали файлы  JS
import "regenerator-runtime/runtime.js"
import { $vm } from './js/base'
// import { ModalBtn } from "./js/plugins/btnModal"
import "./js/modules/modalWindow"
import './js/plugins/mailer'
// import * as img from '/assets/img/loading.gif';
//==================================================================
// Css импортирую подключенные Иконочные шрифты 
import "./assets/css/fonts.css" // импортируем Css файл

// SCSS
import "./assets/scss/style.scss" // импортируем Scss файл
//==================================================================
// карточки 
// const MyCards = [
//     {
//         id: 1, title: 'Java Script',
//         img: 'https://prognote.ru/wp-content/uploads/2020/02/%D1%83%D1%87%D0%B8%D1%82%D1%8C-JavaScript.jpg'
//     },
//     {
//         id: 2, title: 'React',
//         img: 'https://blogerdaddy.com/wp-content/uploads/2020/07/Why-React-JS-is-a-popular-choice-of-web-development-in-2020.png'
//     },
//     {
//         id: 3, title: 'Vue.js',
//         img: 'https://nowoczesny-frontend.pl/wp-content/uploads/2018/09/vuejs-tutorial_2d2a853c-aa2f-44b0-80df-933b495f77f8.png',
//     },
// ]

// const toHTML = MyCard =>
//     `
//             <div class="col col-xl-3 card-deck">
//                 <div class="card bg-dark h-100 mt-3" style="width: 18rem;margin: auto;">
//                     <img src="${MyCard.img}" class="card-img-top h-100" alt="...">
//                     <div class="card-body">
//                         <h5 class="card-title">${MyCard.title}</h5>
//                         <p class="card-text">Some quick example text to build on the card title and make up the bulk of
//                             the
//                             card's
//                             content.
//                         </p>
//                     </div>
//                   <div class="d-grid gap-2 d-md-flex justify-content-md-end">
//                     <button class="btn btn-primary mr-md-2 btn-info" type="button">Read</button>
//                     <button class="btn btn-danger" type="button">Deleted</button>
//                   </div>                   
//                 </div>
//             </div>
//     `

// function createCards() {
//     const html = MyCards.map(toHTML).join('')
//     document.querySelector('#myCards').innerHTML = html
// }
// createCards()


//==================================================================

const modal = $vm.modal({
    title: 'Форма заявки курсу',
    closable: false, // убирает крестик  закрытия 
    width: '800px',
    content: `
                        <div class="modal__form">
                            <form action="#" method="POST" id="form" class="form__body form__contacts">
                                <h2 class="form__title">Відправити повідомлення</h2>

                                <div class="form__item">
                                    <input type="text" name="first_name" class="form__input __req" placeholder="Ім'я *:"
                                        autocomplete="off">
                                </div>

                                <div class="form__item">
                                    <input type="text" name="last_name" class="form__input __req"
                                        placeholder="Прізвище *:" autocomplete="off">
                                </div>

                                <div class="form__item">
                                    <input type="email" name="email-address" class="form__input __req __email"
                                        placeholder="Пошта *:" autocomplete="off">
                                </div>

                                <div class="form__item">
                                    <input type="tel" name="phone" class="form__input __req"
                                        placeholder="Номер телефону *:" autocomplete="off">
                                </div>

                                <div class="form__item">
                                    <div class="select">Підготовка з якого предмету Вас цікавить?</div>
                                    <select name="courses" class="form__input">
                                        <option selected>Біологія</option>
                                        <option>Українська мова</option>
                                        <option>Математика</option>
                                    </select>
                                    <div class="select">Як Ви хочете щоб ми з Вами зв'язатісь?</div>
                                    <select name="connection" class="form__input">
                                        <option selected>Зателефонуйте мені</option>
                                        <option>напишіть у Telegram</option>
                                        <option>напишіть у Viber</option>
                                    </select>
                                    <div class="select">В якому Ви (Ваша дитина) класі?</div>
                                    <select name="SchoolClass" class="form__input">
                                        <option selected>5-9 клас</option>
                                        <option>10 клас</option>
                                        <option>11 клас</option>
                                    </select>
                                </div>

                                <div class="form__item">
                                    <textarea name="comment" placeholder="Ваші запитання ..."
                                        class="form__comments"></textarea>
                                </div>

                                <button type="submit" name="button" class="form__btn mail-btn">
                                    Відправити
                                </button>
                            </form>
                        </div>

`,
    footerButtons: [
        {
            text: 'Ok', type: 'primary', handler() {
                console.log('Primery btn clicked');
                modal.close()
            }
        },
        {
            text: 'Cancel', type: 'danger', handler() {
                console.log('Danger btn clicked');
                modal.close()
            }
        },
    ]
})

//==================================================================
// тут  добавляется  контент  в Header Title модального окна
const contentModals = [
    { id: 1, title: 'Форма заявки курса', textButton: 'Заявка курса', closable: false },
    { id: 2, title: 'Форма пробного урока', textButton: 'Заявка пробного урока', closable: true }
]

// привязуемся  к кнопкам
const toContent = contentModal => `
            <a href="#" class="btn js-open-modal" data-btn="modalWindow" data-id="${contentModal.id}">${contentModal.textButton}</a>
`
function render() {
    const html = contentModals.map(toContent).join('')
    document.querySelector('#btn').innerHTML = html
}
render()

// вешаем события на кнопки 
document.addEventListener('click', event => {
    // event.preventDefault()
    // console.log(event);
    // if (event.cancelable === 'click') { //  если событие может быть отменено и предотвращено
    //     event.preventDefault(); // отменяем действие события по умолчанию
    //     console.log("Событие " + event.type + " отменено"); //  выводим в консоль информацию о том какое событие было отменено
    // } else { //  если событие не может быть отменено и предотвращено
    //     console.warn("Событие " + event.type + " не может быть отменено"); //  выводим в консоль информацию о том, что данное событие не может быть отменено
    // }
    const dataTarget = event.target.dataset.btn // берем Buttons
    const id = +event.target.dataset.id // получаем ID  кнопки 

    // проверка конпки по которой  был клик
    if (dataTarget === 'modalWindow') {
        const contentModal = contentModals.find(c => c.id === id)
        // вставляем контент в  модальное окно Header Title
        modal.setTitleHeader(`
                        <span class="modal__title" data-title>${contentModal.title || 'Form'}</span>
                        ${contentModal.closable ? `<span class="modal__close" data-close="true">&times;</span>` : ''}
        `)
        modal.open()
    }
})
//==================================================================
// modal.open()
