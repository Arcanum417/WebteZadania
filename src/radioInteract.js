function radioOptionA (radioOption)
{
    if(radioOption.checked) {
        document.getElementById("R1").style.display="initial";
        document.getElementById("R2").style.display="initial";
        document.getElementById("R3").style.display="none";
        document.getElementById("R4").style.display="none";
    }
}

function radioOptionB (radioOption)
{
    if(radioOption.checked) {
        document.getElementById("R1").style.display="none";
        document.getElementById("R2").style.display="none";
        document.getElementById("R3").style.display="initial";
        document.getElementById("R4").style.display="initial";
    }
}
