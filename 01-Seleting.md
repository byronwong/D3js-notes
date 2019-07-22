# Selection
D3 can select DOM elements, and it done in a jQuery fashion.

Use `d3.select`.

## Types of select
[Selection](https://github.com/d3/d3/blob/master/API.md#selections-d3-selection)
> Note: selections return an selection object for chaining and keeping current context
`d3.select([css-selector])` - returns one 
`d3.selectAll([css-selector])` - returns all matching


[Returning results](https://github.com/d3/d3/blob/master/API.md#control-flow)
> NOTE: there is a difference in here node will return the HTML element, whereas d3.select will return you a D3 results object, containg the DOM object.
`d3.selectAll([css-selector]).node()` - returns the html element
`d3.selectAll([css-selector]).nodes()` - returns all matching elements (object)
To access nodes use the `nodes` method not `_groups` NOTE: underscore!
```js 
    // Example
    d3.select('.opt').node(); // returns: <li class="opt">1</li>
```

[navigating hierarchies](https://github.com/d3/d3/blob/master/API.md#hierarchies-d3-hierarchy)

## Callbacks
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