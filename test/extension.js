(function(ext) {
	var device   = null;
	var watchdog = null;

	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {
		if (device) {
			device.close();
			device = null;
		}
		if (watchdog) {
			clearTimeout(watchdog);
			watchdog = null;
		}
	};

	// Notified if the device is disconnected
	ext._deviceRemoved = function(dev) {
		if (device != dev) return;
		device = null;
	};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		if (!device)
			return { status: 1, msg: 'No device' };
		if (watchdog)
			return { status: 1, msg: 'Search for device...' };
		return { status: 2, msg: 'Device connected' };
	};

	// Check whether a suitable device is attached to the given port
	var deviceQueue = [];
	ext._deviceConnected = function(dev) {
		deviceQueue.push(dev);
		if (!device) {
			tryNextDevice();
		}
	};

	var CMD_QueryHeading = '^'.charCodeAt(),
	    CMD_ProbeObstacle = '~'.charCodeAt();

	function tryNextDevice() {
		device = deviceQueue.shift();
		if (!device) return;

		device.open({ stopBits: 0, bitRate: 115200, ctsFlowControl: 0 });
		device.set_receive_handler(rxBytes);

		var cmdQueryHeading = new Uint8Array(1);
		cmdQueryHeading[0] = CMD_QueryHeading;
		device.send(cmdQueryHeading.buffer);

		watchdog = setTimeout(function() {
			device.set_receive_handler(null);
			device.close();
			device = null, watchdog = null;
			tryNextDevice();
		}, 1000);
	}

	function rxBytes(ab) {
		var data = new Uint8Array(ab);
		cmdBuf.add(data).parseCSV(function(cmd, value) {
			if (watchdog) {
				clearTimeout(watchdog);
				watchdog = null;
			}
			console.log(cmd + ':=' + parseFloat(value));
		});
	}

	/* Constants */
	var MAX_BUF_LEN = 40,
	    DELIMITER = 10;

	/* Circular queue object */
	var cmdBuf = {
		/*
		 * Properties for manipulating circular queue
		 */
		head : 0,
		tail : 0,
		buffer : new Uint8Array(MAX_BUF_LEN),
		/*
		 * Method next(p) to advance a pointer in the circular queue
		 */
		next : function(p) {
			return (p == this.buffer.byteLength - 1)? 0 : (p + 1);
		},
		/*
		 * Method add(data) to add Uint8Array to the queue
		 */
		add : function(data) {
			for (var p = this.tail, i = 0; i < data.byteLength; i++) {
				this.buffer[p] = data[i];
				if ((p = this.next(p)) != this.head)
					this.tail = p;
				else break;
			}
			return this;
		},
		/*
		 * Method parseCSV() to parse CSV values before delimiters
		 */
		parseCSV : function(handler) {
			for (var str = '', p = this.head; p != this.tail; p = this.next(p)) {
				var u8 = this.buffer[p];
				if (u8 == DELIMITER) {
					var vList = str.replace(/ /g, '').split(',');
					for (var i in vList) {
						var v = vList[i].split('=');
						if (v.length == 2 && typeof handler == 'function')
							handler(v[0], v[1]);
					}
					str = '';
					this.head = this.next(p);
				} else str += String.fromCharCode(u8);
			}
			return this;
		}
	};

	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			// Block type, block name, function name
		]
	};

	// Register the extension
	ScratchExtensions.register('T2 Controller', descriptor, ext, {type: 'serial'});
})({});
