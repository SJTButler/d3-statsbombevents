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

export function plotPoints() {

    let pointClass = "point"

    let pointFill = "white"
    let pointStroke = "black"
    let pointStrokeWidth = 0.1

    let leftToRight = true

    let pointSymbolType = d3.symbolSquare

    let pointLocationX = d => d.location[0]
    let pointLocationY = d => d.location[1]
    let pointSize = 3

    function plotPoints(ctx) {

        const selection = ctx.selection ? ctx.selection() : ctx
        const pitch = selection.select("svg")

        const xScale = leftToRight ? ((x) => x) : ((x) => 120 - x)
        const yScale = leftToRight ? ((y) => y) : ((y) => 80 - y)

        let points = pitch.selectAll(`g.${pointClass}`).data(d => d, (d) => d.id)
        //console.log(shots)

        let symbol = pointSymbolType == "none" ? "" : d3.symbol().type(pointSymbolType).size(pointSize) 

        points.exit().remove()

        points = points
            .enter()
            .append("g")
                .attr("class", pointClass)
            .append("path")
                
        points.attr("d", symbol)
            .attr("transform", d => `translate(${xScale(pointLocationX(d))},${yScale(pointLocationY(d))})`)
            .attr("fill", pointFill)
            .attr("stroke", pointStroke)
            .attr("stroke-width", pointStrokeWidth)

    }

    plotPoints.pointClass = (..._) => (_.length ? ((pointClass = _[0]), plotPoints) : pointClass)

    plotPoints.pointFill = (..._) => (_.length ? ((pointFill = _[0]), plotPoints) : pointFill)
    plotPoints.pointStroke = (..._) => (_.length ? ((pointStroke = _[0]), plotPoints) : pointStroke)
    plotPoints.pointStrokeWidth = (..._) => (_.length ? ((pointStrokeWidth = _[0]), plotPoints) : pointStrokeWidth)

    plotPoints.leftToRight = (..._) => (_.length ? ((leftToRight = _[0]), plotPoints) : leftToRight)
 
    plotPoints.pointSymbolType = (..._) => (_.length ? ((pointSymbolType = _[0]), plotPoints) : pointSymbolType)

    plotPoints.pointLocationX = (..._) => (_.length ? ((pointLoctionX = _[0]), plotPoints) : pointLocationX)
    plotPoints.pointLocationY = (..._) => (_.length ? ((pointLoctionY = _[0]), plotPoints) : pointLocationY)
    plotPoints.pointSize = (..._) => (_.length ? ((pointSize = _[0]), plotPoints) : pointSize)

    return plotPoints
}

export function plotArrows() {

    let arrowClass = "arrow"
    let arrowColor = "black"
    let arrowWidth = 0.5

    let leftToRight = true

    let arrowStartingX = d => d.location[0]
    let arrowStartingY = d => d.location[1]

    let arrowEndingX = d => d.location[0]
    let arrowEndingY = d => d.location[1]

    function plotArrows(ctx) {

        const selection = ctx.selection ? ctx.selection() : ctx
        const pitch = selection.select("svg")

        const xScale = leftToRight ? ((x) => x) : ((x) => 120 - x)
        const yScale = leftToRight ? ((y) => y) : ((y) => 80 - y)

        let arrows = pitch.selectAll(`g.${arrowClass}`).data(d => d, (d) => d.id)

        arrows.exit().remove()

        arrows = arrows
            .enter()
            .append("g")
                .attr("class", arrowClass)
            

        pitch.select(`marker#${arrowClass}_arrowhead`).remove()
        pitch.select("defs").append("marker")
            .attr("id", `${arrowClass}_arrowhead`)
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 5)
            .attr("refY", 5)
            .attr("markerWidth", 2)
            .attr("markerHeight", 2)
            .attr("orient", "auto")
            .append("path")
                .attr("fill", arrowColor)
                .attr("d", "M 0 0 L 10 5 L 0 10 z")

        

        arrows.append("line")
            .attr("x1", (d) => xScale(arrowStartingX(d)))
            .attr("y1", (d) => yScale(arrowStartingY(d)))
            .attr("x2", (d) => xScale(arrowEndingX(d)))
            .attr("y2", (d) => yScale(arrowEndingY(d)))
            .attr("stroke", arrowColor)
            .attr("stroke-width", arrowWidth)
            .attr("marker-end", `url(#${arrowClass}_arrowhead)`)

    }

    
    plotArrows.arrowClass = (..._) => (_.length ? ((arrowClass = _[0]), plotArrows) : arrowClass)

    plotArrows.arrowColor = (..._) => (_.length ? ((arrowColor = _[0]), plotArrows) : arrowColor)
    plotArrows.arrowWidth = (..._) => (_.length ? ((arrowWidth = _[0]), plotArrows) : arrowWidth)

    plotArrows.leftToRight = (..._) => (_.length ? ((leftToRight = _[0]), plotArrows) : leftToRight)

    plotArrows.arrowStartingX = (..._) => (_.length ? ((arrowStartingX = _[0]), plotArrows) : arrowStartingX)
    plotArrows.arrowStartingY = (..._) => (_.length ? ((arrowStartingY = _[0]), plotArrows) : arrowStartingY)
    plotArrows.arrowEndingX = (..._) => (_.length ? ((arrowEndingX = _[0]), plotArrows) : arrowEndingX)
    plotArrows.arrowEndingY = (..._) => (_.length ? ((arrowEndingY = _[0]), plotArrows) : arrowEndingY)

    return plotArrows

}

export function plotEvents() {

    let classPrefix = "event"
    let plotEventArrows = true

    let arrowPlotter = plotArrows()
        .arrowClass(`${classPrefix}_Arrows`)
    
    let shotPlotter = plotPoints()
        .pointClass(`${classPrefix}_Points`)

    function plotEvents(ctx) {

        if (plotEventArrows) {
            ctx.call(arrowPlotter)
        }
        ctx.call(shotPlotter) 

    }
    //Shared attributes
    plotEvents.classPrefix = (..._) => (_.length ? (classPrefix = _[0],
         arrowPlotter.arrowClass(`${_[0]}_Arrows`),
         shotPlotter.pointClass(`${_[0]}_Points`), plotEvents) : classPrefix)
    plotEvents.plotEventArrows = (..._) => 
        (_.length ? ((plotEventArrows = _[0]), plotEvents) : plotEventArrows)
    plotEvents.leftToRight = (..._) => (_.length ? ((
        arrowPlotter.leftToRight(_[0]),
        shotPlotter.leftToRight(_[0])), plotEvents) : shotPlotter.leftToRight())

    //Location Attributes
    plotEvents.locationX = (..._) => (_.length ? (
        shotPlotter.pointLocationX(),
        arrowPlotter.arrowStartingX(), plotEvents) : shotPlotter.pointLocationX())
    plotEvents.locationY = (..._) => (_.length ? (
        shotPlotter.pointLocationY(),
        arrowPlotter.arrowStartingY(), plotEvents) : shotPlotter.pointLocationY())

    plotEvents.arrowEndingX = (..._) =>
        (_.length ? (arrowPlotter.arrowEndingX(_[0]), plotEvents) : arrowPlotter.arrowEndingX())
    plotEvents.arrowEndingY = (..._) =>
        (_.length ? (arrowPlotter.arrowEndingY(_[0]), plotEvents) : arrowPlotter.arrowEndingY())

    
    //Shot Plotter styling attributes
    plotEvents.fill = (..._) => 
        (_.length ? ((shotPlotter.pointFill(_[0])), plotEvents) : shotPlotter.pointFill())
    plotEvents.stroke = (..._) => 
        (_.length ? ((shotPlotter.pointStroke(_[0])), plotEvents) : shotPlotter.pointStroke())
    plotEvents.strokeWidth = (..._) => 
        (_.length ? ((shotPlotter.pointStrokeWidth(_[0])), plotEvents) : shotPlotter.pointStrokeWidth())
    plotEvents.size = (..._) => 
        (_.length ? ((shotPlotter.pointSize(_[0])), plotEvents) : shotPlotter.pointSize())
    plotEvents.symbolType = (..._) => 
        (_.length ? ((shotPlotter.pointSymbolType(_[0])), plotEvents) : shotPlotter.pointSymbolType())

    //Arrow Plotter Attributes
    plotEvents.arrowColor = (..._) => 
        (_.length ? ((arrowPlotter.arrowColor(_[0])), plotEvents) : arrowPlotter.arrowColor())
    plotEvents.arrowWidth = (..._) => 
        (_.length ? ((arrowPlotter.arrowWidth(_[0])), plotEvents) : arrowPlotter.arrowWidth())

    return plotEvents

}

export function plotShots() {
    /*
    let shotClassPrefix = "shots"
    let leftToRight = true
    let plotShotArrows = true

    let arrowPlotter = plotArrows()
        .arrowClass(`${shotClassPrefix}_ShotArrows`)
        .arrowEndingX(d => d.shot.end_location[0])
        .arrowEndingY(d => d.shot.end_location[1])
    
    let shotPlotter = plotPoints()
        .pointClass(`${shotClassPrefix}_ShotPoints`)

    function plotShots(ctx) {

        if (plotShotArrows) {
            ctx.call(arrowPlotter)
        }
        ctx.call(shotPlotter) 

    }

    plotShots.shotClassPrefix = (..._) => (_.length ? ((shotClassPrefix = _[0],
         arrowPlotter.arrowClass(`${_[0]}_ShotArrows`),
         shotPlotter.pointClass(`${_[0]}_ShotPoints`)), plotShots) : shotClassPrefix)

    plotShots.leftToRight = (..._) => (_.length ? ((leftToRight = _[0],
        arrowPlotter.leftToRight(_[0]),
        shotPlotter.leftToRight(_[0])), plotShots) : leftToRight)

    plotShots.shotFill = (..._) => 
        (_.length ? ((shotPlotter.pointFill(_[0])), plotShots) : shotPlotter.pointFill())
    plotShots.shotStroke = (..._) => 
        (_.length ? ((shotPlotter.pointStroke(_[0])), plotShots) : shotPlotter.pointStroke())
    plotShots.shotStrokeWidth = (..._) => 
        (_.length ? ((shotPlotter.pointStrokeWidth(_[0])), plotShots) : shotPlotter.pointStrokeWidth())
    plotShots.shotSize = (..._) => 
        (_.length ? ((shotPlotter.pointSize(_[0])), plotShots) : shotPlotter.pointSize())
    plotShots.symbolType = (..._) => 
        (_.length ? ((shotPlotter.pointSymbolType(_[0])), plotShots) : shotPlotter.pointSymbolType())
    plotShots.plotShotArrows = (..._) => 
        (_.length ? ((plotShotArrows = _[0]), plotShots) : plotShotArrows)
    plotShots.arrowColor = (..._) => 
        (_.length ? ((arrowPlotter.arrowColor(_[0])), plotShots) : arrowPlotter.arrowColor())
    plotShots.arrowWidth = (..._) => 
        (_.length ? ((arrowPlotter.arrowWidth(_[0])), plotShots) : arrowPlotter.arrowWidth())

    return plotShots
    */

    return plotEvents()
        .classPrefix("shot")
        .arrowEndingX(d => d.shot.end_location[0])
        .arrowEndingY(d => d.shot.end_location[1])


}

export function plotPasses() {
    
    let passClassPrefix = "passes"

    let passFill = "white"
    let passStroke = "black"
    let passStrokeWidth = 0.1
    let passSize = 0.5

    let leftToRight = true

    let symbolType = d3.symbolCircle

    let plotPassArrows = true
    let arrowColor = "black"
    let arrowWidth = 0.5

    function plotPasses(ctx) {

        let arrowPlotter = plotArrows()
            .arrowClass(`${passClassPrefix}_PassArrows`)
            .arrowColor(arrowColor)
            .arrowWidth(arrowWidth)
            .leftToRight(leftToRight)
            .arrowEndingX(d => d.pass.end_location[0])
            .arrowEndingY(d => d.pass.end_location[1])

        let passPlotter = plotPoints()
            .pointClass(`${passClassPrefix}_PassPoints`)
            .pointFill(passFill)
            .pointStroke(passStroke)
            .pointStrokeWidth(passStrokeWidth)
            .pointSize(passSize)
            .pointSymbolType(symbolType)
            .leftToRight(leftToRight)


        if (plotPassArrows) {
            ctx.call(arrowPlotter)
        }

        ctx.call(passPlotter) 

    }

    plotPasses.passClassPrefix = (..._) => (_.length ? ((passClassPrefix = _[0]), plotPasses) : passClassPrefix)

    plotPasses.passFill = (..._) => (_.length ? ((passFill = _[0]), plotPasses) : passFill)
    plotPasses.passStroke = (..._) => (_.length ? ((passStroke = _[0]), plotPasses) : passStroke)
    plotPasses.passStrokeWidth = (..._) => (_.length ? ((passStrokeWidth = _[0]), plotPasses) : passStrokeWidth)

    plotPasses.passSize = (..._) => (_.length ? ((passSize = _[0]), plotPasses) : passSize)

    plotPasses.leftToRight = (..._) => (_.length ? ((leftToRight = _[0]), plotPasses) : leftToRight)
 
    plotPasses.symbolType = (..._) => (_.length ? ((symbolType = _[0]), plotPasses) : symbolType)

    plotPasses.plotPassArrows = (..._) => (_.length ? ((plotPassArrows = _[0]), plotPasses) : plotPassArrows)
    plotPasses.arrowColor = (..._) => (_.length ? ((arrowColor = _[0]), plotPasses) : arrowColor)
    plotPasses.arrowWidth = (..._) => (_.length ? ((arrowWidth = _[0]), plotPasses) : arrowWidth)

    return plotPasses

}

export function plotDribbles() {}

export function heatmap() {

}