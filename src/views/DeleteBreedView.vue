<script setup>
    import axios from 'axios';
    import BackOfficeNavigation from '../components/BackOfficeNavigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <BackOfficeNavigation></BackOfficeNavigation>
    <div id="delete-breed-container">
        <h1>{{ $t('delete.title') }}</h1>
        <div>
            <div v-if="apiData">
                <div class="cat-list" v-for="entry in apiData" :key="entry.id">
                    <div>
                        <p>{{ entry.id }}</p>
                        <p>{{ entry.detail[0].name }} / {{ entry.detail[1].name }}</p>
                        <button @click="deleteBreed(entry.id)">{{ $t('delete.submit') }}</button>
                    </div>
                    </div>
                </div>
                <p v-else>{{ $t('list.loading') }}</p>
        </div>
        <p id="delete-success" :class="{hidden: hideSuccess}">{{ $t('delete.success') }}</p>
        <p id="delete-fail" :class="{hidden: hideFailure}">{{ $t('delete.error') }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apiData: null,
            error: null,
            id: null,
            hideSuccess: true,
            hideFailure: true
        };
    },
    created() {
        this.hideList = false;
        this.fetchData();
        this.id = null;
        this.hideSuccess = true;
        this.hideFailure = true;
    },
    methods: {
        fetchData() {
            axios.get(`${API_URL}cats/`)
            .then(response => {
                this.apiData = response.data;
            })
            .catch(error => {
                this.error = error.message;
            });
        },
        deleteBreed(id) {
            const token = localStorage.getItem('token');
            axios.delete(`${API_URL}cats/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                this.fetchData();
                this.showSuccess();
            })
            .catch(error => {
                this.error = error.message;
                this.showFailure();
            });
        },
        showSuccess() {
            this.hideSuccess = false;
            this.hideFailure = true;
        },
        showFailure() {
            this.hideSuccess = true;
            this.hideFailure = false;
        }
    }
}
</script>

<style>
    #delete-breed-container {
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 2rem;
        justify-content: center;
        align-items: center;
        background-color: var(--color-background-soft);
        padding: 2rem;
        border-radius: 0.5rem;
        text-align: center;
        margin-bottom: 3rem;
    }

    #delete-breed-container h1 {
        color: var(--color-text-green);
        margin-bottom: 3rem;
    }

    #delete-breed-container button {
        background-color: var(--color-text-green);
        color: white;
        padding: 0.5rem 2rem 0.7rem 2rem;
        border-radius: 0.5rem;
        margin-top: 2rem;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
        margin-bottom: 2rem;
    }

    #delete-breed-container button:hover {
        box-shadow: 0 0 0.5rem var(--color-text-green);
    }

    #delete-success {
        color: var(--color-text-green);
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    #delete-fail {
        color: red;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    #delete-breed-container .cat-list div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 1.5rem;
        border-bottom: 1px solid var(--color-background);
    }

    #delete-breed-container .cat-list button {
        margin-top: 0.5rem !important;
        margin-bottom: 0.5rem !important;
    }

    #delete-breed-container .cat-list div p:nth-child(2) {
        text-align: left;
        width: 40%;
        margin-left: 2rem;
    }

    .hidden {
        display: none !important;
    }

</style>