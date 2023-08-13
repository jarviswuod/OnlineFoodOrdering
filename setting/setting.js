'use script';

const sectionSettings = document.querySelector('.section--settings');
const header = document.querySelector('.section--settings header');
const header_btns = document.querySelectorAll('.header .btn');
const fields = document.querySelectorAll('.changing--field');
const selectCountries = document.querySelector('.countries-codes');

const accOverview = document.querySelector('.changing--field.account-overview');
const profileEdit = document.querySelector('.changing--field.profile-edit');
const passChange = document.querySelector('.changing--field.pass-change');
const notification = document.querySelector('.changing--field.notification');
const privacy = document.querySelector('.changing--field.privacy');
const creditCard = document.querySelector('.changing--field.credit-card');

const btn__overview = document.querySelector('.btn--overview');
const btn__profEdit = document.querySelector('.btn--prof-edit');
const btn__password = document.querySelector('.btn--password');
const btn__notification = document.querySelector('.btn--notification');
const btn__privacy = document.querySelector('.btn--privacy');
const btn__card = document.querySelector('.btn--card');

const menu__controls = document.querySelector('.section--settings .menu');
const menu__open = document.querySelector('.menu-open');
const menu__close = document.querySelector('.menu-close');

const password_s = document.querySelectorAll('.password');
const password_1 = document.querySelector('.password1');
const password_2 = document.querySelector('.password2');
const password_3 = document.querySelector('.password3');

const eye__close = document.querySelectorAll('.eye-close');
const eye__open = document.querySelectorAll('.eye-open');

let input_password_type = 'password';

sectionSettings.addEventListener('click', e => {
  const clicked = e.target;

  if (clicked.closest('.header')) {
    if (clicked.classList.contains('btn--person')) return;

    header_btns.forEach(el => el.classList.remove('active-btn'));
    fields.forEach(el => el.classList.add('hidden'));

    if (clicked.closest('.btn').classList.contains('btn'))
      clicked.closest('.btn').classList.add('active-btn');

    if (clicked.closest('.btn')) {
      if (clicked.closest('.btn--overview'))
        accOverview.classList.remove('hidden');
      else if (clicked.closest('.btn--privacy'))
        privacy.classList.remove('hidden');
      else if (clicked.closest('.btn--card'))
        creditCard.classList.remove('hidden');
      else if (clicked.closest('.btn--prof-edit'))
        profileEdit.classList.remove('hidden');
      else if (clicked.closest('.btn--password'))
        passChange.classList.remove('hidden');
      else if (clicked.closest('.btn--notification'))
        notification.classList.remove('hidden');

      menu__close.classList.toggle('hidden');
      menu__open.classList.toggle('hidden');
      header.classList.toggle('hidden');
    }
  } else if (clicked.closest('.account-overview')) {
    if (clicked.classList.contains('btn--prof-edit')) {
      accOverview.classList.add('hidden');
      profileEdit.classList.remove('hidden');

      btn__overview.classList.remove('active-btn');
      btn__profEdit.classList.add('active-btn');
    }
  } else if (clicked.closest('.menu')) {
    menu__close.classList.toggle('hidden');
    menu__open.classList.toggle('hidden');
    header.classList.toggle('hidden');
  } else if (clicked.closest(`.password-state div`)) {
    eye__close.forEach(el => el.classList.toggle('hidden'));
    eye__open.forEach(el => el.classList.toggle('hidden'));
    showHidePassword();
  }
});

const showHidePassword = () => {
  input_password_type = input_password_type === `text` ? 'password' : `text`;
  password_s.forEach(el => (el.type = `${input_password_type}`));
};

const countryData = async () => {
  const res = await fetch('countries.json');
  const countries = await res.json();

  for (const country of countries) {
    const HTML = `
      <option value="${country.code}">${country.name}</option>
    `;
    selectCountries.insertAdjacentHTML('beforeend', HTML);
  }
};

countryData();
