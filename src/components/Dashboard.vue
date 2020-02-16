<template>
  <div class="dashboard">
    <h1>Expenses overview</h1>
	<dashboard-summary/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardSummary from './DashboardSummary.vue';

@Component({
	components: {
		'dashboard-summary': DashboardSummary
	}
})
export default class Dashboard extends Vue {
	created() {
		this.$store.dispatch('getDashboards');
	}
} 
</script>