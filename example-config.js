/* Example configuration for MMM-FlipFlopClock module
 * 
 * Copy this configuration into your config/config.js file
 * in the modules array.
 */

// Example 1: Default configuration (dark theme, medium, 24-hour, with seconds & date)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        // All default values shown for reference:
        // timeFormat:      24,
        // showSeconds:     true,
        // showDate:        true,
        // dateFormat:      "dddd, MMMM D, YYYY",
        // size:            "medium",    // "small" | "medium" | "large" | "xlarge"
        // animationType:   "flip",      // "flip" | "fade" | "slide" | "zoom" | "roll" | "none"
        // orientation:     "horizontal",// "horizontal" | "vertical"
        // theme:           "dark",      // "dark" | "light" | "amber" | "green" | "blue"
        // blinkSeparator:  false,
        // timezone:        null,        // e.g. "America/New_York" (needs moment-timezone)
    }
}

// Example 2: Large amber clock, 12-hour format, blinking separator
{
    module: "MMM-FlipFlopClock",
    position: "middle_center",
    config: {
        timeFormat:     12,
        showSeconds:    true,
        showDate:       true,
        dateFormat:     "dddd, MMMM D",
        size:           "large",
        theme:          "amber",
        blinkSeparator: true,
        orientation:    "horizontal"
    }
}

// Example 3: Minimal green clock (no date, no seconds)
{
    module: "MMM-FlipFlopClock",
    position: "top_center",
    config: {
        showSeconds: false,
        showDate:    false,
        size:        "medium",
        theme:       "green",
        animationType: "fade",
    }
}

// Example 4: Small clock with European date format
{
    module: "MMM-FlipFlopClock",
    position: "top_right",
    config: {
        timeFormat:  24,
        showSeconds: false,
        showDate:    true,
        dateFormat:  "DD.MM.YYYY",
        size:        "small",
        theme:       "dark",
    }
}

// Example 5: Extra-large blue clock, vertical orientation
{
    module: "MMM-FlipFlopClock",
    position: "top_left",
    config: {
        timeFormat:  24,
        showSeconds: true,
        showDate:    true,
        size:        "xlarge",
        theme:       "blue",
        orientation: "vertical",
        animationType: "flip",
    }
}

// Example 6: Light theme, roll animation, timezone override
{
    module: "MMM-FlipFlopClock",
    position: "bottom_right",
    config: {
        timeFormat:    12,
        showSeconds:   false,
        showDate:      false,
        size:          "medium",
        theme:         "light",
        animationType: "roll",
        timezone:      "America/New_York",
    }
}
