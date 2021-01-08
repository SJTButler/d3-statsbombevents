
/*function pitch(ctx) {

    let svg = ctx
        .append("svg")
        .attr("width", 480)
        .attr("height", 320)
        .attr("viewBox", "-5 -5 130 90")

    let g = svg.append("g")
        .attr("stroke","white")
        .attr("fill", "none")

    g.append("rect")  //grass
        .attr("x", -5)
        .attr("y", -5)
        .attr("height", 90)
        .attr("width", 130)
        .attr("fill", "green")
        .attr("stroke", "none")

    g.append("rect")    //touchlines
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 80)
        .attr("width", 120)

    g.append("line")      //half-way line
        .attr("x1", 60)
        .attr("x2", 60)
        .attr("y1", 0)
        .attr("y2", 80)

    g.append("circle")
        .attr("cx", 60)
        .attr("cy", 40)
        .attr("r", 1)
        .attr("fill", "white")

    g.append("circle")
        .attr("cx", 60)
        .attr("cy", 40)
        .attr("r", 10)

    g.append("rect")
        .attr("x", 0)
        .attr("y", 18)
        .attr("width", 18)
        .attr("height", 44)

    g.append("rect")
        .attr("x", 102)
        .attr("y", 18)
        .attr("width", 18)
        .attr("height", 44)

    g.append("rect")
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", 6)
        .attr("height", 20)

    g.append("rect")
        .attr("x", 114)
        .attr("y", 30)
        .attr("width", 6)
        .attr("height", 20)
        
    g.append("circle")
        .attr("cx", 12)
        .attr("cy", 40)
        .attr("r", 1)
        .attr("fill", "white")

    g.append("circle")
        .attr("cx", 108)
        .attr("cy", 40)
        .attr("r", 1)
        .attr("fill", "white")

    g.append("path")
        .attr("d", "M 18 32 A 10 10 0 0 1 18 48 Z")

    g.append("path")
        .attr("d", "M 102 32 A 10 10 0 0 0 102 48 Z")

    g.append("rect")
        .attr("x", -2)
        .attr("y", 36)
        .attr("width", 2)
        .attr("height", 8)

    g.append("rect")
        .attr("x", 120)
        .attr("y", 36)
        .attr("width", 2)
        .attr("height", 8)

    return svg
}
*/

drawPitch1 = d3.pitch()

svg = d3.select("#pitch1")
    .call(drawPitch1)


drawPitch2 = d3.pitch()
    .bgcolor("black")

svg = d3.select("#pitch2")
    .call(drawPitch2)

