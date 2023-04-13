function drawArt(){
  
  noLoop();  
    
  var points = [];
  var colors = [];
  var xo, yo;
  var dens_min=cs/2000;
  var dens_max=cs/400;
  var map_max;
  var stroke_size=cs/400;
  var background_color_r=0;
  var background_color_g=0;
  var background_color_b=0;
  
  pg.background(background_color_r,background_color_g,background_color_b);
  noiseDetail(1);
  angleMode(DEGREES);
  xo = cs / 2;
  yo = cs / 2;
  map_max=cs;
    
  var original_density = cs/500;
  var space = width / original_density;

  for (var x = 0 - 2 * space; x < cs + 2 * space; x += space) {
    for (var y = 0 - 2 * space; y < cs + 2 * space; y += space) {
      var d = dist(x, y, xo, yo);
      var dens = map(d, 0, map_max, dens_max, dens_min);
      for (var i = 0; i < dens; i++) {
        var p = createVector(x + (-space/2+randomM0()*(space / 2)), y + (-space/2+randomM0()*(space / 2)));
        points.push(p);
      }
    }
  }

  points.sort(function(a, b) {
    return dist(b.x, b.y, xo, yo) - dist(a.x, a.y, xo, yo);
  });

  var numColors = abs(1+m0*4);

  for (var i = 0; i < numColors; i++) {
    var color = {
      r1: randomM1() * 255,
      r2: randomM1() * 255,
      g1: randomM2() * 255,
      g2: randomM3() * 255,
      b1: randomM4() * 255,
      b2: randomM4() * 255
    };
    colors.push(color);
  }

  for (var ix = 0; ix < cs/4; ix++) {



  pg.noStroke();

  for (var i = 0; i < points.length; i++) {
    var groupSize = ceil(points.length / colors.length);
    var groupIndex = floor(i / groupSize);
    var color = colors[groupIndex];

    var r = map(points[i].x, 0, cs, color.r1, color.r2);
    var g = map(points[i].y, 0, cs, color.g1, color.g2);
    var b = map(points[i].x, 0, cs, color.b1, color.b2);
    pg.fill(r, g, b);

    var pp = createVector(points[i].y*(-100+m1*(2*100)) - yo*(-100+m1*(2*100)) - (points[i].x*(-100+m2*(2*100)) - xo*(-100+m2*(2*100))),-(points[i].x*(-100+m3*(2*100)) - xo*(-100+m3*(2*100))) - (points[i].y*(-100+m4*(2*100)) - yo*(-100+m4*(2*100))));
    var pp_angle = pp.heading();
    var fpp = createVector(cos(pp_angle), sin(pp_angle));
    points[i].add(fpp);
    pg.ellipse(points[i].x, points[i].y, stroke_size);
  }
}
    triggerPreview();
}
