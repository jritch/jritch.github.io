paused = true;

// Define which dimension of the dataset is matched to each of the 4 visualization dimensions
var mapping = {
                 "x": "life_expectancy",
                 "y": "fertility_rate",
                 "s": "income",
                 "l": "child_mortality"

              }

function convertToRange(number,input_range,output_range) {
        return (number - input_range[0]) * (output_range[1] - output_range[0])  / (input_range[1] - input_range[0] ) + output_range[0]
}


// from https://stackoverflow.com/questions/17786618/how-to-use-z-index-in-svg-elements/17786729
d3.selection.prototype.moveUp = function() {
    return this.each(function() {
        this.parentNode.appendChild(this);
    });
};

var highlighted = "null"
var global_timer
var year_0 = 1960;
var year_N = 2014;
var num_years = (year_N - year_0 + 1)
var regions = ["Sub-Saharan Africa","Europe & Central Asia","East Asia & Pacific", "South Asia","Middle East & North Africa","America"]

function generateData (data, mapping) {
        
        num_years = (year_N - year_0 + 1);

        // TODO: these ranges are for the entire gapminder dataset, not just the years of interest
        // This should be fixed
        ranges = {}

        // manually define ranges for data variables

        // for income and child mortality, pad the left side of the chart
        // by starting a little lower than 0
        // to prevent overlap between bubbles + axis
        ranges["income"] = [-2000,125000]
        ranges["child_mortality"] = [-3,430]        
        
        // fertility rate almost never drops below 1
        // life_expectancy almost never drops below 20
        ranges["fertility_rate"] = [1,8]
        ranges["life_expectancy"] = [20,85]
        

        // manually define ranges for visual variables
        
        ranges["s"] = [25,225]
        ranges["l"] = [75,255] // luminance does not go from 0 -> 255 because 
                               // overplotting 

        ranges["num_entries"] = [0,num_years]

        data_series = []

        // In the gapminder dataset, one country = one object

        for  (var entry of data["pieces"]) {

            if (regions.indexOf(entry.region) < 0){
                continue;
            }
            
            // The num_entries variable is to check for missing data inside the range
            num_entries = 0

            // Each object will have a series of values for each visual variable
            // for each year in the range
            data_object = {"x":[],"y":[],"l":[],"s":[], "name": entry.name};
            
            for (var state of entry["states"]) {    
                // Exclude data outside of the two years of interest
                if ((state.t+0 == year_0 || state.t+0 == year_N)) {
                    num_entries += 1                    
                    for (var entry in mapping) {        
                        data_object[entry].push(state[mapping[entry]])                    
                    }
                }
            }

            // If the data is complete, add it to the data_series
            if (num_entries == 2) {
                data_series.push(data_object)
            }           
        }

        return data_series;
}


// Includes code from: http://bl.ocks.org/WilliamQLiu/bd12f73d0b79d70bfbae
function showData(data_series) {
        
    
        var canvas_width = 600;
        var canvas_height = 600;
        var padding = 60;  // for chart edges

        
        var xScale = d3.scale.linear()  
                        .domain(ranges[mapping["x"]])
                        .range([padding, canvas_width - padding]);

        var yScale = d3.scale.linear()  
                        .domain(ranges[mapping["y"]])
                        .range([canvas_height - padding, padding]); 
        
        var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(3)
                        .tickSize(2)
                        
        var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(10)
                        .tickSize(2);

        var lumScale =  d3.scale.linear().interpolate(d3.interpolateLab).domain(ranges[mapping["l"]]).range(["rgb(85,85,85)","white"])
        var sizeScale =  d3.scale.linear().domain(ranges[mapping["s"]]).range(ranges["s"])


        var svg = d3.select("#d3plot")
            .append("svg")
            .attr("width", canvas_width)
            .attr("height", canvas_height)


        var circles = svg.selectAll(".country_circle")
            .data(data_series)
            .enter()
            .append("circle")  
  
        svg.append("g")
            .attr("transform", "translate(0," + (canvas_height - padding) +")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + padding +",0)")
            .call(yAxis);

        var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", canvas_height)
            .attr("width", canvas_width)
            .style("stroke", 'black')
            .style("fill", "none")
            .style("stroke-width", 2);

        d3.select("svg").append("text").attr("id","x").attr("x",260)
                            .attr("y",580).attr("font-size","20")
                            .html(mapping["x"])

        d3.select("svg").append("text").attr("id","y").attr("x",-360)
                            .attr("y",30).attr("font-size","20").attr("transform","rotate(-90)")
                            .html(mapping["y"])
        
        function play() {
            is_paused = 0;
            svg.selectAll(".country_circle").remove()
            

            last_frame = svg.selectAll(".country_circle")
                .data(data_series)
                .enter()
                .append("circle")  // Add circle svg
                .attr("class","country_circle")
                .attr("cx", function(d) {
                   return xScale(d.x[0]);  // Circle's X
                })
                .attr("cy", function(d) {  // Circle's Y
                    
                   return yScale(d.y[0]);
                })
                .attr("fill", function(d) { // circle's luminance
                   return lumScale(d.l[0])
                   
                })
                .attr("r", function(d){ // Circle's radius
                    return Math.sqrt(sizeScale(d.s[0]));
                })
               
                .attr("id", function(d) {
                   return d.name.replace(/\s/g, '');
                })
                .attr("visibility","hidden");


            last_frame = last_frame
                 // Update with new data
                .transition()  
                .duration(250)
                .transition()  
                .duration(2000)
                
                .ease("linear")  
                .attr("cx", function(d) {
                    return xScale(d.x[1]);  
                })
                .attr("cy", function(d) {
                    return yScale(d.y[1]);  
                })
                .attr("fill", function(d) {
                    return lumScale(d.l[1]); 
                })
                .attr("r", function(d) {
                    return Math.sqrt(sizeScale(d.s[1]));
                })
                    

            setTimeout(function (){svg.selectAll(".country_circle").attr("visibility","")}, 250)        
            setTimeout(function (){if (! is_paused) {svg.selectAll(".country_circle").attr("visibility","hidden"); 
            //    is_paused = 1;
            }}, 2250)        


            $("#" + highlighted).addClass("highlight")

            $(".country_circle").on("click", function () {
                $("circle").removeClass("highlight")
                $(this).addClass('highlight')
                highlighted = $(this).attr("id")
            })

        
            }

        if (global_timer != undefined){
            global_timer.stop()
        }

        play()
        //global_timer = d3.interval(play,2250)



    }