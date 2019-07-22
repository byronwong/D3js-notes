// GeoJSON continued...
// Add <script src="https://unpkg.com/topojson@3"></script>
d3.json('./sample_topo.json', function(error, data) {
  if (error) throw error;

  // debugger // to look at data object 


  var path = d3.geoPath();
  var width = 600;
  var height = 600;

  // rather than calling data.features at data bind we call the topojson.feature([data], pathToFeatures)

  d3.select('svg')
      .attr('width', width)
      .attr('height', height)
    .selectAll('path')
    .data(topojson.feature(data, data.objects.collection).features)
    .enter()
    .append('path')
      .attr('d', path)
      .attr('fill', d => d.properties.color);
      
});