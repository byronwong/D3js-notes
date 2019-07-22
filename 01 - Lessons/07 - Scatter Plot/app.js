
// Set graph dimentions
var width = 500;
var height = 500;
var padding = 20; //padding so that our dots dot go off canvas

//data --> birthData2011

var colorScale = d3.scaleLinear()
  .domain(d3.extent(birthData2011, d => d.population / d.area))
  .range(['lightgreen', 'red']);

var radiusScale = d3.scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births))
  .range([2,40])

var scaleY = d3.scaleLinear()
  .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
  .range([height - padding, padding]);

var scaleX = d3.scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births / d.population))
  .range([padding, width - padding]);

d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('circle')
    .data(birthData2011)
      .enter()
        .append('circle')
          .attr('cx', d => scaleX(d.births / d.population))
          .attr('cy', d => scaleY(d.lifeExpectancy))
          .attr('r', d => radiusScale(d.births))
          .attr('fill', d => colorScale(d.population / d.area));
