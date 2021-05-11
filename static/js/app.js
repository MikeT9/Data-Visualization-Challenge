const file = "samples.json";

// Promise Pending
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

function optionChanged(value) {
    dataPromise.then(function(data) {
        console.log(data);
        console.log(value);
        metaData(value);
    });
}

// return promise then function
dataPromise.then(function(data) {
    console.log(data);
    
    // set variables
    var names = data.names;
    var metadata = data.metadata;
    console.log(names);

    // Use D3 to select the elements
    var dropdownMenu = d3.select("#selDataset");
    var demInfo = d3.select("#sample-metadata");

    // Assign the value of the dropdown menu option to a variable
    names.forEach(function (nameId) {
        // Assign the value of the dropdown menu option to a variable
        dropdownMenu.append("option").text(nameId)
            .property("value", nameId)
        
    });

    // build function to create the metadata panel
    function metaData(id) {
        demInfo.html("");
        metaId = metadata.filter(mdata => mdata.id == id)[0];
        console.log(metaId);
        Object.entries(metaId).forEach(([key, value]) => {
            demInfo.append("h4").text(`${key}: ${value}`);
        });
    }
    metaData(names[0])
});