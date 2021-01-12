drawPitch1 = d3.pitch()

pitch1 = d3.select("#pitch1")
    .call(drawPitch1)


drawPitch2 = d3.pitch()
    .bgcolor("white")
    .linecolor("black")

pitch2 = d3.select("#pitch2")
    .call(drawPitch2)

drawPitch3 = d3.pitch()
    .viewbox("40 -5 130 90")
pitch3 = d3.select("#pitch3")
    .call(drawPitch3)


d3.json("https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/2275104.json")
    .then(sb_callback)


function sb_callback(data) {

    shots = data.filter(x => x["type"]["name"] == "Shot")
    goals = data.filter(x => x["type"]["name"] == "Shot" && x["shot"]["outcome"]["name"] == "Goal")


    shotplot = d3.plotShots()
    pitch1.datum(goals).call(shotplot)

    shotplot2 = d3.plotShots()
        .shotcolor((d) => d.shot.outcome.name == "Goal" ? "red" : "black")
        .shotsize((d) => d.shot.statsbomb_xg * 2)
        .leftToRight(false)
    pitch2.datum(shots).call(shotplot2)


    pitch3.datum(goals).call(shotplot)



}
