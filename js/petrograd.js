window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //læs produkt list
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


}
//http://petlatkea.dk/2017/dui/api/product?callback=?&id=21
function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}




function visProdukt(produkt) {
    //console.log(produkt);

    //klon produkt_templatesdfgh
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    klon.querySelector('button').dataset.id = produkt.id;
    klon.querySelector('button').addEventListener('click', knapKlikketPå);

    if (produkt.udsolgt == false) {
        //Produktet er ikke udsolgt
        //udsolgtteskt skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);

    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    //append klon til .produkt_liste
    //document.querySelector(".produktliste").appendChild(klon);
    //console.log("." + produkt.kategori)

    //document.querySelector("." + produkt.kategori).appendChild(klon);
    console.log("." + produkt.kategori)
    if (produkt.kategori == "forretter") {
        document.querySelector(".forretter").appendChild(klon);
    } else if (produkt.kategori == "hovedretter") {
        document.querySelector(".hovedretter").appendChild(klon);
    } else if (produkt.kategori == "desserter") {
        document.querySelector(".desserter").appendChild(klon);
    } else if (produkt.kategori == "drikkevarer") {
        document.querySelector(".drikkevarer").appendChild(klon);
    } else if (produkt.kategori == "sideorders") {
        document.querySelector(".sideorders").appendChild(klon);
    }
}

function knapKlikketPå(oplysningerOmEventet) {
    document.querySelector('#myModalLabel').textContent = "Loader";
    document.querySelector('#myModal .modal-body p').textcontent = "...";
    document.querySelector(".modal-body img").src = "imgs/main_900.jpg";


    var produktId = oplysningerOmEventet.target.dataset.id;

    //send forespørgelse til //http://petlatkea.dk/2017/dui/api/product?callback=?&id=21
    //med det rigtige id
    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id=" + produktId, visModalIndhold);




}

function visModalIndhold(mereInfo) {
    console.log("indhold fundet");

    document.querySelector('#myModalLabel').textContent = mereInfo.navn;
    document.querySelector('#myModal .modal-body .data_beskrivelse').textContent = mereInfo.langbeskrivelse;
    document.querySelector('#myModal .modal-body .data_pris').textContent = mereInfo.pris;
    document.querySelector('#myModal .modal-body .data_status').textContent = mereInfo.status;
    document.querySelector('#myModal .modal-body .data_rabat').textContent = mereInfo.rabat;
    document.querySelector('#myModal .modal-body .data_vegetaregenthed').textContent = mereInfo.vegetaregenthed;

    document.querySelector(".modal-body img").src = "/imgs/small/" + mereInfo.billede + "-sm.jpg";
}

/*
           if (produkt.kategori == ".forretter") {
               document.querySelector(".forretter").appendChild(klon);
           } else(produkt.kategori == ".hovedretter") {
               document.querySelector(".hovedetter").appendChild(klon);
           }
       else(produkt.kategori == ".desserter") {
               document.querySelector(".desserter").appendChild(klon);
           }
           else(produkt.kategori == ".hovedretter") {
               document.querySelector(".hovedetter").appendChild(klon);
           }
*/
