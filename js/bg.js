var width = 1200, height = 675;
var mod = 36;
cols = Math.floor(1920 / mod);
rows = Math.floor(1080 / mod);

values= [];

/*

let scroll = scroller().container(d3.select('main'));
    scroll();
    let lastIndex, activeIndex = 0;


scroll.on('active', function(index){


    activeIndex = index;

    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; // up or down

    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
       // activationFunctions[i]();
    })
    lastIndex = activeIndex;
    console.log(lastIndex + " / " + sign);
    updateMe(lastIndex, sign);

    $("[data-step]").removeClass('active');
    $('[data-step="' + lastIndex + '"]').addClass('active');


})

*/



const svg_viz = d3.select('svg#bg')
  .attr('width', width)
  .attr('height', height)
  .call(responsivefy); 

// dots container
const dots = svg_viz.append("g")
    .attr("id", "dots");

// cross container
const cross = svg_viz.append("g")
    .attr("id", "cross");

// arrows container
const arrows = svg_viz.append("g")
    .attr("id", "arrows");

// scales

var angle = d3.scaleLinear()
    .domain([-1, 1])
    .range([0, Math.PI * 2]);

var angleG = d3.scaleLinear()
    .domain([-1, 1])
    .range([90, 90 + 360]);

var dotSize = d3.scaleLinear()
    .domain([-1, 1])
    .range([1, 12]);


  createMatrix();



function createMatrix(){
    console.log("matrix");
    console.log(cols + " / " + rows);

   // let dots = d3.select('svg#bg');
    setValues();

    dots.selectAll(".dots").data(values)
        .enter()
            .append("circle")
                .attr("cx", (d,i) => getMyCx(i))
                .attr("cy", (d,i) => getMyCy(i))
                .attr("r", (d,i) => 2)
                // .attr("r", (d,i) => 1.5)
                .attr("class", "dot")
                .style("fill", "#ccc")
                .style("opacity", 0);
                

    cross.selectAll(".lineH")
        .data(values)
        .enter().append("line")
        .attr("class", "lineH")
            .attr("x1", (d,i) => getMyCx(i)-4)
            .attr("y1", (d,i) => getMyCy(i))
            .attr("x2", (d,i) => getMyCx(i)+4)
            .attr("y2", (d,i) => getMyCy(i))
            .style("stroke", 'rgba(0,0,0,0.25)')

    cross.selectAll(".lineV")
            .data(values)
            .enter().append("line")
            .attr("class", "lineV")
                .attr("x1", (d,i) => getMyCx(i))
                .attr("y1", (d,i) => getMyCy(i)-4)
                .attr("x2", (d,i) => getMyCx(i))
                .attr("y2", (d,i) => getMyCy(i)+4)
                .style("stroke", 'rgba(0,0,0,0.25)')
                

                updateMe(0)
     
    
    
}

function getMyCx(i){
    return mod + (i % cols) * mod;
}

function getMyCy(i){
    return mod + (Math.floor(i/cols)* mod);
}


function updateMe(index, sign){
    switch (index) {
        case -1:
          break;
        case 0: 
            smallCross()
          break;
        case 1: 
            doArrows();
          break; 
        case 2:
            doCross();
          break;
        case 3:
            dotsIn();
          break;
        default:
          console.log('default');
      }
}

function smallCross(){
    cross.selectAll(".lineH")
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .attr("x1", (d,i) => getMyCx(i)-4)
            .attr("y1", (d,i) => getMyCy(i))
            .attr("x2", (d,i) => getMyCx(i)+4)
            .attr("y2", (d,i) => getMyCy(i));

    cross.selectAll(".lineV")
        .transition()
        .duration(2000)
        .style("opacity", 1)
        .attr("x1", (d,i) => getMyCx(i))
                .attr("y1", (d,i) => getMyCy(i)-4)
                .attr("x2", (d,i) => getMyCx(i))
                .attr("y2", (d,i) => getMyCy(i)+4);
}

function doArrows(){
    console.log("big arrows ...")

    cross.selectAll(".lineH")
        .transition()
        .duration(2000)
        .delay((d,i) =>  (i* 2) )
        .style("opacity", 1)
        .attr("x1", (d,i) =>{
            return getMyCx(i) + (Math.cos(angle(d)) * 8);
        } )
        .attr("y1", (d,i) => {
            return getMyCy(i) + (Math.sin(angle(d)) * 8);
        })
        .attr("x2", (d,i) => {
            return getMyCx(i) - (Math.cos(angle(d)) * 8);
        })
        .attr("y2", (d,i) => {
            return getMyCy(i) - (Math.sin(angle(d)) * 8);
        });

    cross.selectAll(".lineV")
        .transition()
        .duration(2000)
        .delay((d,i) =>  (i* 2) )
        .style("opacity", 1)
        .attr("x1", (d,i) =>{
            return getMyCx(i) + (Math.cos(angle(d)) * 8);
        } )
        .attr("y1", (d,i) => {
            return getMyCy(i) + (Math.sin(angle(d)) * 8);
        })
        .attr("x2", (d,i) => {
            return getMyCx(i) - (Math.cos(angle(d)) * 8);
        })
        .attr("y2", (d,i) => {
            return getMyCy(i) - (Math.sin(angle(d)) * 8);
        });
}

function doCross(){
    console.log("big cross ...")
    cross.selectAll(".lineH")
    .transition()
    .duration(2000)
    .delay((d,i) => 500 + (Math.random()* 3000) )
    .attr("x1", (d,i) => getMyCx(i)-18)
    .attr("y1", (d,i) => getMyCy(i))
    .attr("x2", (d,i) => getMyCx(i)+18)
    .attr("y2", (d,i) => getMyCy(i))
    .style("opacity", 1);

     cross.selectAll(".lineV")
        .transition()
        .duration(2000)
        .delay((d,i) => 500 + (Math.random()* 3000) )
        .attr("x1", (d,i) => getMyCx(i))
        .attr("y1", (d,i) => getMyCy(i)-18)
        .attr("x2", (d,i) => getMyCx(i))
        .attr("y2", (d,i) => getMyCy(i)+18)
        .style("opacity", 1);

    dots.selectAll(".dot")
        .transition()
        .duration(1000)
        .style("opacity", 0)
        
}

function dotsIn(){
    console.log("dots in ...")

    cross.selectAll(".lineH")
        .transition()
        .duration(2000)
        .style("opacity", 0);

    cross.selectAll(".lineV")
        .transition()
        .duration(2000)
        .style("opacity", 0);


    dots.selectAll(".dot")
        .transition()
        .duration(2000)
        .delay((d,i) => 500 + (Math.random()* 3000) )
        .style("opacity", 1)
        .attr("r", (d,i) => dotSize(d));


}


function setValues(){
    let n = 0;
    while (n < ( cols*rows)) {
        // index to rows and col
        let myR = Math.floor(n/rows)
        let myC = n%rows;
        let pv = noise.perlin2(myR/10, myC/10); // -1 to 1
        // let pv = noise.perlin2(n/100, 0);

        values[n] = pv;
        n++;
      }

    console.log(values);
}

function responsivefy(svg) {

    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10);
        // aspect = width_viz / height_viz;
  
        /*
    svg.attr('viewBox', `0 0 ${width_viz} ${height_viz}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);
        */

        svg.call(resize);
   
    d3.select(window).on(
        'resize.' + container.attr('id'), 
        resize
    );
   
    function resize() {
        const w = parseInt(container.style('width'));
        const h = parseInt(container.style('height'));

        console.log("width ...")
        console.log(w);

        svg.attr('width', w);
        svg.attr('height', h);

      
    }
}