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
        size: "large"
    }
}

// Example 3: Minimal clock (no date, no seconds)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        showSeconds: false,
        showDate: false,
        size: "medium"
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
        size: "small"
    }
}
