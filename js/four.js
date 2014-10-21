// Four
(function() {
	/// Extend
	var extendObject = function(destination, source) {
		var source = source || {};
		for (var property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	};

	var F = function(options) {
		return this.init(options);
	};

	F.prototype = {
		init: function(options) {
			this.config = extendObject({
				id: null
			}, options);

			if (this.config.id !== null) {

				this.scene = new THREE.Scene();
				this.renderer = new THREE.WebGLRenderer();

				this.containerCanvas = document.getElementById(this.config.id);

				this.width = this.containerCanvas.clientWidth;
				this.height = this.containerCanvas.clientHeight;

				this.camera = new THREE.PerspectiveCamera(36, this.width / this.height, 0.1, 2000);

				this.renderer = new THREE.WebGLRenderer();
				this.renderer.setSize(this.width, this.height);
				this.containerCanvas.appendChild(this.renderer.domElement);



				var render = function() {
					requestAnimationFrame(render);
					this.renderer.render(this.scene, this.camera);
				}
				render();



			}

			return this;
		}
	};

	window.FOUR = function(options){
		return new F(options);
	};
})();