# MMM-FlipFlopClock

A beautiful, classic flip clock module for MagicMirror². Displays the current time with an authentic 3D flip animation that faithfully recreates the look and feel of vintage split-flap clocks.

![Flip Clock Preview](https://github.com/user-attachments/assets/c3263d99-6be8-4ab6-a68a-faa4510cc7a4)

## Features

- ⏰ **Authentic flip animation** – corrected 3D fold-shadow mechanic (top flap shows old digit falling, bottom flap reveals new digit appearing)
- 🎨 **Five built-in themes** – dark, light, amber, green, blue (via CSS custom properties – fully overridable)
- 📐 **Four sizes** – small, medium, large, xlarge
- 🕐 **12 / 24-hour format** with optional AM/PM indicator
- ⚙️ **Configurable** – seconds, date, blinking separator, vertical orientation, custom timezone
- 🎭 **Six animation styles** – flip, fade, slide, zoom, roll, none
- 📱 **Responsive** – adapts to smaller screens automatically
- 🔤 **CSS custom properties** – easy to theme without touching source files

---

## Installation

1. Navigate to your MagicMirror's `modules` folder:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/matskkolstad/MMM-FlipFlopClock.git
```

3. Add the module to your `config/config.js` file (see configuration below).

---

## Configuration

```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        // see options below
    }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeFormat` | `Number` | `24` | `12` or `24` hour format |
| `showSeconds` | `Boolean` | `true` | Show seconds |
| `showDate` | `Boolean` | `true` | Show date above the clock |
| `dateFormat` | `String` | `"dddd, MMMM D, YYYY"` | Moment.js date format string |
| `size` | `String` | `"medium"` | `"small"` · `"medium"` · `"large"` · `"xlarge"` |
| `animationType` | `String` | `"flip"` | `"flip"` · `"fade"` · `"slide"` · `"zoom"` · `"roll"` · `"none"` |
| `orientation` | `String` | `"horizontal"` | `"horizontal"` or `"vertical"` |
| `theme` | `String` | `"dark"` | `"dark"` · `"light"` · `"amber"` · `"green"` · `"blue"` |
| `blinkSeparator` | `Boolean` | `false` | Blink the colon separators every second |
| `timezone` | `String` | `null` | IANA timezone string, e.g. `"America/New_York"` *(requires moment-timezone)* |

---

### Example Configurations

#### Minimal (all defaults)
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center"
}
```

#### Large amber clock, 12-hour, blinking separator
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "middle_center",
    config: {
        timeFormat:      12,
        showDate:        true,
        dateFormat:      "dddd, MMMM D",
        size:            "large",
        theme:           "amber",
        blinkSeparator:  true,
    }
}
```

#### Minimal green clock (no date, fade animation)
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        showSeconds:   false,
        showDate:      false,
        theme:         "green",
        animationType: "fade",
    }
}
```

#### XLarge blue vertical clock
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_left",
    config: {
        size:        "xlarge",
        theme:       "blue",
        orientation: "vertical",
    }
}
```

#### Remote timezone (e.g. a second clock showing New York time)
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "bottom_right",
    config: {
        showSeconds: false,
        showDate:    false,
        size:        "medium",
        theme:       "light",
        timezone:    "America/New_York",
    }
}
```

---

## Themes

Five themes are included, each defined entirely with CSS custom properties so you can override individual variables in your own stylesheet without forking the module.

| Theme | Background | Digit colour |
|-------|-----------|--------------|
| `dark` (default) | Charcoal gradient | White |
| `light` | Light grey gradient | Near-black |
| `amber` | Deep brown | Amber / orange |
| `green` | Deep green | Neon green |
| `blue` | Deep navy | Sky blue |

**Custom theme example** (add to your MagicMirror `custom.css`):
```css
.flip-clock-wrapper.theme-dark {
    --ffc-card-top:   linear-gradient(180deg, #1a0030 0%, #0d001e 100%);
    --ffc-card-bot:   linear-gradient(180deg, #0d001e 0%, #080014 100%);
    --ffc-text-color: #cc88ff;
    --ffc-sep-color:  #8844cc;
}
```

---

## Animation Types

| Type | Description |
|------|-------------|
| `flip` | Authentic split-flap card flip: old digit folds down (0° → −90°) while new digit unfolds (90° → 0°), with fold-shadow shading |
| `fade` | Cross-fade: digits fade out then fade in |
| `slide` | Digits slide upward out of frame, then slide in from below |
| `zoom` | Digits zoom out then zoom back in |
| `roll` | Barrel-roll on the Y axis (3D horizontal flip) |
| `none` | Instant change, no animation |

---

## Date Format

Uses [Moment.js format tokens](https://momentjs.com/docs/#/displaying/format/):

| Format string | Example output |
|--------------|----------------|
| `"dddd, MMMM D, YYYY"` | Tuesday, January 7, 2026 |
| `"ddd, MMM D"` | Tue, Jan 7 |
| `"DD.MM.YYYY"` | 07.01.2026 |
| `"MMMM D"` | January 7 |

---

## Vertical Orientation

In vertical mode the hours, minutes (and seconds) stack vertically instead of side-by-side. Separators are hidden. AM/PM appears below the time.

---

## Technical Details

- Vanilla JavaScript – no dependencies beyond Moment.js (already bundled with MagicMirror²)
- Optional `timezone` support via [moment-timezone](https://momentjs.com/timezone/) when present
- Timer aligned to the next whole-second boundary for accurate ticking
- CSS custom properties for theming – no inline styles
- Fold-shadow animation uses CSS `::after` pseudo-elements, keeping the markup clean

---

## Troubleshooting

**Clock not showing:**
- Verify the module folder exists in `~/MagicMirror/modules/`
- Check MagicMirror logs: `pm2 logs mm`

**Flip animation looks wrong / not 3D:**
- Ensure the browser / Electron has GPU acceleration enabled
- Try a different `animationType` such as `"fade"` to confirm the module is loading

**Timezone not applying:**
- Install `moment-timezone`: `cd ~/MagicMirror && npm install moment-timezone`
- Provide a valid IANA zone string (e.g. `"Europe/Oslo"`)

---

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

---

## License

MIT – see [LICENSE](LICENSE).

---

## Credits

- Developed by Mats Kjoshagen Kolstad
- Inspired by classic split-flap (Solari) display clocks

---

## Changelog

### Version 1.3.0
- **Fixed** authentic flip-clock animation: top flap now shows the OLD digit folding away; bottom flap shows the NEW digit unfolding — exactly as a real Solari board works
- **Added** fold-shadow `::after` overlays on flip panels for realistic 3D depth
- **Added** `theme` option with five built-in themes (dark, light, amber, green, blue) implemented as CSS custom properties
- **Added** `blinkSeparator` option — separator dots pulse every second
- **Added** `timezone` option — display time in any IANA timezone (requires moment-timezone)
- **Added** `xlarge` size
- **Changed** separator from a colon character to two dots (classic Solari style); crease-glow highlight during flip
- **Changed** timer now aligns to next whole-second boundary for accurate ticking
- **Improved** demo page with live controls for animation, theme, size, and toggles

### Version 1.2.0
- Added `orientation` option (horizontal / vertical)

### Version 1.1.0
- Added multiple animation types (fade, slide, zoom, roll, none)

### Version 1.0.0
- Initial release
