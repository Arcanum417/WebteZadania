(function(w, d) {

    d.querySelector('.search').addEventListener('click', function() {

        var worker = new Worker('worker.js');

        worker.addEventListener('message', function(e) {
            document.getElementById("prime-numbers").textContent += e.data.prime +", ";
            var max = d.querySelector('#limit-high').value
            document.getElementById("progress").innerHTML = "Progress:" + Math.round(e.data.prime/max*100) + "%";
            if (Math.round(e.data.prime/max*100)> 96){
                document.getElementById("progress").innerHTML = "Progress: 100%";
            }
        });

        worker.postMessage({
            limitlow: d.querySelector('#limit-low').value,
            limithigh: d.querySelector('#limit-high').value
        });

    });

}(window, document));