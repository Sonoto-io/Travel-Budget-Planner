<template>
    <div class="flex flex-col gap-4 p-4 items-center w-full">
        <div>Expenses Count : {{ props.summary?.countExpenses }}</div>
        <div>Total : {{ formatCurrency(props.summary?.totalExpenses, mainCurrency) }}</div>
        <div class="flex flex-col items-center">
            <h3 class="self-">Repartition by category</h3>
            <Chart type="doughnut" :data="repartitionChartData" :options="repartitionChartOptions"
                class="w-full h-64 m-2 flex flex-col items-center" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import Chart from 'primevue/chart';
import { formatCurrency } from "@/utils/CurrencyUtils";

const props = defineProps<{
    summary: Object;
}>();

const mainCurrency = ref({ locale: "fr-FR", name: "EUR" }); // TODO: fetch from api
const repartitionChartData = ref();
const repartitionChartOptions = ref();


const setRepartitionChartData = () => {
    if (!props.summary) return { labels: [], datasets: [] };

    const flatSubcategories = props.summary.repartition.flatMap(cat =>
        cat.subcategories.map(sub => ({
            ...sub,
            parentName: cat.name
        }))
    );

    return {
        datasets: [
            {
                label: "Categories",
                data: props.summary.repartition.map(cat => cat.totalExpenses),
                backgroundColor: ["#4DC18A", "#3993d0", "#F45B69", "#fac05e", "#9649cb"],
                cutout: "50%",
                radius: "70%"
            },
            {
                label: "Subcategories",
                data: flatSubcategories.map(sub => sub.totalExpenses),
                backgroundColor: ["#4DC18A", "#3993d0", "#F45B69", "#fac05e", "#9649cb"],
                cutout: "70%",
                radius: "100%"
            }
        ]
    };
};


const setRepartitionChartOptions = () => {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--p-text-color');
    if (!props.summary) return { labels: [], datasets: [] };

    return {
        // responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.datasetIndex === 0) {
                            const cat = props.summary.repartition[context.dataIndex];
                            return `${cat.name}: ${formatCurrency(cat.totalExpenses, mainCurrency.value)}`;
                        } else {
                            const flatSubcategories = props.summary.repartition.flatMap(cat =>
                            cat.subcategories.map(sub => ({
                                ...sub,
                                parentName: cat.name
                            }))
                        );
                            const sub = flatSubcategories[context.dataIndex];
                            return `${sub.parentName} - ${sub.name}: ${formatCurrency(sub.totalExpenses, mainCurrency.value)}`;
                        }
                    }
                }
            }
        }
    };
};



onMounted(() => {
    repartitionChartData.value = setRepartitionChartData();
    repartitionChartOptions.value = setRepartitionChartOptions();
});

watchEffect(() => {
    repartitionChartData.value = setRepartitionChartData();
    repartitionChartOptions.value = setRepartitionChartOptions();
});


</script>