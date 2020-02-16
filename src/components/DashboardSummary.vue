<template>
    <div class="dashboard__summary">
        <div class="pie" :style="{ 'background': `conic-gradient(${pieArray})`}">
            <p v-show="isPercentVisible === false">Total:<br/>{{currency}} {{totalExpenses}}</p>
            <div class="pie__percentage" v-show="isPercentVisible">
                {{displayedPercentage}}%
            </div>
        </div>
        <div class="dashboard__table">
            <dashboard-overview
                v-for="(dashboard, index) in dashboards"
                :key="index"
                :index="index"
                :color="colors[index].color"
                :percent="piePercentage[index]"              
                :dashboard="dashboard"
                @highlight="highlight">
            </dashboard-overview>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardOverview from './DashboardOverview.vue';

@Component({
    components: {
        'dashboard-overview': DashboardOverview
    }
})
export default class DashboardSummary extends Vue {
    currency = "€";
    totalExpenses = 0;
    colors = [
        {color: '218, 164, 30', opacity: 1},
        {color: '101, 148, 238', opacity: 1},
        {color: '205, 91, 91', opacity: 1},
        {color: '216, 192, 216', opacity: 1},
        {color: '0, 150, 136', opacity: 1}
    ];
    colorSeparator = {color: '232, 232, 232', opacity: 1};
    pieArray: string[] = [];
    piePercentage: number[] = [];
    isPercentVisible = false;
    displayedPercentage = 0;

    get dashboards() {
        const groupedDashboards: Statistic[] = [];
        for (const dashboard of Object.entries(this.$store.state.dashboards)) {
            groupedDashboards.push({name: dashboard[0], amount: Object.values(dashboard[1] as Dashboard).reduce((totalSum: number, current: Dashboard) => {
                return totalSum + parseFloat(current.amount);
            }, 0).toFixed(2)})
        }
        this.calculateTotalExpenses(groupedDashboards);
        return groupedDashboards;
    }
    
    calculateTotalExpenses(dashboards: Statistic[]): void {
        this.totalExpenses = 0;
        dashboards.forEach((dashboard: Statistic) => {
            this.totalExpenses += +dashboard.amount;
        });
        this.pieArray = [];
        this.piePercentage = [];
        let tempPercentage = 0;
        dashboards.forEach((dashboard: Statistic, index: number) => {
            const currentPercentage = (dashboard.amount / this.totalExpenses * 100).toFixed(2);
            this.piePercentage.push(+(dashboard.amount / this.totalExpenses * 100).toFixed(2));
            this.pieArray.push(`rgba(${this.colorSeparator.color}, ${this.colorSeparator.opacity}) 0 ${(tempPercentage + 0.5).toFixed(2)}%`);
            this.pieArray.push(`rgba(${this.colors[index].color}, ${this.colors[index].opacity}) 0 ${tempPercentage + +(dashboard.amount / this.totalExpenses * 100).toFixed(2)}%`);
            tempPercentage += parseFloat(currentPercentage);
        })
    }
    highlight(index: number, opacity: number, displayPercent = false, percent = 0) {
        this.colors.map((color: Color, i: number) => {
            if (index !== i) {
                color.opacity = opacity;
            }
        })
        if (displayPercent === true) {
            this.isPercentVisible = true;
            this.displayedPercentage = percent;
        } else {
            this.isPercentVisible = false;
        }
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

interface Statistic {
    name: string;
    amount: number;
}
interface Color {
    color: string;
    opacity: number;
}
 </script>