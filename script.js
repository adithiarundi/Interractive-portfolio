const video = document.getElementById("girlVideo");
const cursor = document.querySelector(".cursor");

let targetTime = 0;
let currentTime = 0;


/* --------------------------------
   CURSOR MOVEMENT
-------------------------------- */

document.addEventListener("mousemove", (event) => {

    const mouseX = event.clientX;

    const screenWidth = window.innerWidth;


    /*
        Convert cursor position to
        a value between 0 and 1
    */

    let position = mouseX / screenWidth;


    /*
        Keep the value between 0 and 1
    */

    position = Math.max(0, Math.min(1, position));


    /*
        Convert cursor position
        into video time
    */

    targetTime = position * video.duration;


    /*
        Move custom cursor
    */

    cursor.style.left = mouseX + "px";
    cursor.style.top = event.clientY + "px";

});


/* --------------------------------
   SMOOTH VIDEO MOVEMENT
-------------------------------- */

function animate() {

    /*
        Smoothly move current time
        toward target time
    */

    currentTime += (targetTime - currentTime) * 0.12;


    /*
        Update video position
    */

    if (video.readyState >= 2) {
        video.currentTime = currentTime;
    }


    requestAnimationFrame(animate);
}


/* --------------------------------
   START
-------------------------------- */

video.addEventListener("loadedmetadata", () => {

    /*
        Start from the middle
        instead of the beginning
    */

    currentTime = video.duration / 2;

    targetTime = video.duration / 2;

    video.currentTime = video.duration / 2;

    animate();

});


document.addEventListener("DOMContentLoaded", () => {

    const skillBoxes = document.querySelectorAll(".skill-box");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.remove("animate");

                // Reset the animation
                void entry.target.offsetWidth;

                // Start animation
                entry.target.classList.add("animate");
            }

        });

    }, {
        threshold: 0.2
    });

    skillBoxes.forEach(box => {
        observer.observe(box);
    });

});


document.addEventListener("DOMContentLoaded", () => {
    const experienceItems = document.querySelectorAll(".ex-item");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Slide the card into view
                    entry.target.classList.add("show-card");
                } else {
                    // Reset the card when it leaves the screen
                    entry.target.classList.remove("show-card");
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    experienceItems.forEach((item) => {
        observer.observe(item);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.querySelector(".contact-section");

    if (!contactSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                contactSection.classList.toggle(
                    "is-visible",
                    entry.isIntersecting
                );
            });
        },
        {
            threshold: 0.15
        }
    );

    observer.observe(contactSection);
});

