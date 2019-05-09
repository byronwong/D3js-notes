This is a basic starter-kit that runs a simple express server. Ideally for sandbox and very early prototypes.

## Getting started
- `npm i`
- `npm start` - NOTE: we are using `nodemon` to reset the serve on change.
- `npm-run-all --parallel task1 task2` - runs tasks in parallel
- `-s ` - run in silent mode
- Add your `.env file`

## Things to do
- remove nodemon and webpack hot loader and opn modules now refresh page
- setup sass compiling

## What's in this project 
> Note: Using webpack dev server for now, however express js is still here for further development with webpack-dev-middleware. Change NPM start script!

## D3 Resources
[d3 indepth](https://d3indepth.com/)
[API](https://github.com/d3/d3/blob/master/API.md)

### Selection

[Selection](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection)
> Note: selections return an selection object for chaining and keeping current context
`d3.select([css-selector])` - returns one 
`d3.selectAll([css-selector])` - returns all matching


[Returning results](https://github.com/d3/d3/blob/master/API.md#control-flow)
`d3.selectAll([css-selector]).node()` - returns the html element
`d3.selectAll([css-selector]).nodes()` - returns all matching elements (object)
To access nodes use the `nodes` method not `_groups` NOTE: underscore!


[navigating hierarchies](https://github.com/d3/d3/blob/master/API.md#hierarchies-d3-hierarchy)

Callbacks
D3 allows us to set callbacks to programatically determine what happens to each node
```js
  d3.selectAll('.someClass')
    .style("background-color", function(d, i) {
      // d is the current data object
      // i = index (always second parameter)
      return i % 2 === 0 ? 'light-grey' : 'white';
    });
```
> Note: as mentioned before the selector returns a selection so if we call select again passing in an argument we would be selecting within our current selection.

> Indentations 
  - 2 sp (1 tab) for selections
  - 4 sp (2 tabs)for working on that selection 


### Events

[Handling Events](https://github.com/d3/d3/blob/master/API.md#handling-events)

`d3.event.preventDefault()` - use this instead of native version [api notes](https://github.com/d3/d3-selection/blob/master/README.md#event)

Removing events 
`.on('event name', null)` - use on method again with null to remove an event

#### Working with input boxes
we can access the value of an input box in two ways 

```js
// 1 - value property
d3.select('input').property('value')

// 2 - event.target.value
let inputBox = d3.select('#inputBox');
inputBox.on('input', function(){
  // note event is the d3.event object
  let val = event.target.value;
})

// 3
// if using a form can target the on 'submit' event  

```




### Data joins and update

#### Creating a data join 
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


#### Extrema and Scales
(Scales)[https://d3indepth.com/scales/]
```js

d3.max([arry]) // returns the largest number in the set

d3.min([arry]) // returns the smallest number in the set

var arry = [{prop1: 'A', prop2: 3}. {...}, {...}]

d3.max(arry, d => {d.prop2}) // returns the largest of d.prop2

// OR 

d3.extent(data, callbackFn); // returns an array with min and max
// returns [min, max] array

// example 
d3.scaleLinear()
  .domain(d3.extent(people, d => d.age)) // here we return the array with the values
  .range(height, 0);




```
### Filtering data for null 
```js 
// create a function that takes an array of objects and creates a new array of objects
// this function filters out objects with kay value pairs of null
let data = regionData.filter(dataObject => {

    // keys I want to check null against
    let keys = [
      'subscribersPer100',
      'adultLiteracyRate',
      'urbanPopulationRate',
      'extremePovertyRate'
    ];

    // test for null in object
    return keys.every(key => {
      return dataObject[key] !== null;
    });
  }
);

```
Alternative solution

```js 
data.filter(d => {
  let keys = [
    'subscribersPer100',
    'adultLiteracyRate',
    'urbanPopulationRate',
    'extremePovertyRate'
  ];

  // keys to test for null
  for(var i; i < keys.length; i++) {
    if(d[keys][i]=== null) { return false;}
    return true;
  }

});
```


