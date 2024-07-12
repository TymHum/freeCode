
        let price = 19.5;
        let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

        const cashInpt = document.getElementById("cash");
        const purchaseBtn = document.getElementById("purchase-btn");
        const change_div = document.getElementById("change-due");


        purchaseBtn.onclick = function () {
            if (!cash.value) {
                return;
            }
            else{
                if (Number(cashInpt.value) < price) {
                    alert("Customer does not have enough money to purchase the item");
                    cash.value = '';
                    return;
                } 
                else if (Number(cashInpt.value) === price) {
                    change_div.innerHTML = "<p>No change due - customer paid with exact cash</p>";
                    cash.value = '';
                    return;
                } 
                    
                let change = Number(cashInpt.value) - price;
                let totalOfCID = parseFloat(
                    cid
                    .map(banknote => banknote[1])
                    .reduce((first, second) => first + second)
                    .toFixed(2)
                  );
                console.log(totalOfCID + "////" + change);
                if(totalOfCID < change){
                    change_div.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
                    return;
                }
                if(totalOfCID === change){
                    calculateChange("CLOSED", change)
                }
                else{
                    calculateChange("OPEN", change)
                }
            }
        };


        function calculateChange(status, change){
            console.log(status);
            let tempChangeArray = [];
            let banknotesArray = [
                ["PENNY", 0.01], 
                ["NICKEL", 0.05], 
                ["DIME", 0.10], 
                ["QUARTER", 0.25], 
                ["ONE", 1], 
                ["FIVE", 5], 
                ["TEN", 10], 
                ["TWENTY", 20], 
                ["ONE HUNDRED", 100]
            ];;

            for(let i = 8; i >= 0; i--){
                //console.log(cid[i][1] + "  +   " + banknotesArray[i][1]);
                let tempSum = 0;
                let yesSumFlag = false;
                while(cid[i][1] - banknotesArray[i][1] >= 0 && banknotesArray[i][1] <= change){
                    cid[i][1] = parseFloat((cid[i][1] - banknotesArray[i][1]).toFixed(2));
                    change = parseFloat((change - banknotesArray[i][1]).toFixed(2));
                    tempSum = parseFloat((tempSum + banknotesArray[i][1]).toFixed(2));
                    yesSumFlag = true;
                    console.log(cid[i][1]);
                }
                if(yesSumFlag){
                    tempChangeArray.push([banknotesArray[i][0], tempSum]);
                }
            }
            console.log("\n\n\n\n" + tempChangeArray);
            if(change !== 0){
                change_div.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
                return;
            }
            else{
                change_div.innerHTML = `<p>Status: ${status}</p>`;
                tempChangeArray.map(
                    change => {
                        change_div.innerHTML += `<p>${change[0]}: $${change[1]}</p>`;
                    }
                );
            }

        }