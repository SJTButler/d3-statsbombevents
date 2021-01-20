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

        svg.append("defs")
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
    }

    pitch.width = (..._) => (_.length ? ((width = _[0]), pitch) : width)
    pitch.height = (..._) => (_.length ? ((height = _[0]), pitch) : height)
    pitch.bgcolor = (..._) => (_.length ? ((bgcolor = _[0]), pitch) : bgcolor)
    pitch.linecolor = (..._) => (_.length ? ((linecolor = _[0]), pitch) : linecolor)
    pitch.viewbox = (..._) => (_.length ? ((viewbox = _[0]), pitch) : viewbox)

    return pitch
}

export function plotEvents() {

    let shotplotter = plotShots()

}
export function plotShots() {


    let shotClass = "shots"

    let shotFill = "white"
    let shotStroke = "black"
    let shotStrokeWidth = 0.1
    let shotSize = 3

    let leftToRight = true

    let symbolType = d3.symbolSquare

    let plotShotArrows = true
    let arrowColor = "black"
    let arrowWidth = 0.5

    function plotShots(ctx) {

        const selection = ctx.selection ? ctx.selection() : ctx
        const pitch = selection.select("svg")

        const xScale = leftToRight ? ((x) => x) : ((x) => 120 - x)

        let shots = pitch.selectAll(`g.${shotClass}`).data(d => d, (d) => d.id)
        //console.log(shots)

        let symbol = d3.symbol().type(symbolType).size(shotSize)

        shots.exit().remove()

        shots = shots
            .enter()
            .append("g")
                .attr("class", shotClass)
           
        if (plotShotArrows) {
            //arrowhead marker
            pitch.select(`marker#${shotClass}arrowhead`).remove()
            pitch.select("defs").append("marker")
                .attr("id", `${shotClass}arrowhead`)
                .attr("viewBox", "0 0 10 10")
                .attr("refX", 5)
                .attr("refY", 5)
                .attr("markerWidth", 2)
                .attr("markerHeight", 2)
                .attr("orient", "auto")
                .append("path")
                .attr("fill", arrowColor)
                .attr("d", "M 0 0 L 10 5 L 0 10 z")

            shots.append("line")
                .attr("x1", (d) => xScale(d.location[0]))
                .attr("y1", (d) => d.location[1])
                .attr("x2", (d) => xScale(d.shot.end_location[0]))
                .attr("y2", (d) => d.shot.end_location[1])
                .attr("stroke", arrowColor)
                .attr("stroke-width", arrowWidth)
                .attr("marker-end", `url(#${shotClass}arrowhead)`)
        }

        shots.append("path")
            .attr("d", symbol)
            .attr("transform", d => `translate(${xScale(d.location[0])},${d.location[1]})`)
            .attr("fill", shotFill)
            .attr("stroke", shotStroke)
            .attr("stroke-width", shotStrokeWidth)
    }

    plotShots.shotClass = (..._) => (_.length ? ((shotClass = _[0]), plotShots) : shotClass)

    plotShots.shotFill = (..._) => (_.length ? ((shotFill = _[0]), plotShots) : shotFill)
    plotShots.shotSize = (..._) => (_.length ? ((shotSize = _[0]), plotShots) : shotSize)
    plotShots.shotStroke = (..._) => (_.length ? ((shotStroke = _[0]), plotShots) : shotStroke)
    plotShots.shotStrokeWidth = (..._) => (_.length ? ((shotStrokeWidth = _[0]), plotShots) : shotStrokeWidth)

    plotShots.leftToRight = (..._) => (_.length ? ((leftToRight = _[0]), plotShots) : leftToRight)
 
    plotShots.symbolType = (..._) => (_.length ? ((symbolType = _[0]), plotShots) : symbolType)

    plotShots.plotShotArrows = (..._) => (_.length ? ((plotShotArrows = _[0]), plotShots) : plotShotArrows)
    plotShots.arrowColor = (..._) => (_.length ? ((arrowColor = _[0]), plotShots) : arrowColor)
    plotShots.arrowWidth = (..._) => (_.length ? ((arrowWidth = _[0]), plotShots) : arrowWidth)

    return plotShots
}


export function plotPasses() {


}

export function plotDribbles() {}

export function heatmap() {

}