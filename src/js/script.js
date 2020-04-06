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

// $(document).ready(function () {
//     $('.carousel__iner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="../icons/4-5_section/left.png" alt="x"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="../icons/4-5_section/right.png" alt="x"></button>',
//         responsive: [{
//             breakpoint: 992,
//             settings: {
//                 arrows: false,
//                 dots: true
//             }
//         }]
//     });
// });

// слайдер
    const slider = tns({
        container: '.carousel__iner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false
    });   

    document.querySelector('.next').addEventListener('click', () => {
        slider.goTo('next');
    });

    document.querySelector('.prev').addEventListener('click', () => {
        slider.goTo('prev');
    });

// каталог переключение, табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

//вперёд-назад

    function moreInfo (item) {
      $(item).each(function(i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
         });
      });
    }

    moreInfo('.catalog-item__link');
    moreInfo('.catalog-item__back');

});
