const input = document.querySelector(".amount input");
const opts = document.querySelectorAll(".dropdown select")
const msg = document.querySelector(".res");
const btn = document.querySelector(".getRes");

let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

for (let select of opts) {
    for (let code in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if (select.name === "from" && code === "USD" ||
            select.name === "to" && code === "INR" ) {
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let imgUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgUrl;
};


btn.addEventListener("click", (e) => {
    e.preventDefault()
    getRate();
})

const getRate = async () => {
    let val = input.value;
    if (val == "" || val <= 0) {
        input.value = "1";
        val = 1;
    }
    let fromOpt = document.querySelector(".from select");
    let toOpt = document.querySelector(".to select");
    let fromCountry = fromOpt.value.toLowerCase();
    let toCountry = toOpt.value.toLowerCase();

    let newURL = `${BASE_URL}/${fromCountry}/${toCountry}.json`
    let response = await fetch(newURL);
    let data = await response.json();
    let rate = await data[toCountry];

    let finalAmount = val * rate;
    msg.innerText = `${val} ${fromCountry.toUpperCase()} = ${finalAmount} ${toCountry.toUpperCase()}`
}