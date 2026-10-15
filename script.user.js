// ==UserScript==
// @name         CARDS COM CORES CAPTACAO LOCACAO
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       Iago Alencar
// @match        https://bortoliniimoveis.bitrix24.com.br/crm/lead/kanban/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bitrix24.com.br
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/BortoliniImoveis/captacao-locacao-tampermonkey/main/script.user.js
// @updateURL    https://raw.githubusercontent.com/BortoliniImoveis/captacao-locacao-tampermonkey/main/script.user.js
// ==/UserScript==

(function () {
    'use strict';

    function aplicarCores() {

        document.querySelectorAll(".crm-kanban-item").forEach(card => {

            let status = "";

            const fields = card.querySelectorAll(".crm-kanban-item-fields-item");

            fields.forEach(f => {

                const title = f.querySelector(".crm-kanban-item-fields-item-title-text");
                const value = f.querySelector(".crm-kanban-item-fields-item-value");

                if (!title || !value) return;

                if (title.innerText.includes("Status do Atendimento")) {
                    status = value.innerText.trim().toUpperCase();
                }

            });

            if (status.includes("FOTOS PENDENTES")) {
                card.style.backgroundColor = "#fff3b3"; // amarelo pastel
            }

            else {
                card.style.backgroundColor = ""; // cor padrão
            }

        });

    }

    // roda inicial
    setTimeout(aplicarCores, 2000);

    // observa mudanças do Kanban (Bitrix SPA)
    const observer = new MutationObserver(aplicarCores);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
