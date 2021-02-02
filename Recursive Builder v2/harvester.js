var _droneController = {
 
  onTick: function() {
    if (!this.drone.isMoving && this.drone.availableStorage === 0) {
      this.drone.moveTo(Game.mothership);
    } 
    else if (!this.drone.isHarvesting && !this.drone.isMoving) {
      var x = Math.random() * 800 - 400;
      var y = Math.random() * 800 - 400;
      var lastPos = this.drone.lastKnownPosition;
      this.drone.moveTo(lastPos.x + x, lastPos.y +  y);
    }
  },
  onDroneEntersVision: function(drone) {
    if (!drone.isEnemy && this.drone.availableStorage == 0 && drone.availableStorage >= this.drone.storedResources)
      this.drone.moveTo(drone);
  },
  onMineralEntersVision: function(mineral) {
    if (this.drone.availableStorage > 0) {
      this.drone.moveTo(mineral);
    }
  },
  onArrivesAtMineral: function(mineral) {
    this.drone.harvest(mineral);
  },
  onArrivesAtDrone: function(drone) {
    this.drone.giveResourcesTo(drone);
  },
  onSpawn: function() {
    if (!Game.mothership.numHarvesters) {
      Game.mothership.numHarvesters = 1;
    } else {
      Game.mothership.numHarvesters++;
    }
  },
  onDeath: function() {
    console.log("ms " + Game.mothership);
    Game.mothership.numHarvesters -= 1;
    console.log("lost a harverster, now have " + 
      Game.mothership.numHarvesters);
  }
};
