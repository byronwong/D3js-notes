// write your code here!
let width = 500;
let height = 500;
let padding = 30;

// DATA var = regionData

// create a function that takes an array of objects and creates a new array of objects
// this function filters out objects with kay value pairs of null
let data = regionData.filter( dataObject => {

    // keys I want to check null against
    let keys = [
      'subscribersPer100',
      'adultLiteracyRate',
      'urbanPopulationRate',
      'extremePovertyRate'
    ];

    // test for null in object
    return keys.every(key => {
      return dataObject[key] !== null;
    });
  }
);

// scales
let scaleX = d3.scaleLinear()
  .domain(d3.extent(data, d => d.subscribersPer100))
  .range([padding, width - padding]);

let scaleY = d3.scaleLinear()
  .domain(d3.extent(data, d => d.adultLiteracyRate))
  .range([height - padding, padding]);

let scaleRadius = d3.scaleLinear()
  .domain(d3.extent(data, d => d.urbanPopulationRate))
  .range([2, 20]);

let scaleColor = d3.scaleLinear()
  .domain(d3.extent(data, d => d.extremePovertyRate))
  .range(['lightgreen', 'red']);


// Axis
let axisX = d3.axisBottom(scaleX)
  .tickSize(- height + (padding * 2))
  .tickSizeOuter(0);

d3.select('svg')
  .append('g')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(axisX);


let axisY = d3.axisLeft(scaleY)
  .tickSize(- width + (2 * padding))
  .tickSizeOuter(0);

d3.select('svg')
  .append('g')
  .attr('transform', `translate( ${padding}, 0)`)
  .call(axisY);


// Labels
d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', padding)
    .attr('dy', '-1rem')
    .style('text-anchor', 'middle')
    .style('font-size', '1rem')
    .text('Litteracy with subscribers');

// X label
d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding)
    .attr('dy', '1.5rem')
    .style('text-anchor', 'middle')
    .style('font-size', '1rem')
    .text('Number of subscribers');

// Y label
d3.select('svg')
  .append('text')
    .attr('transform', 'rotate(-90)')
    .style('text-anchor', 'middle')
    .attr('x', - height / 2)
    .attr('y', padding)
    .attr('dy', '-1.20em')
    .text('Literacy');



// Draw chart
d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
      .attr('cx', d => scaleX(d.subscribersPer100))
      .attr('cy', d => scaleY(d.adultLiteracyRate))
      .attr('r', d => scaleRadius(d.urbanPopulationRate))
      .attr('opacity', '0.5')
      .attr('fill', d => scaleColor(d.extremePovertyRate));
