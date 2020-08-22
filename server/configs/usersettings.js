// These are the default setttings 

const userSettings = {
    type: Object,
    default: {
      Design: { 
        boxShadow: {
          val: false, name: "Box Shadow"
        },
        theme: {
          val: "light", name: "Theme"
        }
      },
      Performance: {
        intervalUpdatecheck: {
          val: 30000, name: "Frequency: Check for Update" // Default: 30 Sekunden 
        },
      },
      Effects: {
        parallax: {
          val: true, name: "Parallax"
        },
        slideGallery: {
          val: true, name: "Slide Gallery"
        }
      }
    }
}

module.exports = userSettings;