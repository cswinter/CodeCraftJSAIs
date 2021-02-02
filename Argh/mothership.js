// After making changes, click the 'Restart' button
// to restart the game and update the code
var _droneController = {
  stat: true,
  // this function will be called on every timestep
  onTick: function() {
    // your code goes here
    // you can access your drone via this.drone
    if (!Game.mothership.sites) {
      Game.mothership.sites = [];
    }
    if (!Game.mothership.seen) {
      Game.mothership.seen = [];
    }

    var drones = this.drone.enemiesInSight;
    if (drones) {
      for (var i in drones) {
        if (this.drone.isInMissileRange(drones[i])) {
          this.drone.fireMissilesAt(drones[i]);
        }
      }
    }
    if (!this.drone.isMoving&&!this.drone.isConstructing) {
      this.stat = !this.stat;
    }
    if (this.stat&&!this.drone.isMoving&&Math.random()<0.5) {
      var x = Math.random() * 1200 - 600;
      var y = Math.random() * 1200 - 600;
      var pos = this.drone.position;
      this.drone.moveTo(pos.x + x, pos.y +  y);
    }
    if (!this.stat&&!this.drone.isConstructing) {
      if (!Game.mothership.dnum) {Game.mothership.dnum=7;}
      switch (--Game.mothership.dnum) {
        case -1: case 0: {
          Game.mothership.dnum = 6;
          make = 'Harvester';
          modules = {storageModules: 2};
          break;
        }
        case 2: {
          modules = {missileBatteries: 2, shieldGenerators: 2};
          make = 'Bigship';
          break;
        }
        case 3: {
          make = 'Warrior';
          modules = {missileBatteries: 1, shieldGenerators: 1};
          break;
        }
        case 4: {
          make = 'Scout';
          modules = {engines: 1};
          break;
        }
        case 5: {
          make = 'Harvester';
          modules = {storageModules: 1};
          break;
        }
        default: {
          make = 'Harvester';
          modules = {storageModules: 1};
        }
      }

      this.drone.buildDrone(make, modules);
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

};
