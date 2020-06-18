import { createBrowserHistory } from 'history';
import BasicLayout from '@/pages/layout';
import Home from '@/pages/Home';
import Details from '@/pages/Home/details';
import List from '@/pages/Home/list';

export const history = createBrowserHistory();

export const routes = [
  {
    path:'/',
    layout: BasicLayout,
    component: Home,
  },
  {
    path:'/details',
    layout: BasicLayout,
    component: Details
  },
  {
    path:'/list',
    layout: BasicLayout,
    component: List
  },
  
]