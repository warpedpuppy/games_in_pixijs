export default function Spiral(THREE) {
    return {
        camera: '',
        scene: '',
        renderer: '',
        geometry: '',
        material: '',
        mesh: '',
        collidableMeshList: [],
        balls: [],
        ballQ: 20,
        init() {
            this.setup();

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
		    this.renderer.setSize(window.innerWidth, window.innerHeight);
		    document.getElementById('spiralContainer').appendChild(this.renderer.domElement);

		    this.animate = this.animate.bind(this);
		    this.animate();
		    this.resize = this.resize.bind(this);
		    window.onresize = this.resize;
        },
        setup() {
            this.camera = null;
            this.scene = null;
            this.mesh = null;
            this.balls = [];
            this.collidableMeshList = [];
            this.pole_geometry = null;
            this.pole_material = null;
            this.geometry = null;
            this.material = null;

            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		    this.camera.position.z = 100;
		    this.camera.position.y = 10;

		    this.scene = new THREE.Scene();

		 	// central pole
		    this.pole_geometry = new THREE.CylinderGeometry(5, 5, 200, 4, 4);
            this.pole_material = new THREE.MeshBasicMaterial({ color: 0xfefefe, wireframe: true, opacity: 0.5 });
            this.pole_mesh = new THREE.Mesh(this.pole_geometry, this.pole_material);
            this.scene.add(this.pole_mesh);

            // platform
            this.geometry = new THREE.CylinderGeometry(50, 50, 2, 20, 20);
            this.material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.mesh);


            // ball
            for (let i = 0; i < this.ballQ; i++) {
                this.ball_geom = new THREE.SphereBufferGeometry(4, 12, 12);
                this.ball_material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
                this.ball_mesh = new THREE.Mesh(this.ball_geom, this.ball_material);
                this.ball_mesh.position.x = Math.random() * 20;
                this.ball_mesh.position.y = (Math.random()) * 100 + 100;
                this.ball_mesh.vy = Math.random() * 0.2;
                this.ball_mesh.vx = 0;
                this.ball_mesh.hit = false;
                this.scene.add(this.ball_mesh);
                this.collidableMeshList.push(this.ball_mesh);
                this.balls.push(this.ball_mesh);
            }
        },
        resize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        animate() {
		    requestAnimationFrame(this.animate);
		    this.pole_mesh.rotation.y -= 0.02;
		    this.mesh.rotation.y += 0.02;
		    const gravity = 0.03;

		    for (let i = 0; i < this.ballQ; i++) {
		    	this.balls[i].position.y -= this.balls[i].vy;
			    this.balls[i].position.x -= this.balls[i].vx;
                this.balls[i].vy += gravity;

			    if (this.balls[i].position.y < -100) {
			    	this.balls[i].position.y = (Math.random()) * 100 + 100;
			    	this.balls[i].position.x = Math.random() * 20;
			    	this.balls[i].vx = 0;
			    	this.balls[i].vy = Math.random() * 0.2;
			    	this.balls[i].hit = false;
			    }
		    }


		   // COLLISION DETECTION
		   const originPoint = this.mesh.position.clone();
		   for (let vertexIndex = 0; vertexIndex < this.mesh.geometry.vertices.length; vertexIndex++) {
                const localVertex = this.mesh.geometry.vertices[vertexIndex].clone();
                const globalVertex = localVertex.applyMatrix4(this.mesh.matrix);
                const directionVector = globalVertex.sub(this.mesh.position);

                const ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());

                const collisionResults = ray.intersectObjects(this.collidableMeshList);
                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    for (let j = 0; j < collisionResults.length; j++) {
                        // console.log("Hit");
                        // console.log(collisionResults[j])
                        if (!collisionResults[j].object.hit) {
                            collisionResults[j].object.hit = true;
                            collisionResults[j].object.vx = -2;
						 	collisionResults[j].object.vy = -1.5;
                        }
                    }
                }
            }

		    this.renderer.render(this.scene, this.camera);
        },
    };
}
