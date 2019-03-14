// write your code here!
let chart;
let data;
let lastResults='';

// Update phrase
let updatePhrase = function(phrase){
  console.log('phrase content', phrase);

  d3.select('#phrase').text(`current phrase: ${phrase}`);
};

// convert the input string into a data array
let frequencyCounter = function(newText) {
  let results = {};
  let inputText = lastResults + newText;

  updatePhrase(inputText);

  for (let i of inputText) {
    if (!results[i]){
      results[i]= {
        letter: i,
        count: 1};
    } else {
      results[i].count +=1;
    }
  }

  lastResults = newText;

  return Object.keys(results).map(key => {
    return results[key];
  });
};


// create and sizes each box of the cart
let chartFrequency = function(inputResults) {

  // general pattern
  // update
  chart = d3.select('#letters')
    .selectAll('div')
    .data(inputResults, i => i.letter)
    .style('color', '#333333');

  // exit
  chart.exit()
    .remove();

  // enter
  chart.enter()
      .append('div')
      .text(i => i.letter)
      .style('background-color', '#ffc100')
      .style('width', '40px')
      .style('color', 'white')
      .style('height',i => `${i.count * 40}px`);

  // merge
    // .merge(chart)
    //   .style('height',i => `${i.count * 40}px`);
};


// start button
let startBtn = d3.select('#start');

startBtn.on('click', () => {
  event.preventDefault(); // uses d3.event vs js event

  let inputBox = d3.select('#inputBox');
  let results = frequencyCounter(inputBox.property('value'));
  chartFrequency(results);

  // clear input box
  inputBox.property('value', '');
});


// Reset button
let resetBtn = d3.select('#reset');

resetBtn.on('click', () => {
  event.preventDefault();
  lastResults = '';
  let results = frequencyCounter(lastResults);
  chartFrequency(results);
});
