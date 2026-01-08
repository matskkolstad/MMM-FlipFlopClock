/* Example configuration for MMM-FlipFlopClock module
 * 
 * Copy this configuration into your config/config.js file
 * in the modules array.
 */

// Example 1: Default configuration (recommended)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        // Uses all default values
        // timeFormat: 24
        // showSeconds: true
        // showDate: true
        // size: "medium"
        // orientation: "horizontal"
    }
}

// Example 2: Large clock with 12-hour format
{
    module: "MMM-FlipFlopClock",
    position: "middle_center",
    config: {
        timeFormat: 12,
        showSeconds: true,
        showDate: true,
        dateFormat: "dddd, MMMM D",
        size: "large",
        orientation: "horizontal"
    }
}

// Example 3: Minimal clock (no date, no seconds)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        showSeconds: false,
        showDate: false,
        size: "medium",
        orientation: "horizontal"
    }
}

// Example 4: Small clock with European date format
{
    module: "MMM-FlipFlopClock",
    position: "top_right",
    config: {
        timeFormat: 24,
        showSeconds: false,
        showDate: true,
        dateFormat: "DD.MM.YYYY",
        size: "small",
        orientation: "horizontal"
    }
}

// Example 5: Vertical orientation
{
    module: "MMM-FlipFlopClock",
    position: "top_left",
    config: {
        timeFormat: 24,
        showSeconds: true,
        showDate: true,
        size: "medium",
        orientation: "vertical"
    }
}

// Example 6: Vertical orientation without seconds
{
    module: "MMM-FlipFlopClock",
    position: "bottom_left",
    config: {
        timeFormat: 12,
        showSeconds: false,
        showDate: false,
        size: "small",
        orientation: "vertical"
    }
}
