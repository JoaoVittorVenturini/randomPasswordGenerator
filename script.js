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
  passDifficulty.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

function updateSlider() {
  document.querySelector(".pass__lenght span").innerText = lengthSlider.value;
}