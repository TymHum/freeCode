const textInput = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const resultLbl = document.getElementById("result");


button.onclick = function(){
    let text = textInput.value;
    if(text === ""){
        alert('Please input a value');
        return;
    }
    else{
        let changedText = text.replace(/ |\,|\.|\_|\-|\(|\)|\\|\/|\:|\;/g, "");
        let isPalindrome = checkPalindrome(changedText);
        if(isPalindrome){
            resultLbl.textContent = text + " is a palindrome";
        }
        else{
            resultLbl.textContent = text + " is not a palindrome";
        }
    }
    
}



function checkPalindrome(word){
    word = word.toLowerCase();
    var revWord = word.split("");
    revWord = revWord.reverse();
    revWord = revWord.join("");

    console.log(word);
    console.log(revWord)

    if(word === revWord){
        return true
    }
    else{
        return false
    }
}