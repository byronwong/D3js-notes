# Data joins and update
D3 is all about data and so how you process that data is half of the battle.
Bellow are some snippets for data processing, still check your github.
(github)[https://github.com/byronwong/Snippet-ReduceOneOfEach]


## Creating a data join 
(D3 in depth)[https://www.d3indepth.com/datajoins/]
This tells D3 that this data belongs to these elements.
```js
  let mySelection = d3.selectAll('li')
    .data(myData); // this create sets up the initial join 
    // NOTE: nothing is added to the DOM here
```

#### adding data
```js
  let mySelection = d3.selectAll('li')
    .data(myData); // this create sets up the initial join 
    .enter() // selects items from the data to be added
    .append() // adds the items to the DOM
```


#### removing items 
```js
  let mySelection = d3.selectAll('li')
    .data(myData); // this create sets up the initial join 
    .exit() // selects items from the data to be removed
    .remove() // removed the items from the DOM

    // NOTE: D3 removed the difference in DOM elements but did not 
    // update the content in the elements
    // if we did:

    d3.selectAll('li').data();
    // we would get the correct data points

    // when we did:
    d3.selectAll('li').data(noRQuotes);
    // we were binding the data we were matching by index number (default)
    
    // however if we did:
    d3.selectAll('li').data(noRQuotes, item => item.quotes);
    // here we added a key function to tell d3 the matching criteria is 'quotes'

```

#### General update pattern

[Resource in depth](https://d3indepth.com/enterexit/)

1. Grab update selection 
  - make any changes to selection 
  - store selection

2. Grab exit selection
  - remove unwanted elements

3. Grab enter selection 
  - make any changes

4. Merge enter and update selection 
  - make changes to share selections

```js 
    // example:
    // NOTE: chart = the selection of all arcs in .chart
    let chart = d3.select('.chart')
        .selectAll('.arc')
        .data(arcs);

    chart
        .exit()
        .remove();

    chart
    .enter() // add anthing to initial states of objects entering 
    .append('path')
        .classed('arc', true)
        .merge(chart) // merge gets all existing and current and performs the following updates
        .attr('fill', d => colorScale(d.data.continent))
        .attr('stroke', 'black')
        .attr('d', path);
```
