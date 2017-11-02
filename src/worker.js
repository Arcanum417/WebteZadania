(function(s) {

    function findPrimeNumbers(limitlow,limithigh) {
        var isPrime,
            i,
            j;
        for(i = parseInt(limitlow); i < parseInt(limithigh); i++) {
            isPrime = true;

            for(j = 2; j < i; j++) {
                if(i % j === 0) {
                    isPrime = false;
                }
            }

            if(isPrime) {
                s.postMessage({
                    prime: i
                });
            }
        }
    }

    s.addEventListener('message', function(e) {
        findPrimeNumbers(e.data.limitlow,e.data.limithigh);
    });

}(self));