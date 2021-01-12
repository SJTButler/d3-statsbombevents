export function pitch() {

    let width = 480
    let height = 320

    let bgcolor = "green"
    let linecolor = "white"

    let viewbox = "-5 -5 130 90"

    function pitch(ctx) {

        let svg = ctx
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", viewbox)

        let g = svg.append("g")
            .attr("class", "pitch")
            .attr("stroke", linecolor)
            .attr("fill", "none")

        g.append("rect")  //grass
            .attr("x", -5)
            .attr("y", -5)
            .attr("height", 90)
            .attr("width", 130)
            .attr("fill", bgcolor)
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
            .attr("fill", linecolor)

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

        g.append("circle")  //penalty spot
            .attr("cx", 12)
            .attr("cy", 40)
            .attr("r", 1)
            .attr("fill", linecolor)

        g.append("circle")  //penalty spot
            .attr("cx", 108)
            .attr("cy", 40)
            .attr("r", 1)
            .attr("fill", linecolor)

        g.append("path")
            .attr("d", "M 18 32 A 10 10 0 0 1 18 48 Z") //penalty arc

        g.append("path")
            .attr("d", "M 102 32 A 10 10 0 0 0 102 48 Z") //penalty arc

        g.append("rect")    //goal box
            .attr("x", -2)
            .attr("y", 36)
            .attr("width", 2)
            .attr("height", 8)

        g.append("rect")    //goal box
            .attr("x", 120)
            .attr("y", 36)
            .attr("width", 2)
            .attr("height", 8)

        return pitch
    }

    pitch.width = (..._) => (_.length ? ((width = _[0]), pitch) : width)
    pitch.height = (..._) => (_.length ? ((height = _[0]), pitch) : height)
    pitch.bgcolor = (..._) => (_.length ? ((bgcolor = _[0]), pitch) : bgcolor)
    pitch.linecolor = (..._) => (_.length ? ((linecolor = _[0]), pitch) : linecolor)
    pitch.viewbox = (..._) => (_.length ? ((viewbox = _[0]), pitch) : viewbox)

    return pitch
}

export function plotShots() {

    let shotcolor = "white"
    let shotsize = 1

    let leftToRight = true

    function plotShots(ctx) {

        const selection = ctx.selection ? ctx.selection() : ctx
        const pitch = selection.select("svg")

        const xScale = leftToRight ? ((x) => x) : ((x) => 120 - x)

        let shots = pitch.selectAll("g.shot").data(d => d)
        console.log(shots)
        shots = shots
            .enter()
            .append("g")
                .attr("class", "shot")
            
        shots.append("circle")
            .attr("cx", (d) => xScale(d.location[0]))
            .attr("cy", (d) => d.location[1])
            .attr("r", shotsize)
            .attr("fill", shotcolor)
            
        shots.each(function(d) {console.log(d)})

        shots.exit().remove()
    }

    plotShots.shotsize = (..._) => (_.length ? ((shotsize = _[0]), plotShots) : shotsize)
    plotShots.shotcolor = (..._) => (_.length ? ((shotcolor = _[0]), plotShots) : shotcolor)
    plotShots.leftToRight = (..._) => (_.length ? ((leftToRight = _[0]), plotShots) : leftToRight)


    return plotShots
}