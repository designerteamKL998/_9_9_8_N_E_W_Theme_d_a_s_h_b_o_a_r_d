
document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       TAB SWITCHING
    ========================================== */

    const tabs = document.querySelectorAll(".rf-tab");
    const contents = document.querySelectorAll(".rf-tab-content");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            const target = this.dataset.tab;

            tabs.forEach(item => {
                item.classList.remove("rf-tab-active");
            });

            contents.forEach(content => {
                content.classList.remove("rf-content-active");
            });

            this.classList.add("rf-tab-active");

            const targetContent =
                document.getElementById("rf-" + target);

            if (targetContent) {
                targetContent.classList.add("rf-content-active");
            }

        });

    });


    /* ==========================================
       COPY BUTTON
    ========================================== */

    const copyButtons =
        document.querySelectorAll(".rf-copy-btn");

    const toast =
        document.querySelector(".rf-toast");


    copyButtons.forEach(button => {

        button.addEventListener("click", async function () {

            const text = this.dataset.copy;

            try {

                await navigator.clipboard.writeText(text);

                showToast();

                const original =
                    this.innerHTML;

                this.innerHTML = "✓ Copied";

                setTimeout(() => {
                    this.innerHTML = original;
                }, 1500);

            } catch (error) {

                /* fallback */
                const temp =
                    document.createElement("textarea");

                temp.value = text;

                document.body.appendChild(temp);

                temp.select();

                document.execCommand("copy");

                temp.remove();

                showToast();

            }

        });

    });


    /* ==========================================
       TOAST
    ========================================== */

    function showToast() {

        toast.classList.add("rf-show");

        clearTimeout(window.rfToastTimer);

        window.rfToastTimer =
            setTimeout(() => {

                toast.classList.remove("rf-show");

            }, 2200);

    }


    /* ==========================================
       SOCIAL BUTTON
    ========================================== */

    const whatsapp =
        document.querySelector(".rf-whatsapp");

    const facebook =
        document.querySelector(".rf-facebook");

    const telegram =
        document.querySelector(".rf-telegram");


    const referralLink =
        "https://gdbet333mys.com/en/registration?r=mfjil";


    const shareText =
        "Join using my referral link: " +
        referralLink;


    if (whatsapp) {

        whatsapp.addEventListener("click", () => {

            window.open(
                "https://wa.me/?text=" +
                encodeURIComponent(shareText),
                "_blank"
            );

        });

    }


    if (telegram) {

        telegram.addEventListener("click", () => {

            window.open(
                "https://t.me/share/url?url=" +
                encodeURIComponent(referralLink) +
                "&text=" +
                encodeURIComponent("Join using my referral link"),
                "_blank"
            );

        });

    }


    if (facebook) {

        facebook.addEventListener("click", () => {

            window.open(
                "https://www.facebook.com/sharer/sharer.php?u=" +
                encodeURIComponent(referralLink),
                "_blank",
                "width=600,height=500"
            );

        });

    }


    /* ==========================================
       HOVER STEP EFFECT
    ========================================== */

    document
        .querySelectorAll(".rf-step")
        .forEach(step => {

            step.addEventListener("mouseenter", () => {

                const number =
                    step.querySelector(".rf-step-number");

                if (number) {
                    number.style.boxShadow =
                        "0 0 25px rgba(255,215,0,.3)";
                }

            });

            step.addEventListener("mouseleave", () => {

                const number =
                    step.querySelector(".rf-step-number");

                if (number) {
                    number.style.boxShadow =
                        "0 5px 20px rgba(255,215,0,.12)";
                }

            });

        });

});
