<template>
    <div class="flex flex-col gap-4 p-4 items-center w-full">
        <h3 class="self-">{{ props.title }}</h3>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="w-full" />
    </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore';
import { formatCurrency } from '@/utils/CurrencyUtils';
import Chart from 'primevue/chart';
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
    summary: Object;
    title: string;
}>();

const configStore = useConfigStore();

const mainCurrency = ref(configStore.mainCurrency);
const chartData = ref();
const chartOptions = ref();

watch(configStore, () => {
  mainCurrency.value = configStore.mainCurrency;
});

onMounted(() => {
    if (props.summary) {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
    }
});

watch(() => props.summary, () => {
    if (props.summary) {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
    }
}, { deep: true });


const setChartData = () => {
    return {
        labels: Object.keys(props.summary),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(props.summary).map((item) => item.totalExpenses),
                backgroundColor: ["#4DC18A", "#3993d0", "#F45B69", "#fac05e", "#9649cb"],
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            }
        },

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return formatCurrency(context.parsed.x, mainCurrency.value);
                    }
                }
            }
        }
    };
}


</script>