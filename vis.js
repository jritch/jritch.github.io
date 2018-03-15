var svg = d3.selectAll('svg').data([0,1,2,3]).attr("id",(d)=>("svg"+ d));


var animate2 = function(svg) {
var dataSet = [];

for(i=0;i<10;i++)
{
	dataSet.push({t:1,x:i * 20, y: i*20 + d3.randomUniform(-3, 3)() + 10 * Math.sin((i + d3.randomUniform(-1,1)()/5.0) * 3.14159/5) });
}

svg.append('line').attrs({x:300,y:2,x:50,y:300,fill:'black'});


var circle = svg.selectAll('circle')
    .data(dataSet)
    .enter()
    .append('circle')
    .attrs({
        r:10,
        cx:function(d, i){ return 400 + d.x},
        cy:function(d, i){ return 400 - d.y},
        fill: 'red'
    });


var t=0;
var move = false;
//var animation_elapsed, animation_start;
var off_time = 0, last_elapsed;

svg
    .append('circle')
    .attrs({
        r:60,
        cx:200,
        cy:400,
        fill: 'red'
    })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  path = d3.path();
  path.moveTo(400, 400);
  path.lineTo(600-10, 200+10);
  path.closePath();
  svg.append("path").attr("d",path.toString()).attr("stroke","black").attr("stroke-width",2).attr("id","d_line")

  path = d3.path();
  path.moveTo(400, 400);
  path.lineTo(600+72, 400);
  path.closePath();
  svg.append("path").attr("d",path.toString()).attr("stroke","black").attr("stroke-width",0).attr("id","h_line")

  function dragstarted(d, i){

        // the first time the button is clicked, create the timer
        if(t == 0)
        {
        	t=d3.timer(animate);
        }

  			move = true;

   }

  function dragged(d,i) {}

  function dragended() {
        move = false;
  }

  function animate(elapsed) {

      T = 200.0;
      t = (elapsed -  off_time) / T ;

      if (t > 1.0) { t=1.0000001} ;
      if (t < 0.0) { t=-0.000001} ;

      wt =  t * 3.14159 / 4 / 0.5 ;

  		if (t < 0.5 )
      {
        svg.select("#h_line").attr("stroke-width",0)
        svg.select("#d_line").attr("stroke-width",2)
          circle
              .attr('cx', function(d) {
               return 400 +  (d.x * Math.cos(-wt) - d.y * Math.sin(-wt) ) ;
             })
             .attr('cy', function(d) {
          	   d.t = 1;
               return 400 -  (d.x * Math.sin(-wt) + d.y * Math.cos(-wt)) ;

             })

             ;
      }
      else
      {
            svg.select("#h_line").attr("stroke-width",2)
            svg.select("#d_line").attr("stroke-width",0)
            circle
             .attr('cy', function(d) {

               d.t =  Math.max(Math.min(30 * (t) - 10,10),0)

               return 400 - d.t * (d.x * Math.sin(-3.14159/4) + d.y * Math.cos(-3.14159/4))

             })

             ;
      }


      if (!move) {
        if (t < 0)
        {
          off_time += elapsed - last_elapsed
        }
        else {
        off_time += 2 * (elapsed - last_elapsed)
        }
      }
      else if ( t > 1.0)
      {
        off_time += elapsed - last_elapsed

      }

      last_elapsed = elapsed;


  }
}

var animate3 = function() {
  var dataSet = [];

for(i=0;i<10;i++)
{
	dataSet.push({t:1,x:i * 20, y: 2 *( 50 + i*10/3 + d3.randomUniform(-10, 10)()) });
}

dataSet[3].y = 80

var minY = dataSet.reduce(function(a, b) {
	console.log(a);
    return Math.min(a.y, b.y);
});


var circle = svg.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attrs({
        width:16,
        x:function(d, i){ return 200 + d.x},
        y:function(d, i){ return 200 - d.y},
        height:function(d,i) {return d.y},
        fill:'red'
    });

    var t=0;
    var move = false;
    //var animation_elapsed, animation_start;
    var off_time = 0, last_elapsed;

    svg
        .append('circle')
        .attrs({
            r:60,
            cx:200,
            cy:400,
            fill: 'red'
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    function dragstarted(d, i){

          // the first time the button is clicked, create the timer
          if(t == 0)
          {
          	t=d3.timer(animate);
          }

    			move = true;

     }

    function dragged(d,i) {}

    function dragended() {
          move = false;
    }

    circle
      .attrs({
        width:16,
        x:function(d, i){ return 300 + d.x},
        y:function(d, i){ return 400 - d.y},
        height:function(d,i) {return d.y},
        fill: 'red'});
//svg.append('rect').attr({width:300,height:2,x:50,y:300,fill:'black'});
//svg.append('rect').attr({width:2,height:280,x:50,y:20,fill:'black'});



function animate(elapsed) {

    T = 75.0;
    t = (elapsed -  off_time) / T ;

    if (t > 1.0) { t=1.0000001} ;
    if (t < 0.0) { t=-0.000001} ;

    //console.log(elapsed + ", " + off_time + ", " + t)

    minY = 80

     //console.log(circle.data())



     circle.attr('y',function(d,i){
     	return 400 - (d.y - (minY) * t)  ;
     }).attr('height', function(d,i){
     	return (d.y - (minY) * t) ;
     })



    if (!move) {
      if (t < 0)
      {
        off_time += elapsed - last_elapsed
      }
      else {
      off_time += 2 * (elapsed - last_elapsed)
      }
    }
    else if ( t > 1.0)
    {
      off_time += elapsed - last_elapsed

    }

    last_elapsed = elapsed;


}
}


var animate4 = function() {
  var dataSet = [];

for(i=0;i<10;i++)
{
	dataSet.push({t:1,x:i * 20, y: 2 *( 50 + i*10/3 + d3.randomUniform(-10, 10)()) });
}

dataSet[3].y = 80

var minY = dataSet.reduce(function(a, b) {
	console.log(a);
    return Math.min(a.y, b.y);
});


var circle = svg.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attrs({
        width:16,
        x:function(d, i){ return 200 + d.x},
        y:function(d, i){ return 200 - d.y},
        height:function(d,i) {return d.y},
      //  fill: 'red'
        //fill: function(d,i){console.log(i%3); var l = ['red','blue','green']; return l[i%3]}
    });

    var t=0;
    var move = false;
    //var animation_elapsed, animation_start;
    var off_time = 0, last_elapsed;

    svg
        .append('circle')
        .attrs({
            r:60,
            cx:200,
            cy:400,
            fill: 'red'
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));


    var flag = 0;
    function dragstarted(d, i){

          // the first time the button is clicked, create the timer
          if(t == 0 && flag == 0)
          {
          	t=d3.timer(animate);
          }

    			move = true;
          flag = true;

     }

    function dragged(d,i) {}

    function dragended() {
          move = false;
    }

    circle
      .attrs({
        width:16,
        x:function(d, i){ return 300 + d.x},
        y:function(d, i){ return 400 - d.y},
        height:function(d,i) {return d.y},
        //fill: function(d,i){console.log(i%3); var l = ['red','blue','green']; return l[i%3]}
        fill: function(d,i){if (i < 3 || i > 4)
                            {return "rgba(255,0,0,130)";}
                            else {
                              return "rgba(080,0,130)";} },
        'fill-opacity': '0.8'
});

//svg.append('rect').attr({width:300,height:2,x:50,y:300,fill:'black'});
//svg.append('rect').attr({width:2,height:280,x:50,y:20,fill:'black'});



function animate(elapsed) {

    T = 75.0;
    t = (elapsed -  off_time) / T ;

    if (t > 1.0) { t=1.0000001} ;
    if (t < 0.0) { t=-0.000001} ;

  //  console.log(elapsed + ", " + off_time + ", " + t)

    minY = 80

     //console.log(circle.data())

    if (t >= -0.1)
    {
    //console.log(minY)

     circle.attr('x',function(d,i){

      if (i < 5) {
        return (300 + d.x) + (20) * t  ;
      }
      if (i >= 5) {
      return (300 + d.x) - (20) * t  ;
    }

     }).attr('height', function(d,i){
     	return (d.y) ;
     })
    }



    if (!move) {
      if (t < 0)
      {
        off_time += elapsed - last_elapsed
      }
      else {
      off_time += 2 * (elapsed - last_elapsed)
      }
    }
    else if ( t > 1.0)
    {
      off_time += elapsed - last_elapsed

    }

    last_elapsed = elapsed;


}
}



var animate5 = function() {
  var dataSet = [];

for(i=0;i<40;i++)
{
	dataSet.push({t:1,x: d3.randomUniform(0, 200)(), y: d3.randomUniform(0, 200)() });
}

dataSet[3].y = 80

var minY = dataSet.reduce(function(a, b) {
	console.log(a);
    return Math.min(a.y, b.y);
});


var circle = svg.selectAll('circle')
    .data(dataSet)
    .enter()
    .append('circle');


    var t=0;
    var move = false;
    //var animation_elapsed, animation_start;
    var off_time = 0, last_elapsed;

    svg
        .append('circle')
        .attrs({
            r:60,
            cx:200,
            cy:400,
            fill: 'red'
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));


    var flag = 0;
    function dragstarted(d, i){

          // the first time the button is clicked, create the timer
          if(t == 0 && flag == 0)
          {
          	t=d3.timer(animate);
          }

    			move = true;
          flag = true;

     }

    function dragged(d,i) {}

    function dragended() {
          move = false;
    }

    circle
      .attrs({
        r:5,
        cx:function(d, i){ return 300 + d.x},
        cy:function(d, i){ return 400 - d.y},
        fill: function(d,i){if (true)
                            {return "rgba(255,0,0,130)";}
                            else {
                              return "rgba(080,0,130)";} },
        'fill-opacity': '0.8'
});

//svg.append('rect').attr({width:300,height:2,x:50,y:300,fill:'black'});
//svg.append('rect').attr({width:2,height:280,x:50,y:20,fill:'black'});



function animate(elapsed) {

    T = 500.0;
    t = (elapsed -  off_time) / T ;

    if (t > 1.0) { t=1.0000001} ;
    if (t < 0.0) { t=-0.000001} ;

    //console.log(elapsed + ", " + off_time + ", " + t)

    minY = 80

     //console.log(circle.data())

    if (t >= -0.1)
    {
    //console.log(minY)


     circle.attr('fill',function(d,i){if (i > t * 40)
 												{return "rgba(255,0,0,130)";}
 												else {
 													return "rgba(255,255,255,130)";} }
		);
		}



    if (!move) {
      if (t < 0)
      {
        off_time += elapsed - last_elapsed
      }
      else {
      off_time += 2 * (elapsed - last_elapsed)
      }
    }
    else if ( t > 1.0)
    {
      off_time += elapsed - last_elapsed

    }

    last_elapsed = elapsed;


  }

}




svg = d3.selectAll("#svg0")
animate4(svg)

svg = d3.selectAll("#svg1")
animate5(svg)

svg = d3.selectAll("#svg2")
animate2(svg)

svg = d3.selectAll("#svg3")
animate3(svg)
