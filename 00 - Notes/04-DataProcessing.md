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


