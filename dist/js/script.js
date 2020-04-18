// import { forms_clear } from './modals/forms.js';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    // forms_clear();
    // попробуем просто так 
    const inputPhone = document.querySelectorAll('input[name="phone"]');

   //  inputPhone.forEach(item => {
   //      item.addEventListener('input', () => {
   //          item.value = item.value.replace(/\D/, '');
   //      });
   //  });

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

//вперёд-назад (когда жмёшь подробнее в каталоге)

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

//Открытие модальных окон

    $('[data-modal="consultation"]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.button_mini').each(function (i) {
       $(this).on('click', function () {
         $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');   
       });
    });

//Закрытие на крестик

    $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #order, #mini').fadeOut();
    });

    $('.overlay').on('click', function (e) {
      if ($(e.target).hasClass('overlay')) { 
         $('.overlay, #consultation, #order, #mini').fadeOut(); 
      }
    });

//Валидация форм с помощью $(что-то там :), нужна реализация на нативе :0) 

    function validatForm (item) {
      $(item).validate({
         rules: {
            name: {
               required: true,
               minlength: 2
            },
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: {
               required: "Ведите ваше имя собачки и кошечки, пожалуйтса",
               minlength: jQuery.validator.format("ведите пожалуйста больше {0} символов!")
            },
            phone: "Ведите ваш телефон собачки и кошечки, пожалуйтса",
            email: {
              required: "Нужна ваша почта",
              email: "Ваша почта должна быть корректна @mail.com"
            }
         }
      });
    }

    validatForm ('#consultation-form');
    validatForm ('#consultation form');
    validatForm ('#order form');
    
//создание маски для номера телефона 
   inputPhone.forEach(item => {
      item.addEventListener('input', (e) => {
         item.value = item.value.replace(/\D/, '');

         var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
         e.target.value =!x[2] ? x[1] : '+' + x[1] + ' ' + '(' + x[2] + ')' + (x[3] ? ' ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
      });
   });
//Отправка писем на сервер, через формы на сайте(использовать локальный сервер php)
   $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function(){
         $(this).find('input').val("");
         $('#consultation, #order').fadeOut();
         $('#mini').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

//Появление стрелки вверх

   $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
         $('.page_up').fadeIn();
      } else {
         $('.page_up').fadeOut();
      }
   });

//Плавная прокрутка сайта с помощью стрелки вверх
   $("a[href='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({
         scrollTop: $(_href).offset().top+"px"
      });
      return false;
   });
//анимация появления с помощью библеотеки WoW + animate
   new WOW().init();

});
