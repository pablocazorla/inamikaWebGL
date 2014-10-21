// App
inamikaScene = function() {

	var config = {
		baseUrl: 'inamikaWebGL/'
	}

	var
	// Store DOM elements
		$window = $(window),
		$container = $('#canvas-container'),

		// Scene dimensions
		width = $container.width(),
		height = $container.height(),

		// Three basi elements
		scene = new THREE.Scene(),
		renderer = (function() {
			var r = new THREE.WebGLRenderer();
			r.setSize(width, height);
			$container.append(r.domElement);
			return r;
		})(),
		camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 10000),

		// Resize window function
		onResizeWindow = function() {
			width = $container.width();
			height = $container.height();

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		},

		// Render function
		render = function() {
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		};

	render();
	$window.resize(onResizeWindow);


	// mountainScene
	var mountainScene = function() {

		var mountainList = [];
		var numMountains = 0;
		var cameraPositionZ = 3000;
		camera.position.z = cameraPositionZ;
		camera.rotation.x = .1;

		var Sun = new THREE.DirectionalLight(0xffffff, 2);
		Sun.position.set(1000, 1000, 1000);
		Sun.rotation.y = 2;
		scene.add(Sun);

		var SkyLight = new THREE.AmbientLight(0x222222);
		//scene.add(SkyLight);

		//var controls = new THREE.OrbitControls(camera, renderer.domElement);

		var anim = function() {
			requestAnimationFrame(anim);
			//controls.update();
			for (var i = 0; i < numMountains; i++) {
				mountainList[i].position.z += 1.2;
				if (mountainList[i].position.z > (cameraPositionZ + 100)) {
					setMountainPosition(mountainList[i], true);
				}
			}
		};
		anim();


		var setMountainPosition = function(Mountain, started) {
			var d = 500;
			Mountain.position.x = Math.round((2 * Math.random() * d) - d);
			Mountain.rotation.y = 2 * Math.random() * Math.PI;
			Mountain.scale.y = 100 + 120 * Math.random();
			if (started) {
				Mountain.position.z = 0;
			}
		}

		var addMountains = function(geometry, materials) {
			var mountainMaterial = new THREE.MeshFaceMaterial(materials);

			numMountains = 12;

			for (var i = 0; i < numMountains; i++) {
				var Mountain = new THREE.Mesh(geometry, mountainMaterial);
				Mountain.position.set(0, -110, Math.round(i * cameraPositionZ / numMountains));
				Mountain.scale.set(300, 200, 200);


				setMountainPosition(Mountain, false);

				scene.add(Mountain);
				mountainList.push(Mountain);
			}

			var PlaneGeom = new THREE.PlaneGeometry(6000, cameraPositionZ);
			var Plane = new THREE.Mesh(PlaneGeom, mountainMaterial);


		};



		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load("js/models/mountain/mountain.js", addMountains);



		// Skybox
		var texture_placeholder = document.createElement('canvas');
		texture_placeholder.width = 128;
		texture_placeholder.height = 128;

		var context = texture_placeholder.getContext('2d');
		context.fillStyle = 'rgb( 200, 200, 200 )';
		context.fillRect(0, 0, texture_placeholder.width, texture_placeholder.height);
		var loadTexture = function(path) {

			var texture = new THREE.Texture(texture_placeholder);
			var material = new THREE.MeshBasicMaterial({
				map: texture,
				overdraw: 0.5
			});

			var image = new Image();
			image.onload = function() {

				texture.image = this;
				texture.needsUpdate = true;

			};
			image.src = path;

			return material;

		};


		var Skybox = new THREE.Mesh(new THREE.SphereGeometry(7000, 32, 32), loadTexture('js/models/skybox/tex.jpg'));
		Skybox.position.y=300;
		Skybox.scale.x = -1;
		scene.add(Skybox);
	};
	mountainScene();


};
$('document').ready(inamikaScene);