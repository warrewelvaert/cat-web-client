<script setup>
    import axios from 'axios';
    import BackOfficeNavigation from '../components/BackOfficeNavigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <BackOfficeNavigation></BackOfficeNavigation>
    <div id="add-breed-container">
        <h1>{{ $t('add.title') }}</h1>
        <div>
            <form @submit.prevent="addBreed" id="add-breed-form" >
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
                <p id="add-success" :class="{hidden: hideSuccess}">Cat created successfully</p>
                <p id="add-fail" :class="{hidden: hideFailure}">Something went wrong</p>
                <button type="submit">{{ $t('add.submit') }}</button>
            </form>
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
            hideFailure: true
        };
    },
    methods: {
        async addBreed() {
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
                const response = await axios.post(`${API_URL}cats`, body, { headers: { 'Authorization': `Bearer ${token}` } })
                if (response.status === 201) {
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

    #add-breed-container h1 {
        color: var(--color-text-green);
        margin-bottom: 3rem;
    }

    #add-breed-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #add-breed-form label {
        width: 75%;
        text-align: left;
        font-size: 1.5rem;
    }

    #add-breed-form input, textarea {
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

    #add-breed-form input:focus, textarea:focus {
        outline: none;
        border: 3px solid var(--color-text-green);
        border-color: var(--color-text-green);
    }

    #add-breed-container {
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

    #add-breed-container button {
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

    #add-breed-container button:hover {
        box-shadow: 0 0 0.5rem var(--color-text-green);
    }

    #add-success {
        color: var(--color-text-green);
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    #add-fail {
        color: red;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    .hidden {
        display: none;
    }

</style>