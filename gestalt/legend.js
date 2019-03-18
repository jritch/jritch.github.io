

function make_legend(svg, size_ramp, size_name, color_ramp, color_name,coords) {
  svg
    .append("g")
    .attr("id","legend")
    .attr("transform","translate("+coords[0]+","+coords[1]+")")

  svg.selectAll("#legend")
    .append("rect")
    .attr("id","legend_rect")
    .attr("width","150")
    .attr("height","130")
    .attr("x","0")
    .attr("y","0")
  
  swatch_height = 25
  padding = 15
  swatch_width = (150 - padding * 2) /3 
  swatch_level = 20
  swatch_label_level = 57.5
  swatch_title_level = 15

  circle_title_level = 75
  circle_label_level = 125
  circle_level = 95

  svg.selectAll("#legend")
    .append("rect")
    .attr("id","swatch_1")
    .attr("width",swatch_width)
    .attr("height",swatch_height)
    .attr("x",padding) // width + 10
    .attr("y",swatch_level)
    .attr("fill",color_ramp(color_ramp.domain()[0]))
    .attr("stroke","black")

  svg.selectAll("#legend")
    .append("rect")
    .attr("id","swatch_2")
    .attr("width",swatch_width)
    .attr("height",swatch_height)
    .attr("x",padding + swatch_width) // width + 10
    .attr("y",swatch_level)
    .attr("fill",color_ramp(0))
    .attr("stroke","black")

  svg.selectAll("#legend")
    .append("rect")
    .attr("id","swatch_3")
    .attr("width",swatch_width)
    .attr("height",swatch_height)
    .attr("x",padding + swatch_width * 2) // (width + x) - 35
    .attr("y",swatch_level)
    .attr("fill",color_ramp(color_ramp.domain()[1]))
    .attr("stroke","black")

    svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",2)
    .attr("y",swatch_title_level)              
    .html(color_name)

    svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",2)
    .attr("y",circle_title_level)              
    .html(size_name)

  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",15)
    .attr("y",swatch_label_level)              
    .html(color_ramp.domain()[0] + "%")

  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",70)
    .attr("y",swatch_label_level)              
    .html( 0 + "%")

  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",102)
    .attr("y",swatch_label_level)              
    .html(color_ramp.domain()[1] + "%")

  svg.selectAll("#legend")
    .append("circle")
    .attr("id","circ_1")
    .attr("cx",padding + swatch_width / 2) // width + 10 + 25/2
    .attr("cy",circle_level)
    .attr("r", Math.sqrt(size_ramp(size_ramp.domain()[0])) ) // replace with val from scale
    .attr("fill","rgb(119,119,119)") // replace with val from scale
    .attr("stroke","black")

  svg.selectAll("#legend")
    .append("circle")
    .attr("id","circ_2")
    .attr("cx", padding + swatch_width * 3 / 2) // (width + x) - 35 + 25/2
    .attr("cy",circle_level)
    .attr("r", Math.sqrt((2 + 25)/2) * 3) // replace with val from scale
    .attr("r", Math.sqrt(size_ramp(0) )) // replace with val from scale
    .attr("fill","rgb(119,119,119)") // replace with val from scale
    .attr("stroke","black")

  svg.selectAll("#legend")
    .append("circle")
    .attr("id","circ_2")
    .attr("cx",padding + swatch_width * 5 / 2) // (width + x) - 35 + 25/2
    .attr("cy",circle_level)
    .attr("r", Math.sqrt(size_ramp(size_ramp.domain()[1])) ) // replace with val from scale
    .attr("fill","rgb(119,119,119)") // replace with val from scale
    .attr("stroke","black")


  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",15)
    .attr("y",circle_label_level)              
    .html( size_ramp.domain()[0] + "%")

  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",70)
    .attr("y",circle_label_level)              
    .html( 0 + "%")

  svg.selectAll("#legend")
    .append("text")
    .attr("class","legend_text")
    .attr("x",102)
    .attr("y",circle_label_level)              
    .html( size_ramp.domain()[1] + "%")
}