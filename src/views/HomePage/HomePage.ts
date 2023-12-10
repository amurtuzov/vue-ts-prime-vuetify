import { defineComponent, ref } from 'vue'
import { default as AppButton } from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import { default as TextAreaComponent } from 'primevue/textarea'
import { usePrimeVue } from 'primevue/config'

export default defineComponent({
  name: 'HomePage',
  components: {
    AppButton,
    InputText,
    Dropdown,
    TextAreaComponent,
  },
  setup() {
    const version = APP_VERSION

    const selectedCity = ref()
    const cities = ref([
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ])

    // set default theme folder-name to currentTheme
    const currentTheme = ref('lara-light-teal')

    const PrimeVue = usePrimeVue()

    const toggleTheme = () => {
      // What is next theme? (2nd parameter)
      let nextTheme = 'lara-light-teal'
      if (currentTheme.value === 'lara-light-teal') nextTheme = 'lara-dark-teal'
      else if (currentTheme.value === 'lara-dark-teal')
        nextTheme = 'lara-light-teal'

      // 1. Current theme name
      // 2. Next theme name
      // 3. id of <link>, what reference to where set theme css file --> fix, single id to <link>
      PrimeVue.changeTheme(
        currentTheme.value,
        nextTheme,
        'theme-link',
        () => {},
      )

      // So current theme now:
      currentTheme.value = nextTheme
    }

    return {
      selectedCity,
      cities,
      version,
      toggleTheme,
    }
  },
})
