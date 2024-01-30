/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      "app-theme": {
        dark: true,
        colors: {
          primary: "#1f1f1f",
          secondary: "#121212",
          tertiary: "#212121",
          background: "#212121",
          active: "#03a9f4",
          hover: "#c43b3b",
          base: "#ffffff",
          blue: "#2196F3",
          "blue-lighten": "#64B5F6",
          teal: "#1de9b6",
          red: "#E57373",
          white: "#ffffff"

        }
      }
    },
    defaultTheme: "app-theme",
  }
})
