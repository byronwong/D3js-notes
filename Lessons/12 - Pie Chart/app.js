var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;

// create a helper function to prevent duplication of creating the chart
// this function takes a year to create a chart
let createChart = function(year) {

  // given a year create a dataset
  var yearData = birthData.filter(d => d.year === year);

  // an array of continents
  let continents = birthData.reduce((accumulator, currentVal) => {
    if(accumulator.indexOf(currentVal.continent) === -1){
      accumulator.push(currentVal.continent);
    }
    return accumulator;
  }, []);

  let colorScale = d3.scaleOrdinal()
  .domain(continents)
  .range(d3.schemeCategory10);

  // note angles are in radians which are 2x pie 640 deg in a circle
  let arcs = d3.pie()
    .value(d => d.births)
    .sort(function(a,b){
      if (a.continent < b.continent) {
        return -1;
      } else if (a.continent > b.continent) {
        return 1;
      }
      else return a.births - b.births;
    })
      (yearData);

  // console.log(arcs);

  // common attributes you want for alll cals
  // inner radius creates a donnut pie chart
  let path = d3.arc()
  .outerRadius(width / 2 - 10)
  .innerRadius(width / 4)
  .padAngle(0.02)
  .cornerRadius(20);


  let chart = d3.select('.chart')
  .selectAll('.arc')
  .data(arcs);

  chart
    .exit()
    .remove();

  chart
  .enter()
  .append('path')
    .classed('arc', true)
    .merge(chart)
      .attr('fill', d => colorScale(d.data.continent))
      .attr('stroke', 'black')
      .attr('d', path);
};


d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('value', minYear)
  .on('input', function(){
    createChart(+ d3.event.target.value);
  });


// centering the pie chart
// pie charts need to be in a group element
d3.select('svg')
  .attr('width', width)
  .attr('height', height)
    .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`)
      .classed('chart', true);

createChart(minYear);
