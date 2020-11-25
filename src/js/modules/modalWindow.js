"use strict";
import { $vm } from './../base';

//=================================================================
function noop() { }
//=================================================================
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal__footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })
    return wrap
}
//=================================================================
//? ##############   2 этап
// системная функция
function _createModal(options) {
    const DEFAULT_WIDTH = '300px'
    const modal = document.createElement('div')
    modal.classList.add('modal')
    // Шаблон формы который  заполняем контентом...
    modal.insertAdjacentHTML('afterbegin', `
    
            <div class="modal__overlay" data-close="true">
                <div class="modal__window" style="width: ${options.width || DEFAULT_WIDTH}">
                    <div class="modal__header" id="title" data-title>
                    </div>
                    <div class="modal__body" data-content>
                        ${options.content || 'No Contents!!!'}
                    </div>
                </div>
            </div>

    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

//=================================================================
//? ##############   1 этап
$vm.modal = function (options) {

    const ANIMATION__SPEED = 200 // скорость анимации 
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false


    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed');
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION__SPEED)
        },
    }

    const listener = event => {
        // console.log('Clicked', event.target.dataset.close);
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        },
        setTitleHeader(html) {
            $modal.querySelector('[data-title]').innerHTML = html
        }
    })
}