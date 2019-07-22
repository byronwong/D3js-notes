// write your code here!
// plot median age
let height = 600;
let width = 600;
let padding = 50;

let barPadding = 1;

// Remember to filter out null results from your data set
let ageData = regionData.filter(d => d.medianAge !== null);

let updateBins = function(val) {

  let xScale = d3.scaleLinear()
  .domain(d3.extent(ageData, d => d.medianAge)) // use d3.extend here
  .rangeRound([padding, width - padding]);

  let histogram = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(val))
    .value(d => d.medianAge);

  let bins = histogram(ageData);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - (padding * 2), padding]);

  // update axis
  d3.select('.gridlineX')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(d3.axisBottom(xScale).ticks(val))
      .selectAll('text')
        .attr('x', -28)
        .attr('y', -4)
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(-90)');

  d3.select('.gridlinesY')
    .attr('transform', `translate( ${padding} , ${padding} )`)
    .call(d3.axisLeft(yScale));


  let bars = d3.select('svg')
    .selectAll('.bar')
    .data(bins);

    bars
      .exit()
      .remove();

    bars
      .enter()
      .append('rect')
      .classed('bar', true)
      .merge(bars)
        .attr('x', d => xScale(d.x0))
        .attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding) // used effective width to keep bars the same width
        .attr('y', d => yScale(d.length) + padding)
        .attr('height', d => height - (2 * padding) - yScale(d.length))
        .attr('fill', '#9c27b0');

  d3.select('.bin-count')
    .text(bins.length);
}

// Create chart bounds
d3.select('svg')
  .attr('width', width)
  .attr('height', height);

// create axis
d3.select('svg')
  .append('g')
    .classed('gridlineX', true);

d3.select('svg')
  .append('g')
    .classed('gridlinesY', true);


updateBins(16);

// Text labels
d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', padding)
    .style('text-anchor', 'middle')
    .style('font-size', '1.5em')
    .text('Median Age');


d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', height)
    .attr('text-anchor', 'middle')
    .attr('font-size', '0.8rem')
    .attr('transform', 'translate(0, -8)')
    .text('Median Age');


d3.select('svg')
  .append('text')
    .attr('x', height / 2)
    .attr('y', padding / 2 - 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', '0.8rem')
    .attr('transform-origin', 'center')
    .attr('transform', 'rotate(-90)')
    .text('Frequency');


d3.select('input')
  .on('input', function() {

    let binCount = +d3.event.target.value; // + converts string to number

    d3.select('.bin-count')
      .text(binCount);

    updateBins(binCount);

});

