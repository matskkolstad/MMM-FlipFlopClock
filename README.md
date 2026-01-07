# MMM-FlipFlopClock

A beautiful, classic flip clock module for MagicMirror². This module displays the current time with an elegant flip animation, reminiscent of vintage flip clocks.

![Flip Clock Preview](https://github.com/user-attachments/assets/08bdf0a7-cc01-480f-b69f-7c950d50ca10)

## Features

- ⏰ Classic flip clock design with smooth animations
- 🎨 Customizable colors and sizes
- 🕐 Support for both 12-hour and 24-hour time formats
- ⚙️ Optional seconds display
- 📅 Optional date display
- 📱 Responsive design
- 🎭 Beautiful flip animations

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
        size: "large"
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

## Date Format Options

The `dateFormat` option uses Moment.js formatting. Here are some common examples:

- `"dddd, MMMM D, YYYY"` → Tuesday, January 7, 2026
- `"ddd, MMM D"` → Tue, Jan 7
- `"LL"` → January 7, 2026
- `"MMMM D"` → January 7
- `"DD.MM.YYYY"` → 07.01.2026

See the [Moment.js documentation](https://momentjs.com/docs/#/displaying/format/) for more format options.

## Screenshots

The screenshot above shows all the different configurations available:

- **Large Size with Date (24-hour)** - Perfect for a main display with full date information
- **Medium Size (Default)** - Balanced size with date display
- **Small Size without Date** - Compact time-only display
- **12-Hour Format with AM/PM** - Classic 12-hour format with AM/PM indicator

All sizes feature the classic flip clock design with smooth animations between time changes.

## Styling

The module uses CSS variables and can be further customized by editing the `MMM-FlipFlopClock.css` file. The flip animation creates a realistic card-flipping effect with:

- Smooth 3D rotation animations
- Subtle shadow effects
- Gradient backgrounds for depth
- Shine effect during flips

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

### Version 1.0.0 (2026-01-07)
- Initial release
- Basic flip clock functionality
- Configurable time and date display
- Three size options
- 12/24 hour format support
