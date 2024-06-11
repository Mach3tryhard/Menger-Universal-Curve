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

let cubevector=[];
let recursiveCube;
function Reqcube(cube1)
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
                    const newcube=cube1.clone();
                    newcube.position.set(i,j,h);
                    scene.add(newcube);

                    let geometry = newcube.geometry;
                    geometry.translate(0,0,0);
                    cubevector.push(geometry);
                    console.log(cubevector);
                }
            }
        }
    }
}


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

Reqcube(cube);
recursiveCube = BufferGeometryUtils.mergeGeometries(cubevector,false)
const material2 = new THREE.MeshMatcapMaterial( {} );
const cube2 = new THREE.Mesh( recursiveCube, material);
cube2.position.set(5,4,5);
scene.add(cube2);