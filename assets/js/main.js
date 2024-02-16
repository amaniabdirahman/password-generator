// const table = document.querySelector("#table");
// Array of special characters to be included in password
const specialCharacters = [
    "@",
    "%",
    "+",
    "\\",
    "/",
    "'",
    "!",
    "#",
    "$",
    "^",
    "?",
    ":",
    ",",
    ")",
    "(",
    "}",
    "{",
    "]",
    "[",
    "~",
    "-",
    "_",
    ".",
  ];
  
  // Array of numeric characters to be included in password
  const numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  // Array of lowercase characters to be included in password
  const lowerCasedCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  
  // Array of uppercase characters to be included in password
  const upperCasedCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  
  // Function to prompt user for password options
  function getPasswordOptions() {
    let pwd = +prompt("how long is the password");
    while (pwd < 8 || pwd > 128 || pwd === 0 || isNaN(pwd)) {
        pwd = prompt(
            "The value entered is incorrect. Please enter a numeric password length between 8 and 128 characters. "
        );
    }
    let useUpperCase = confirm(
        "Do you want your password to contain Upper Case Letters?"
    );
    let useLowerCase = confirm(
        "Do you want your password to contain Lower Case Letters?"
    );
    let useNumeric = confirm(
        "Do you want your password to use Numeric values?"
    );
    let useSpecial = confirm(
        "Do you want your password to contain Special characters?"
    );
    while (
        useUpperCase != true &&
        useLowerCase != true &&
        useNumeric != true &&
        useSpecial != true
    ) {
        alert("At least one set of characters must be selected.");
        useUpperCase = confirm(
            "Do you want your password to contain Upper Case Letters?"
        );
        useLowerCase = confirm(
            "Do you want your password to contain Lower Case Letters?"
        );
        useNumeric = confirm(
            "Do you want your password to use Numeric values?"
        );
        useSpecial = confirm(
            "Do you want your password to contain Special characters?"
        );
    }
    const passwordOptions = {
        passLength: Number(pwd),
        useUpperCase: useUpperCase,
        useLowerCase: useLowerCase,
        useNumeric: useNumeric,
        useSpecial: useSpecial,
    };
    return passwordOptions;
  }
  
  // Function for generating password
  // parameters characterCodes(object), passwordLength(number)
  function generatePassword(characterCodes, passLength) {
    let passwordCharacters = [];
    
    for (let i = 0; i < passLength; i++) {
        //Selecting a random element from the array based on user inptuts and adding it to a new array
        // check if character code object contains the selected arrays, break out of loop when the passwordCharacters array length is equal to the required password length
        // This is to ensure equal distribution of all selected characters
        if (characterCodes.lowerCasedCharacters) {
            let lowerCaseCharacter =
                characterCodes.lowerCasedCharacters[
                    Math.floor(
                        Math.random() *
                            characterCodes.lowerCasedCharacters.length
                    )
                ];
            passwordCharacters.push(lowerCaseCharacter);
            if (passwordCharacters.length === passLength) break;
        }
        if (characterCodes.upperCasedCharacters) {
            let upperCaseCharacter =
                characterCodes.upperCasedCharacters[
                    Math.floor(
                        Math.random() *
                            characterCodes.upperCasedCharacters.length
                    )
                ];
            passwordCharacters.push(upperCaseCharacter);
            if (passwordCharacters.length === passLength) break;
        }
        if (characterCodes.specialCharacters) {
            let specialCharacter =
                characterCodes.specialCharacters[
                    Math.floor(
                        Math.random() * characterCodes.specialCharacters.length
                    )
                ];
            passwordCharacters.push(specialCharacter);
            if (passwordCharacters.length === passLength) break;
        }
        if (characterCodes.numericCharacters) {
            let numericCharacter =
                characterCodes.numericCharacters[
                    Math.floor(
                        Math.random() * characterCodes.numericCharacters.length
                    )
                ];
            passwordCharacters.push(numericCharacter);
            if (passwordCharacters.length === passLength) break;
        }
    }
    return passwordCharacters.join("");
  }
  
  // Function to generate password with user input
  function configurePasswordCharacterList(userOptions) {
    let characterCodes = {};
    //adds Lower Cased characters if selected as true
    // userOptions determines which arrays are included in the
    if (userOptions.useLowerCase)
        // make a copy of the array to avoid mutation
        characterCodes.lowerCasedCharacters = [...lowerCasedCharacters];
    //adds Upper Cased characters if selected as true
    if (userOptions.useUpperCase)
        characterCodes.upperCasedCharacters = [...upperCasedCharacters];
    //adds Numeric characters if selected as true
    if (userOptions.useNumeric)
        characterCodes.numericCharacters = [...numericCharacters];
    //adds Special characters if selected as true
    if (userOptions.useSpecial)
        characterCodes.specialCharacters = [...specialCharacters];
    // Loop for getting a random element from an array for as many characters requested in the password
    return characterCodes;
  }
  
  // Get references to the #generate element
  const generateBtn = document.querySelector("#generate");
  const passwordTextArea = document.querySelector("#password");
  
  // Write password to the #password input
  function writePassword() {
    const passwordOptions = getPasswordOptions();
    // console.log(passwordOptions);
    const characterCodes = configurePasswordCharacterList(passwordOptions);
    // console.log(passwordOptions);
    const password = generatePassword(
        characterCodes,
        passwordOptions.passLength
    );
    // console.log(password);
  
    passwordTextArea.value = password;
  }
  
  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);
  