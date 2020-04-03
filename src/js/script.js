// import { forms_clear } from './modals/forms.js';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    // forms_clear();
    // попробуем просто так 
    const inputPhone = document.querySelectorAll('input[name="phone"]');

    inputPhone.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
});

$(document).ready(function () {
    $('.carousel__iner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/4-5_section/left.png" alt="x"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/4-5_section/right.png" alt="x"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false,
                dots: true
            }
        }]
    });
});