<template>
	<div class="dashboard__single">
		<h1>Expenses details for "{{$route.params.board}}"</h1>
        <div class="expense__back" @click="goBack">˂- back to dashboard</div>
		<div class="dashboard__expenses">
			<expense v-for="(expense, index) in dashboards" :key="index" :expense="expense"></expense>
		</div>
        <div class="expense__back" @click="goBack">˂- back to dashboard</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Expense from './Expense.vue';

@Component({
	components: {
		'expense': Expense
	}
})
export default class DashboardSingle extends Vue {
	get dashboards() {
		const filteredDashboard: Dashboard[] = this.$store.getters.filterDashboards(this.$route.params.board);
		if (filteredDashboard != undefined) {
			filteredDashboard.sort((a: Dashboard, b: Dashboard) => 
				(a.transactionTime > b.transactionTime) ? -1 : ((b.transactionTime > a.transactionTime) ? 1 : 0));			
		}
		return filteredDashboard;
	}
	
    goBack(): void {
        this.$router.back();
	}
}
interface Dashboard {
	id: number;
	category: string;
	description: string;
	transactionTime: string;
	amount: string;
	currency: string;
}
 </script>