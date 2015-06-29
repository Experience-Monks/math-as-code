var a = [0, 4, -3]
var normalizedA = normalize(a)

//=> [ 0, 0.8, -0.6000000000000001 ]

function normalize(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        len = 1 / Math.sqrt(len)
        a[0] = a[0] * len
        a[1] = a[1] * len
        a[2] = a[2] * len
    }
    return a
}
console.log(normalizedA)