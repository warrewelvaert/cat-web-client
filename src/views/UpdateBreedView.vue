<script setup>
    import axios from 'axios';
    import BackOfficeNavigation from '../components/BackOfficeNavigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <BackOfficeNavigation></BackOfficeNavigation>
    <div id="update-breed-container">
        <h1>{{ $t('update.title') }}</h1>
        <div :class="{hidden: hideList}">
            <div v-if="apiData">
                <div class="cat-list" v-for="entry in apiData" :key="entry.id">
                  <div>
                    <p>{{ entry.id }}</p>
                    <p>{{ entry.detail[0].name }} / {{ entry.detail[1].name }}</p>
                    <button @click="fetchBreed(entry.id)">{{ $t('update.submit') }}</button>
                  </div>
                </div>
            </div>
            <p v-else-if="error">Error: {{ error }}</p>
            <p v-else>{{ $t('list.loading') }}</p>
        </div>
        <div>
            <form @submit.prevent="updateBreed" id="update-breed-form" :class="{hidden: hideForm}">
                <label for="en-name">{{ $t('add.name') }} {{ $t('add.english') }}</label>
                <input type="text" id="en-name" v-model="enName" required maxlength="255">
                <label for="nl-name">{{ $t('add.name') }} {{ $t('add.dutch') }}</label>
                <input type="text" id="nl-name" v-model="nlName" required maxlength="255">
                <label for="en-description">{{ $t('add.description') }} {{ $t('add.english') }}</label>
                <textarea id="en-description" v-model="enDescription" required></textarea>
                <label for="nl-description">{{ $t('add.description') }} {{ $t('add.dutch') }}</label>
                <textarea id="nl-description" v-model="nlDescription" required></textarea>
                <label for="en-temperament">{{ $t('add.temperament') }} {{ $t('add.english') }}</label>
                <textarea id="en-temperament" v-model="enTemperament" required></textarea>
                <label for="nl-temperament">{{ $t('add.temperament') }} {{ $t('add.dutch') }}</label>
                <textarea id="nl-temperament" v-model="nlTemperament" required></textarea>
                <label for="en-origin">{{ $t('add.origin') }} {{ $t('add.english') }}</label>
                <input type="text" id="en-origin" v-model="enOrigin" required maxlength="255">
                <label for="nl-origin">{{ $t('add.origin') }} {{ $t('add.dutch') }}</label>
                <input type="text" id="nl-origin" v-model="nlOrigin" required maxlength="255">
                <label for="lifespan">{{ $t('add.lifespan') }}</label>
                <input type="text" id="lifespan" v-model="lifespan" required maxlength="255">
                <label for="en-wikipedia-url">{{ $t('add.wikipedia') }} {{ $t('add.english') }}</label>
                <input type="text" id="en-wikipedia-url" v-model="enWikipediaUrl" required maxlength="255">
                <label for="nl-wikipedia-url">{{ $t('add.wikipedia') }} {{ $t('add.dutch') }}</label>
                <input type="text" id="nl-wikipedia-url" v-model="nlWikipediaUrl" required maxlength="255">
                <label for="image-url">{{ $t('add.image') }}</label>
                <input type="text" id="image-url" v-model="imageUrl" required maxlength="255">
                <button type="submit">{{ $t('update.submit') }}</button>
            </form>
            <p id="update-success" :class="{hidden: hideSuccess}">{{ $t('update.success') }}</p>
            <p id="update-fail" :class="{hidden: hideFailure}">{{ $t('update.error') }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            enName: '',
            nlName: '',
            enDescription: '',
            nlDescription: '',
            enTemperament: '',
            nlTemperament: '',
            enOrigin: '',
            nlOrigin: '',
            lifespan: '',
            enWikipediaUrl: '',
            nlWikipediaUrl: '',
            imageUrl: '',
            hideSuccess: true,
            hideFailure: true,
            hideForm: true,
            hideList: false,
            apiData: null,
            error: null,
            id: null
        };
    },
    created() {
        this.hideForm = true;
        this.hideList = false;
        this.fetchData();
        this.id = null;
        [this.enName, this.nlName, this.enDescription,
             this.nlDescription, this.enWikipediaUrl, this.nlWikipediaUrl,
              this.enOrigin, this.nlOrigin, this.enTemperament, this.nlTemperament,
               this.lifespan, this.imageUrl] = '';
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
        fetchBreed(id) {
            axios.get(`${API_URL}cats/${id}`)
            .then(response => {
                this.enName = response.data.detail[0].name;
                this.nlName = response.data.detail[1].name;
                this.enDescription = response.data.detail[0].description;
                this.nlDescription = response.data.detail[1].description;
                this.enTemperament = response.data.detail[0].temperament;
                this.nlTemperament = response.data.detail[1].temperament;
                this.enOrigin = response.data.detail[0].origin;
                this.nlOrigin = response.data.detail[1].origin;
                this.lifespan = response.data.lifespan;
                this.enWikipediaUrl = response.data.detail[0].wikipedia_url;
                this.nlWikipediaUrl = response.data.detail[1].wikipedia_url;
                this.imageUrl = response.data.image_url;
                this.hideForm = false;
                this.hideList = true;
                this.hideFailure = true;
                this.hideSuccess = true;
                this.id = id;
            })
            .catch(error => {
                this.hideForm = false;
                this.error = error.message;
            });
        },

        async updateBreed() {
            try {
                const token = localStorage.getItem('token');
                const body = {
                    "image_url": this.imageUrl,
                    "lifespan": this.lifespan,
                    "detail": [
                        {
                            "language": "en",
                            "name": this.enName,
                            "description": this.enDescription,
                            "origin": this.enOrigin,
                            "temperament": this.enTemperament,
                            "wikipedia_url": this.enWikipediaUrl
                        },
                        {
                            "language": "nl",
                            "name": this.nlName,
                            "description": this.nlDescription,
                            "origin": this.nlOrigin,
                            "temperament": this.nlTemperament,
                            "wikipedia_url": this.nlWikipediaUrl
                        }
                    ]
                };
                const response = await axios.put(`${API_URL}cats/${this.id}`, body, { headers: { 'Authorization': `Bearer ${token}` } })
                if (response.status === 200) {
                    this.showSuccess();
                }
                else {
                    this.showFailure();
                }
            } catch (error) {
                this.showFailure();
            }
        },
        
        showSuccess() {
            this.hideSuccess = false;
            this.hideFailure = true;
            this.hideForm = true;
            this.hideList = false;
            this.fetchData();
            [this.enName, this.nlName, this.enDescription,
             this.nlDescription, this.enWikipediaUrl, this.nlWikipediaUrl,
              this.enOrigin, this.nlOrigin, this.enTemperament, this.nlTemperament,
               this.lifespan, this.imageUrl] = '';
        },

        showFailure() {
            this.hideSuccess = true;
            this.hideFailure = false;
        }
    }
};
</script>

<style>

    #update-breed-container h1 {
        color: var(--color-text-green);
        margin-bottom: 3rem;
    }

    #update-breed-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #update-breed-form label {
        width: 75%;
        text-align: left;
        font-size: 1.5rem;
    }

    #update-breed-form input, textarea {
        width: 75%;
        font-size: 1.2rem;
        padding: 0.3rem;
        border-radius: 0.3rem;
        margin-bottom: 1.5rem;
    }

    textarea {
        width: 75%;
        height: 10vh;
        resize: none;
    }

    #update-breed-form input:focus, textarea:focus {
        outline: none;
        border: 3px solid var(--color-text-green);
        border-color: var(--color-text-green);
    }

    #update-breed-container {
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

    #update-breed-container button {
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

    #update-breed-container button:hover {
        box-shadow: 0 0 0.5rem var(--color-text-green);
    }

    #update-success {
        color: var(--color-text-green);
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    #update-fail {
        color: red;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    .hidden {
        display: none !important;
    }

    #update-breed-container .cat-list div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 1.5rem;
        border-bottom: 1px solid var(--color-background);
    }

    #update-breed-container .cat-list button {
        margin-top: 0.5rem !important;
        margin-bottom: 0.5rem !important;
    }

    #update-breed-container .cat-list div p:nth-child(2) {
        text-align: left;
        width: 40%;
        margin-left: 2rem;
    }

</style>