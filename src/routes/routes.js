import config from 'src/config';
// Pages
import Home from 'src/pages/Home';
import Trending from 'src/pages/Trending';
import Tivi from 'src/pages/Tivi';
import Search from 'src/pages/Search';
import NotFound from 'src/pages/NotFound';
import Movie from 'src/pages/Movie';
import Saved from 'src/pages/Saved';
import Profile from 'src/pages/Profile';

const routes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.tv, component: Tivi },
    { path: config.routes.search, component: Search },
    { path: config.routes.movie, component: Movie },
    { path: config.routes.saved, component: Saved },
    { path: config.routes.profile, component: Profile },

    { path: config.routes.notFound, component: NotFound, layout: null },
];

export default routes;
