/* eslint-disable react-refresh/only-export-components */
export const TOKEN = 'token'

export const BASE = '/'

export const PATHS = {
    MAIN      : `${BASE}/main`
}

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
}
  
export interface CustomTheme {
    background: 'string'
}
