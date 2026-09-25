/* =========================================================
   DEPOSIT - SIMPLE JS
========================================================= */
const state = {
    method: null,
    gateway: null,
    bank: null,
    ewallet: null
};


/* =========================================================
   PACKAGE
========================================================= */

function selectPackage(card) {

    if (!card) return;

    /* REMOVE ACTIVE FROM ALL */

    document.querySelectorAll(".package-card")
        .forEach(item => {
            item.classList.remove("active");
        });


    /* SELECT CURRENT PACKAGE */

    card.classList.add("active");


    /* SHOW DEPOSIT CONTENT */

    const content =
        document.querySelector(".deposit-content");

    if (content) {
        content.classList.add("show");
    }
}

/* =========================================================
   PAYMENT METHOD
========================================================= */

function selectPaymentMethod(button) {

    if (!button) return;


    /* ACTIVE */

    document.querySelectorAll(".payment-method")
        .forEach(item => item.classList.remove("active"));

    button.classList.add("active");


    /* SAVE */

    state.method = button.dataset;
state.gateway = null;
state.bank = null;
state.ewallet = null;
document
    .querySelector(".crypto-conversion")
    ?.classList.remove("show");

document
    .querySelector(".bank-transfer-info")
    ?.classList.remove("show");

document.querySelectorAll(".ewallet-btn")
    .forEach(btn => btn.classList.remove("active"));


    /* =====================================================
       RESET EVERYTHING
    ===================================================== */

    document.querySelectorAll(".deposit-flow")
        .forEach(flow => {

            flow.classList.remove("active");
            flow.style.display = "none";

        });


    document.querySelectorAll(".choose-bank-step")
        .forEach(step => {
            step.classList.remove("show");
        });


    document.querySelector(".bank-transfer-info")
        ?.classList.remove("show");


    document.querySelector(".bank-transfer-extra")
        ?.classList.remove("show");


    document.querySelector(".payment-header")
        ?.classList.remove("hide", "no-bank");


    document.querySelectorAll(".gateway-card")
        .forEach(card => {
            card.classList.remove("active");
        });


    /* =====================================================
       BANK IN TRANSFER
    ===================================================== */

    if (button.dataset.method === "bank") {

        document.querySelector(".payment-header")
            ?.classList.add("hide");

        document.querySelector(".bank-transfer-info")
            ?.classList.add("show");

        document.querySelector(".bank-transfer-extra")
            ?.classList.add("show");

        document.querySelector(
            '.choose-bank-step[data-bank-for="dbsgateway"]'
        )?.classList.add("show");

        document.querySelector(".deposit-right")
            ?.classList.add("show");

        return;
    }


    /* =====================================================
       SHOW ONLY SELECTED FLOW
    ===================================================== */

    const flow =
        document.querySelector(
            `.deposit-flow.${button.dataset.method}`
        );

    if (flow) {

        flow.classList.add("active");
        flow.style.display = "block";

    }


    /* HIDE RIGHT UNTIL GATEWAY SELECTED */

    document.querySelector(".deposit-right")
        ?.classList.remove("show");
}
/* =========================================================
   GATEWAY
========================================================= */

function selectGateway(card) {

    if (!card) return;


    /* REMOVE ACTIVE */

    document.querySelectorAll(".gateway-card")
        .forEach(item => item.classList.remove("active"));

    card.classList.add("active");


    /* SAVE GATEWAY */

    state.gateway = card.dataset;

    state.gateway.name =
        card.querySelector("span")?.textContent.trim() || "";

    state.gateway.logo =
        card.querySelector("img")?.src || "";


    /* RESET */

    state.bank = null;
    state.ewallet = null;

document.querySelector(".deposit-right")
    ?.classList.remove("usdt-active");

document.querySelector(".payment-header")
    ?.classList.remove("hide");


    document.querySelectorAll(".ewallet-btn")
        .forEach(btn => btn.classList.remove("active"));


    /* RESET USDT SPECIAL */

    document.querySelector(".deposit-right")
        ?.classList.remove("usdt-active");


    /* HIDE ALL CHOOSE BANK */

    document.querySelectorAll(".choose-bank-step")
        .forEach(step => step.classList.remove("show"));


    /* RESET BANK INFO */

    document.querySelector(".bank-transfer-info")
        ?.classList.remove("show");

    document.querySelector(".bank-transfer-extra")
        ?.classList.remove("show");


    /* =====================================================
       USDT ONLY
    ===================================================== */

    if (card.dataset.gateway === "Eeziepay") {

        document.querySelector(".deposit-right")
            ?.classList.add("usdt-active");


        const panel =
            document.querySelector(".right-payment-layout");


        if (panel) {

            panel.dataset.type = "crypto-address";


            /* RATE */

            const rate =
                panel.querySelector(".right-crypto-rate");

            if (rate) {
                rate.textContent =
                    "USDT 1 : MYR 4.05";
            }


            /* ADDRESS */

            const address =
                panel.querySelector(".right-crypto-address");

            if (address) {
                address.value =
                    "TPm8QhbA9DHc91oqE7Ez";
            }

        }


        /* SHOW RIGHT */

        document.querySelector(".deposit-right")
            ?.classList.add("show");


        return;
    }


    /* =====================================================
       NORMAL GATEWAY
    ===================================================== */

    updateRight();


    /* GATEWAY NEEDS BANK */

    if (card.dataset.chooseBank === "true") {

        document.querySelector(
            `.choose-bank-step[data-bank-for="${card.dataset.gateway}"]`
        )?.classList.add("show");

    }

}
/* =========================================================
   BANK DROPDOWN
========================================================= */

function toggleBankDropdown(button) {

    const dropdown =
        button.closest(".custom-dropdown");

    if (!dropdown) return;

    document.querySelectorAll(".custom-dropdown.open")
        .forEach(item => {

            if (item !== dropdown)
                item.classList.remove("open");

        });

    dropdown.classList.toggle("open");
}


function selectBank(option) {

    const dropdown =
        option.closest(".custom-dropdown");

    if (!dropdown) return;

    const data = option.dataset;

    state.bank = data;

/* =====================================================
   CRYPTO DATA
===================================================== */

if (state.gateway?.gateway === "cryptogateway") {

    const cryptoData = {

        "ERC20-USDT": {
            network: "ERC20 / Ethereum",
            rate: "USDT 1 : MYR 4.05",
            address: "0x1234567890ABCDEF1234567890ABCDEF"
        },

        "TRC20-USDT": {
            network: "TRC20 / TRON",
            rate: "USDT 1 : MYR 4.05",
            address: "TPm8QhbA9DHc91oqE7Ez"
        }

    };

    const crypto =
        cryptoData[data.bankName];

if (crypto) {

    panelCryptoUpdate(crypto);


    /* SHOW CRYPTO CONVERSION */

    const cryptoConversion =
        document.querySelector(".crypto-conversion");

    if (cryptoConversion) {
        cryptoConversion.classList.add("show");
    }


    /* UPDATE NETWORK NAME */

    const conversionResult =
        document.querySelector(".crypto-conversion-result");

    const exchangeRate =
        document.querySelector(".crypto-exchange-rate");

    if (conversionResult) {

        conversionResult.textContent =
            "~ 0.0 " + data.bankName;

    }

    if (exchangeRate) {

        exchangeRate.textContent =
            "1 MYR: ~ 0.2487562189 " + data.bankName;

    }

}
/* SHOW CRYPTO CONVERSION */

const cryptoConversion =
    document.querySelector(".crypto-conversion");

if (cryptoConversion) {
    cryptoConversion.classList.add("show");
}

}

    /* update selected text */

    const text =
        dropdown.querySelector(
            ".custom-dropdown-value span:last-child"
        );

    if (text)
        text.textContent =
            data.bankName || option.textContent.trim();


    /* update logo */

    const img =
        dropdown.querySelector(
            ".custom-dropdown-value img"
        );

    if (img && data.bankLogo) {

        img.src = data.bankLogo;
        img.alt = data.bankName || "";

    }

/* SHOW BANK INFO CARD */

if (
    state.method?.method === "bank" ||
    state.gateway?.gateway === "cryptogateway"
) {
    document
        .querySelector(".bank-transfer-info")
        ?.classList.add("show");
}


/* BANK TRANSFER EXTRA ONLY */

if (state.method?.method === "bank") {
    document
        .querySelector(".bank-transfer-extra")
        ?.classList.add("show");
}

updateRight();}


/* =========================================================
   UNIVERSAL RIGHT PANEL
========================================================= */

function updateRight() {

    const panel =
        document.querySelector(".right-payment-layout");

    if (!panel) return;


    /* gateway logo */

const brand =
    panel.querySelector(".payment-brand");

const logo =
    panel.querySelector(".right-payment-logo");

const gatewayName =
    panel.querySelector(".right-payment-name");

if (state.method?.method === "bank") {

    // No payment gateway for Bank In Transfer
    brand?.style.setProperty("display", "none");

} else {

    brand?.style.setProperty("display", "");

    if (logo) {
        logo.src = state.gateway?.logo || "";
        logo.alt = state.gateway?.name || "";
    }

    if (gatewayName) {
        gatewayName.textContent =
            state.gateway?.name || "-";
    }
}

    /* gateway name */

    panel.querySelector(
        ".right-payment-name"
    )?.replaceChildren(
        document.createTextNode(
            state.gateway?.name || "-"
        )
    );


    /* payment method */

    panel.querySelector(
        ".right-payment-method"
    )?.replaceChildren(
        document.createTextNode(
            state.method?.displayName || "-"
        )
    );






/* =====================================
   SPONSORED E-WALLET
===================================== */

const sponsoredBox =
    panel.querySelector(".payment-supported");

if (sponsoredBox) {

    const sponsored =
        state.gateway?.sponsored === "true" ||
        state.bank?.sponsored === "true";

    sponsoredBox.style.setProperty(
        "display",
        sponsored ? "flex" : "none",
        "important"
    );
}
/* =====================================
   BANK
===================================== */

panel.querySelector(
    ".right-bank-name"
)?.replaceChildren(
    document.createTextNode(
        state.bank?.bankName || "-"
    )
);


/* BANK LOGO */

const bankSection =
    panel.querySelector(".payment-bank");

const rightBankImg =
    panel.querySelector(".bank-main-icon img");

const paymentHeader =
    panel.querySelector(".payment-header");


if (bankSection && rightBankImg) {

    /* BANK IN TRANSFER
       → bank logo header memang hide */

    if (state.method?.method === "bank") {

        rightBankImg.src = "";
        rightBankImg.alt = "";

        bankSection.style.display = "none";

        paymentHeader
            ?.classList.remove("no-bank");

    }


    /* ADA BANK LOGO
       → show bank */

    else if (state.bank?.bankLogo) {

        rightBankImg.src =
            state.bank.bankLogo;

        rightBankImg.alt =
            state.bank.bankName || "Bank";

        bankSection.style.display = "flex";

        paymentHeader
            ?.classList.remove("no-bank");

    }


    /* TAK ADA BANK LOGO
       → hide bank + adjust header */

    else {

        rightBankImg.src = "";
        rightBankImg.alt = "";

        bankSection.style.display = "none";

        paymentHeader
            ?.classList.add("no-bank");

    }
}


/* minimum */

panel.querySelector(
    ".right-minimum"
)?.replaceChildren(
    document.createTextNode(
        state.gateway?.min
            ? "RM " + state.gateway.min
            : "-"
    )
);


/* maximum */

panel.querySelector(
    ".right-maximum"
)?.replaceChildren(
    document.createTextNode(
        state.gateway?.max
            ? "RM " + state.gateway.max
            : "-"
    )
);


/* show */

document.querySelector(".deposit-right")
    ?.classList.add("show");
}


/* =========================================================
   HIDE RIGHT
========================================================= */

function hideRight() {

    document.querySelector(".deposit-right")
        ?.classList.remove("show");
}


/* =========================================================
   CLOSE DROPDOWN OUTSIDE
========================================================= */

document.addEventListener("click", function(e) {

    if (!e.target.closest(".custom-dropdown")) {

        document.querySelectorAll(
            ".custom-dropdown.open"
        ).forEach(item =>
            item.classList.remove("open")
        );

    }

});


/* =========================================================
   PACKAGE SLIDER
========================================================= */

const slider =
    document.getElementById("packageSlider");

document.querySelector(".next-btn")
    ?.addEventListener("click", () => {

        slider?.scrollBy({
            left: 300,
            behavior: "smooth"
        });

    });

document.querySelector(".prev-btn")
    ?.addEventListener("click", () => {

        slider?.scrollBy({
            left: -300,
            behavior: "smooth"
        });

    });


/* =========================================================
   AUTO SELECT FIRST PAYMENT METHOD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(
        ".payment-method.active"
    )?.click();

});


/* =========================================================
   QUICK AMOUNT
========================================================= */

function quickAmount(button) {

    const amount = button.dataset.amount;

    const input =
        document.querySelector(".gateway-amount-input");

    if (!input) return;

    input.value = amount;

    /* update displayed amount */

    const display =
        document.querySelector(".amount-display strong");

    if (display) {
        display.textContent =
            Number(amount).toFixed(2);
    }

}


function toggleTransferDropdown(button) {

    const dropdown = button.closest(".custom-dropdown");

    if (!dropdown) return;

    dropdown.classList.toggle("open");
}


function selectTransferType(option) {

    const dropdown = option.closest(".custom-dropdown");

    if (!dropdown) return;

    const text = option.textContent.trim();

    const selected =
        dropdown.querySelector(
            ".custom-dropdown-value span"
        );

    if (selected) {
        selected.textContent = text;
    }

    dropdown.classList.remove("open");

    state.transferType =
        option.dataset.transferType || text;
}


/* =========================================================
   E-WALLET DATA
========================================================= */

const eWalletData = {

    grabpay: {
        name: "GrabPay",
        logo: "imgs/payment/grablogo.png"
    },

    shopeepay: {
        name: "ShopeePay",
        logo: "imgs/payment/shopeelogo.png"
    },

    boost: {
        name: "Boost",
        logo: "imgs/payment/boostlogo.png"
    },

    touchngo: {
        name: "Touch 'n Go",
        logo: "imgs/payment/tnglogo.png"
    },

    maybank: {
        name: "MAE",
        logo: "imgs/payment/maelogo.png"
    },

    duitnow: {
        name: "DuitNow",
        logo: "imgs/payment/duitnowlogo.png"
    }

};


/* =========================================================
   E-WALLET SELECT
========================================================= */

document.addEventListener("click", function(e) {

    const btn = e.target.closest(".ewallet-btn");

    if (!btn) return;

    /* Only allow selection for sponsored gateway */
    if (state.gateway?.sponsored !== "true") {
        return;
    }

    const key = btn.dataset.ewallet;
    const wallet = eWalletData[key];

    if (!wallet) return;

    /* Remove previous active */
    document.querySelectorAll(".ewallet-btn")
        .forEach(item => {
            item.classList.remove("active");
        });

    /* Set current active */
    btn.classList.add("active");

    /* Save selected wallet */
    state.ewallet = {
        key: key,
        name: wallet.name,
        logo: wallet.logo
    };

});


/* ============= CONFIRM DEPOSIT ============= */


function confirmDeposit(button) {

    const input =
        document.querySelector(".gateway-amount-input");

    if (!input) return;

    const amount =
        Number(input.value);

    if (!amount || amount <= 0) {

        alert("Please enter amount.");

        return;
    }

    showPaymentPopup(amount);
}

/* =========================================================
   PAYMENT POPUP
========================================================= */

function showPaymentPopup(amount) {

    const popup =
        document.getElementById("ewalletPopup");

    if (!popup) return;


    /* GATEWAY LOGO */

    const gatewayLogo =
        document.getElementById("popupGatewayLogo");

    if (gatewayLogo) {

        gatewayLogo.src =
            state.gateway?.logo || "";

        gatewayLogo.alt =
            state.gateway?.name || "";
    }

/* QR */

const popupQrBox =
    document.getElementById("popupQrBox");

const popupQrImage =
    document.getElementById("popupQrImage");

const qr =
    state.gateway?.qr;

if (qr) {

    popupQrBox.style.display = "flex";
    popupQrImage.src = qr;

} else {

    popupQrBox.style.display = "none";
    popupQrImage.src = "";

}


    /* SMALL LOGO */

    const walletBox =
        document.querySelector(".popup-ewallet-logo");

    const walletLogo =
        document.getElementById("popupWalletLogo");


    if (state.ewallet) {

        walletBox.style.display = "flex";

        walletLogo.src =
            state.ewallet.logo;

        walletLogo.alt =
            state.ewallet.name;

    }

    else if (state.bank?.bankLogo) {

        walletBox.style.display = "flex";

        walletLogo.src =
            state.bank.bankLogo;

        walletLogo.alt =
            state.bank.bankName || "Bank";

    }

    else {

        walletBox.style.display = "none";

        walletLogo.src = "";

    }


    /* NAME */

    document.getElementById("popupWalletName")
        .textContent =
            state.ewallet?.name ||
            state.bank?.bankName ||
            state.gateway?.name ||
            "Payment Gateway";


    /* AMOUNT */

    document.getElementById("popupAmount")
        .textContent =
            "RM " + amount.toFixed(2);


    /* METHOD */

    document.getElementById("popupMethod")
        .textContent =
            state.method?.displayName || "-";


    /* BANK */

    document.getElementById("popupBank")
        .textContent =
            state.bank?.bankName || "-";


    popup.classList.add("show");
}

/* =========================================================
   CLOSE POPUP
========================================================= */

function closeEwalletPopup() {

    document.getElementById("ewalletPopup")
        ?.classList.remove("show");

}


/* =========================================================
   PROCEED PAYMENT
========================================================= */

function proceedPayment() {

    console.log(
        "Proceed:",
        state.ewallet || state.bank || state.gateway
    );

}

function panelCryptoUpdate(crypto) {

    const panel =
        document.querySelector(".right-payment-layout");

    const right =
        document.querySelector(".deposit-right");

    if (!panel || !right) return;


    /* USDT ONLY */

    right.classList.add("usdt-active");

    panel.dataset.type = "crypto-address";


    /* RATE */

    const rate =
        panel.querySelector(".right-crypto-rate");

    if (rate) {
        rate.textContent =
            crypto.rate;
    }


    /* NETWORK */

    const network =
        panel.querySelector(".right-crypto-network");

    if (network) {
        network.textContent =
            crypto.network;
    }


    /* ADDRESS */

    const address =
        panel.querySelector(".right-crypto-address");

    if (address) {
        address.value =
            crypto.address;
    }

}