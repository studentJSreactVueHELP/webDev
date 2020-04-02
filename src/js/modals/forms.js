const forms_clear = () => {
    const inputPhone = document.querySelectorAll('input[name="phone"]');
    
    inputPhone.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};
export default forms_clear;