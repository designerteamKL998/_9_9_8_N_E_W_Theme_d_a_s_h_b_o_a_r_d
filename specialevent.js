document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       ELEMENTS
    ========================================= */

    const eventCards = document.querySelectorAll(".event-card");
    const navButtons = document.querySelectorAll(".event-nav-item");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const viewButtons = document.querySelectorAll(".view-btn");


    /* =========================================
       CATEGORY FILTER
    ========================================= */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = this.dataset.category;

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            eventCards.forEach(function (card) {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }

            });

        });

    });


    /* =========================================
       TOP NAVIGATION
    ========================================= */

    navButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const tab = this.dataset.tab;


            navButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");


            /* SPECIAL EVENT */

            if (tab === "special") {

                eventCards.forEach(function (card) {
                    card.classList.remove("hidden");
                });

            }


            /* ONGOING */

            if (tab === "ongoing") {

                eventCards.forEach(function (card) {

                    if (card.dataset.status === "ongoing") {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }

                });

            }


            /* UPCOMING */

            if (tab === "upcoming") {

                eventCards.forEach(function (card) {

                    if (card.dataset.status === "upcoming") {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }

                });

            }


            /* HISTORY */

            if (tab === "history") {

                eventCards.forEach(function (card) {
                    card.classList.add("hidden");
                });

            }

        });

    });


    /* =========================================
       VIEW DETAILS
    ========================================= */

    const eventModal = document.querySelector(".event-modal");

    const modalClose = document.querySelector(".event-modal-close");

    const modalOverlay = document.querySelector(".event-modal-overlay");


    const modalTitle = document.querySelector("#modalTitle");

    const modalCategory = document.querySelector("#modalCategory");

    const modalStatus = document.querySelector("#modalStatus");

    const modalDate = document.querySelector("#modalDate");

    const modalDescription = document.querySelector("#modalDescription");

    const modalIcon = document.querySelector("#modalIcon");


    /* =========================================
       OPEN MODAL
    ========================================= */

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = this.closest(".event-card");


            if (!card || !eventModal) {
                return;
            }


            /* GET DATA */

            const title =
                card.querySelector(".event-info h2").textContent.trim();

            const description =
                card.querySelector(".event-info p").textContent.trim();

            const category =
                card.querySelector(".event-type").textContent.trim();

            const status =
                card.querySelector(".event-status").textContent.trim();

            const date =
                card.querySelector(".event-date").textContent.trim();

const icon =
    card.querySelector(".event-icon");


            /* PUT DATA INTO MODAL */

            modalTitle.textContent = title;

            modalDescription.textContent = description;

            modalCategory.textContent = category;

            modalStatus.textContent = status;

            modalDate.textContent = date;
modalIcon.innerHTML =
    icon.innerHTML;


            /* STATUS */

            modalStatus.className = "event-modal-status";

            if (status.toLowerCase() === "ongoing") {
                modalStatus.classList.add("ongoing");
            }

            if (status.toLowerCase() === "upcoming") {
                modalStatus.classList.add("upcoming");
            }


            /* OPEN */

            eventModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        if (!eventModal) {
            return;
        }

        eventModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    /* CLOSE X */

    if (modalClose) {

        modalClose.addEventListener("click", function () {
            closeModal();
        });

    }


    /* CLICK OUTSIDE */

    if (modalOverlay) {

        modalOverlay.addEventListener("click", function () {
            closeModal();
        });

    }


    /* ESC */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {
            closeModal();
        }

    });


});