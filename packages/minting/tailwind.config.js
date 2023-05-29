const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  // prefix minting lib classes to avoid conflicting with the app
  prefix: "mm-",
  presets: [sharedConfig],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      }
    }
  },
};
