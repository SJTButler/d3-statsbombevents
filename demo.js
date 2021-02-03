drawPitch1 = d3.pitch()
    .height(650)
    .width(800)

pitch1 = d3.select("#pitch1")
    .call(drawPitch1)


drawPitch2 = d3.pitch()
    .height(650)
    .width(800)
    .bgcolor("black")
    .linecolor("white")

pitch2 = d3.select("#pitch2")
    .call(drawPitch2)



drawPitch3 = d3.pitch()
    .height(650)
    .width(650)
    .bgcolor("white")
    .linecolor("black")
    .viewbox("40 -5 90 90")
pitch3 = d3.select("#pitch3")
    .call(drawPitch3)




d3.json("https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/2275104.json")
    .then(sb_callback)


function sb_callback(data) {


    // pitch1 shot plotter
    shots = data.filter(x => x["type"]["name"] == "Shot")
    goals = data.filter(x => x["type"]["name"] == "Shot" && x["shot"]["outcome"]["name"] == "Goal")

    arsenal_goals = goals.filter(x => x.team.name == "Arsenal WFC")
    bristol_goals = goals.filter(x => x.team.name == "Bristol City WFC")

    shotplotter_arsenal = d3.plotShots()
        .classPrefix("AWFC")
        .size(d => Math.sqrt(d.shot.statsbomb_xg) * 10)
        .symbolType(d => (d.player.name == "Vivianne Miedema" ? d3.symbolSquare : d3.symbolCross))

    pitch1.datum(arsenal_goals).call(shotplotter_arsenal)

    shotplotter_bristol = shotplotter_arsenal
        .classPrefix("BWFC")
        .leftToRight(false)

    pitch1.datum(bristol_goals).call(shotplotter_bristol)

    //pitch2 pass plotter
    passes_to_miedema = data.filter(x => 
        x["type"]["name"] == "Pass" 
        && "recipient" in x["pass"]
        && x["pass"]["recipient"]["name"] == "Vivianne Miedema")

    passplotter = d3.plotPasses()
        .classPrefix("toMiedema")
        .arrowColor("white")

        
    pitch2.datum(passes_to_miedema).call(passplotter)

    //pitch3 carry plotter

    arsenal_carries_into_box = data.filter(x =>
        x["type"]["name"] == "Carry"
        && x["team"]["name"] == "Arsenal WFC"
        && x["carry"]["end_location"][0] >= 102
        && x["carry"]["end_location"][1] >= 18
        && x["carry"]["end_location"][1] <= 62
        )

    carryplotter = d3.plotCarries()
        .classPrefix("AFC_intoBox")

    pitch3.datum(arsenal_carries_into_box).call(carryplotter)
}
