import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from "@/shared/ui/loader";
import styles from './baseLayout.module.scss'

export default function BaseLayout() {
    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <div 
                className = {styles.main}
                style     = {{ background: theme?.background }}
            >
                <Suspense fallback={<Loader/>}>
                    <Outlet />
                </Suspense>
            </div>
        </ThemeProvider>
    )
}