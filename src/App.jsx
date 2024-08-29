import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NavBar from './components/navbar'

import HomePage from './pages/homepage'
import Detail from './pages/detail'
import MoviesPage from './pages/movies.page'
import SeriesPage from './pages/series.page'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SkeletonTheme } from 'react-loading-skeleton'
import SearchPage from './pages/searchpage'

function App() {
    const queryClient = new QueryClient()
    const router = createBrowserRouter([
        {
            element: <NavBar />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/movie/:id',
                    element: <Detail />,
                },
                {
                    path: '/showMovies',
                    element: <MoviesPage />,
                },
                { path: '/showSeries', element: <SeriesPage /> },
                {
                    path: '/search',
                    element: <SearchPage />,
                },
            ],
        },
        ,
    ])
    return (
        <>
            <SkeletonTheme baseColor="#003285" highlightColor="#002379">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </SkeletonTheme>
        </>
    )
}

export default App
