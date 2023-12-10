/// <reference types="vite/client" />
declare const APP_VERSION: string
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
