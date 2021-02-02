// After making changes, click the 'Restart' button
// to restart the game and update the code

var _droneController = {
  onSpawn: function() {
    if (!Game.mothership.sites) {
      Game.mothership.sites = [];
    }
  },
  // this function will be called on every timestep
  onTick: function() {
    // your code goes here
    // you can access your drone via this.drone
    if (this.drone.availableStorage === 0) {
      this.drone.moveTo(Game.mothership);
    } else if (!this.drone.isHarvesting && !this.drone.isMoving) {
      if (Game.mothership.sites.length) {
        do {
         var site = Game.mothership.sites.shift();
        } while (site.mineralHarvested)
        this.drone.moveTo(site);
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
    }
  },

  onArrivesAtMineral: function(mineral) {
    this.drone.harvest(mineral);
    if (!mineral.harvested) {
      Game.mothership.sites.push(mineral);
    }
  },

  onArrivesAtDrone: function(drone) {
    this.drone.giveResourcesTo(drone);
  },

};
