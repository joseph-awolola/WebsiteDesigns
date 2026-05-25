const minimizeBtn = document.querySelector(".functions");
const navBar = document.querySelector("header");
const navText = document.querySelectorAll("ul a li p")
const logo = document.querySelector(".logo img")
const collapseBtn = document.querySelector(".functions img")
const profileBtn = document.querySelector(".profile");
const dropdownContent = document.querySelector(".dropdown_content");

let isOpen = true;
minimizeBtn.addEventListener("click", () => {
    navBar.classList.toggle("minimized");

    logo.classList.toggle("hideElement")
    navText.forEach(e => {
        e.classList.toggle("hideElement")
    });
    isOpen = !isOpen
    collapseBtn.src = isOpen ? "svg/collapse.png" : "svg/enlarge.png"
})

profileBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show")
})

// Get the context of the canvas element we want to select
    var ctx = document.getElementById('myChart').getContext('2d');

    // Create a new Chart object
    var myChart = new Chart(ctx, {
        type: 'doughnut', // The type of chart we want to create
        data: {
            datasets: [{
                label: 'Income',
                data: [12, 19, 3, 5, 2, 3], // Data points for the chart
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                
            }]
        },
    });