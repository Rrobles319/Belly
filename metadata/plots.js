d3.json("samples.json").then(function(data){
    console.log(data);
});

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(data.metadata[0]).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});