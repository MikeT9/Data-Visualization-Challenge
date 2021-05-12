const file = "samples.json";

// Promise Pending
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

// dropdown menu
function createDropMenu(names) {
    // Use D3 to select the elements
    var dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    names.forEach(function (nameId) {
        // Assign the value of the dropdown menu option to a variable
        dropdownMenu.append("option").text(nameId)
            .property("value", nameId)
        
    });
}

function optionChanged(value) {
    // console.log(rawData);
    // console.log(value);
    metaData(value);
    createHorPlot(value);
};


// build function to create the metadata panel
function metaData(id) {
    var demInfo = d3.select("#sample-metadata");
    var metadata = rawData.metadata;
    demInfo.html("");
    metaId = metadata.filter(mdata => mdata.id == id)[0];
    // console.log(metaId);
    Object.entries(metaId).forEach(([key, value]) => {
        demInfo.append("h4").text(`${key}: ${value}`);
    });
};

// build horizontal plot function
function createHorPlot(id) {
    var sBar = d3.select("#bar");
    var sampleData = rawData.samples;
    sBar.html("");

    patientId = sampleData.filter(sdata => sdata.id == id)[0];


    console.log(patientId.id);
    // console.log(patientId.otu_ids);
    // console.log(patientId.sample_values);
    // console.log(patientId.otu_labels);

    // Slice the first 10 objects for plotting

    slicedOids = patientId.otu_ids.slice(0, 10);
    slicedSval = patientId.sample_values.slice(0, 10);
    slicedOlab = patientId.otu_labels.slice(0, 10);

    // Reverse the array to accommodate Plotly's defaults
    
    reversedOids = slicedOids.reverse();
    reversedSval = slicedSval.reverse();
    reversedOlab = slicedOlab.reverse();
    
    console.log(reversedOids);
    console.log(reversedSval);
    console.log(reversedOlab);

    // Trace1 for the Patient Data
    var trace1 = {
      x: reversedSval,
      y: `OTU ${reversedOids}`,
      text: reversedOlab,
      name: "Samples",
      type: "bar",
      orientation: "h"
    };

    // bar data
    var barData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 bacteria cultures found",
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", barData, layout);
};


rawData = [];
// return promise then function
dataPromise.then(function(data) {
    rawData = data
    
    // set variables
    var names = data.names;
    // console.log(names);

    createDropMenu(names);
    metaData(names[0]);
    createHorPlot(names[0]);
});