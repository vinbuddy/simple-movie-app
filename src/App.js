import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';
import DefaultLayout from './layouts/DefaultLayout';

import { ScrollToTop } from './components/ScrollToTop';

import { FilterProvider } from './context/FilterContext';

function App() {
    return (
        <Router>
            <div className="app">
                {/* Scroll to top */}
                <ScrollToTop />

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
            </div>
        </Router>
    );
}

export default App;
