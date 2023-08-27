import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FEEDBACK_KEY = 'feedback-form-state';

const savFeedback = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
if (savFeedback) {
  formEl.elements.email.value = savFeedback.email;
  formEl.elements.message.value = savFeedback.message;
}

const onHandleInputForm = event => {
  localStorage.setItem(
    FEEDBACK_KEY,
    JSON.stringify({
      email: formEl.elements.email.value,
      message: formEl.elements.message.value,
    })
  );
};

const onHadleSubmitForm = event => {
  event.preventDefault();
  const email = formEl.elements.email.value;
  const msg = formEl.elements.message.value;

  if (email === '' || msg === '') {
    alert('Error, Fill in all the fields');
  } else {
    console.log({
      email: formEl.elements.email.value,
      message: formEl.elements.message.value,
    });
    event.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_KEY);
  }
};

formEl.addEventListener('input', throttle(onHandleInputForm, 500));
formEl.addEventListener('submit', onHadleSubmitForm);
