const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const input = document.getElementById("user-input");
const output = document.getElementById("results-div");

let t = 1;
console.log( typeof  t);


checkBtn.onclick = function(){
    let tempContent = input.value;
    if(tempContent === ""){
        alert("Please provide a phone number");
    }
    else if(!containsInvalidCharacters(tempContent)){
        if(tempContent.charAt(0) == 1){
            tempContent = tempContent.substring(1);
            tempContent = tempContent.trim();
        }

        if(tempContent.replace(/ |\(|\)|\-/g, "").length != 10){
            output.textContent = "Invalid US number: " + input.value;
            return;
        }

        console.log(tempContent);
        //   1    555

            if(tempContent[0] === "("){
                if(tempContent.slice(1).includes("(")){
                    output.textContent = "Invalid US number: " + input.value;
                    return;
                }
                else if(tempContent[4] !== ")"){
                    output.textContent = "Invalid US number: " + input.value;
                    return;
                }
                else if (tempContent.slice(5).includes(")")){
                    
                    console.log("qwe" + tempContent.slice(4));
                    output.textContent = "Invalid US number: " + input.value;
                    return;
                }   
            }
            else if(tempContent[0] !== "("){
                if(tempContent.includes("(") || tempContent.includes(")")){
                    output.textContent = "Invalid US number: " + input.value;
                    return;
                }
            }
        tempContent = tempContent.replace(/\(|\)/g, "");

        if(isNaN(tempContent.slice(0,3))){
            output.textContent = "Invalid US number: " + input.value;
            return;
        }
        
        // 2 555
        
        tempContent = tempContent.slice(3);
        if(tempContent===""){
            output.textContent = "Invalid US number: " + input.value;
            return;
        }
        if(tempContent[0] === "-" || tempContent[0] === " "){
            tempContent=tempContent.slice(1)
            if(isNaN(tempContent.slice(0,3)) || tempContent.slice(0,3).includes(" ")){
                output.textContent = "Invalid US number: " + input.value;
                return;
            }

        }
        else{
            if(isNaN(tempContent.slice(0,3)) || tempContent.slice(0,3).includes(" ")){
                output.textContent = "Invalid US number: " + input.value;
                return;
            }
        }



        //  3   5555
        tempContent = tempContent.slice(3);
        if(tempContent[0] === "-" || tempContent[0] === " "){
            tempContent=tempContent.slice(1)
            if(isNaN(tempContent.slice(0,4)) || tempContent.slice(0,4).includes(" ")){
                output.textContent = "Invalid US number: " + input.value;
                return;
            }

        }
        else{
            if(isNaN(tempContent.slice(0,4)) || tempContent.slice(0,4).includes(" ")){
                output.textContent = "Invalid US number: " + input.value;
                return;
            }
        }

        tempContent = tempContent.slice(4);
        if(tempContent===""){
            output.textContent = "Valid US number: " + input.value;
            return;
        }


    }
    else{
        output.textContent = "Invalid US number: " + input.value;
        return;
    }
}


clearBtn.onclick = function(){
    output.textContent = "";
}


function containsInvalidCharacters(str) {
    const regex = /[^0-9()\s-]/;

    return regex.test(str);
}
