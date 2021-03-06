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

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



// Load data 
d3.csv("/assets/data/data.csv").then(function(healthData) {

  // Print data
  console.log(healthData);

  // Cast the value to a number for number pieces 
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    //data.povertyMoe = +data.povertyMoe;
    data.obesity = +data.obesity;       
  });

  //console.log(healthData, d => d.abbr);

  // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty) -1, d3.max(healthData, d => d.poverty)+1])
    .range([0, chartWidth]);

  // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.obesity) -1, d3.max(healthData, d => d.obesity) +1])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

    //Adding an axis label
    chartGroup.append("text")             
    .attr("class", "x label")
    .style("text-anchor", "end")
    .attr("x", chartWidth)
    .attr("y", chartHeight - 6)
    .text("Percent of Population in Poverty")
    ;

    chartGroup.append("text")             
    .attr("class", "y label")
    .style("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Percent of Population with Obesity")
    ;
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
    .attr("r", 12)
    .style("fill", "#009999")
    //.attr("width", d => chartWidth -xScale(d.poverty))
    //.attr("height", d => chartHeight - yScale(d.obesity));

  // Code to create the dot labels
  //this is not bring back the first 15 states for some reason
  chartGroup.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", function (d) { return xScale(d.poverty); } )
    .attr("y", function (d) { return yScale(d.obesity); } )
    .text( function(d) {return d.abbr})
    .style("fill", "#000000")
    .style("font-weight", "bold")
    .style("font-size", "11")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");
    // .attr('dx', -8)
    // .attr('dy', 3); 

}).catch(function(error) {
  console.log(error);
});
