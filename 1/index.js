window.addEventListener('DOMContentLoaded', () => {
  const phone = document.getElementById('auth-phone');
  const form = document.getElementById('auth');
  const error = document.getElementById('auth-error');
  const regPhone = /^(\+7|7|8)?[\s\-]?\(?[9]{1}[0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validate(regPhone, phone.value)){
      notValid(phone, error, '+7 или 8 и десятизначный номер');
    } else {
      valid(phone, error, 'Номер телефона указан верно');
      let sendingPhone = phone.value.replace(/[^0-9.]/g, '');

      if (sendingPhone[0] === '9') {
        sendingPhone = `7${sendingPhone}`;
        phone.value = `+${sendingPhone}`;
      }
      if (sendingPhone[0] === '8') {
        sendingPhone = `7${sendingPhone.slice(1)}`;
      }
      console.log(sendingPhone);
    }
  });

  function validate(reg, value) {
    return reg.test(value);
  }

  function notValid(input, errorElement, message = null) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    errorElement.innerText = message;
  }

  function valid(input, errorElement, message = null) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    errorElement.innerText = message;
  }
});