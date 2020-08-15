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
        numberOfNewsToDisplay: {
          val: 10, name: "Number of News to display"
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