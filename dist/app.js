let width = 600;
let height = 600;

let minYear = d3.min(birthData, d => d.year);
let maxYear = d3.max(birthData, d => d.year);

function updateYear(year) {
  d3.select('.year-text')
  .text(year);
}

function createChart(year) {

  // get data for the year
  let yearData = birthData.filter(d => d.year === year);
  console.log(yearData);

  // create color scale for each month
  // requires an array of each month

}


// initial setup
d3.select('svg')
  .attr('width', width)
  .attr('height', height);

updateYear(minYear);
createChart(minYear);

d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('step', '1')
  .property('value', minYear)
  .on('input', function(){
    updateYear(event.target.value);
  });
