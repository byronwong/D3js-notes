import './style.css';
// import * as d3 from "d3";

let quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

function component() {

  let element = document.createElement('div');

  console.log(quotes);

  let colors = {
    "G": "#3cffee",
    "PG": "#f9ff00",
    "PG-13": "#ff9000",
    "R": "#ff0000"
  };

  d3.select('#quotes')
          .style('list-style', 'none')
      .selectAll('li') // initiall there are no 'li' but D3 still reutrns a selection with no nodes
      .data(quotes) // tell D3 what the data is
      .enter() // create a D3 selection of enter nodes containing data objects
      .append('li')
        .text(function(d){ // refer to callback notes (this is a common pattern in D3)
          // note: d is a quote object, so d.quote will return the text
          return d.quote + ' - ' + d.movie;
        })
        .style('background-color', d => colors[d.rating]);

  return element;
}

document.body.appendChild(component());

