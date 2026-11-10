<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
</script>

<template>
    <UError icon="i-lucide-file-x" :error="{
        statusCode: 404,
        statusMessage: '这里不是你该来的地方',
    }" :ui="{
        statusMessage: 'font-serif'
    }" />
</template>