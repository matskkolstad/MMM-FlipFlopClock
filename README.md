# MMM-FlipFlopClock

A beautiful, classic flip clock module for MagicMirror². This module displays the current time with an elegant flip animation, reminiscent of vintage flip clocks.

![Flip Clock Preview](https://github.com/user-attachments/assets/c3263d99-6be8-4ab6-a68a-faa4510cc7a4)

## Features

- ⏰ Classic flip clock design with smooth animations
- 🎨 Customizable colors and sizes
- 🕐 Support for both 12-hour and 24-hour time formats
- ⚙️ Optional seconds display
- 📅 Optional date display
- 📱 Responsive design
- 🎭 Multiple animation styles: flip, fade, slide, zoom, roll, or none

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

## Configuration

Add the module to the modules array in your `config/config.js` file:

```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center", // or any other valid position
    config: {
        // See below for configuration options
    }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeFormat` | `Number` | `24` | Use `12` or `24` hour format |
| `showSeconds` | `Boolean` | `true` | Display seconds |
| `showDate` | `Boolean` | `true` | Display date above the clock |
| `dateFormat` | `String` | `"dddd, MMMM D, YYYY"` | Date format (using Moment.js format) |
| `size` | `String` | `"medium"` | Size of the clock: `"small"`, `"medium"`, or `"large"` |
| `animationType` | `String` | `"flip"` | Animation style for time transitions: `"flip"`, `"fade"`, `"slide"`, `"zoom"`, `"roll"`, or `"none"` |
| `orientation` | `String` | `"horizontal"` | Layout orientation: `"horizontal"` or `"vertical"` |

### Example Configuration

#### Minimal Configuration (using defaults)
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center"
}
```

#### Custom Configuration
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "middle_center",
    config: {
        timeFormat: 12,
        showSeconds: true,
        showDate: true,
        dateFormat: "dddd, MMMM D",
        size: "large",
        animationType: "fade"
    }
}
```

#### Minimal Clock (no date, no seconds)
```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        showSeconds: false,
        showDate: false,
        size: "medium"
    }
}
```

#### With Different Animations
```javascript
// Smooth fade animation
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        animationType: "fade"
    }
}

// Slide animation
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        animationType: "slide"
    }
}

// No animation (instant change)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        animationType: "none"
    }
}

// Vertical orientation
{
    module: "MMM-FlipFlopClock",
    position: "top_left",
    config: {
        orientation: "vertical"
    }
}
```

## Date Format Options

The `dateFormat` option uses Moment.js formatting. Here are some common examples:

- `"dddd, MMMM D, YYYY"` → Tuesday, January 7, 2026
- `"ddd, MMM D"` → Tue, Jan 7
- `"LL"` → January 7, 2026
- `"MMMM D"` → January 7
- `"DD.MM.YYYY"` → 07.01.2026

See the [Moment.js documentation](https://momentjs.com/docs/#/displaying/format/) for more format options.

## Animation Types

The module supports several animation styles for time transitions:

- **`flip`** (default) - Classic flip clock animation with 3D rotation effect, reminiscent of vintage flip clocks
- **`fade`** - Smooth fade transition where digits fade out and fade in with the new value
- **`slide`** - Digits slide down and fade out, creating a smooth downward motion
- **`zoom`** - Digits zoom out and zoom back in with the new value
- **`roll`** - Digits roll horizontally with a 3D rotation effect
- **`none`** - Instant change with no animation for minimal visual distraction

You can set the animation type in your configuration:

```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        animationType: "fade" // Choose your preferred animation
    }
}
```

## Orientation Options

The clock supports two orientation modes to fit different placements on your MagicMirror:

- **`horizontal`** (default) - Traditional layout with time displayed horizontally (HH:MM:SS)
- **`vertical`** - Stacked layout with time components displayed vertically, perfect for narrow spaces or side positions

In vertical mode:
- Time units stack vertically (hours, then minutes, then seconds if enabled)
- Separators (colons) are hidden for a cleaner look
- Date remains at the top (if enabled)
- AM/PM indicator appears below the time (if using 12-hour format)

Example vertical configuration:

```javascript
{
    module: "MMM-FlipFlopClock",
    position: "top_left",
    config: {
        orientation: "vertical",
        size: "medium"
    }
}
```

## Screenshots

The screenshot above shows all the different configurations available:

- **Large Size with Date (24-hour)** - Perfect for a main display with full date information
- **Medium Size (Default)** - Balanced size with date display  
- **Small Size without Date** - Compact time-only display
- **12-Hour Format with AM/PM** - Classic 12-hour format with AM/PM indicator
- **Vertical Orientation** - Stacked layout for narrow spaces

All sizes and orientations feature the classic flip clock design with smooth animations between time changes.

## Styling

The module uses CSS variables and can be further customized by editing the `MMM-FlipFlopClock.css` file. The animations create smooth transitions between time changes:

- **Flip**: Realistic card-flipping effect with 3D rotation, subtle shadow effects, gradient backgrounds, and shine effect
- **Fade**: Simple opacity transition for a subtle effect
- **Slide**: Downward sliding motion with fade
- **Zoom**: Scale transformation for a dynamic effect
- **Roll**: Horizontal 3D rotation for a unique look
- **None**: Instant update for minimal distraction

## Technical Details

- Built with vanilla JavaScript (no external dependencies except Moment.js)
- Uses CSS3 3D transforms for flip animations
- Updates every second
- Lightweight and performant

## Troubleshooting

**Clock not showing up:**
- Check that the module is correctly added to your `config.js`
- Verify that the module folder is in the `modules` directory
- Check the MagicMirror logs for errors: `pm2 logs mm`

**Animation not smooth:**
- This may be due to hardware limitations
- Try reducing the size to "small"
- Ensure your Raspberry Pi or device has hardware acceleration enabled

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Credits

- Developed by Mats Kjoshagen Kolstad
- Inspired by classic flip clocks

## Changelog

### Version 1.2.0 (2026-01-08)
- Added orientation option for horizontal or vertical layout
- Default orientation is horizontal for backward compatibility
- Vertical mode ideal for narrow spaces and side positions
- Updated documentation with orientation examples

### Version 1.1.0 (2026-01-08)
- Added multiple animation types for time transitions
- New animation options: fade, slide, zoom, roll, and none
- Flip animation remains the default
- Updated documentation with animation examples

### Version 1.0.0 (2026-01-07)
- Initial release
- Basic flip clock functionality
- Configurable time and date display
- Three size options
- 12/24 hour format support
