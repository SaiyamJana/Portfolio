//cytoscape.js graph visualization for BFS algorithm
//taking all the inputs from bfs.html and bfs.css
const runBtn = document.getElementById('runBfs');
const addNodeBtn = document.getElementById('addNodeBtn');
const addEdgeBtn = document.getElementById('addEdgeBtn');

//cytoscape initialization
const cy = cytoscape({
    container : document.getElementById('vizCanvas'),
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#0074D9',
                'label': 'data(id)',
                'color': '#fff',
                'text-valign': 'center',
                'text-halign': 'center',
                'width': '40px',
                'height': '40px',
                'font-size': '12px',
                'border-width': 2,
                'border-color': '#fff'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
                
        }
    ]
})