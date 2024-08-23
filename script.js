const Base_Url = 'https://v6.exchangerate-api.com/v6/da943a1d35840d3aa5fba061/pair'
// let promise = fetch(Base_Url, { mode: 'no-cors' });
// promise.then((res) => {
//       return res
      
// })


// select the dropdowns
const dropdowns = document.querySelectorAll(".dropdown select");
const Btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
console.log(dropdowns);

for(let select of dropdowns){
      for(let currCode in countryList){
            let newOptions = document.createElement("option");
            newOptions.innerText = currCode;
            newOptions.value = currCode;
            if(select.name === "from" && currCode === "USD"){
                  newOptions.selected = "selected";
            }else if(select.name === "to" && currCode === "INR"){
                  newOptions.selected = "selected";
            }
            select.append(newOptions)
      }
      select.addEventListener("change", (e) => {
            updateFlag(e.target)
      })
}

// function for update country flags
const updateFlag = (elemet) => {
      let currCode = elemet.value;
      let countryCode = countryList[currCode]
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = elemet.parentElement.querySelector("img");
      img.src = newSrc;
}

// function for exchange the amount.
const updateExchangeRate = async() => {
      let amount = document.querySelector(".amount input");
      let amtVal = amount.value;
      if(amtVal === "" || amtVal < 1){
            amtVal = 1;
            amount.value = "1"
      }
      console.log(toCurr.value);
      
      let URL = `${Base_Url}/${fromCurr.value}/${toCurr.value}`;
      let response = await fetch(URL);
      let data = await response.json();
      let rate = data.conversion_rate;
      console.log(rate);
      let finalAmount = amtVal * rate;
      
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`      
}

// event function for btn.
Btn.addEventListener("click", (e) => {
      e.preventDefault()
      updateExchangeRate()
})

window.addEventListener("load", () => {
      updateExchangeRate();
})

