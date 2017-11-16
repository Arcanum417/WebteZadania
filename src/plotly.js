var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
var lock = 0;
var parsedData;
source.onmessage = function(event) {
    parsedData = JSON.parse(event.data);
    if (parsedData.x == 0)
    {
        Plotly.plot('graph', [{
            y: [parsedData.y1],
            x: [0],
            mode: 'lines',
            line: {color: '#f60100'},
            name: 'Y1'
        }, {
            y: [parsedData.y2],
            x:[0],
            mode: 'lines',
            line: {color: '#f1ee00'},
            name: 'Y2'
        }]);

    }
    if (lock == 0) {
    Plotly.extendTraces('graph', {
        y: [[parsedData.y1], [parsedData.y2]],
        x: [[parsedData.x], [parsedData.x]]
    }, [0, 1])
    }
};

function endPlot() {
    lock = 1;

    var update = {
        'xaxis.range': [0, parsedData.x],
        'yaxis.range': [-2,2]
    };
    Plotly.relayout('graph', update)
}
function toggleTrace(data_index, cb) {

    Plotly.restyle("graph", 'visible', cb.checked, data_index);
}