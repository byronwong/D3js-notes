let width = 600;
let height = 600;

let minYear = d3.min(birthData, d => d.year);
let maxYear = d3.max(birthData, d => d.year);

function updateYear(year) {
  d3.select('.year-text')
  .text(year);
}

function getDataByQuarter(yearData) {
  let quaterTallies = [0,1,2,3].map(n => ({quarter: n, births: 0}));
  yearData.forEach( (d, index) => {
    quaterTallies[(Math.floor(index / 3))].births += d.births;
  });

  return quaterTallies;
}

function createChart(year) {
  // TODO: create inner circle

  // get data for the year
  let yearData = birthData.filter(d => d.year === year);
  // console.log('year data:', yearData);

  // seems you can push and return on the same line
  // let months = yearData.reduce(function(accumulator, currentValue){
  //   // https://stackoverflow.com/questions/41890545/why-cant-i-return-the-result-of-pushing-to-the-accumulator-in-a-reduce-funct
  //   // note: push adds one to the array and then returns the length of the array, so by splitting this over two lines we can avoid this.
  //   accumulator.push(currentValue);
  //   return accumulator;
  // },[]);

  // map here works better than reduce
  let months = yearData.map(d => d.month); 

  let monthColorScale = d3.scaleOrdinal()
    .domain(months)
    .range(d3.schemeCategory20);


  // sorts by month not by births 
  let pieMonthData = d3.pie()
    .value(d => d.births)
    .sort((a,b) => {
      if(a.indexOf < b.indexOf ){
        return -1;
      }
      if (a.indexOf > b.indexOf){
        return 1;
      }
      return 0;
    })
    (yearData);

  // Outer arc generator
  let drawArcs = d3.arc()
    .outerRadius(width / 2 - 10)
    .innerRadius(width / 3)
    .padAngle(0.02);

  let chartOuter = d3.select('.chart-outer')
    .selectAll('.arc')
    .data(pieMonthData);

  chartOuter
    .exit()
    .remove();

  chartOuter
    .enter()
    .append('path')
      .classed('arc', true)
      .merge(chartOuter)
        .attr('fill', d => monthColorScale(d.data.month))
        .attr('stroke', 'white')
        .attr('d', drawArcs);

  // Inner chart
  let quarterData = getDataByQuarter(yearData);

  let quarterColorScale = d3.scaleOrdinal()
    .domain([0,1,2,3])
    .range(d3.schemeCategory10);

  // Inner arc generator
  let drawInnerArcs = d3.arc()
    .outerRadius(width / 3 - 10)
    .innerRadius(0)
    .padAngle(0.02);

  // Use pie helper
  let pieQuarter = d3.pie()
  .value(d => d.births)
  .sort((a,b) => a.quarter - b.quarter) // sort by quarter key
  (quarterData);


  let innerChart = d3.select('.chart-inner')
    .selectAll('.arc')
    .data(pieQuarter);

  innerChart
    .exit()
    .remove();

  innerChart
  .enter()
  .append('path')
    .classed('arc', true)
    .merge(innerChart)
      .attr('fill', d => quarterColorScale(d.indexOf))
      .attr('stroke', 'white')
      .attr('d', drawInnerArcs);
}


// initial setup
d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)
    .classed('chart-outer', true);


// create inner chart
d3.select('svg')
  .append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)
    .classed('chart-inner', true);


d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('step', '1')
  .property('value', minYear)
  .on('input', function(){
    updateYear( event.target.value);
    createChart(+event.target.value);
  });

updateYear(minYear);
createChart(minYear);
