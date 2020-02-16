<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {
	created() {
		this.$store.dispatch('getDashboards');
	}
} 
</script>
<style lang="scss">
	@import "./styles/main.scss";
</style>