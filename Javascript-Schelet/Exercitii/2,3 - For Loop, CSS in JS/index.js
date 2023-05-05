function addDivs() {
    // Get element where you want to insert divs
    const bodyElement = document.getElementsByTagName("body")[0];

    for (let i = 0; i < 4; i++) {
        // Create element to insert
        const divElement = document.createElement("div");
        divElement.className = "patrat";

        // Append new element to existing one
        bodyElement.appendChild(divElement);
    }
}

function culoareAleatorie(element) {
    const culoare = Math.floor(Math.random() * 16777215).toString(16);
    element.style.backgroundColor = "#" + culoare;
}