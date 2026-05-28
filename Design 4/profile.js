const nav_link = document.querySelectorAll("nav ul a")


nav_link.forEach(e => {
    if (e.href === window.location.href) {
        e.classList.add(".active")
    }
})