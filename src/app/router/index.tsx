import BaseLayout from '@/app/layouts/baseLayout';
import { PATHS } from '../config';
import { createBrowserRouter } from 'react-router-dom'
import MainPage from '@/pages/mainPage';
import BoundariesPage from '@/pages/boundariesPage';

export const router = () => createBrowserRouter([
    {
        element: <BaseLayout />,
        errorElement : <BoundariesPage/>,
        children : [
            {
                path: PATHS.MAIN,
                element: (
                    <MainPage/>
                )
            }
        ]
    }
])