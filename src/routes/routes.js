import config from 'src/config';
// Pages
import HomePage from 'src/pages/HomePage';
import MoviePage from 'src/pages/MoviePage';
import TiviPage from 'src/pages/TiviPage';
import SearchPage from 'src/pages/SearchPage';
import NotFound from 'src/pages/NotFound';
import SavedPage from 'src/pages/SavedPage';
import ProfilePage from 'src/pages/ProfilePage';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import MovieInfoPage from 'src/pages/InfoPage/MovieInfoPage';
import TvInfoPage from 'src/pages/InfoPage/TvInfoPage';

import CollectionPage from 'src/pages/SavedDetailPage/CollectionPage';
import AllFilmsPage from 'src/pages/SavedDetailPage/AllFilmsPage';

// layout
import FilmLayout from 'src/layouts/FilmLayout';
import ResetPage from 'src/pages/ResetPage';
import WatchMoviePage from 'src/pages/WatchPage/WatchMoviePage';
import WatchTvPage from 'src/pages/WatchPage/WatchTvPage';
import HeaderOnlyLayout from 'src/layouts/HeaderOnlyLayout';

const routes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.movies, component: MoviePage, isFilterProvider: true },
    { path: config.routes.tvs, component: TiviPage, isFilterProvider: true },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.saved, component: SavedPage, private: true },
    { path: config.routes.collection, component: CollectionPage, private: true },
    { path: config.routes.allFilms, component: AllFilmsPage, private: true },
    {
        path: config.routes.profile,
        component: ProfilePage,
        layout: HeaderOnlyLayout,
        private: true,
    },

    { path: config.routes.movieInfo, component: MovieInfoPage, layout: FilmLayout },
    { path: config.routes.tvInfo, component: TvInfoPage, layout: FilmLayout },
    { path: config.routes.watchMovie, component: WatchMoviePage, layout: FilmLayout },
    { path: config.routes.watchTv, component: WatchTvPage, layout: FilmLayout },

    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.reset, component: ResetPage, layout: null },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

export default routes;
