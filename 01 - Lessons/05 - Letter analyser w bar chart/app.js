// Code here!

let inputBox = d3.select('input');
let svg = d3.select('svg');
let previousValue = '';

d3.select('form')
  .on('submit', function(){
    event.preventDefault();

    let height = 300;
    let width = 800;

    svg
      .style('width', width)
      .style('height', height);

    let inputValue = inputBox.property('value');

    let combinedValue = previousValue + inputValue;
    previousValue = inputValue;

    // returns an array
    let results = freqCounter(combinedValue);

    // do charting here
    let dataLength = results.length;
    let barPadding = 20;
    let barWidth = width / dataLength - barPadding;

    // update data model
    let existingGElements = svg
      .selectAll('g')
        .data(results, (d,i) => d.character);

    // remove elements in the exit selection
    existingGElements
      .exit()
      .remove();

    // for new items create a g element
    let enterGElements = existingGElements
      .enter()
      .append('g')
        .classed('new letter', true);

    // for all the enter elements append a rect and text element (nested)
    enterGElements
      .append('rect');

    enterGElements
      .append('text');

    // for existing element remove 'new' class
    existingGElements
      .classed('new', false);

    // get enter and existing and apply x, y, height and width attr's to rects
    enterGElements.merge(existingGElements)
      .select('rect')
      .attr('height',(d,i) => (height / dataLength) * d.count)
      .attr('width', barWidth)
      .attr('y', (d,i) => height - ((height / dataLength) * d.count))
      .attr('x', (d,i) => {return (barWidth + barPadding) * i});

    // get text nodes in both enter and existing and add character and set position
    enterGElements.merge(existingGElements)
      .select('text')
        .text(function(d,i) {
          return d.character;
        })
        .attr('y', (d,i) => height - ((height / dataLength) * d.count) - 20)
        .attr('x', (d,i) => {return (barWidth + barPadding) * i + ( barWidth / 2)});

  });




d3.select('#reset')
  .on('click', function(){
    event.preventDefault();
    console.log('reset button clicked');
    inputBox.property('value', '');
    console.log('input values:', inputBox.property('value'));
    freqCounter(inputBox.property('value'));

    d3.select('#phrase').text('');
    d3.select('#count').text('');
  });


// Frequency Counter Fn
let freqCounter = function(textInput) {

  let data = [...textInput].reduce(function (allChar, char) {
    (char in allChar) ? allChar[char]++ : allChar[char] = 1;
    return allChar;
  }, {});

  // process the object (data) into an array
  return Object.keys(data).map((char) => {
    return {
      character: char,
      count: data[char]
    };
  });



  // let chartArea = d3.select('#letters');
  // let height = 300;
  // let width = 800;

  // let barPadding = 20;
  // let dataLength = results.length

  // let barWidth = width / dataLength - barPadding;

  // chartArea
  //   .attr('width', width)
  //   .attr('height', height);

  // let boundData = chartArea.selectAll('g')
  //   .data(results)
  //   .exit()
  //   .remove();;


  // // returns a selection of group elements
  // let groupSelection = boundData
  //   .enter()
  //   .append('g')
  //     .classed('new letter', true);


  // // append a rect to each group element in this selection
  // groupSelection
  //   .merge(groupSelection)
  //   .append('rect')
  //     .attr('height',(d,i) => (height / dataLength) * d.count)
  //     .attr('y', (d,i) => height - ((height / dataLength) * d.count))
  //     .attr('width', barWidth)
  //     .attr('x', (d,i) => {return (barWidth + barPadding) * i});


  // groupSelection
  //   .merge(groupSelection)
  //   .append('text')
  //     .attr('x', function(d,i) {
  //       return (barWidth + barPadding) * i + barWidth / 2;
  //     })
  //     .attr('text-anchor', 'middle')
  //     .attr('y', (d,i) => height - ((height / dataLength) * d.count) - 10)
  //     .text(function(d,i) {
  //       return d.character;
  //     });


  // TODO: Note Bar width changes on the second input, make constant


  // console.log('data', data);
  // console.log('results:', results);
};






