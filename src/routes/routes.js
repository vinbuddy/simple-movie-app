// Pages
import Trending from 'src/pages/Trending';
import Playing from 'src/pages/Playing';
import Rating from 'src/pages/Rating';
import Uncoming from 'src/pages/Uncoming';
import NotFound from 'src/pages/NotFound';

import config from 'src/config';

const routes = [
    { path: config.routes.home, component: Trending },
    { path: config.routes.playing, component: Playing },
    { path: config.routes.rating, component: Rating },
    { path: config.routes.uncoming, component: Uncoming },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

export default routes;
