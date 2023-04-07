const canvas = document.createElement("canvas");
canvas.id = "myCanvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";

const body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function drawArt() {
  var points = [];
  var colors = [];
  var xo, yo;
  var dens_min=2;
  var dens_max=15;
  var map_max;
  var stroke_size=1;
  var background_color_r=0;
  var background_color_g=0;
  var background_color_b=0;

  ctx.fillStyle = `rgb(${background_color_r}, ${background_color_g}, ${background_color_b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  noiseDetail(1);
  angleMode(DEGREES);
  xo = canvas.width / 2;
  yo = canvas.height / 2;
  map_max = max(canvas.width, canvas.height);

  var original_density = 10;
  var space = canvas.width / original_density;

  for (var x = 0 - 2 * space; x < canvas.width + 2 * space; x += space) {
    for (var y = 0 - 2 * space; y < canvas.height + 2 * space; y += space) {
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

  for (var i = 0; i < points.length; i++) {
    var groupSize = ceil(points.length / colors.length);
    var groupIndex = floor(i / groupSize);
    var color = colors[groupIndex];

    var r = map(points[i].x, 0, canvas.width, color.r1, color.r2);
    var g = map(points[i].y, 0, canvas.height, color.g1, color.g2);
    var b = map(points[i].x, 0, canvas.width, color.b1, color.b2);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    var pp = createVector(points[i].y*m0 - yo*m0 - (points[i].x*m1 - xo*m1),-(points[i].x*m2 - xo*m2) - (points[i].y*m3 - yo*m3));
    var pp_angle = pp.heading();
    var fpp = createVector(cos(pp_angle), sin(pp_angle));
    points[i].add(fpp);
    ctx.ellipse(points[i].x, points[i].y, stroke_size);
  }
  triggerPreview();

}
