window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    visProdukt();
}

function visProdukt() {
    //klon produkt_templatesdfgh
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //indsæt dt i klon
    //append klon til .produkt_liste
}
