import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/home'));

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
  },
];
