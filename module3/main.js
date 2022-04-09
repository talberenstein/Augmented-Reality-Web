const THREE = window.MINDAR.IMAGE.THREE;
import { mockWithVideo } from '../applications/libs/camera-mock.js'

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        mockWithVideo("http://localhost:8887/applications/assets/mock-videos/course-banner1.mp4");

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
            container: document.body,
            imageTargetSrc: '../applications/assets/targets/course-banner.mind',
        });
        console.log(mindarThree)

        const { renderer, scene, camera } = mindarThree;
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x000ff, transparent: true, opacity: 0.5 });
        const plane = new THREE.Mesh(geometry, material);
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane); // THREE.Group

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});