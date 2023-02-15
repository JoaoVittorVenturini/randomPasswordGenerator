const 
  passwordInput = document.querySelector('.input-box input'),
  copyPass = document.querySelector('.input-box span'),
  passDifficulty = document.querySelector('.pass__difficulty'),
  lengthSlider = document.querySelector('.pass__lenght input'),
  settingsOptions = document.querySelectorAll('.settings__options input')
;

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}

function generatePassword() {
  let staticPassword = "",
  randomPassword = "",
  excludeDuplicate = false,
  passLength = lengthSlider.value;

  settingsOptions.forEach(option => {
    if(option.checked) {
      if(option.id !== "exclude-duplicate" && option.id !== "include-spaces"){
        staticPassword += characters[option.id];
      } else if(option.id === "include-spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  })

  for( let i = 0; i < passLength; i++ ) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
    if(excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomPassword == " " ? randomPassword += randomChar : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
  updatePasswordDifficulty();
}

function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  copyPass.innerText = "check"
  copyPass.id = "copied"
  setTimeout(() => {
    copyPass.innerText = "copy_all"
    copyPass.id = ""
  }, 1500)
}

function updatePasswordDifficulty() {
  const 
    uppercaseRegex = /^[a-zA-Z]*$/,
    numbersRegex = /^[a-z0-9]*$/,
    symbolsRegex = /^[a-z!@#$%^&*()_+~`|}{\[\]:;?><,.\/\-=\\]*$/,
    numSymRegex = /^[a-z0-9!@#$%^&*()_+~`|}{\[\]:;?><,.\/\-=\\]*$/,
    upperNumRegex = /^[a-zA-Z0-9]*$/,
    upperSymRegex = /^[a-zA-Z!@#$%^&*()_+~`|}{\[\]:;?><,.\/\-=\\]*$/,
    allRegex = /^[a-zA-Z0-9!@#$%^&*()_+~`|}{\[\]:;?><,.\/\-=\\]*$/
  ;


  if(passwordInput.value.length <= 6) {
    passDifficulty.id = "weak"
  } else {
    if((uppercaseRegex.test(passwordInput.value)) || (numbersRegex.test(passwordInput.value)) || (symbolsRegex.test(passwordInput.value))){
      passDifficulty.id = "weak"
    } else if((numSymRegex.test(passwordInput.value)) || (upperNumRegex.test(passwordInput.value)) || (upperSymRegex.test(passwordInput.value))){
      passDifficulty.id = "medium"
    } else if(allRegex.test(passwordInput.value)){
      passDifficulty.id = "strong"
    }
  }
}

function updateSlider() {
  document.querySelector(".pass__lenght span").innerText = lengthSlider.value;
}