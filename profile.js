document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("passwordForm");

    const currentPassword =
        document.getElementById("currentPassword");

    const newPassword =
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const message =
        document.getElementById("passwordMessage");


    /* =========================================
       PASSWORD VALIDATION
    ========================================= */

    function validatePassword(password) {

        /*
         * 8 - 15 characters
         * At least one letter
         * At least one number
         * At least one special character
         */

        const lengthValid =
            password.length >= 8 &&
            password.length <= 15;

        const letterValid =
            /[A-Za-z]/.test(password);

        const numberValid =
            /[0-9]/.test(password);

        const specialValid =
            /[!@_?#]/.test(password);

        return (
            lengthValid &&
            letterValid &&
            numberValid &&
            specialValid
        );
    }


    /* =========================================
       SHOW MESSAGE
    ========================================= */

    function showMessage(type, text) {

        message.className =
            "password-message " + type;

        message.textContent = text;
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const current =
            currentPassword.value.trim();

        const newPass =
            newPassword.value;

        const confirmPass =
            confirmPassword.value;


        /* Current password */

        if (!current) {

            showMessage(
                "error",
                "Please enter your current password."
            );

            currentPassword.focus();

            return;
        }


        /* New password */

        if (!newPass) {

            showMessage(
                "error",
                "Please enter your new password."
            );

            newPassword.focus();

            return;
        }


        /* Password policy */

        if (!validatePassword(newPass)) {

            showMessage(
                "error",
                "Password must contain 8-15 characters, letters, numbers and at least one special character (! @ _ ? #)."
            );

            newPassword.focus();

            return;
        }


        /* Confirm */

        if (!confirmPass) {

            showMessage(
                "error",
                "Please confirm your new password."
            );

            confirmPassword.focus();

            return;
        }


        /* Match */

        if (newPass !== confirmPass) {

            showMessage(
                "error",
                "New password and confirmation password do not match."
            );

            confirmPassword.focus();

            return;
        }


        /* Same password */

        if (current === newPass) {

            showMessage(
                "error",
                "New password must be different from your current password."
            );

            newPassword.focus();

            return;
        }


        /* SUCCESS */

        showMessage(
            "success",
            "Password meets all requirements."
        );


        /*
         * Backend/API boleh dipanggil di sini.
         *
         * Contoh:
         *
         * fetch('/change-password', {
         *     method: 'POST',
         *     body: new FormData(form)
         * });
         */


        console.log("Password validation successful.");

    });


    /* =========================================
       NAVIGATION ACTIVE STATE
    ========================================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});

});