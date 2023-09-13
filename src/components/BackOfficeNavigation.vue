<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<template>
    <Navigation></Navigation>
    <div id="adminnav">
        <p><router-link :to="`/addbreed`" class="link">{{ $t('nav.add') }}</router-link></p>
        <p><router-link :to="`/updatebreed`" class="link">{{ $t('nav.update') }}</router-link></p>
        <p><router-link :to="`/deletebreed`" class="link">{{ $t('nav.delete') }}</router-link></p>
    </div>
</template>

<style>
    #adminnav {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        width: 100%;
    }

    #adminnav .link {
        font-size: 1.5rem;
        color: var(--color-text-green);
        text-decoration: none;
        margin-right: 5rem;
    }
</style>