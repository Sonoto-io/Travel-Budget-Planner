<template>
    <Panel>
    <!-- Main Currency -->
    <div class="p-4">
        <label for="mainCurrency" class="block mb-2">Main Currency</label>
        <Select
            id="mainCurrency"
            v-model="configStore.mainCurrency"
            :options="configStore.currencies"
            optionLabel="label"
            placeholder="Select a currency"
        />
    </div>
    <!-- Enable Background -->
    <div class="p-4">
        <label for="enableBackground" class="block mb-2">Enable Dynamic Background</label>
        <ToggleSwitch id="enableBackground" v-model="configStore.enableBackground" />
    </div>
    <!-- Controls -->
    <div>
         <Button label="Save Settings" icon="pi pi-save" class="p-button-text" @click="saveSettings" />
    </div>
    </Panel>
</template>

<script setup lang="ts">
import Select from "primevue/select";
import { ref, onMounted, watch } from "vue";
import { useConfigStore } from "@/stores/configStore";
import Button from "primevue/button";
import Panel from "primevue/panel";
import { useToast } from "primevue/usetoast";
import ToggleSwitch from 'primevue/toggleswitch';

const toast = useToast();

const configStore = useConfigStore();

const saveSettings = () => {
    configStore.saveConfig();
    toast.add({
    severity: "success",
    summary: "Settings saved successfully.",
    life: 3000,
  })
};
</script>