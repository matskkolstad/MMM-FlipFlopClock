/* MagicMirror²
 * Module: MMM-FlipFlopClock
 *
 * By Mats Kjoshagen Kolstad
 * MIT Licensed.
 */

Module.register("MMM-FlipFlopClock", {
	// Default module config
	defaults: {
		timeFormat: 24, // 12 or 24 hour format
		showSeconds: true,
		showDate: true,
		dateFormat: "dddd, MMMM D, YYYY",
		size: "medium", // "small", "medium", "large"
	},

	// Required scripts
	getScripts: function() {
		return ["moment.js"];
	},

	// Required styles
	getStyles: function() {
		return ["MMM-FlipFlopClock.css"];
	},

	// Start the module
	start: function() {
		Log.info("Starting module: " + this.name);
		this.time = null;
		this.date = null;
		this.prevTime = {
			hours: null,
			minutes: null,
			seconds: null
		};
		this.isFirstRender = true;
		
		// Schedule update interval
		this.scheduleUpdate();
	},

	// Override dom generator
	getDom: function() {
		const wrapper = document.createElement("div");
		wrapper.className = "flip-clock-wrapper " + this.config.size;

		// Create date display if enabled
		if (this.config.showDate && this.date) {
			const dateDiv = document.createElement("div");
			dateDiv.className = "flip-date";
			dateDiv.innerHTML = this.date;
			wrapper.appendChild(dateDiv);
		}

		// Create time display
		const timeDiv = document.createElement("div");
		timeDiv.className = "flip-time-container";

		const time = this.time || moment();
		const hours = this.config.timeFormat === 12 ? time.format("hh") : time.format("HH");
		const minutes = time.format("mm");
		const seconds = time.format("ss");

		// Hours
		timeDiv.appendChild(this.createFlipDigitPair(hours, "hours"));
		
		// Separator
		timeDiv.appendChild(this.createSeparator());
		
		// Minutes
		timeDiv.appendChild(this.createFlipDigitPair(minutes, "minutes"));

		// Seconds (if enabled)
		if (this.config.showSeconds) {
			timeDiv.appendChild(this.createSeparator());
			timeDiv.appendChild(this.createFlipDigitPair(seconds, "seconds"));
		}

		// AM/PM indicator for 12-hour format
		if (this.config.timeFormat === 12) {
			const ampm = document.createElement("div");
			ampm.className = "flip-ampm";
			ampm.innerHTML = time.format("A");
			timeDiv.appendChild(ampm);
		}

		wrapper.appendChild(timeDiv);

		return wrapper;
	},

	// Create a pair of flip digits
	createFlipDigitPair: function(value, unit) {
		const container = document.createElement("div");
		container.className = "flip-digit-pair";
		
		const digit1 = value.toString().charAt(0);
		const digit2 = value.toString().charAt(1);

		container.appendChild(this.createFlipDigit(digit1, unit + "-1"));
		container.appendChild(this.createFlipDigit(digit2, unit + "-2"));

		return container;
	},

	// Create a single flip digit
	createFlipDigit: function(value, id) {
		const digit = document.createElement("div");
		digit.className = "flip-digit";
		digit.id = this.identifier + "-" + id;

		// Top half
		const top = document.createElement("div");
		top.className = "flip-digit-top";
		top.innerHTML = `<span>${value}</span>`;

		// Bottom half
		const bottom = document.createElement("div");
		bottom.className = "flip-digit-bottom";
		bottom.innerHTML = `<span>${value}</span>`;

		// Flip animation elements
		const flipTop = document.createElement("div");
		flipTop.className = "flip-digit-flip flip-digit-flip-top";
		flipTop.innerHTML = `<span>${value}</span>`;

		const flipBottom = document.createElement("div");
		flipBottom.className = "flip-digit-flip flip-digit-flip-bottom";
		flipBottom.innerHTML = `<span>${value}</span>`;

		digit.appendChild(top);
		digit.appendChild(flipTop);
		digit.appendChild(flipBottom);
		digit.appendChild(bottom);

		// Store current value as data attribute
		digit.dataset.value = value;

		return digit;
	},

	// Create separator (colon)
	createSeparator: function() {
		const separator = document.createElement("div");
		separator.className = "flip-separator";
		separator.innerHTML = "<span>:</span>";
		return separator;
	},

	// Schedule the next update
	scheduleUpdate: function(delay) {
		let nextLoad = 1000; // Update every second
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		const self = this;
		setTimeout(function() {
			self.updateTime();
		}, nextLoad);
	},

	// Update the time
	updateTime: function() {
		this.time = moment();
		this.date = this.time.format(this.config.dateFormat);

		const hours = this.config.timeFormat === 12 ? this.time.format("hh") : this.time.format("HH");
		const minutes = this.time.format("mm");
		const seconds = this.time.format("ss");

		// Check if we need to flip any digits
		const needsUpdate = 
			hours !== this.prevTime.hours ||
			minutes !== this.prevTime.minutes ||
			(this.config.showSeconds && seconds !== this.prevTime.seconds);

		if (needsUpdate) {
			this.animateFlip(hours, minutes, seconds);
			this.prevTime = { hours, minutes, seconds };
		}

		this.scheduleUpdate();
	},

	// Animate the flip transition
	animateFlip: function(hours, minutes, seconds) {
		const self = this;

		// Flip hours if changed
		if (hours !== this.prevTime.hours && this.prevTime.hours !== null) {
			this.flipDigitPair(hours, "hours");
		}

		// Flip minutes if changed
		if (minutes !== this.prevTime.minutes && this.prevTime.minutes !== null) {
			this.flipDigitPair(minutes, "minutes");
		}

		// Flip seconds if changed and enabled
		if (this.config.showSeconds && seconds !== this.prevTime.seconds && this.prevTime.seconds !== null) {
			this.flipDigitPair(seconds, "seconds");
		}

		// Update AM/PM if using 12-hour format (no animation needed)
		if (this.config.timeFormat === 12) {
			const ampmElement = document.querySelector("#" + this.identifier + " .flip-ampm");
			if (ampmElement) {
				ampmElement.textContent = this.time.format("A");
			}
		}

		// Only do a full DOM update on first render
		if (this.isFirstRender) {
			this.updateDom(0);
			this.isFirstRender = false;
		}
	},

	// Flip a pair of digits
	flipDigitPair: function(newValue, unit) {
		const digit1 = newValue.toString().charAt(0);
		const digit2 = newValue.toString().charAt(1);
		
		this.flipSingleDigit(digit1, unit + "-1");
		this.flipSingleDigit(digit2, unit + "-2");
	},

	// Flip a single digit
	flipSingleDigit: function(newValue, id) {
		const digitId = this.identifier + "-" + id;
		const digit = document.getElementById(digitId);
		
		if (digit && digit.dataset.value !== newValue) {
			// Update the flip animation elements with the new value
			const flipTop = digit.querySelector(".flip-digit-flip-top span");
			const flipBottom = digit.querySelector(".flip-digit-flip-bottom span");
			
			if (flipTop) flipTop.textContent = newValue;
			if (flipBottom) flipBottom.textContent = newValue;
			
			// Add flip animation class
			digit.classList.add("flipping");
			
			// Update the static parts after animation completes
			setTimeout(function() {
				digit.classList.remove("flipping");
				
				// Update the static top and bottom with new value
				const top = digit.querySelector(".flip-digit-top span");
				const bottom = digit.querySelector(".flip-digit-bottom span");
				
				if (top) top.textContent = newValue;
				if (bottom) bottom.textContent = newValue;
				
				// Update data attribute
				digit.dataset.value = newValue;
			}, 600);
		}
	}
});
