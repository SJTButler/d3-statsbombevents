drawPitch1 = d3.pitch()
    .height(650)
    .width(800)

pitch1 = d3.select("#pitch1")
    .call(drawPitch1)


/*
drawPitch2 = d3.pitch()
    .bgcolor("white")
    .linecolor("black")

pitch2 = d3.select("#pitch2")
    .call(drawPitch2)

drawPitch3 = d3.pitch()
    .viewbox("40 -5 130 90")
pitch3 = d3.select("#pitch3")
    .call(drawPitch3)
*/



d3.json("https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/2275104.json")
    .then(sb_callback)


function sb_callback(data) {

    shots = data.filter(x => x["type"]["name"] == "Shot")
    goals = data.filter(x => x["type"]["name"] == "Shot" && x["shot"]["outcome"]["name"] == "Goal")


    arsenal_goals = goals.filter(x => x.team.name == "Arsenal WFC")
    bristol_goals = goals.filter(x => x.team.name == "Bristol City WFC")

    /*
    shotPoints_arsenal = d3.plotPoints()
        .pointClass("AWFC_shots")
        .pointSize(d => Math.sqrt(d.shot.statsbomb_xg)*10)

    shotArrows_arsenal = d3.plotArrows()
        .arrowClass("AWFC_arrows")
        .arrowEndingX(d => d.shot.end_location[0])
        .arrowEndingY(d => d.shot.end_location[1])

    pitch1.datum(shots).call(shotArrows_arsenal)
    pitch1.datum(arsenal_goals).call(shotArrows_arsenal)
    pitch1.datum(shots).call(shotPoints_arsenal)
    pitch1.datum(arsenal_goals).call(shotPoints_arsenal)
   */

    shotplotter_arsenal = d3.plotShots()
        .shotClassPrefix("AWFC")
        .shotSize(d => Math.sqrt(d.shot.statsbomb_xg) * 10)

    pitch1.datum(arsenal_goals).call(shotplotter_arsenal)




    /*
    shotplot2 = d3.plotShots()
        .shotcolor((d) => d.shot.outcome.name == "Goal" ? "red" : "black")
        .shotsize((d) => d.shot.statsbomb_xg * 2)
        .leftToRight(false)
    pitch2.datum(shots).call(shotplot2)
    
    pitch3.datum(goals).call(shotplot)
    */

}
