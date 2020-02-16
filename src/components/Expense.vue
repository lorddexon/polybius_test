<template>
    <div class="expense">        
        <div class="expense__date">{{expense.transactionTime | moment("DD/MM/YYYY")}}</div>
        <div class="expense__info">
            <div class="expense__description">{{expense.description}}</div>
            <div class="expense__price">{{expense.currency}} {{expense.amount}}<br/><span class="expense__time">{{expense.transactionTime | moment("h:mm:ss")}}</span></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Expense extends Vue {
    @Prop()
    expense!: Dashboard;
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