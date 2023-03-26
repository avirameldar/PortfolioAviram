
const USER_NAME_INPUT_FEILD = document.getElementById("userName");
const USER_NAME_ERROR = document.getElementById("userName-error");
const PHONE_NUMBER = document.getElementById("phone");
const PHONE_NUMBER_ERROR = document.getElementById("phone-error");
const USER_EMAIL = document.getElementById("email");
const USER_EMAIL_ERROR = document.getElementById("email-error");
const USER_MESSAGE = document.getElementById("message");
const USER_MESSAGE_ERROR = document.getElementById("message-error")
const SUBMIT_BTN = document.getElementById("submit-user");
const SUBMIT_BTN_ERROR = document.getElementById("general-error");

const validate = () => {
  const userName = USER_NAME_INPUT_FEILD.value
  const phoneNemuber = PHONE_NUMBER.value
  const userEmail = USER_EMAIL.value
  const userMessage = USER_MESSAGE.value
  USER_NAME_ERROR.style.color = "#ffc005";
  PHONE_NUMBER_ERROR.style.color = "#ffc005";
  USER_EMAIL_ERROR.style.color = "#ffc005";
  USER_MESSAGE_ERROR.style.color = "#ffc005";
  let errors = []

  if (!userName) {
    errors.push("name")
    USER_NAME_ERROR.innerHTML = "שכחת למלא את השם..."
  } else {
    errors = errors.filter((item) => item !== "name")
    USER_NAME_ERROR.innerHTML = '&nbsp;';
  }

  if (!/^\d+$/.test(phoneNemuber)) {
    errors.push("phone")
    PHONE_NUMBER_ERROR.innerHTML = "כן.. מספר הטלפון נדרש "
  } else {
    errors = errors.filter((item) => item !== "phone")
    PHONE_NUMBER_ERROR.innerHTML = '&nbsp;';
  }
  let rej = /^[\w\.]+@\w+(\.\w+)+$/
  if (!rej.test(userEmail)) {
    errors.push("email")
    USER_EMAIL_ERROR.innerHTML = "הדוא״ל לא תקין"
  } else {
    errors = errors.filter((item) => item !== "email")
    USER_EMAIL_ERROR.innerHTML = '&nbsp;';

  }

  if (!userMessage || userMessage < 4) {
    errors.push("message")
    USER_MESSAGE_ERROR.innerHTML = "אנחנו מאד רוצים לדעת...כדי שנוכל לעזור לך "
  } else {
    errors = errors.filter((item) => item !== "message")

    USER_MESSAGE_ERROR.innerHTML = '&nbsp;';

  }
  if (errors.length) {
    return;
  }

  USER_NAME_INPUT_FEILD.value = '';
  PHONE_NUMBER.value = '';
  USER_EMAIL.value = '';
  USER_MESSAGE.value = '';

  window.location = "thankYou.html";
}

SUBMIT_BTN.addEventListener("click", validate)
