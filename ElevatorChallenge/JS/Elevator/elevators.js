var elevators = [];
const ELV_DIST = 100;

//amount - number of elevators in the building.
//distLeft - distance of the elevator from the left elevator or building.
//elevatorID - the id, we set to the elevator.
function buildElevators(amount, distLeft, elevatorID)
{
    var data = "";

    for (var i = elevatorID * amount; i <= amount * (elevatorID + 1) - 1; i++)
    {
        data += "<div id="  + i + " style='left:" + distLeft + "px;' class='elevator'>";
        data += "<img class='elv' src='/Images/elv.png'>";
        data += "</div>";

        distLeft += ELV_DIST;
               
        elevators[i] = new Elevator(i, 0, 0, 0, 0, 0, null, null, false);

    }
 
    document.write(data); 
}




