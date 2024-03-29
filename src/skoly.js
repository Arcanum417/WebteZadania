var skoly = {
    "STUBA": {
        "FEI": ["API", "ELE"],
        "FIIT": ["INF", "IT"]
    },
    "TUKE": {
        "FEI": ["KPI", "KKUI"],
        "SJF": ["AV", "M"]
    },
}
window.onload = function () {
    var vyberSkola = document.getElementById("vyberSkola"),
        vyberFakulta = document.getElementById("vyberFakulta"),
        vyberOdbor = document.getElementById("vyberOdbor");
    for (var skola in skoly) {
        vyberSkola.options[vyberSkola.options.length] = new Option(skola, skola);
    }
    vyberSkola.onchange = function () {
        vyberFakulta.length = 1;
        vyberOdbor.length = 1;
        if (this.selectedIndex < 1) return;
        for (var fakulta in skoly[this.value]) {
            vyberFakulta.options[vyberFakulta.options.length] = new Option(fakulta, fakulta);
        }
    }
    vyberSkola.onchange();
    vyberFakulta.onchange = function () {
        vyberOdbor.length = 1;
        if (this.selectedIndex < 1) return;
        var odbor = skoly[vyberSkola.value][this.value];
        for (var i = 0; i < odbor.length; i++) {
            vyberOdbor.options[vyberOdbor.options.length] = new Option(odbor[i], odbor[i]);
        }
    }
}