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
	// However in reality, the _deviceRemoved method is not called when serial devices are unplugged
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
	var deviceProperties = {
		d: 0,
		h: 0,
		cbProbeObstacle: undefined,
		cbQueryHeading: undefined
	};

	function tryNextDevice() {
		device = deviceQueue.shift();
		if (!device) return;

		console.log('Attempting connection with ' + device.id);
		device.open({ stopBits: 0, bitRate: 115200, ctsFlowControl: 0 });
		device.set_receive_handler(rxBytes);
		txByte(CMD_QueryHeading);

		watchdog = setTimeout(function() {
			device.set_receive_handler(null);
			device.close();
			device = null, watchdog = null;
			tryNextDevice();
		}, 1000);
	}

	function txByte(v) {
		var data = new Uint8Array(1);
		data[0] = v;
		device.send(data.buffer);
	}

	function rxBytes(ab) {
		var data = new Uint8Array(ab);
		cmdBuf.add(data).parseCSV(function(cmd, value) {
			if (watchdog) {
				clearTimeout(watchdog);
				watchdog = null;
			}
			deviceProperties[cmd] = parseFloat(value);
			if (cmd == 'd') {
				var callback = deviceProperties['cbProbeObstacle'];
				if (typeof callback == 'function') {
					callback(deviceProperties[cmd]);
					deviceProperties['cbProbeObstacle'] = undefined;
				}
			}
			if (cmd == 'h') {
				var callback = deviceProperties['cbQueryHeading'];
				if (typeof callback == 'function') {
					callback(deviceProperties[cmd]);
					deviceProperties['cbQueryHeading'] = undefined;
				}
			}
		});
	}

	/* Constants */
	var MAX_BUF_LEN = 40,
	    DELIMITER = 13;

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

	ext.getHeading = function(callback) {
		deviceProperties['cbQueryHeading'] = callback;
		txByte(CMD_QueryHeading);
	};

	ext.probeObstacle = function(callback) {
		deviceProperties['cbProbeObstacle'] = callback;
		txByte(CMD_ProbeObstacle);
	};

	// Check for GET param 'lang'
	var paramString = window.location.search.replace(/^\?|\/$/g, ''),
	    vars = paramString.split("&"),
	    lang = 'en';
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair.length > 1 && pair[0]=='lang')
			lang = pair[1];
	}

	var blocks = {
		en: [
			// Block type, block name, function name
			['R', 'Get heading', 'getHeading'],
			['R', 'Ultrasonic ping', 'probeObstacle']
		],
		zh: [
			// Block type, block name, function name
			['R', '讀取方向角', 'getHeading'],
			['R', '超音波偵測距離', 'probeObstacle']
		]
	};
	var menus = {
		en: {
		},
		zh: {
		}
	};

	// Block and block menu descriptions
	var descriptor = {
		blocks: blocks[lang],
		menus: menus[lang],
		url: ''
	};

	// Register the extension
	ScratchExtensions.register('T2 Controller', descriptor, ext, {type: 'serial'});
})({});
