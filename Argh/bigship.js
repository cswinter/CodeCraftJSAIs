// After making changes, click the 'Restart' button
// to restart the game and update the code
var _droneController = {
  // this function will be called on every timestep
  onTick: function() {
    // your code goes here
    // you can access your drone via this.drone
    var drones = this.drone.enemiesInSight;
    if (drones) {
      for (var i in drones) {
        if (this.drone.isInMissileRange(drones[i])) {
          this.drone.fireMissilesAt(drones[i]);
        }
      }
    }
    
    if(!this.drone.isMoving){
      if (Game.mothership.seen.length>0) {
        var enemy = Game.mothership.seen.shift();
        this.drone.moveTo(enemy.lastKnownPosition);
      } else {
        var x = Math.random() * 800 - 400;
        var y = Math.random() * 800 - 400;
        var pos = this.drone.position;
        this.drone.moveTo(pos.x + x, pos.y +  y);
      }
    }

  },

  onMineralEntersVision: function(mineral) {
    if (!Game.mothership.sites) {
      Game.mothership.sites = [];
    }
    if (!Game.mothership.sites.includes(mineral)) {
      Game.mothership.sites.push(mineral);
    }
  },

  onDroneEntersVision: function(drone) {
    if (drone.isEnemy) {
      if (!Game.mothership.seen) {
        Game.mothership.seen = [];
      }
      if (!Game.mothership.sites.includes(drone)) {
        Game.mothership.seen.push(drone);
      }
      if (this.drone.isInMissileRange(drone)) {
        this.drone.fireMissilesAt(drone);
      }
      this.drone.moveTo(drone);
    }
  },


};
