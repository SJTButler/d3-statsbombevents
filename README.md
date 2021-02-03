# D3-Statsbombevents 

## About this Project

This is a library to provide a simple method to plot statsbomb events-level data using [d3.js](http://d3js.org). It is intended to be highly customizable to allow users to plot the data in ways that suit the user's needs.

## Code Examples

To come soon

## Statsbomb Open Data

This library is designed for use with the data provided by [Statsbomb](http://statsbomb.com). For research and non-commercial purposes, Statsbomb provides a subset of their data free of charge at [statsbomb/open-data](https://github.com/statsbomb/open-data), which I have used here to provide examples of how to use this library. Use of this data requires the user to abide by the [Statsbomb User Agreement](https://github.com/statsbomb/open-data/blob/master/LICENSE.pdf) and to properly credit its use.

Note: This library, and its author, are not affiliated in any way with Statsbomb, and as such, Statsbomb are not responsible for any issues resulting from use of this library.

![Statsbomb Logo](img/SB_Regular.svg)


# API Reference

## pitch()
Returns a new generator that, when called, plots an SVG pitch object in a given div selection.

### *(...)*.width()
Sets and returns the width of the SVG pitch to be plotted.

Default: 480

### *(...)*.height()
Sets and returns the height of the SVG pitch to be plotted.

Default: 360

### *(...)*.viewbox()
Sets and returns the viewbox for the plotted SVG pitch. If the aspect ratio of the SVG is different than that of the viewbox, the shown area will be extended to ensure the entire viewbox area is shown.

Default: "-5 -5 130 90"

### *(...)*.linecolor()
Sets and returns the line colors for the SVG pitch.

Default: "white"

### *(...)*.bgcolor()
Sets and returns the background colors for the SVG pitch.

Default: "green"


## plotEvents()

Returns a new generator that, when called, plots events onto a given SVG pitch. This function works by creating both a plotPoints() and a plotArrows() generator, and calling them sequentially. While both plotPoints and plotArrows are available, in most cases, it is better to use this function rather than those directly, as certain attributes are shared.

### *(...)*.classPrefix()

Sets and returns the class attributes for the plotPoints and plotArrows generators in the form "{prefix}_Points" and "{prefix}_Arrows" respectively.

Default: "event"

### *(...)*.plotEventArrows()

If set to false, skips plotting the event arrows.

Default: true

### *(...)*.leftToRight()

Sets and returns the leftToRight attributes of the plotPoints and plotEvents generators.

Default: true

### *(...)*.locationX()

Sets and returns the pointLocationX and the arrowStartingX attributes of the plotPoints and plotEvents generators respectively.

Default: d => d.location[0]

### *(...)*.locationY()

Sets and returns the pointLocationY and the arrowStartingY attributes of the plotPoints and plotEvents generators respectively.

Default: d => d.location[1]

### *(...)*.arrowEndingX()

Sets and returns the arrowEndingX attribute of the plotPoints generator.

Default: d => d.location[0]


### *(...)*.arrowEndingY()

Sets and returns the arrowEndingY attribute of the plotPoints generator.

Default: d => d.location[1]


### *(...)*.fill()

Sets and returns the pointFill attribute of the plotPoints generator.

Default: "white"

### *(...)*.stroke()

Sets and returns the pointStroke attribute of the plotPoints generator.

Default: "black"

### *(...)*.strokeWidth()

Sets and returns the pointStrokeWidth attribute of the plotPoints generator.

Default: 0.1

### *(...)*.size()

Sets and returns the pointSymbolType attribute of the plotPoints generator.

Default: 3

### *(...)*.symbolType()

Sets and returns the pointSymbolType attribute of the plotPoints generator.

Default: d3.symbolSquare()


### *(...)*.arrowColor()

Sets and returns the arrowColor attribute of the plotArrows generator.

Default: "black"

### *(...)*.arrowWidth()

Sets and returns the arrowWidth attribute of the plotArrows generator.

Default: 0.5

## plotShots()

A helper function that returns a plotEvents generator with defaults modified to plot shots out of the box.

Specifically, it sets the event classPrefix to "shots", and the arrow ending locations to functions returning the shot.end_location values for the given event datapoint.

## plotPasses()

A helper function that returns a plotEvents generator with defaults modified to plot passes out of the box.

Specifically, it sets the event classPrefix to "passes", size to 0.8, and symbolType to d3.symbolCircle, and sets the arrow ending locations to functions returning the pass.end_location values for the given event datapoint.


## plotCarries()
A helper function that returns a plotEvents generator with defaults modified to plot carries/dribbles out of the box.

Specifically, it sets the event classPrefix to "carries",  symbolType to d3.symbolTriangle, and sets the arrow ending locations to functions returning the carry.end_location values for the given event datapoint.

## plotPoints()
Returns a new generator that, when called, plots the events passed to it as points onto the SVG pitch.

### *(...)*.pointClass() 
Sets and returns the CSS class for the plotted points. This allows for bespoke styling to be applied to the plotted points (though this cannot be done dynamically, as in when passing a function to the provided option methods). NOTE: if you are plotting multiple sets of events on a single pitch (eg. if you are plotting shots for both teams in a match seperately) then the plotters must have different class names.

Default: "points"

### *(...)*.pointFill()
Sets and returns the fill color for all the points to be plotted. This can be a single color, or can be a function that takes an event in the dataset and returns a color based on it.

Default: "white"

### *(...)*.pointStroke()
Sets and returns the outline color for the points to be plotted. This can be a single color, or can be a function that takes an event in the dataset and returns a color based on it.

Default: "black"

### *(...)*.pointStrokeWidth()
Sets and returns the outline width for the points to be plotted. This can be a single value, or can be a function that takes an event in the dataset and returns a value based on it.

Default: 0.1

### *(...)*.leftToRight()
If set to false, plots the events such that the event's team's goal line is on the right, and the other team's is on the left.

Default: true

### *(...)*.pointSymbolType()
Sets and returns the shape of the point plotted for each event. This implementation uses [d3-shape](https://github.com/d3/d3-shape#symbols) to define the plottable shapes, of which there are seven:

- d3.symbolSquare
- d3.symbolCircle
- d3.symbolTriangle
- d3.symbolDiamond 
- d3.symbolStar
- d3.symbolCross
- d3.symbolWye

Alternatively, it is possible to provide a custom symbol implementation, but instructions on how to do this are beyond the scope of this project.

This function can be a single symbol, or can be a function that takes an event in the dataset and returns a value based on it.

Default: d3.symbolSquare

### *(...)*.pointLocationX()
Sets and returns the function that takes the event in the dataset and returns the X location of the point on the plot.

Default: d => d.location[0]

### *(...)*.pointLocationY()
Sets and returns the function that takes the event in the dataset and returns the Y location of the point on the plot.

Default: d => d.location[1]

### *(...)*.pointSize()
Sets and returns the size of the symbols plotted for each event. This can be a single value, or can be a function that takes an event in the dataset and returns a size value based on it.

Default: 3

## plotArrows()

Returns a new generator that, when called, plots the events passed to it as arrows onto the SVG pitch.

### *(...)*.arrowClass()

Sets and returns the CSS class for the plotted arrows. This allows for bespoke styling to be applied to the plotted points (though this cannot be done dynamically, as in when passing a function to the provided option methods). NOTE: if you are plotting multiple sets of events on a single pitch (eg. if you are plotting shots for both teams in a match seperately) then the plotters must have different class names.

Default: "arrows"

### *(...)*.arrowColor()

Sets and returns the color for the arrows to be plotted. Due to how the SVG1.1 standard handles arrow heads at the end of lines, this cannot be set dynamically according to the dataset.

Default: "black"

### *(...)*.arrowWidth()

Sets and returns the width for the arrows to be plotted. This can be a single value, or can be a function that takes an event in the dataset and returns a value based on it.

Default: 0.5


### *(...)*.leftToRight()

If set to false, plots the events such that the event's team's goal line is on the right, and the other team's is on the left.

Default: true

### *(...)*.arrowStartingX()

Sets and returns the function that takes the event in the dataset and returns the starting X location of the arrow on the plot.

Default: d => d.location[0]

### *(...)*.arrowStartingY()

Sets and returns the function that takes the event in the dataset and returns the starting Y location of the arrow on the plot.

Default: d => d.location[1]

### *(...)*.arrowEndingX()

Sets and returns the function that takes the event in the dataset and returns the ending X location of the arrow on the plot. Because the ending locations for events in the Statsbomb dataset are specific to the type of event it is, the default value of this attribute is set to be the same as the starting location - this would need to be changed for the arrow to be useful.

Default: d => d.location[0]

### *(...)*.arrowEndingY()

Sets and returns the function that takes the event in the dataset and returns the ending Y location of the arrow on the plot. Because the ending locations for events in the Statsbomb dataset are specific to the type of event it is, the default value of this attribute is set to be the same as the starting location - this would need to be changed for the arrow to be useful.

Default: d => d.location[1]

