
degrees_to_radians = (degs)=> {
  var pi = Math.PI
  return degs/(180/pi)
};

Pie.prototype.getPadForPoint = function(point) {
  var result = null;
  this.pads.forEach((pad, i)=>{
    if (pad.containsPoint(this.circle, point)) {
      result = pad;
      return false;
    }
  });
  return result;
}

function getRelPointForEvent(element, event) {
  return { x: (event.pageX - element.getBoundingClientRect().left), y: (event.pageY - element.getBoundingClientRect().top) };
}


Pad.prototype.containsPoint = function(circle, point) {
  return this.sector.containsPoint(circle, point);
}

Circle.prototype.containsPoint = function(point) {


  var relPoint = this.pointToRelPoint(point);


  return Math.pow(relPoint.x, 2) + Math.pow(relPoint.y, 2)
    <= this._radiusSquared;
}

Circle.prototype.getAngleForPoint = function(point) {

  var relPoint = this.pointToRelPoint(point);
  return Math.atan2(-relPoint.y, -relPoint.x) + Math.PI;
}

Circle.prototype.pointToRelPoint = function(point) {
  var radians = degrees_to_radians(startDegrees % 360)

  var x = (point.x)*(Math.cos(radians)) + (point.y)*(Math.sin(radians))

  var y = (point.y)*(Math.cos(radians)) - (point.x)*(Math.sin(radians))

  return { x: x - this.center.x, y: y - this.center.y }
}

CircleSector.prototype.containsAngle = function(angle) {
  return (angle >= this.startAngle) && (angle < this.endAngle);
}

CircleSector.prototype.containsPoint = function(circle, point) {
  return circle.containsPoint(point)
    && this.containsAngle(circle.getAngleForPoint(point));
}