import { GLTFLoader } from "../applications/libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js"
const THREE = window.MINDAR.IMAGE.THREE;
import { mockWithVideo } from '../applications/libs/camera-mock.js'
import { loadGLTF } from "../applications/libs/loader.js"

// const loadGLTF = (path) => {
//     return new Promise((resolve, reject) => {
//         const loader = new GLTFLoader();
//         loader.load(path, (gltf) => {
//             resolve(gltf);
//         })
//     })
// }
document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        // mockWithVideo("http://localhost:8887/applications/assets/mock-videos/course-banner1.mp4");

        // navigator.mediaDevices.getUserMedia = () => {
        //     return new Promise((resolve, reject) => {
        //         const video = document.createElement("video");
        //         video.setAttribute("src", "http://localhost:8887/applications/assets/mock-videos/course-banner1.mp4");
        //         video.setAttribute("loop", "");

        //         video.oncanplay = () => {
        //             video.play();
        //             resolve(video.captureStream());
        //         }
        //     });
        // }
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            // container: document.querySelector("#my-ar-container"),
            container: document.body,
            imageTargetSrc: '../applications/assets/targets/musicband.mind',
        });
        console.log(mindarThree)

        const { renderer, scene, camera } = mindarThree;
        // const geometry = new THREE.PlaneGeometry(1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x000ff, transparent: true, opacity: 0.5 });
        // const plane = new THREE.Mesh(geometry, material);

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        const anchor = mindarThree.addAnchor(0);

        const gltf = await loadGLTF("../applications/assets/models/musicband-raccoon/scene.gltf")
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);
        anchor.group.add(gltf.scene);
        // loader.load("../applications/assets/models/musicband-raccoon/scene.gltf", (gltf) => {
        //     //gltf.scene: THREE.Group
        //     gltf.scene.scale.set(0.1, 0.1, 0.1);
        //     gltf.scene.position.set(0, -0.4, 0);
        //     anchor.group.add(gltf.scene);
        // })
        // anchor.group.add(plane); // THREE.Group

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});