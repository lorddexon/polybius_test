import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue';
import DashboardSingle from '../components/DashboardSingle.vue';

Vue.use(VueRouter)

const routes = [
{
	path: '/',
	name: 'Dashboard',
	component: Dashboard,
	// children: [
	//   {
	//     path: ':board',
	//     name: 'Single board',
	//     component: DashboardSingle,
	//     meta: {
	//       title: ''
	//     },
	//   }
	// ]
}, {
	path: '/:board',
	name: 'Single board',
	component: DashboardSingle,
	meta: {
	title: ''
	},
}
]

const router = new VueRouter({
mode: 'history',
base: process.env.BASE_URL,
routes
})

export default router
