var k = [ 0, 1, 0 ]
var j = [ 1, 0, 0 ]

var d = cross(k, j)
console.log(d)
function cross(a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    var rx = ay * bz - az * by
    var ry = az * bx - ax * bz
    var rz = ax * by - ay * bx
    return [ rx, ry, rz ]
}