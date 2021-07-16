console.log(cityGrowths);
var sortedCities = cityGrowths.sort((a,b) =>
a.population - b.population).reverse(); 

var topSevenCities = sortedCities.slice(0,7);

var topSevenCityNames = topSevenCities.map(city => city.City);
var topSevenCityPops = topSevenCities.map(city => parseInt(city.population));

var trace = {
    x: topSevenCityNames,
    y: topSevenCityPops,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Seven largest cities by population",
    xaxis: { title: "City" },
    yaxis: { title: "City Population"}
  };
  Plotly.newPlot("bar-plot", data, layout);