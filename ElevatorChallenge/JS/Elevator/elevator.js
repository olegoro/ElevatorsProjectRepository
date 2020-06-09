function Elevator(id, floor, prevFloor, position, timeLeft, prevTimes,tempPrev, tempFloor, isRunning){

    //Properties
    this.ID = id;
    this.Floor = floor;
    this.PrevFloor = prevFloor;
    this.Position = position;
    this.TimeLeft = timeLeft;
    this.IsRunning = isRunning;
    this.PrevTimes = prevTimes;
    this.TempPrev = tempPrev;
    this.TempFloor = tempFloor;
    this.PredTimes = [];   
}

Elevator.prototype.pushButton = function(elmnt, amntElvs){ 

    lightButton(elmnt, this.ID, amntElvs);   
};







