<template>
  <div class="">
    <LoginForm/>
  </div>
  <Toast></Toast>
</template>

<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
const toast = useToast();

const route = useRoute();

if (route.query.error === 'backend_unreachable') {
  toast.add({ severity: 'error', summary: 'Error', detail: 'Unable to reach backend server. Please try again later.', life: 5000 });
}
</script>
