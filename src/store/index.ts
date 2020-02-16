import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	dashboards: {},
	postUrl: 'http://localhost:3000',
	config: {
		headers: {
			'Accept': 'application/json'
		}
	},
  },
  getters: {
	filterDashboards: (state) => (type: keyof Dashboard) => {
		const filteredDashboard: {[key: string]: Dashboard[]}  = JSON.parse(JSON.stringify(state.dashboards));
		return (filteredDashboard[type]);
    }
  },
  mutations: {
	SET_DASHBOARDS(state, dashboards) {
		state.dashboards = dashboards;
	}
  },
  actions: {
	getDashboards({commit, state}) {
		axios.get(state.postUrl).then(response => {
			const dashboardCategories: string[] = [];
			const dashboards: { [key: string]: Dashboard[] } = {};
			// finding unique categories and pushing into it all related expenses
			response.data.filter((d: Dashboard, i: number) => {
				if (response.data.findIndex((r: Dashboard) => r.category === d.category) === i) {
					dashboardCategories.push(d.category);
					Object.defineProperty(dashboards, d.category, {value: [], enumerable: true});
				}
				dashboards[d.category].push(d);
			})
			commit('SET_DASHBOARDS', dashboards);
			
		}).catch(e => {
			console.error(`${e}: that's an error`);
		});
	},
  }
})

interface Dashboard {
	id: number;
	category: string;
	description: string;
	transactionTime: string;
	amount: string;
	currency: string;
}