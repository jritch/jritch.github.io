var svg = d3.select('svg');


var main = function() {
	/*
	var	svg = d3.select("body")
		.append("svg")
			.attr("width", 350)
			.attr("height", 350)
*/
	var svg = d3.select('svg');


	//var dataSet = [{x:40}, {x:10}, {x:20}, {x:10}, {x:20}, {x:30}, {x:30}, {x:40}];

	var dataSet = [];

	for(i=0;i<10;i++)
	{
		dataSet.push({t:1,x:i * 10, y: i*10 + d3.randomUniform(-10, 10)() });
	}

	//svg.append('line').attr({x:300,y:2,x:50,y:300,fill:'black'});

	//console.log(dataSet);
	//console.log(d3.randomUniform(-10,10)())

	var circle = svg.selectAll('circle')
	    .data(dataSet)
	    .enter()
	    .append('circle')
	    .attr({
	        r:5,
	        cx:200,
	        cy:200,
	        fill: 'red'
	    });


	//svg.append('rect').attr({width:300,height:2,x:50,y:300,fill:'black'});
	//svg.append('rect').attr({width:2,height:280,x:50,y:20,fill:'black'});

	var t = 0;

	svg
	    .append('circle')
	    .attr({
	        r:30,
	        cx:100,
	        cy:200,
	        fill: 'red'
	    })
	    .on('click', function(d, i){
	      if (t) {
	      	t.stop();
	      }
	      t=d3.timer(animate);
	      });



	function animate(elapsed) {
			o = elapsed - 500;
	    if (o < 0)
	    {return;}


			if (o * 3.14159/1000 < 3.14159/4 )
	    {
	        circle
	            .attr('cx', function(d) {
	             return 200 +  (d.x * Math.cos(-o * 3.14159/1000) - d.y * Math.sin(-o * 3.14159/1000) ) ;
	           })
	           .attr('cy', function(d) {
	             return 200 -  (d.x * Math.sin(-o * 3.14159/1000) + d.y * Math.cos(-o * 3.14159/1000)) ;
	           })

	           ;
	    }
	    else
	    {
	    		svg.append('rect').attr({width:145,height:2,x:195,y:200,fill:'black'});

	          circle
	           .attr('cy', function(d) {

	             if (d.t <= 5){
	               d.t = d.t + 0.1;
	             }

	             return 200 - d.t * (d.x * Math.sin(-3.14159/4) + d.y * Math.cos(-3.14159/4))


	           })

	           ;
	    }

	}
}

$( document ).ready(main)
