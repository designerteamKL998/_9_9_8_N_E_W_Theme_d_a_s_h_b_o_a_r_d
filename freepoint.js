document.addEventListener("DOMContentLoaded", () => {

    const claimBtn = document.getElementById("claimBtn");
    const claimText = document.getElementById("claimText");
    const pointValue = document.getElementById("pointValue");

    let claimed = false;


    claimBtn.addEventListener("click", () => {

        if (claimed) return;

        claimed = true;


        /* ADD FREE POINT */

        pointValue.textContent = "100";


        /* CHANGE BUTTON */

        claimBtn.classList.add("claimed");

        claimText.textContent = "Points Claimed";


        /* DISABLE BUTTON */

        claimBtn.disabled = true;

    });

});


//FREEPOINT HISTORY
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       BACK BUTTON
    ========================================== */

    const backButton = document.querySelector(".fp-back-btn");

    backButton?.addEventListener("click", (e) => {

        // Kalau page freepoint.html memang wujud,
        // biarkan link HTML handle navigation.
        // JS ni hanya prevent double action.

    });


    /* =========================================
       TABLE ROW CLICK
    ========================================== */

    document.querySelectorAll(".fp-table tbody tr").forEach(row => {

        row.addEventListener("click", () => {

            document
                .querySelectorAll(".fp-table tbody tr")
                .forEach(item => item.classList.remove("fp-row-active"));

            row.classList.add("fp-row-active");

        });

    });

});