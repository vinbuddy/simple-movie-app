import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';
import DefaultLayout from './layouts/DefaultLayout';

import Preloader from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';

import { FilterProvider } from './context/FilterContext';

function App() {
    const [preloading, setPreloading] = useState(true);

    useEffect(() => {
        let loadingTime =
            window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart;

        let timer = setTimeout(() => {
            setPreloading(false);
        }, loadingTime);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Router>
            <div className="app">
                {/* Scroll to top */}
                <ScrollToTop />

                {preloading ? (
                    <Preloader />
                ) : (
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout === null) Layout = Fragment;
                            else if (route.layout) Layout = route.layout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            {route.isFilterProvider ? (
                                                <FilterProvider>
                                                    <Page />
                                                </FilterProvider>
                                            ) : (
                                                <Page />
                                            )}
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
