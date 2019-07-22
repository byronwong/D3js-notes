var width = 600;
var height = 600;

var nodes = [
  { color: "red", size: 5, },
  { color: "orange", size: 10 },
  { color: "yellow", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

// both source and target keys are requires for FDG
var links = [
  { source: "red", target: "orange"},
  { source: "orange", target: "yellow"},
  { source: "yellow", target: "green"},
  { source: "green", target: "blue"},
  { source: "blue", target: "purple"},
  { source: "purple", target: "red"},
  { source: "green", target: "red"}
];

var svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

var linkSelection = svg
  .selectAll('line')
  .data(links)
  .enter()
  .append('line')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

var nodeSelection = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
    .attr("r", d => d.size)
    .attr("fill", d => d.color);


var simulation = d3.forceSimulation(nodes);

// Link force
// force link assumes by defaults that the links will be the indices eg. nodes[0]
// force links expects an object with {source: 0, target 1}
// however, in this case source is 'red', thus we need to provide a id
simulation
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("nodes", d3.forceManyBody())
  .force('links', d3.forceLink(links)
    .id(d => d.color)
    .distance(d => 5 * d.source.size + d.target.size) // as we can access the source and target objects we can create more complex relationship with distance
  )
  .on('tick', ticked);
         
function ticked() {
  nodeSelection
    .attr("cx", d => d.x )
    .attr("cy", d => d.y );

  linkSelection
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
}