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