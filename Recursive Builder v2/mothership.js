var _droneController = {
  onTick: function() {
    var enemies = this.drone.enemiesInSight;
      
    if (enemies.length > 0) {
      this.drone.moveTo(enemies[0].position);
      this.drone.fireMissilesAt(enemies[0]);
    }
    else if (!this.drone.isMoving) {
      // why don't the mother ships move?
      var x = Math.random() * 1800 - 900;
      var y = Math.random() * 1800 - 900;
      this.drone.moveTo(x, y);
    }
    
    if (!this.drone.isConstructing) {
      var modules = {};
      if (!Game.mothership.numHarvesters 
          || Game.mothership.numHarvesters < Game.mothership.maxHarvesters) {
        modules.storageModules = 1;
        this.drone.buildDrone('Harvester', modules);
      } else {
        var r = Math.random();
        if (r < 0.4) {
          modules.missileBatteries = 1;
          modules.shieldGenerators = 1;
          modules.constructors = 1;
          modules.storageModules = 1;
          this.drone.buildDrone('Mothership', modules)
        } else {
          modules.missileBatteries = 2;
          modules.shieldGenerators = 1;
          //modules.engines = 1;
          this.drone.buildDrone('Warrior', modules);
        }
      }
      //console.log("numH = " +this.numHarvesters);
    }
  },
  onSpawn: function() {
    if (!Game.mothership.maxHarvesters) {
      Game.mothership.maxHarvesters = 2;
    }
    Game.mothership.maxHarvesters++;
    console.log("new maxH = " + Game.mothership.maxHarvesters);
  },
};
