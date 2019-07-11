// // GET json file Async
// d3.json('./countries.json', function(error, data) {
//     if(error) { throw error }
//     console.log('data', data);
// });

// // GET csv file Async
// // as d3 does not understand data types you can pass in another callback to convert these
// // d3.csv(url, callback)
// // d3.csv(url, formatter, callback)
// d3.csv('./simplemaps-worldcities-basic.csv', 
//     function(row, i, headers) {
//         // IF population is less than 10000 remove row from final set
//         if(+row.pop < 10000) return 

//         return {
//             cityName: row.city,
//             countryCode: row.iso2, 
//             population: +row.pop
//         }
//     },
//     function(error, data) {
//         if(error) { throw error }
//         console.log('data', data);
//     }
// );


// re-coded version
d3.queue()
    .defer(d3.json, './countries.json')
    .defer(d3.csv, './simplemaps-worldcities-basic.csv', function(row, i, headers) {
        // IF population is less than 10000 remove row from final set
        if(+row.pop < 10000) return 

        return {
            cityName: row.city,
            countryCode: row.iso2, 
            population: +row.pop
        }}
    )
    // could use awaitAll where countries and cities would be returned in an array
    // e.g. awaitAll(function(error, allData)) countries = allData[0] and cities = allData[1]
    .await(function(error, countries, cities) {
        if(error) {throw error}

        console.log('countries', countries);
        console.log('cities', cities);

        // merge data
        let data = countries.geonames.map(
            country => {
                country.cities = cities.filter(city => city.countryCode === country.countryCode);
                return country;
            }
        );

        console.log('data',data)

    });