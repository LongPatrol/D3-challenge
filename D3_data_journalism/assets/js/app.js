// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);





// // create axes
// var yAxis = d3.axisLeft(yScale);
// var xAxis = d3.axisBottom(xScale);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



// Load data 
d3.csv("/assets/data/data.csv").then(function(healthData) {

  // Print data
  //console.log(healthData);

  // Cast the value to a number for number pieces 
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    //data.povertyMoe = +data.povertyMoe;
    data.obesity = +data.obesity;
    data.abbr = data.abbr;
    
    console.log(abbr);
  });
  // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.poverty)])
    .range([0, chartWidth]);

  // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.obesity)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  
    // Create code to build the chart
  chartGroup.selectAll(".dot")
    .data(healthData)
    .enter()
    .append("circle")
    .classed("dot", true)
    .attr("cx", function (d) { return xScale(d.poverty); } )
    .attr("cy", function (d) { return yScale(d.obesity); } )
    .attr("r", 7)
    .style("fill", "#009999")
    //.attr("width", d => chartWidth -xScale(d.poverty))
    //.attr("height", d => chartHeight - yScale(d.obesity));

  // Code to creat the dot labels
  chartGroup.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", function (d) { return xScale(d.poverty); } )
    .attr("y", function (d) { return yScale(d.obesity); } )
    .text( function(d) {return d.abbr})

}).catch(function(error) {
  console.log(error);
});
