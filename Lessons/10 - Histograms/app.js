// we'll write this code together
let width = 600;
let height = 600;

let barPadding = 1;
let padding = 20;

// key questions: 
// how many bins will you have?
// how many items will be in those bins?

let minYear = d3.min(birthData, d => d.year);
let maxYear = d3.max(birthData, d => d.year);
let yearData = birthData.filter(d => d.year === minYear); // filtered dataset by min year

let xScale = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.births)])
    .rangeRound([padding, width - padding]);

// d3.histogram returns a function that takes an array 
let histogram = d3.histogram()
    .domain(xScale.domain()) // define the range of values you want the generator to use to create bins
    .thresholds(xScale.ticks()) // define the ranges of the bins
    .value(d => d.births); // set what you want the histogram to be about

let bins = histogram(yearData); // pass data into returned histogram function.

// let barWidth = width / bins.length - barPadding;

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
    .attr('y', d => xScale(d.x0) + (xScale(d.x1 - d.x0 / 2)))
    .text(d => `${d.x0} - ${d.x1}`)
    .style('alignment-baseline', 'middle');


// console.log(xScale.ticks());

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear)
    .on('input', function(){
        let year = +d3.event.target.value;

        yearData = birthData.filter(d => d.year === year);
        
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(yearData, d => d.births)])
            .rangeRound([padding, width - padding]);

        // d3.histogram returns a function that takes an array 
        let histogram = d3.histogram()
            .domain(xScale.domain()) // define the range of values you want the generator to use to create bins
            .thresholds(xScale.ticks()) // define the ranges of the bins
            .value(d => d.births); // set what you want the histogram to be about

        let bins = histogram(yearData); // pass data into returned histogram function.

        yScale.domain([0, d3.max(bins, d => d.length)]);

        bars = d3.select('svg')
            .selectAll('.bar')
            .data(bins);

        bars.exit()
            .remove();

        let g = bars.enter() // as we will have to call the group twice to append the rect and the text, we can store a variable
            .append('g')
                .classed('bar', true);

        g.append('rect');
        g.append('text');

        g.merge(bars) // remember merge on the enter slection with the current selection
            .select('rect')
                .attr('x', (d,i) => xScale(d.x0))
                .attr('y', d => yScale(d.length))
                .attr('height', d => height - yScale(d.length))
                .attr('width', d => {
                    let width = xScale(d.x1) - xScale(d.x0);
                    return width; //< 0 ? 0 : width;
                })
                .attr('fill', '#9c27b0');
    
        g.merge(bars)
            .select('text')
                .attr('x', 10)
                .attr('transform-origin', 'center')
                .attr('transform', 'rotate(-90)')
                .attr('y', d => xScale(d.x0) + (xScale(d.x1 - d.x0) / 2))
                .text(d => `${d.x0} - ${d.x1}`)
                .style('alignment-baseline', 'middle');

    })
