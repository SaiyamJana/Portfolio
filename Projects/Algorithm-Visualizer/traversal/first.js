const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let nodes = [];
let edges = [];
let nodeId = 1;

// Helper to draw the graph
function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw edges
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2;
  edges.forEach(e => {
    const from = nodes.find(n => n.id === e.from);
    const to = nodes.find(n => n.id === e.to);
    if (from && to) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  });

  // Draw nodes
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = n.color || "skyblue";
    ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fillText(n.id, n.x - 5, n.y + 5);
  });
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  nodes.push({ id: nodeId++, x, y });
  drawGraph();
});

let selectedNode = null;

function getClickedNode(x, y) {
  return nodes.find(n => Math.hypot(n.x - x, n.y - y) < 20);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clicked = getClickedNode(x, y);
  if (addingEdge && clicked) {
    if (!selectedNode) {
      selectedNode = clicked;
      clicked.color = "orange";
    } else {
      edges.push({ from: selectedNode.id, to: clicked.id });
      selectedNode.color = "skyblue";
      selectedNode = null;
      addingEdge = false;
    }
    drawGraph();
  } else if (!addingEdge) {
    nodes.push({ id: nodeId++, x, y });
    drawGraph();
  }
});

let addingEdge = false;
function addEdge() {
  addingEdge = true;
}
