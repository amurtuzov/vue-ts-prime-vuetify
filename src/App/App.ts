import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.vue'
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/main'

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute()
    const mainStore = useMainStore()

    const componentKey = computed(() => {
      return route.path
    })

    const layoutComponent = computed(() => `${route.meta.layout}Layout`)

    const setAppWindowWidth = () => {
      mainStore.$patch({
        windowWidth: window.innerWidth,
      })
    }

    const calculateDeviceUnitHeight = () => {
      if (mainStore.isMobile) {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }

    onMounted(async () => {
      setAppWindowWidth()
      calculateDeviceUnitHeight()
      window.addEventListener('scroll', calculateDeviceUnitHeight)
      window.addEventListener('resize', calculateDeviceUnitHeight)
      window.addEventListener('resize', setAppWindowWidth)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', calculateDeviceUnitHeight)
      window.removeEventListener('resize', calculateDeviceUnitHeight)
      window.removeEventListener('resize', setAppWindowWidth)
    })
    return {
      layoutComponent,
      mainStore,
      componentKey,
    }
  },
})
