### Events
D3 can also allow you to register events to DOM elements
[Handling Events](https://github.com/d3/d3/blob/master/API.md#handling-events)

## Prevent Default
`d3.event.preventDefault()` - use this instead of native version [api notes](https://github.com/d3/d3-selection/blob/master/README.md#event)

## Creating Events
```js
    // Example:
    d3.select('.someClass').on('eventType', function callback(){
        // something to happen
    })
```

## The event object
In the callbck function of event creation D3 provides its own version of event.
You can access this via 'event' object which is automatically present.
```js
    inputBox.on('input', function(){
        // note event is the d3.event object
        let val = event.target.value;
    })
```

## Removing Events
`.on('event name', null)` - use on method again with null to remove an event


## Working with input boxes
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
