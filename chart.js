var color, data, width, height, radius, color1, color2;
var donutNumberId = 0;
'use strict';

if (window.ChartApp === undefined) {
    window.ChartApp = {};
}

ChartApp.init = function() {
        width = 250,
        height = 250,
        radius = Math.min(width, height) / 2;
    d3.json("data.json", function(d) {
        console.log(d);
        var smartphone = d.statisticsByDevice.smartphone;
        var tablet = d.statisticsByDevice.tablet;

        data = [smartphone.percentageRevenue, tablet.percentageRevenue];
        // first donut
        color1 = "#004d00", color2 = "#33ff33";
        color = d3.scale.ordinal()
            .range([color1, color2]);
        ChartApp.Donut(width, height, radius, data, "REVENUES", ChartApp.numberWithDots(parseInt(smartphone.revenue) + parseInt(tablet.revenue)));
        ChartApp.addValuesToChart("donutChart1", tablet.percentageRevenue, tablet.revenue, smartphone.percentageRevenue, smartphone.revenue, color2, color1);
        // second donut
        data = [smartphone.percetageImpresions, tablet.percetageImpresions];
        color1 = "#006680", color2 = "#1ad1ff";
        color = d3.scale.ordinal()
            .range([color1, color2]);
        ChartApp.Donut(width, height, radius, data, "IMPRESIONS", ChartApp.numberWithDots(parseInt(smartphone.impresions) + parseInt(tablet.impresions)));
        ChartApp.addValuesToChart("donutChart2", tablet.percetageImpresions, tablet.impresions, smartphone.percetageImpresions, smartphone.impresions, color2, color1);
        //third donut
        data = [smartphone.percentageVisits, tablet.percentageVisits];
        color1 = "#ff6600 ", color2 = "#ffcc00";
        color = d3.scale.ordinal()
            .range([color1, color2]);
        ChartApp.Donut(width, height, radius, data, "VISITS",ChartApp.numberWithDots(parseInt(smartphone.visits) + parseInt(tablet.visits)));
        ChartApp.addValuesToChart("donutChart3", tablet.percentageVisits, tablet.visits, smartphone.percentageVisits, smartphone.visits, color2, color1);
    });
}


window.onload = function(e) {
    ChartApp.init();
}

ChartApp.addValuesToChart = function(elementId, data1, data2, data3, data4, color1, color2) {

    var tbl1 = document.createElement("table");
    var hr = document.createElement("hr");
    tbl1.style.width = '45%';
    //tbl1.setAttribute('border', '1');
    tbl1.setAttribute('class', 'tableRight');
    var th = tbl1.createTHead().insertRow(0).insertCell(0);
    th.style.color = color1;
    th.innerHTML = ' Tablet ';
    tbl1.insertRow(1).insertCell(0).innerHTML = data1 + "% " + ChartApp.numberWithDots(data2) + '\u20AC';

    var tbl2 = document.createElement("table");
    tbl2.style.width = '45%';
    tbl2.style.cssFloat = 'right';
    tbl2.style.marginTop = '-35px';
    tbl2.setAttribute('class', 'tableLeft');
  //  tbl2.setAttribute('border', '1');
    var th= tbl2.createTHead().insertRow(0).insertCell(0);
    th.style.color = color2;
    th.innerHTML = ' Smartphone ';
    ChartApp.numberWithDots(data3);

    tbl2.insertRow(-1).insertCell(0).innerHTML = data3 + "% " + ChartApp.numberWithDots(data4) + '\u20AC';

    var element = document.getElementById(elementId);
    element.appendChild(tbl1);
    element.appendChild(tbl2);
    element.appendChild(hr);
}

ChartApp.Canvas = function(width, height) {
    donutNumberId += 1;
    return d3.select("#donutChart").append("div")
        .attr("id", "donutChart" + donutNumberId + "")
        .attr("class", "col-md-4")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
}

ChartApp.Donut = function(width, height, radius, data, donutName, total) {
    var group = ChartApp.Canvas(width, height).append("g")
        .attr("transform", "translate(125,125)");
    // arc generator
    var arc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 46);

    var donut = d3.layout.pie().value(function(d) {
        return d;
    }).sort(null);

    var arcs = group.selectAll(".arc")
        .data(donut(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
            return color(d.data);
        });

    group.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "text-center")
        .style('fill', 'grey')
        .text(donutName);

    group.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "20")
        .attr("class", "text-center")
        .text(total + "\u20AC");

}


ChartApp.numberWithDots = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
