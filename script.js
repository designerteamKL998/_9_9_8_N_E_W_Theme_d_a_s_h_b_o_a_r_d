// SLIDER
document.querySelectorAll('.promo-slider').forEach(slider => {

    const track = slider.querySelector('.promo-track');
    const dots = slider.querySelectorAll('.promo-dot');

    let i = 0;

    function slide(n) {
        i = n;
        track.style.transform = `translateX(-${i * 100}%)`;

        dots.forEach((dot, x) => {
            dot.classList.toggle('active', x === i);
        });
    }

    dots.forEach((dot, x) => {
        dot.onclick = () => slide(x);
    });

    setInterval(() => {
        slide((i + 1) % dots.length);
    }, 5000);

});


document.querySelectorAll(".mobile-game-btn").forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.game;

        document.querySelectorAll(".mobile-game-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        document.querySelectorAll(
            ".slot-games, .lc-games, .sport-games, .lottery-games, .battle-games, .poker-games"
        ).forEach(section => {
            section.style.display = "none";
        });

        document.querySelector("." + target).style.display = "block";

    });

});


// profile-mobile
const moreBtn = document.querySelector(".mobile-more-btn");
const moreMenu = document.querySelector(".mobile-more-menu");

if (moreBtn && moreMenu) {

    moreBtn.addEventListener("click", () => {
        moreMenu.classList.toggle("active");
    });

}


// refresh-header
const refreshBtn = document.querySelector(".refresh");

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {
        // refresh balance
        console.log("Balance refreshed");
    });

}


/* =========================================================
   MOBILE HEADER SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    if (window.innerWidth > 768) return;

    const scrolled = window.scrollY > 80;


});

/* =========================================================
   MOBILE HEADER STICKY STATE
========================================================= */

window.addEventListener("scroll", () => {

    if (window.innerWidth > 1024) return;

    const header =
        document.querySelector(".main-header");

    if (!header) return;

    header.classList.toggle(
        "is-sticky",
        window.scrollY > 0
    );

});