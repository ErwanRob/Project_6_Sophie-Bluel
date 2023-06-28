const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');
const errorMessage = document.querySelector('#loginErr-message')
const loginForm = document.querySelector('#login form');

passwordInput.addEventListener('click', function () {
  emailInput.classList.remove('loginErr')
  passwordInput.classList.remove('loginErr')
  clearErrMessage();
})
emailInput.addEventListener('click', function () {
  emailInput.classList.remove('loginErr')
  passwordInput.classList.remove('loginErr')
  clearErrMessage();
})
function clearErrMessage(){
  errorMessage.innerHTML=""
}
function setErrMessage(Err){
  errorMessage.innerText= Err;
}
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  loginUser(email, password);
});
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const { userId, token } = data;
      // Store the token in local storage or a cookie for future use
      localStorage.setItem('token', token);
      // Perform actions after successful login
      window.location.href = "index.html"
    } else if (response.status === 401) {
      passwordInput.classList.add('loginErr');
      clearErrMessage();
      setErrMessage('Invalid password');
    } else if (response.status === 404) {
      passwordInput.classList.add('loginErr');
      emailInput.classList.add('loginErr');
      clearErrMessage();
      setErrMessage('User not found');
    } else {
      setErrMessage('An Unexpected error occurred, please try again later')  
    }
  } catch (error) {
  }
}





