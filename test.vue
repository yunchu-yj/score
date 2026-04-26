<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
    <div>
        <h1 class="title" style="text-align: center;" @click="count++">当前计数: {{ count }}</h1>
    </div>
</template> 
