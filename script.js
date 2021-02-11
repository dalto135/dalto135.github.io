// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  // Array of arrays used to let the user choose which character types to include in their password
  var object = [["Lowercase?", "abcdefghijklmnopqrstuvwxyz"], ["Uppercase?", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"], 
  ["Numbers?", "0123456789"], ["Special characters?", "[$&+,:;=?@#|'<>.-^*()%!]"]];
  
  //While loop that takes an input from the user to be used as the password length. Must be an Integer
  var strLength = prompt("What is your password length?");
  var length = parseInt(strLength);
  while (!Number.isInteger(length) || length < 8 || length > 128) {
      strLength = prompt("Enter a number between 8 and 128");
      length = parseInt(strLength);
  }

  //While loop that displays a series of prompts to determine what type of password to create,
  //continues until at least one character type is selected
  var characters = "";
  var type = 0;
  while (type === 0) {
    for (i = 0; i < object.length; i++) {
      var input = prompt(object[i][0]);
      var capInput = input.toUpperCase();
      while (capInput !== "YES" && capInput !== "NO") {
        input = prompt("Must answer yes or no");
        capInput = input.toUpperCase();
      }
      if (capInput === "YES") {
        characters += object[i][1];
        type++;
        console.log(characters);
      }
    }
      //Ensures that at least one character type was chosen to create the password
      if (type === 0) {
        prompt("You must add at least one character type");
      }
  }

  //Employs a random number generator to create the unique password
  var pass = "";
  for (var i = 0; i < length; i++) {
    var random = Math.floor(Math.random() * characters.length);
    var cha = characters.charAt(random);
    pass += cha;
  }
  console.log("Password: " + pass);

  return pass;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
