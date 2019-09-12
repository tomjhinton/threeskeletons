const THREE = require('three')


const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)

camera.position.set(0, 0, 50)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const scene = new THREE.Scene()

var geometry = new THREE.BoxGeometry(10, 5, 5,)

for (var i = 0; i < geometry.vertices.length; i++) {
  geometry.skinIndices.push(new THREE.Vector4(1, 0.5, 0.1, 0))
  geometry.skinWeights.push(new THREE.Vector4(1, 0.3, 0.1, 0))
}





var bones = []

var bone1 = new THREE.Bone()
bone1.position.x = 1
bones.push(bone1)
bone1.add(bone2)
var bone2 = new THREE.Bone()
bone2.position.x = -5
var bone3 = new THREE.Bone()
bone3.position.x = -25
bone2.add(bone3)
bones.push(bone2)
bones.push(bone3)



var video = document.getElementById( 'video' )

var texture = new THREE.VideoTexture( video )
texture.minFilter = THREE.LinearFilter
texture.magFilter = THREE.LinearFilter
texture.format = THREE.RGBFormat


video.src = 'src/testvid.mov'
video.preload = 'auto'
video.load()
video.play()
video.loop = true



var material = new THREE.MeshBasicMaterial({
  map: texture,
  skinning: true

})







var mesh = new THREE.SkinnedMesh(geometry, material)
var skeleton = new THREE.Skeleton(bones)





const skeletonHelper = new THREE.SkeletonHelper(mesh)
skeletonHelper.material.linewidth = 20
scene.add(skeletonHelper)



mesh.add(bone1 )

mesh.bind(skeleton)
scene.add(mesh)



function animate() {
  requestAnimationFrame(animate)

  var time = Date.now() * 0.001

  // mesh.skeleton.bones[0].rotation.z = Math.sin(time) * 2
  // mesh.skeleton.bones[1].position.y += Math.sin(time) * 0.1
  // mesh.skeleton.bones[2].rotation.y = Math.sin(time) * 1

  skeleton.bones[0].position.z -= 0.1
  skeleton.bones[0].rotation.x += 0.01
  skeleton.bones[2].position.y += 0.1
  //mesh.skeleton.bones[1].rotation.y = Math.sin(time) * 0.1
  //mesh.skeleton.bones[2].rotation.z = Math.sin(time) * 1

  //mesh.rotation.x +=0.01

  renderer.render(scene, camera)
}

animate()
