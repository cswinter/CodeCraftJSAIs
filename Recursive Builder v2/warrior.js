var _droneController = {
  onTick: function() {
    var nearbyDrones = this.drone.dronesInSight;
    var firstEnemy = nearbyDrones.find(function(d) {
      return d.isEnemy;
    })
      
    if (firstEnemy) {
      this.drone.moveTo(firstEnemy.position);
      this.drone.fireMissilesAt(firstEnemy);
    }
    else if (!this.drone.isMoving) {
      var x = Math.random() * 1800 - 900;
      var y = Math.random() * 1800 - 900;
      this.drone.moveTo(x, y);
    }
  }
};
