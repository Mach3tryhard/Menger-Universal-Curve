javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='./build/stats.js';document.head.appendChild(script);})()
import GUI from './build/lilgui.js';
import * as THREE from './build/three.module.js';
import { OrbitControls } from './build/OrbitControls.js';
import * as BufferGeometryUtils from './build/BufferGeometryUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

let afisare=[];

const gui = new GUI();
const obj = { 
    Iterations: 3,
    Credits: function() { alert( 'Menger Sponge made by Sirghe Matei-Stefan.(En)                                Burete lui Menger realizat de Sirghe Matei-Stefan. (Ro)' ) }
};

const fisier1 = gui.addFolder('Settings');
fisier1.add(obj,'Iterations',0,4,1).onChange(() => {

    if(obj.Iterations==0)
        camera.position.set( 2, 2, 2 );
    if(obj.Iterations==1)
        camera.position.set( 7, 7, 7 );
    if(obj.Iterations==2)
        camera.position.set( 22, 22, 22 );
    if(obj.Iterations==3)
        camera.position.set( 67, 67, 67 );
    if(obj.Iterations==4)
        camera.position.set( 202, 202, 202 );

    const lastIter = afisare.pop();
    scene.remove(lastIter);

    afisare.push(cube[obj.Iterations]);
    scene.add(afisare[0]);
});
fisier1.add(obj,'Credits');

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
let currentMesh;

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

function disposeMesh(mesh) {
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) mesh.material.dispose();
    scene.remove(mesh);
}

function NrSteps(steps){
    for(let i=0;i<steps;i++){
        Reqcube(cube[i],cube[i].geometry,i);
        recursiveCube = BufferGeometryUtils.mergeGeometries(cubegeometryvector);
        cubegeometryvector.splice(0,cubegeometryvector.length);

        if (currentMesh) {
            disposeMesh(currentMesh);
        }
        currentMesh = new THREE.Mesh(recursiveCube, material);
        //scene.add(currentMesh);

        cube.push(currentMesh);
    }
}

NrSteps(4);
afisare.push(cube[3]);
scene.add(afisare[0]);
camera.position.set( 67, 67, 67 );

const controls = new OrbitControls( camera, renderer.domElement );

controls.update();

function animate() {
    //requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

}
function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);