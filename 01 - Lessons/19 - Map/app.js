d3.queue()
  .defer(d3.json, '//unpkg.com/world-atlas@1.1.4/world/50m.json')
  .defer(d3.csv, './country_data.csv', function(row) {
    return {
      country: row.country,
      countryCode: row.countryCode,
      population: +row.population,
      medianAge: +row.medianAge,
      fertilityRate: +row.fertilityRate,
      populationDensity: +row.population / +row.landArea
    }
  })
  .await(function(error, mapData, populationData) {
    if (error) throw error;

    // get geojson data from topo, note: .feature is called here
    var geoData = topojson.feature(mapData, mapData.objects.countries).features;

    // could find a better Fn to match up entries from CSV stats and geojson
    populationData.forEach(row => {
      var countries = geoData.filter(d => d.id === row.countryCode); // creates a new array returning matched geodata
      countries.forEach(country => country.properties = row); // array of 1 object binds csv row to properties of geojson
    });

    // debugger // geodata now contains csv data in properties key in geojson

    var width = 960;
    var height = 600;

    // map comes out upside down to correct this we use projections
    // Projections allow us to take shperical data to 2D
    // https://github.com/d3/d3-geo/blob/master/README.md#projections
    // define projection manipulation and then append to path Fn
    var projection = d3.geoMercator()
                       .scale(125)
                       .translate([width / 2, height / 1.4]);

    var path = d3.geoPath()
                 .projection(projection);

    d3.select("svg")
        .attr("width", width)
        .attr("height", height)
      .selectAll(".country")
      .data(geoData)
      .enter()
        .append("path")
        .classed("country", true)
        .attr("d", path);

    // get select input 
    var select = d3.select("select");

    select
      .on("change", () => setColor(d3.event.target.value)); // callback Fn required to access d3.event

    // Call setColor once to initiate the first chart
    setColor(select.property("value"));

    // Fn definition
    function setColor(val) {

      // NOTE: val is the key of value pair
      var colorRanges = {
        population: ["white", "purple"],
        populationDensity: ["white", "red"],
        medianAge: ["white", "black"],
        fertilityRate: ["black", "orange"]
      };

      var scale = d3.scaleLinear()
        .domain([0, d3.max(populationData, d => d[val])])
        .range(colorRanges[val]);

      // add/update fill to each country 
      d3.selectAll(".country")
          .transition()
          .duration(750)
          .ease(d3.easeBackIn)
          .attr("fill", d => {
            var data = d.properties[val];
            return data ? scale(data) : "#ccc"; // IF no data make light grey
          });
    }
  });

















