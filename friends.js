document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       TABS
    ================================= */

    /* ================================
   TABS
================================ */

const tabs = document.querySelectorAll(".fr-tab");
const contents = document.querySelectorAll(".fr-tab-content");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        /* Remove active */

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        /* Hide all content */

        contents.forEach(content => {
            content.classList.add("fr-hidden");
        });

        /* Activate selected tab */

        tab.classList.add("active");

        /* Show selected content */

        document
            .getElementById(`${target}-content`)
            ?.classList.remove("fr-hidden");

    });

});


    /* ================================
       CLAIM REWARD
    ================================= */

    document.querySelectorAll(".fr-claim").forEach(button => {

        button.addEventListener("click", () => {

            button.textContent = "CLAIMED";
            button.disabled = true;

        });

    });


    /* ================================
       RECORD MODAL
    ================================= */

    const modal = document.getElementById("fr-record-modal");
    const openBtn = document.getElementById("fr-add-record");
    const closeBtn = document.getElementById("fr-close-record");
    const cancelBtn = document.getElementById("fr-cancel-record");
    const saveBtn = document.getElementById("fr-save-record");

    const type = document.getElementById("fr-record-type");
    const description =
        document.getElementById("fr-record-description");

    const records =
        document.getElementById("fr-records-body");


    /* Open */

    openBtn?.addEventListener("click", () => {
        modal.classList.add("fr-show");
    });


    /* Close */

    closeBtn?.addEventListener("click", () => {
        modal.classList.remove("fr-show");
    });


    cancelBtn?.addEventListener("click", () => {
        modal.classList.remove("fr-show");
    });


    /* Save */

    saveBtn?.addEventListener("click", () => {

        if (!description.value.trim()) {
            return;
        }


        /* Remove empty message */

        records.innerHTML = "";


        /* Add record */

        records.innerHTML = `

            <div class="fr-record-row">

                <div class="fr-record-left">

                    <div class="fr-record-icon">
                        <i class="fa-regular fa-file-lines"></i>
                    </div>

                    <div class="fr-record-info">

                        <strong>
                            ${type.value}
                        </strong>

                        <span>
                            ${description.value}
                        </span>

                    </div>

                </div>

            </div>

        `;


        /* Reset */

        description.value = "";

        modal.classList.remove("fr-show");

    });

});