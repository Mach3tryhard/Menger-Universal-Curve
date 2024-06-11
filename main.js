import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshMatcapMaterial( {

} );
const cube = new THREE.Mesh( geometry, material);

let vx=[1,1,1,1,1,0,2];
let vy=[1,1,1,0,2,1,1];
let vz=[1,0,2,1,1,1,1];

let cubegeometryvector=[];
let recursiveCube;
let pas=0;
function Reqcube(cube1,geometry1,pas1)
{
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            for(let h=0;h<3;h++)
            {
                let apare=true;
                for(let q=0;q<7;q++)
                {
                    if(i==vx[q] && j==vy[q] && h==vz[q])
                    {
                        apare=false;
                    }
                }
                if(apare==true)
                {
                    let putere= Math.pow(3, pas)
                    let newcube=cube1.clone();
                    newcube.position.set(i*putere,j*putere,h*putere);
                    scene.add(newcube);

                    let geometryminge = new THREE.BoxGeometry( 1, 1, 1 );
                    let buildgeometry = geometry1.clone();
                    buildgeometry.translate(i*putere,j*putere,h*putere);
                    cubegeometryvector.push(buildgeometry);
                }
            }
        }
    }
    pas+=1;
}

Reqcube(cube,geometry,pas);
recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector)
const cube2 = new THREE.Mesh( recursiveCube, material);
cubegeometryvector.splice(0,cubegeometryvector.length);
cube.remove();

Reqcube(cube2,recursiveCube,pas);
recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector)
const cube3 = new THREE.Mesh( recursiveCube, material);
cubegeometryvector.splice(0,cubegeometryvector.length);
cube2.remove();

Reqcube(cube3,recursiveCube,pas);
recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector)
const cube4 = new THREE.Mesh( recursiveCube, material);
cubegeometryvector.splice(0,cubegeometryvector.length);
cube3.remove();

Reqcube(cube4,recursiveCube,pas);
recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector)
const cube5 = new THREE.Mesh( recursiveCube, material);
cubegeometryvector.splice(0,cubegeometryvector.length);
cube4.remove();
scene.add(cube5);


/*let geometryminge = new THREE.BoxGeometry( 1, 2, 1 );

let caca1= geometryminge.geometry;

let geometryminge2 = new THREE.BoxGeometry( 2, 1, 1 );
geometryminge2.translate(0,0,1);
let caca2= geometryminge2.geometry;

let coaie =[];
coaie.push(geometryminge);
coaie.push(geometryminge2);
console.log(coaie);

let rez = BufferGeometryUtils.mergeGeometries(coaie);
const final = new THREE.Mesh(rez,material);
scene.add(final);
let wtf = final.clone();
wtf.position.set(2,2,2);
scene.add(wtf);*/


const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 10, 10 );
controls.update();

function animate() {

    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

}
function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}