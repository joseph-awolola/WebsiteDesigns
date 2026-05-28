const minimizeBtn = document.querySelector(".functions");
const navBar = document.querySelector("header");
const navText = document.querySelectorAll("ul a li p")
const logo = document.querySelector(".logo img")
const collapseBtn = document.querySelector(".functions img")
const profileBtn = document.querySelector(".profile");
const dropdownContent = document.querySelector(".dropdown_content");
const sidebarEnlarge = document.querySelector("#enlarge_sidebar")

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
                data: [12, 19, 3, 5, 3], // Data points for the chart
                backgroundColor: [
                    '#DBE9EA',
                    'rgb(0, 78, 111)',
                    '#2C929D',
                    'rgba(75, 192, 192, 1)',
                    '#D2E4E6'
                ],
                borderWidth: 1,
                
            }]
        },
        options: {
        maintainAspectRatio: false,  // ADD THIS
        responsive: false,           // ADD THIS
        }
    });

const progressChart = document.querySelectorAll(".progressChart")

progressChart.forEach(e => {
    const pChart = new Chart(e, {
    type: 'bar',
    data: {
        labels: [''],
        datasets: [
            {
                label: 'Completed',
                data: [60],
                backgroundColor: '#2C929D',
                borderWidth: 0,
                borderRadius: 4,
            },
            {
                label: 'Remaining',
                data: [40],
                backgroundColor: '#D2E4E6',
                borderWidth: 0,
                borderRadius: 4,
            }
        ]
    },
    options: {
        indexAxis: 'y',           // horizontal
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,    // THIS stacks them on one line
                max: 100,
                display: false    // hides the x axis numbers
            },
            y: {
                stacked: true,    // THIS too
                display: false    // hides the y axis label
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
})});

// const pChart = new Chart(progressChart, {
//     type: 'bar',
//     data: {
//         labels: [''],
//         datasets: [
//             {
//                 label: 'Completed',
//                 data: [60],
//                 backgroundColor: '#2C929D',
//                 borderWidth: 0,
//                 borderRadius: 4,
//             },
//             {
//                 label: 'Remaining',
//                 data: [40],
//                 backgroundColor: '#D2E4E6',
//                 borderWidth: 0,
//                 borderRadius: 4,
//             }
//         ]
//     },
//     options: {
//         indexAxis: 'y',           // horizontal
//         responsive: false,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 stacked: true,    // THIS stacks them on one line
//                 max: 100,
//                 display: false    // hides the x axis numbers
//             },
//             y: {
//                 stacked: true,    // THIS too
//                 display: false    // hides the y axis label
//             }
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'bottom'
//             }
//         }
//     }
// });

sidebarEnlarge.addEventListener("click", () => {
    navBar.classList.toggle("sticky_nav")
    
})