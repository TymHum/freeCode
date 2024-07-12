const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");





convertBtn.onclick = function(){
    let result = "";
    let tempValue = number.value;
    if(tempValue === ""){
        output.innerText = "Please enter a valid number";
    }
    else if(tempValue < 1){
        output.innerText = "Please enter a number greater than or equal to 1";
    }
    else if(tempValue > 3999){
        output.textContent = "Please enter a number less than or equal to 3999";
    }
    else{
        tempValue = Number(tempValue);
        while(tempValue !== 0){
            if(tempValue - 1000 >= 0){
                tempValue -= 1000;
                result += "M"
            }
            else if(tempValue - 900 >= 0){
                tempValue -= 900;
                result += "CM"
            }
            else if(tempValue - 500 >= 0){
                tempValue -= 500;
                result += "D"
            }
            else if(tempValue - 400 >= 0){
                tempValue -= 400;
                result += "CD"
            }
            else if(tempValue - 100 >= 0){
                tempValue -= 100;
                result += "C"
            }
            else if(tempValue - 90 >= 0){
                tempValue -= 90;
                result += "XC"
            }
            else if(tempValue - 50 >= 0){
                tempValue -= 50;
                result += "L"
            }
            else if(tempValue - 40 >= 0){
                tempValue -= 40;
                result += "XL"
            }
            else if(tempValue - 10 >= 0){
                tempValue -= 10;
                result += "X"
            }
            else if(tempValue - 9 >= 0){
                tempValue -= 9;
                result += "IX"
            }
            else if(tempValue - 5 >= 0){
                tempValue -= 5;
                result += "V"
            }
            else if(tempValue - 4 >= 0){
                tempValue -= 4;
                result += "IV"
            }
            else if(tempValue - 1 >= 0){
                tempValue -= 1;
                result += "I"
            }

        }
        output.innerText = result;
    }
}