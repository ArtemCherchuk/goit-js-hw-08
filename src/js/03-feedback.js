import _throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FEEDBACK_KEY = 'feedback-form-state';

let feedbackObj = {};

onSavedMsg = () => {
  let saveMessage = localStorage.getItem(FEEDBACK_KEY);
  if (saveMessage) {
    saveMessage = JSON.parse(saveMessage);
    Object.entries(saveMessage).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
  return;
};

onSavedMsg();

onHandleInputForm = event => {
  const {
    elements: { email, message },
  } = event.currentTarget;

  feedbackObj.email = email.value;
  feedbackObj.message = message.value;

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackObj));
};

onHadleSubmitForm = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(FEEDBACK_KEY)));
  event.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
};

formEl.addEventListener('input', _throttle(onHandleInputForm, 500));
formEl.addEventListener('submit', onHadleSubmitForm);
