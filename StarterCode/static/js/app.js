function init() {
      // Grab reference to the dropdown select element
      var selector = d3.select("#selDataset");
      
      // Use list of sample names to populate select options
      d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
      
        // Use first sample from list to build initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
      }

// samples.json>
// got data for names, metadata, samples
// Demographic Info
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var results= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(results).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });  
    });
  }
 
  
  function buildCharts(sample) {
  
  // Use `d3.json` to get  sample data for the plots
  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var results= resultsarray[0]
  
    var ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = results.sample_values;

//   --------
 //Bar Chart
//   --------
    var bar_data =[
      {
        y:ids.slice(0, 10).map(OtuID => `OTU ${OtuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
  
      }
    ];
  
    var barLayout = {
      title: "Top Bacteria Found",
      margin: { t: 50, l: 150 }
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
  }
   
  function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();