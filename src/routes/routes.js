import config from 'src/config';
// Pages
import HomePage from 'src/pages/HomePage';
import MoviePage from 'src/pages/MoviePage';
import TiviPage from 'src/pages/TiviPage';
import SearchPage from 'src/pages/SearchPage';
import NotFound from 'src/pages/NotFound';
import Saved from 'src/pages/Saved';
import Profile from 'src/pages/Profile';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';

const routes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.movies, component: MoviePage, isFilterProvider: true },
    { path: config.routes.tvs, component: TiviPage, isFilterProvider: true },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.saved, component: Saved },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

export default routes;
