const hero = document.querySelector(".hero");
const video = document.getElementById("girlVideo");
const cursor = document.querySelector(".cursor");

let targetTime = 0;
let currentTime = 0;
let started = false;

hero.addEventListener("pointermove", (e) => {
    if (cursor && e.pointerType === "mouse") {
        cursor.classList.add("on");
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
    if (!isFinite(video.duration)) return;
    const position = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
    targetTime = position * video.duration;
});

function animate() {
    currentTime += (targetTime - currentTime) * 0.12;
    if (video.readyState >= 2 && Math.abs(video.currentTime - currentTime) > 0.01) {
        video.currentTime = currentTime;
    }
    requestAnimationFrame(animate);
}

function startVideo() {
    if (started || !isFinite(video.duration)) return;
    started = true;
    currentTime = targetTime = video.duration / 2;
    video.currentTime = currentTime;
    animate();
}
video.addEventListener("loadedmetadata", startVideo);
if (video.readyState >= 1) startVideo();   // metadata already loaded (cached / fast connection)

/* Scroll animations */
document.addEventListener("DOMContentLoaded", () => {
    // Skills: replay slide-in every time a card enters view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("animate");
                void entry.target.offsetWidth;
                entry.target.classList.add("animate");
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll(".skill-box").forEach((b) => skillObserver.observe(b));

    // Experience cards
    const exObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("show-card", entry.isIntersecting));
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".ex-item").forEach((i) => exObserver.observe(i));

    // Contact
    const contact = document.querySelector(".contact-section");
    if (contact) {
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => contact.classList.toggle("is-visible", entry.isIntersecting));
        }, { threshold: 0.15 }).observe(contact);
    }
});
