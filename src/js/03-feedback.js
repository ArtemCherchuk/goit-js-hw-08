import _throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FEEDBACK_KEY = 'feedback-form-state';

let feedbackObj = {};

const onSavedMsg = () => {
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

const onHandleInputForm = event => {
  // const {
  //   elements: { email, message },
  // } = event.currentTarget;

  feedbackObj.email = event.currentTarget.email.value;
  feedbackObj.message = event.currentTarget.message.value;

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackObj));
};

const onHadleSubmitForm = event => {
  event.preventDefault();
  saveMessage = JSON.parse(localStorage.getItem(FEEDBACK_KEY));
  Object.entries(saveMessage).forEach(([email, msg]) => {
    console.log(email, msg);
  });
  event.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
};

formEl.addEventListener('input', _throttle(onHandleInputForm, 500));
formEl.addEventListener('submit', onHadleSubmitForm);

//
