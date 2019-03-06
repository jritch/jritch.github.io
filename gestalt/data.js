paused = true;

// Define which dimension of the dataset is matched to each of the 4 visualization dimensions
var mapping = {
				 "x": "life_expectancy",
				 "y": "fertility_rate",
				 "s": "income",
				 "l": "child_mortality"

	  	      }


//
function convertToRange(number,input_range,output_range) {
		return (number - input_range[0]) * (output_range[1] - output_range[0])  / (input_range[1] - input_range[0] ) + output_range[0]
}

var highlighted = "null"
var global_timer
var year_0 = 1960;
var year_N = 2014;
var num_years = (year_N - year_0 + 1)
var regions = ["Sub-Saharan Africa","Europe & Central Asia","East Asia & Pacific", "South Asia","Middle East & North Africa","America"]

function generateData (data, mapping) {
		//year_0 = 1960;
		//year_N = 2014; 
		num_years = (year_N - year_0 + 1);

		// TODO: these ranges are for the entire gapminder dataset, not just the years of interest
		// This should be fixed
		ranges = {}
		for (var entry in mapping) {
			if (mapping[entry]) {
				entry_stats =  data["stats"][mapping[entry]]
				if (entry_stats != undefined){
					ranges[mapping[entry]] = [entry_stats["min"],entry_stats["max"]]
				}
				else {
					ranges[mapping[entry]] = [0,125000]
				}
			}
		}

		ranges["child_mortality"] = [0,500]
		ranges["co2_emissions"] = [0,40]

		ranges["x"] = [0,100]
		ranges["y"] = [0,100]
		ranges["s"] = [20,200]
		ranges["l"] = [75,255]
		ranges["num_entries"] = [0,num_years]

		data_series = []

		// In the gapminder dataset, one country = one object
		random_0 = [Math.random() *  30 + 10, Math.random() *  30 + 10, Math.random() *  30 + 10, Math.random() *  30 + 10]

		for  (var entry of data["pieces"]) {

			if (regions.indexOf(entry.region) < 0){
				continue;
			}
			
			// The num_entries variable is to check for missing data inside the range
			num_entries = 0

			// Each object will have a series of values for each visual variable
			// for each year in the range
			data_object = {"x":[],"y":[],"l":[],"s":[], "name": entry.name};
			
			
			random_1 = [Math.random() * (num_years - random_0[0]), Math.random() * (num_years - random_0[1]), Math.random() * (num_years - random_0[2]), Math.random() * (num_years - random_0[3])]

			for (var state of entry["states"]) {	
				// Exclude data outside of the years of interest
				if ((state.t+0 == year_0 || state.t+0 == year_N)) {
					num_entries += 1
					coeff = 0
					for (var entry in mapping) {
						if (mapping[entry])	{
						     data_object[entry].push(convertToRange(state[mapping[entry]],ranges[mapping[entry]],ranges[entry]) )
						}
						else {	
							// adding random data
							if (data_series.length % 2) {						
								data_object[entry].push(convertToRange(random_1[coeff] +  random_0[coeff] * num_entries / num_years, ranges["num_entries"], ranges[entry]))
								}
							else {
								data_object[entry].push(convertToRange(random_1[coeff] + random_0[coeff] / 2, ranges["num_entries"], ranges[entry]))
							}
						}
						coeff+=1
					}
				}
			}

			// If the data is complete, add it to the data_series
			if (num_entries == 2) {//num_years) {
				data_series.push(data_object)
			}			
		}

		return data_series;
}

function showData(data_series) {
        
        // Setup settings for graphic
            var canvas_width = 600;
            var canvas_height = 600;
            var padding = 60;  // for chart edges

            // Create scale functions
            var xScale = d3.scale.linear()  // xScale is width of graphic
                            .domain([0, 100])
                            .range([padding, canvas_width - padding * 2]); // output range

            var yScale = d3.scale.linear()  // yScale is height of graphic
                            .domain([0, 100])
                            .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip

            // Define X axis
            var xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom")
                            .ticks(0)
                            .tickValues([]);

            // Define Y axis
            var yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient("left")
                            .ticks(0)
                            .tickValues([]);

            // Create SVG element
            var svg = d3.select("#d3plot")  // This is where we put our vis
                .append("svg")
                .attr("width", canvas_width)
                .attr("height", canvas_height)


       // Create Circles
            var circles = svg.selectAll("circle")
                .data(data_series)
                .enter()
                .append("circle")  // Add circle svg
                .attr("cx", function(d) {
                     return xScale(d.x[0]);  // Circle's X
                })
                .attr("cy", function(d) {  // Circle's Y
                    return yScale(d.y[0]);
                })
                .attr("r", function(d){ // Circle's radius
                    return Math.sqrt(d.s[0]);
                })
                .attr("fill", function(d) { // circle's luminance
                   return d3.rgb(d.l[0], d.l[0], d.l[0]);
                });
                //.attr("r", 2);

            // Add to X axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (canvas_height - padding) +")")
                .call(xAxis);

            // Add to Y axis
            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + padding +",0)")
                .call(yAxis);

            var borderPath = svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", canvas_height)
                .attr("width", canvas_width)
                .style("stroke", 'black')
                .style("fill", "none")
                .style("stroke-width", 1);

                year=d3.select("#year").html("1960 to 2014")

            d3.select("svg").append("text").attr("id","x").attr("x",305)
                				.attr("y",580).attr("font-size","20")
                				.html(mapping["x"])

            d3.select("svg").append("text").attr("id","y").attr("x",-470)
                				.attr("y",30).attr("font-size","20").attr("transform","rotate(-90)")
                				.html(mapping["y"])
            // On click, update with new data

        function play() {


   			
  			svg.selectAll("circle").remove()
  			d3.select("#year").html(year_0 + " to " + year_N) //.transition(1000).html("2014")
  			year=d3.select("#year")

  			last_frame = svg.selectAll("circle")
                .data(data_series)
                .enter()
                .append("circle")  // Add circle svg
                .attr("cx", function(d) {
                	if (paused == "position")
                	{
                		return xScale((d.x[0] + d.x[1]) / 2);
                	}
                     return xScale(d.x[0]);  // Circle's X
                })
                .attr("cy", function(d) {  // Circle's Y
                	if (paused == "position")
                	{
                		return yScale((d.y[0] + d.y[1]) / 2);
                	}
                    return yScale(d.y[0]);
                })
                .attr("fill", function(d) { // circle's luminance
                   if (paused == "fill")
	               {
	            		color = (d.l[0] + d.l[1]) / 2;
	            		return d3.rgb(color,color,color);
	               }
                   return d3.rgb(d.l[0], d.l[0], d.l[0]);
                   
                })
                .attr("r", function(d){ // Circle's radius
					if (paused == "r")
	               {
	            	
	            		Math.sqrt((d.s[0] + d.s[1]) / 2)
	               }
                    return Math.sqrt(d.s[0]);
                })
               
                .attr("id", function(d) { // Circle's radius
		           return d.name.replace(/\s/g, '');
		        });

	  		    for (i=1;i<2;i++)
	  		    {
		            last_frame = last_frame
		                     // Update with new data
		                    .transition()  // Transition from old to new
		                    .duration(250)
		                    .transition()  // Transition from old to new
		                    .duration(1000)  // Length of animation
		                    
		                    .ease("linear")  
		                    .attr("cx", function(d) {
		                    	if (paused == "position")
		                    	{
		                    		return xScale((d.x[0] + d.x[1]) / 2);
		                    	}
		                        return xScale(d.x[i]);  // Circle's X
		                    })
		                    .attr("cy", function(d) {
		                    	if (paused == "position")
		                    	{
		                    		return yScale((d.y[0] + d.y[1]) / 2);
		                    	}
		                        return yScale(d.y[i]);  // Circle's Y
		                    })
		                    .attr("fill", function(d) {
		                   		if (paused == "fill")
		                    	{
		                    		color = (d.l[0] + d.l[1]) / 2;
		                    		return d3.rgb(color,color,color);
		                    	}
		                        return d3.rgb(d.l[i], d.l[i], d.l[i]); // Circle's colour
		                    })
		                    .attr("r", function(d) { // Circle's radius
		                    	if (paused == "r")
				               {
				            		return Math.sqrt((d.s[0] + d.s[1]) / 2);
				               }
		                        return Math.sqrt(d.s[i]);
		                    })
		                    
	             }   

            svg.append("rect")
            .attr("width", 500)
            .attr("id","curtain")
            .attr("height", 400)
            .attr("fill","white")
            .attr("x",50)
            .attr("y",50)

            setTimeout(function (){svg.selectAll("#curtain").remove()}, 200)		


              $("#" + highlighted).addClass("highlight")

	          $("circle").on("click", function () {
	          		$("circle").removeClass("highlight")
	          		$(this).addClass('highlight')
	          		highlighted = $(this).attr("id")
	          })

		
            }

		d3.select('#play')  
  			.on('mousedown', play);

		d3.select('#play')  
  			.on('touchstart', play);

  		if (global_timer != undefined){
  			global_timer.stop()
  		}
  		play()
  		global_timer = d3.interval(play,1300)



    }