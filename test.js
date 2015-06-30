function normalize(vec) {
  var x = vec[0]
  var y = vec[1]
  var z = vec[2]
  var squaredLength = x*x + y*y + z*z

  if (squaredLength > 0) {
    var length = Math.sqrt(squaredLength)
    vec[0] = vec[0] / length
    vec[1] = vec[1] / length
    vec[2] = vec[2] / length
  }
  return vec
}

var a = [ 0, 4, -3 ]
normalize(a)
//=> [ 0, 0.8, -0.6000000000000001 ]
console.log(normalize(a), a)