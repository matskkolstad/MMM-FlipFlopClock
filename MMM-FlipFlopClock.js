/* MagicMirror²
 * Module: MMM-FlipFlopClock
 *
 * By Mats Kjoshagen Kolstad
 * MIT Licensed.
 */

Module.register("MMM-FlipFlopClock", {
	// Default module config
	defaults: {
		timeFormat: 24,        // 12 or 24
		showSeconds: true,
		showDate: true,
		dateFormat: "dddd, MMMM D, YYYY",
		size: "medium",        // "small", "medium", "large", "xlarge"
		animationType: "flip", // "flip", "fade", "slide", "zoom", "roll", "none"
		orientation: "horizontal", // "horizontal", "vertical"
		theme: "dark",         // "dark", "light", "amber", "green", "blue"
		blinkSeparator: false, // blink colon every second
		timezone: null,        // e.g. "America/New_York" – requires moment-timezone
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
		this.prevTime = { hours: null, minutes: null, seconds: null };
		this.isFirstRender = true;
		this.scheduleUpdate();
	},

	// Override dom generator
	getDom: function() {
		const wrapper = document.createElement("div");
		wrapper.className = [
			"flip-clock-wrapper",
			this.config.size,
			"animation-" + this.config.animationType,
			"orientation-" + this.config.orientation,
			"theme-" + this.config.theme,
		].join(" ");

		// Date display
		if (this.config.showDate && this.date) {
			const dateDiv = document.createElement("div");
			dateDiv.className = "flip-date";
			dateDiv.textContent = this.date;
			wrapper.appendChild(dateDiv);
		}

		// Time display
		const timeDiv = document.createElement("div");
		timeDiv.className = "flip-time-container";

		const time = this.time || moment();
		const hours   = this.config.timeFormat === 12 ? time.format("hh") : time.format("HH");
		const minutes = time.format("mm");
		const seconds = time.format("ss");

		timeDiv.appendChild(this.createFlipDigitPair(hours, "hours"));
		timeDiv.appendChild(this.createSeparator());
		timeDiv.appendChild(this.createFlipDigitPair(minutes, "minutes"));

		if (this.config.showSeconds) {
			timeDiv.appendChild(this.createSeparator());
			timeDiv.appendChild(this.createFlipDigitPair(seconds, "seconds"));
		}

		if (this.config.timeFormat === 12) {
			const ampm = document.createElement("div");
			ampm.className = "flip-ampm";
			ampm.textContent = time.format("A");
			timeDiv.appendChild(ampm);
		}

		wrapper.appendChild(timeDiv);
		return wrapper;
	},

	// Create a pair of flip digits for a given value ("HH", "mm", "ss")
	createFlipDigitPair: function(value, unit) {
		const container = document.createElement("div");
		container.className = "flip-digit-pair";
		container.appendChild(this.createFlipDigit(value.charAt(0), unit + "-1"));
		container.appendChild(this.createFlipDigit(value.charAt(1), unit + "-2"));
		return container;
	},

	// Create one flip digit tile
	createFlipDigit: function(value, id) {
		const digit = document.createElement("div");
		digit.className = "flip-digit";
		digit.id = this.identifier + "-" + id;
		digit.dataset.value = value;

		// Static top half – shows the upper portion of the current digit
		const top = document.createElement("div");
		top.className = "flip-digit-top";
		top.innerHTML = `<span>${value}</span>`;

		// Static bottom half – shows the lower portion of the current digit
		const bottom = document.createElement("div");
		bottom.className = "flip-digit-bottom";
		bottom.innerHTML = `<span>${value}</span>`;

		// Animated flap: top → folds DOWN (shows the OLD digit folding away)
		const flipTop = document.createElement("div");
		flipTop.className = "flip-digit-flip flip-digit-flip-top";
		flipTop.innerHTML = `<span>${value}</span>`;

		// Animated flap: bottom → unfolds DOWN (shows the NEW digit appearing)
		const flipBottom = document.createElement("div");
		flipBottom.className = "flip-digit-flip flip-digit-flip-bottom";
		flipBottom.innerHTML = `<span>${value}</span>`;

		digit.appendChild(top);
		digit.appendChild(flipTop);
		digit.appendChild(flipBottom);
		digit.appendChild(bottom);

		return digit;
	},

	// Create a separator element (two dots, matching classic flip-clock look)
	createSeparator: function() {
		const separator = document.createElement("div");
		separator.className = "flip-separator" + (this.config.blinkSeparator ? " blink-separator" : "");

		const dot1 = document.createElement("div");
		dot1.className = "flip-separator-dot";
		const dot2 = document.createElement("div");
		dot2.className = "flip-separator-dot";

		separator.appendChild(dot1);
		separator.appendChild(dot2);
		return separator;
	},

	// Schedule the next update, aligned to the next whole second
	scheduleUpdate: function() {
		const self = this;
		const now = Date.now();
		const delay = 1000 - (now % 1000);
		setTimeout(function() {
			self.updateTime();
		}, delay);
	},

	// Fetch current time and animate changed digits
	updateTime: function() {
		// Use moment-timezone when available; falls back to local time if the
		// library is not loaded or the timezone string is not set.
		if (this.config.timezone && moment.tz) {
			this.time = moment().tz(this.config.timezone);
		} else {
			this.time = moment();
		}
		this.date = this.time.format(this.config.dateFormat);

		const hours   = this.config.timeFormat === 12 ? this.time.format("hh") : this.time.format("HH");
		const minutes = this.time.format("mm");
		const seconds = this.time.format("ss");

		if (this.isFirstRender) {
			this.updateDom(0);
			this.isFirstRender = false;
			this.prevTime = { hours, minutes, seconds };
			this.scheduleUpdate();
			return;
		}

		if (hours !== this.prevTime.hours && this.prevTime.hours !== null) {
			this.flipDigitPair(hours, "hours");
		}
		if (minutes !== this.prevTime.minutes && this.prevTime.minutes !== null) {
			this.flipDigitPair(minutes, "minutes");
		}
		if (this.config.showSeconds && seconds !== this.prevTime.seconds && this.prevTime.seconds !== null) {
			this.flipDigitPair(seconds, "seconds");
		}

		// Update date text without re-rendering the whole DOM
		const dateEl = document.querySelector("#" + this.identifier + " .flip-date");
		if (dateEl) {
			dateEl.textContent = this.date;
		}

		// Update AM/PM text
		if (this.config.timeFormat === 12) {
			const ampmEl = document.querySelector("#" + this.identifier + " .flip-ampm");
			if (ampmEl) ampmEl.textContent = this.time.format("A");
		}

		this.prevTime = { hours, minutes, seconds };
		this.scheduleUpdate();
	},

	// Animate both digits in a pair
	flipDigitPair: function(newValue, unit) {
		this.flipSingleDigit(newValue.charAt(0), unit + "-1");
		this.flipSingleDigit(newValue.charAt(1), unit + "-2");
	},

	// Animate a single digit tile
	flipSingleDigit: function(newValue, id) {
		const digitEl = document.getElementById(this.identifier + "-" + id);
		if (!digitEl || digitEl.dataset.value === newValue) return;

		const oldValue     = digitEl.dataset.value;
		const animType     = this.config.animationType;
		const top          = digitEl.querySelector(".flip-digit-top span");
		const bottom       = digitEl.querySelector(".flip-digit-bottom span");
		const flipTop      = digitEl.querySelector(".flip-digit-flip-top span");
		const flipBottom   = digitEl.querySelector(".flip-digit-flip-bottom span");

		if (animType === "flip") {
			// ── Classic flip-clock mechanic ──────────────────────────────────
			// flipTop   shows the OLD digit and folds DOWN (rotates 0° → −90°)
			// flipBottom shows the NEW digit and unfolds DOWN (rotates 90° → 0°)
			// The static bottom is pre-set to NEW so it matches when flipBottom
			// finishes and the flap becomes invisible again.
			if (flipTop)   flipTop.textContent   = oldValue;
			if (flipBottom) flipBottom.textContent = newValue;
			if (top)       top.textContent       = oldValue;
			if (bottom)    bottom.textContent    = newValue; // pre-set for seamless reveal
		} else {
			// Non-flip animations: update all faces to NEW immediately
			if (top)       top.textContent       = newValue;
			if (bottom)    bottom.textContent    = newValue;
			if (flipTop)   flipTop.textContent   = newValue;
			if (flipBottom) flipBottom.textContent = newValue;
		}

		const animClass = {
			flip:  "flipping",
			fade:  "fading",
			slide: "sliding",
			zoom:  "zooming",
			roll:  "rolling",
		}[animType] || "changing";

		// Remove any lingering class, force reflow, re-apply
		digitEl.classList.remove("flipping", "fading", "sliding", "zooming", "rolling", "changing");
		void digitEl.offsetWidth;
		digitEl.classList.add(animClass);

		const duration = { flip: 600, fade: 400, slide: 400, zoom: 400, roll: 600 }[animType] || 0;

		// At the halfway point of a flip, swap static top to the new digit
		// (flipTop is at -90° / invisible at this moment)
		if (animType === "flip") {
			const _top = top;
			const _new = newValue;
			setTimeout(function() {
				if (_top) _top.textContent = _new;
			}, 300);
		}

		// Finalise after the animation completes
		const _digitEl  = digitEl;
		const _animClass = animClass;
		const _top      = top;
		const _bottom   = bottom;
		const _newValue = newValue;
		setTimeout(function() {
			_digitEl.classList.remove(_animClass);
			if (_top)    _top.textContent    = _newValue;
			if (_bottom) _bottom.textContent = _newValue;
			_digitEl.dataset.value = _newValue;
		}, duration);
	},
});
