// we'll write this code together
let width = 600;
let height = 600;

let barPadding = 1;

// key questions: 
// how many bins will you have?
// how many items will be in those bins?

let minYear = d3.min(birthData, d => d.year);
let yearData = birthData.filter(d => d.year === minYear); // filtered dataset by min year

let xScale = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.births)])
    .rangeRound([0, width]);

// d3.histogram returns a function that takes an array 
let histogram = d3.histogram()
    .domain(xScale.domain()) // define the range of values you want the generator to use to create bins
    .thresholds(xScale.ticks()) // define the ranges of the bins
    .value(d => d.births); // set what you want the histogram to be about

let bins = histogram(yearData); // pass data into returned histogram function.

let barWidth = width / bins.length - barPadding;

let yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height, 0]); // returns 2

// NOTE: data bound to group element
let bars = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('.bar')
        .data(bins)
        .enter()
        .append('g')
            .classed('bar', true);

bars.append('rect')
    .attr('x', (d,i) => xScale(d.x0))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - yScale(d.length))
    .attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
    .attr('fill', '#9c27b0');
    

bars.append('text')
    .attr('x', 10)
    .attr('transform-origin', 'center')
    .attr('transform', 'rotate(-90)')
    .attr('y', d => xScale(d.x0) + (xScale(d.x1 - d.x0) / 2))
    .text(d => `${d.x0} - ${d.x1}`)
    .style('alignment-baseline', 'middle');


console.log(bins);

// TODO: add text labels to complete this chart