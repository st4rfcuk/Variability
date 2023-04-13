"Curves" is a project created by @st4rfcuk based on 5 parameters :

- m0 : use it to change the number of colors (From 1 to 5)
- m1 : use it to change vectors orientation
- m2 : use it to change vectors orientation
- m3 : use it to change vectors orientation
- m4 : use it to change vectors orientation

The m1, m2, m3, m4 are implemented in the spiral equation which is : (y-y0-(x-x0),-(x-x0)-(y-y0)) that becomes :
---> (y*(-100+m1*(2*100)) - yo*(-100+m1*(2*100)) - (.x*(-100+m2*(2*100)) - xo*(-100+m2*(2*100))),-(x*(-100+m3*(2*100)) - xo*(-100+m3*(2*100))) - (y*(-100+m4*(2*100)) - yo*(-100+m4*(2*100))).

The other parameters such as density, stroke size, number of iterations/points ar based on cs value.
