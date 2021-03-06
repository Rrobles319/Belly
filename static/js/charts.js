function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      // samples.map(values => parseInt(values.sample_values));
      // var sampleValues = samples.map(values => parseInt(values.sample_values));
      // console.log(sampleValues);
      // // samples.map(values => parseInt(values.otu_ids)); 
      // var otuIds = samples.map(values => parseInt(values.otu_ids));
      // console.log(otuIds); 
      // //samples.map(values => (values.otu_labels))
      // var otuLabels = samples.map(values => (values.otu_ids));
      // console.log(otuLabels);
      var sampleValues = result.sample_values;
      console.log(sampleValues);
      // samples.map(values => parseInt(values.otu_ids)); 
      var otuIds = result.otu_ids;
      console.log(otuIds); 
      //samples.map(values => (values.otu_labels))
      var otuLabels = result.otu_labels;
      console.log(otuLabels);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //Chain the slice() method with the map() and reverse() functions to retrieve the top 10 otu_ids sorted in descending order.
      //var sortedIds = otuIds.slice(0-10).map((a,b) =>
      //a - b).reverse();
      var yticks = otuIds.slice(0,10).map(otuid => `OTU ${otuid}`).reverse();
      console.log(yticks);
    // 8. Create the trace for the bar chart. 
      var barData = {
        x: sampleValues.slice(0,10).reverse(),
        y: yticks,
        type: 'bar',
        orientation: 'h'
    };

    //var data = [trace];
  //var layout = {
    //title: "Seven largest cities by population",
    //xaxis: { title: "City" },
    //yaxis: { title: "City Population"}
  //Plotly.newPlot("bar-plot", data, layout);
    // 9. Create the layout for the bar chart. 
    var data = [barData];
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      //xaxis: { title: "City" },
      //yaxis: { title: "City Population"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, barLayout);
    // var trace1 = {
    //   x: [1, 2, 3, 4],
    //   y: [10, 11, 12, 13],
    //   text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    //   mode: 'markers',
    // 1. Create the trace for the bubble chart.
    var bubbleData = [ {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues
      }
    }];
    // title: 'Bubble Chart Hover Text',
    // showlegend: false,
    // height: 600,
    // width: 600
    // 2. Create the layout for the bubble chart
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: "OTU ID"},
      showlegend: false,
      //hovermode: closest,
      height: 500,
      width: 800
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot(); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = [
   
//     ];

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
      
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot(); 
//   });
// }

