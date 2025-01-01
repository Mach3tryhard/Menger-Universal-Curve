javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshMatcapMaterial( {

} );
let cube = [];
let vectorpoz= [];
cube[0] = new THREE.Mesh( geometry, material);

let vx=[1,1,1,1,1,0,2];
let vy=[1,1,1,0,2,1,1];
let vz=[1,0,2,1,1,1,1];

let cubegeometryvector=[];
let recursiveCube;
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
                    let putere= Math.pow(3, pas1);

                    let buildgeometry = geometry1.clone();
                    buildgeometry.translate(i*putere,j*putere,h*putere);
                    cubegeometryvector.push(buildgeometry);
                }
            }
        }
    }
}

function NrSteps(steps){
    for(let i=0;i<steps;i++){
        Reqcube(cube[i],geometry,i);
        recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector);
        cubegeometryvector.splice(0,cubegeometryvector.length);
        cube.push(new THREE.Mesh(recursiveCube, material));
    }
}

NrSteps(3);
scene.add(cube[cube.length-1]);

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 100, 100, 100 );
controls.update();

function animate() {

    requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );

}
function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}