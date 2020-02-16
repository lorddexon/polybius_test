<template>
  <div class="dashboard__overview" @click="openDashboard" @mouseover="highlight(index, 0.3, true, percent)" @mouseleave="highlight(index, 1, false)">
		<h2 class="dashboard__header" :style="{'color':`rgba(${color}, 1)`}">{{dashboard.name}}</h2>
		<div class="dashboard__total-expenses">{{currency}} {{dashboard.amount}}
			<br/><span class="dashboard__total-percent">{{percent}}%</span>
		</div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
@Component
export default class DashboardOverview extends Vue {
	currency = "€";

	@Prop()
	dashboard!: Statistic;
	@Prop()
	color!: string;
	@Prop()
	percent!: number;
	@Prop()
	index!: number;

	openDashboard(): void {
		this.$router.push({ name: 'Single board', params: { board: this.dashboard.name} })
	}

	@Emit('highlight')
	highlight(index: number) {}
}

interface Dashboard {
	id: number;
	category: string;
	description: string;
	transactionTime: string;
	amount: string;
	currency: string;
}
interface Statistic {
    name: string;
    amount: number;
}
 </script>