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
        console.log(rawData);
        console.log(value);
        metaData(value);
};


// build function to create the metadata panel
function metaData(id) {
        var demInfo = d3.select("#sample-metadata");
        var metadata = rawData.metadata;
        demInfo.html("");
        metaId = metadata.filter(mdata => mdata.id == id)[0];
        console.log(metaId);
        Object.entries(metaId).forEach(([key, value]) => {
            demInfo.append("h4").text(`${key}: ${value}`);
        });
};

rawData = [];
// return promise then function
dataPromise.then(function(data) {
    rawData = data
    
    // set variables
    var names = data.names;
    console.log(names);

    createDropMenu(names)
    metaData(names[0])
});