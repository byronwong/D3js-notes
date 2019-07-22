
// Set graph dimentions
var width = 500;
var height = 500;
var padding = 30; //padding so that our dots don't go off canvas

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


// Axis
// see css for gridline styling
var xAxis = d3.axisBottom(scaleX) // returns a function
  .tickSize( - height + (2*padding)) // to get gridlines we can extend the ticks. Negative number as we want the ticks to protrude backwards
  .tickSizeOuter(0);

var yAxis = d3.axisLeft(scaleY)
  .tickSize( - width + (2*padding))
  .tickSizeOuter(0); // adjust the outer ticks seperatly

d3.select('svg')
  .append('g')
  .attr('transform', 'translate(' + padding + ', 0 )')
  .call(yAxis);

d3.select('svg')
  .append('g')
  .attr('transform', 'translate(0, ' + (height - padding) + ')')
  .call(xAxis); // we need to call the axis function we created


// Draw chart
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


// Adding labels
// there are no built in ways to do this, just plain old d3 core

// Title
d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', padding)
    .style('text-anchor', 'middle')
    .style('font-size', '1.5em')
    .text('Births by Country');


// X label
d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding)
    .attr('dy', '1.5em') // use dy to shift the lable (optional)
    .style('text-anchor', 'middle') // used this to center the text
    .text('Births per Capita');


// Y label
d3.select('svg')
  .append('text')
    .attr('transform', 'rotate(-90)')
    .style('text-anchor', 'middle')
    .attr('x', - height / 2)
    .attr('y', padding)
    .attr('dy', '-1.20em')
    .text('Life Expectancy');
