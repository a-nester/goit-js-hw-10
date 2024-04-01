import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const input = form.elements['delay'];
const state = form.elements['state'];

form.addEventListener('submit', handleClick);

function promise(delay, state) {
  return new Promise((resolve, reject) => {
    
      setTimeout(() => {
          if (state === 'fulfilled') {
              resolve(`✅ Fulfilled promise in ${delay}ms`);
          } else {
              reject(`❌ Rejected promise in ${delay}ms`);
          }
      }, delay);   
  });
}

function handleClick(event) {
  event.preventDefault();
  const userDelay = Number(input.value);
  const userState = state.value;
  if (userDelay < 0 || !userState) {
      iziToast.show({
        message: 'Incorrect input! Fill all fields correctly!',
        messageColor: 'White',
        backgroundColor: 'Red',
        position: 'topRight',
      });
    return;
  }
  promise(userDelay, userState)
    .then(value => {
      iziToast.show({
        message: value,
        messageColor: 'White',
        backgroundColor: 'Green',
          position: 'topRight',
          transitionIn: 'fadeInDown'
      });
    })
    .catch(value => {
      iziToast.show({
        message: value,
        messageColor: 'White',
        backgroundColor: 'Red',
          position: 'topRight',
        transitionIn: 'fadeInDown'
      });
    });
}
