# D3-challenge

For this challenge, we are creating a svg graph based off of 2014 ACE 1-year estimates from the Census Bureau: https://data.census.gov/cedsci/. We already have a csv pulled of this data (data/data.csv). We are looking at whether there is a relationship between rates of poverty and obesity in each state.

After getting our intitial svg object together, we're using d3.csv to get our data out of the csv. Then we work on building our dots for our scatter plot, getting our axes together, and our point and axis labels.

*Ideally, we would have the label for each state's point inside the point for that state. For a reason still unknown, we are not picking up the abbreviation labels for the first 15 rows of our dataset.*

## Sources

**Scatter plot in d3:**

https://www.d3-graph-gallery.com/graph/scatter_basic.html

http://www.d3noob.org/2016/11/

https://observablehq.com/@molliemarie/your-first-d3-js-scatterplot

**Resizing font size:**

https://bl.ocks.org/mbostock/1846692

**Text anchor:**

https://observablehq.com/@abebrath/scatterplot-of-text-labels

**Alignment baseline:**

https://www.integral-domain.org/lwilliams/mis462/examples/svgtext.html

**Axis labels:**

https://stackoverflow.com/questions/11189284/d3-axis-labeling
