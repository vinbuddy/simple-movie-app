import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import routes from './routes';
import DefaultLayout from './layouts/DefaultLayout';

import { ScrollToTop } from './components/ScrollToTop';

import { FilterProvider } from './context/FilterContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="app">
                {/* Scroll to top */}
                <ToastContainer limit={1} hideProgressBar pauseOnHover={false} />
                <ScrollToTop />

                <Routes>
                    {/* Public Route */}
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
                                    route.private ? (
                                        <PrivateRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    ) : (
                                        <Layout>
                                            {route.isFilterProvider ? (
                                                <FilterProvider>
                                                    <Page />
                                                </FilterProvider>
                                            ) : (
                                                <Page />
                                            )}
                                        </Layout>
                                    )
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
