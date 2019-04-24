var minYear = d3.min(birthData, d => d.year); // see d3.extent to minimise duplication
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;
var barPadding = 10;
var numBars = 12;
var barWidth = width / numBars - barPadding;
var maxBirths = d3.max(birthData, d => d.births);

var yScale = d3.scaleLinear()
                .domain([0, maxBirths])
                .range([0, height]); // you can flip this to plot along the bottom

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear);

  // initial load
d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter(function(d) {
    return d.year === minYear; // Initial setup returns each values for each month for that year
  }))
  .enter()
  .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d) {
      return yScale(d.births);
    })
    .attr("y", function(d) {
      return height - yScale(d.births);
    })
    .attr("x", function(d,i) {
      return (barWidth + barPadding) * i;
    })
    .attr("fill", "purple");

// on imput change
d3.select("input")
    .on("input", function() {

      var year = +d3.event.target.value; // NOTE: Implicit type coersion

      d3.selectAll('rect')
        .data(birthData.filter(function(d) {
          return d.year === year;
        }))
          .attr("height", function(d) {
            return yScale(d.births);
          })
          .attr("y", function(d) {
            return height - yScale(d.births);
          });
    });
