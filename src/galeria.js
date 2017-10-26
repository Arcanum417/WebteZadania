var jsonData;
var sIndex = 1;
var casovac;

function load() {
    jsonData = JSON.parse(p);
    document.getElementById('obr1').src = jsonData.photos[0].src;
    document.getElementById('obr2').src = jsonData.photos[1].src;
    document.getElementById('obr3').src = jsonData.photos[2].src;
    document.getElementById('obr4').src = jsonData.photos[3].src;
    document.getElementById('obr5').src = jsonData.photos[4].src;
    document.getElementById('obr11').src = jsonData.photos[0].src;
    document.getElementById('obr12').src = jsonData.photos[1].src;
    document.getElementById('obr13').src = jsonData.photos[2].src;
    document.getElementById('obr14').src = jsonData.photos[3].src;
    document.getElementById('obr15').src = jsonData.photos[4].src;
}

function openLightBox() {
    document.getElementById('lightboxVrstva').style.display = "block";
    document.getElementById('podklad').style.display = "block";
}

function closeLightBox() {
    document.getElementById('lightboxVrstva').style.display = "none";
    document.getElementById('podklad').style.display = "none";
    prezentaciaStop();
}

function dalsiSlide(n) {
    Slide(sIndex += n);
}

function tentoSlide(n) {
    Slide(sIndex = n);
}

function prezentacia() {
    casovac = window.setInterval(function() {
        dalsiSlide(1);
    }, 4500);
}

function prezentaciaStop() {
    window.clearInterval(casovac);
}

function Slide(n) {
    var i;
    var slidy = document.getElementsByClassName("slidy");
    var popisText = document.getElementById("popis");
    var titleText = document.getElementById("title");

    if (n > slidy.length) { sIndex = 1 }

    if (n < 1) { sIndex = slidy.length }

    for (i = 0; i < slidy.length; i++) {
        slidy[i].style.display = "none";
    }

    slidy[sIndex - 1].style.display = "block";
    popisText.innerHTML = jsonData.photos[sIndex - 1].description;
    titleText.innerHTML = jsonData.photos[sIndex - 1].title;
}