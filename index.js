var points = [];
var colors = [];
var r1;
var r2;
var g1;
var g2;
var b1;
var b2;
var xo, yo;
var var1;
var var2;
var var3;
var var4;
var dens_min=2;
var dens_max=15;
var map_max;
var stroke_size=1;
var background_color_r=0;
var background_color_g=0;
var background_color_b=0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(background_color_r,background_color_g,background_color_b);
  noiseDetail(1);
  angleMode(DEGREES);
  xo = width / 2;
  yo = height / 2;
  map_max=max(width,height);
  //var1=random(-100,100);
  //var2=random(-100,100);
  //var3=random(-100,100);
  //var4=random(-100,100);
  
  //console.log(var1,var2,var3,var4)
  
  var original_density = 10;
  var space = width / original_density;

  for (var x = 0 - 2 * space; x < width + 2 * space; x += space) {
    for (var y = 0 - 2 * space; y < height + 2 * space; y += space) {
      var d = dist(x, y, xo, yo);
      var dens = map(d, 0, map_max, dens_max, dens_min);
      for (var i = 0; i < dens; i++) {
        var p = createVector(x + random(-space / 2, space / 2), y + random(-space / 2, space / 2));
        points.push(p);
      }
    }
  }

  points.sort(function(a, b) {
    return dist(b.x, b.y, xo, yo) - dist(a.x, a.y, xo, yo);
  });

  var numColors = m4;

  for (var i = 0; i < numColors; i++) {
    var color = {
      r1: random(0, 255),
      r2: random(0, 255),
      g1: random(0, 255),
      g2: random(0, 255),
      b1: random(0, 255),
      b2: random(0, 255)
    };
    colors.push(color);
  }
}

function draw() {
  noStroke();

  if (2*frameCount <= points.length) {
    var max = 2*frameCount;
  } else {
    var max = points.length;
  }

  for (var i = 0; i < max; i++) {
    var groupSize = ceil(points.length / colors.length);
    var groupIndex = floor(i / groupSize);
    var color = colors[groupIndex];

    var r = map(points[i].x, 0, width, color.r1, color.r2);
    var g = map(points[i].y, 0, height, color.g1, color.g2);
    var b = map(points[i].x, 0, width, color.b1, color.b2);
    var alpha = map(dist(xo, yo, points[i].x, points[i].y), 0, width, 255, 0);
    fill(r, g, b);

    var pp = createVector(points[i].y*m0 - yo*m0 - (points[i].x*m1 - xo*m1),-(points[i].x*m2 - xo*m2) - (points[i].y*m3 - yo*m3));
    var pp_angle = pp.heading();
    var fpp = createVector(cos(pp_angle), sin(pp_angle));
    points[i].add(fpp);
    ellipse(points[i].x, points[i].y, stroke_size);
  }
}
