function validateVek() {


    var datumField = document.getElementById("datumNarodenia");
    var vekField = document.getElementById("vek");

    var datum = datumField.value;
    var d = new Date(datum);
    var teraz = new Date();

    if (!!d.valueOf()) {
        var vekDatum = teraz.getFullYear() - d.getFullYear();
        var m = teraz.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && teraz.getDate() < d.getDate()))
        {
            vekDatum--;
        }
        if (vekDatum == vekField.value)
        {
            return true;
        }
    }
    return false;
}

function validateForm() {
    var vekValid = validateVek();
    if(vekValid == false)
    {
        alert("Vek sa nezhoduje s datumom");
        return false;
    }
    return true;

}

