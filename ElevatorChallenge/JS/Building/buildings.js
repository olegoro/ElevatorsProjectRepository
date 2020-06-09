const BLD_WIDTH = 350;

//amntFloors - number of floors in the building.
//amntElvs - number of elevatord in the building.
//amntBuilds - number of buildings.
function setUpBuildings(amntFloors, amntElvs, amntBuilds)
{   
    var dist = 5;
 
    for (var i = 1; i <= amntBuilds; i++)
    {
        setUpBuildng(amntFloors, dist, i, amntElvs);
        dist += BLD_WIDTH;
        buildElevators(amntElvs, dist, i - 1);
        dist += (amntElvs * 100) + 50;              
    }
}

setUpBuildings(15, 5, 7);