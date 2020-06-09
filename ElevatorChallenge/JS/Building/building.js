const FLOOR_DIST = 125;
const BUILD_DIST = 117;
const FLOOR_SPEED = 500;
const FLOOR_TIME_TO_WAIT = 2000;

//floors - number of floors in the building.
//leftDist - distance from the left building.
//buildingID - serial number of the building.
//amntElvs - number of elevators in the building.
function setUpBuildng(floors, leftDist, buildingID, amntElvs)
{
    var data = "";
    var dist = 15;
    var line = 0;
   
    for (i = 0; i <= floors; i++)
    {                         
        data += "<div style='bottom:" + line + "px; left:" + leftDist + "px;' class='blackline'>";
        data += "</div>";       
        data += "<div  style='bottom:" + dist + "px; left:" + leftDist + "px;' class='floor'>";  
        data += "<div class='clock'></div>";    
        data += "<button onclick='elevators[" + (amntElvs * (buildingID - 1)) + "].pushButton(this, " 
                                                    + amntElvs + ");' class='metal linear'>" + i + "</button>";
        data += "</div>";                 

        dist += FLOOR_DIST;
        line += FLOOR_DIST;
    }

    document.write(data); 
}

//elmnt - the button, we've pushed.
//elevatorID - the id of the elevator we've called.
//amntElvs - number of elevators in the building.
function lightButton(elmnt, elevatorID, amntElvs)
{  
    var timeLeft = 0; 
    var elevator = getClosestElevator(elmnt, elevatorID, amntElvs);
      
    elmnt.style.color = 'green';
    
    if (!elevator.IsRunning)
    {
        timeLeft = elevator.TimeLeft; 
        elevator.PrevTimes = 0;      
    }

    else
    {
        if (elevator.PredTimes.length == 1)
            timeLeft = elevator.TimeLeft;         

        else
        {         
            elevator.PrevTimes += (Math.abs(elevator.TempPrev - elevator.TempFloor) * FLOOR_SPEED +
                                                                                 FLOOR_TIME_TO_WAIT);                  
            timeLeft = elevator.TimeLeft + elevator.PrevTimes;                 
        }

        if (elevator.TempPrev == null)
            elevator.TempPrev = elevator.PrevFloor;

        else
            elevator.TempPrev = elevator.TempFloor;
         
        elevator.TempFloor = elmnt.innerText;
    }
  
    elevator.PredTimes.push(timeLeft);

    setTimeout(function() { callElevator(elmnt, elevator); } , elevator.PredTimes[elevator.PredTimes.length - 1]);      
}

//elmnt - the button, we've pushed.
//elevator - the next elevator, set by timeout.
function callElevator(elmnt, elevator)
{   
    var elem = document.getElementById(elevator.ID);

    elevator.IsRunning = true;

    elevator.Position = elevator.Floor * FLOOR_DIST;
    
    elevator.Floor = elmnt.innerText;
     
    var time = new Date(Math.abs(elevator.PrevFloor - elevator.Floor) * FLOOR_SPEED);

    elevator.TimeLeft = time.getTime() + FLOOR_TIME_TO_WAIT;

    elevator.PrevFloor = elevator.Floor;

    var id = setInterval(go, 4);

    function go() {

        if (elevator.Position == (elmnt.innerText * FLOOR_DIST)) {

            clearInterval(id);  
            elem.Floor = elmnt.innerText;   
            elmnt.style.color = '';           
            elmnt.parentElement.firstChild.innerText = "";
            elevator.TempPrev = null;
            elevator.TempFloor = null;

            if (elevator.PredTimes.length > 0)                  
                elevator.PredTimes.splice(0, 1);

            elevator.IsRunning = false;

            new Audio('/Sounds/ding.mp3').play();

            id = setInterval(wait, 10);         
        } 
        else if (elmnt.innerText * FLOOR_DIST > elevator.Position)                      
            moveElevator(time, elevator, elmnt, elem, elevator.Position + 1);

        
        else                
            moveElevator(time, elevator, elmnt, elem, elevator.Position - 1);
             
    }
      
    function wait()
    {        
        if (elevator.TimeLeft == 0)           
            clearInterval(id);                          
     
        else
            elevator.TimeLeft -= 10;   
    }   
}

//time - the time within which the elevator has to pass from the previous floor to the current.
//elevator - the next elevator, set by timeout.
//elmnt - the button, we've pushed.
//elvElem - the element of the elevator, we've called.
//elvPosition - position of the running elevator.
function moveElevator(time, elevator, elmnt, elvElem, elvPosition)
{
    time.setMilliseconds(time.getMilliseconds() - 4);
    elevator.TimeLeft = time.getTime() + FLOOR_TIME_TO_WAIT;
    elmnt.parentElement.firstChild.innerText =  time.getUTCSeconds() + ":" + time.getUTCMilliseconds();
        
    elevator.Position = elvPosition; 
    elvElem.style.bottom = elevator.Position + 'px';            

}

//elmnt - the button, we've pushed.
//elevatorID - the id of the elevator we've called.
//amntElvs - number of elevators in the building.
function getClosestElevator(elmnt, elevatorID, amntElvs)
{   
    var min = Number.MAX_VALUE;
    var closestElv; 

    for (var i = elevatorID; i <= elevatorID + (amntElvs - 1); i++)
    {

        if (!elevators[i].IsRunning)
        {
            if (Math.abs(elevators[i].Floor - elmnt.innerText) < min)
            {
                min = Math.abs(elevators[i].Floor - elmnt.innerText);               
                closestElv = elevators[i];
            }
        }

        else
        {           
            if (elevators[i].TimeLeft + elevators[i].PrevTimes < min)
            {
                min = elevators[i].TimeLeft;
                closestElv = elevators[i];
            }
        }
    }

    return closestElv;
}


