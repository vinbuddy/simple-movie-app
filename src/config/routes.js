const routes = {
    home: '/',
    movies: '/movies',
    tvs: '/tvs',
    search: '/search',
    movieInfo: '/infor/movie/:id',
    tvInfo: '/infor/tv/:id',
    watchMovie: '/watch/movie/:id',
    watchTv: '/watch/tv/:id',
    saved: '/saved',
    collection: '/saved/:collection/:id',
    allFilms: '/saved/all-films',
    profile: '/profile',
    login: '/login',
    register: '/register',
    reset: '/reset',
    notFound: '*',
};

export default routes;
