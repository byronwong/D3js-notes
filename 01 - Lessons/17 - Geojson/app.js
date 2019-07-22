// NOTES: GeoJson Features property
// We can use the properties key to store information not related to the path
let width = 600;
let height = 600;

d3.json('./sample_geo.json', function(error,data){
    if(error) {
        throw error;
    }

    let path = d3.geoPath(); // d3 geo helper Fn
    console.log(data);

    // debugger

    d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .selectAll('path')  
            .data(data.features)
            .enter()
                .append('path')
                    .attr('d', path)
                    .attr('fill', d => d.properties.color);

})