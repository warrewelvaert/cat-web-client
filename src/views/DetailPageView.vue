<script setup>
    import axios from 'axios';
    import Navigation from '@/components/Navigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <Navigation></Navigation>
    <div id="cat-item">
        <div v-if="apiData">
            <h2>{{ apiData.detail.name }}</h2>
            <img :src="apiData.image_url" alt="cat image">
            <h2>{{ $t('detail.b_info') }}</h2>
            <div>
              <p><b>{{ $t('list.origin') }}</b> {{ apiData.detail.origin }}</p>
              <p><b>{{ $t('list.lifespan') }}</b> {{ apiData.lifespan }} {{ $t('list.years') }}</p>
              <p><b>{{ $t('detail.temperament') }}</b> {{ apiData.detail.temperament }}</p>
              <a :href="apiData.detail.wikipedia_url" target="_blank"><b>{{ $t('detail.more_info') }}</b>{{ apiData.detail.wikipedia_url }}</a>
            </div>
            <h2>{{ $t('detail.description') }}</h2>
            <p>{{ apiData.detail.description }}</p>
        </div>
        <p v-else-if="error">Error: {{ error }}</p>
        <p v-else>{{ $t('list.loading') }}</p>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        apiData: null,
        error: null,
        catId: this.$route.params.id
      };
    },
    created() {
      this.fetchData();
    },
    watch: {
    '$i18n.locale': {
      handler() {
        this.fetchData();
      }
    }
    },
    methods: {
        fetchData() {
            axios.get(`${API_URL}${this.$i18n.locale}/cats/${this.catId}`)
            .then(response => {
            this.apiData = response.data;
        })
        .catch(error => {
            this.error = error.message;
        });
      },
    },
  };
</script>

<style>
  #cat-item {
    margin-left: 28%;
    margin-right: 28%;
    justify-content: center;
  }

  #cat-item div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-background-soft);
    padding: 2rem;
    margin: 2rem;
    border-radius: 0.5rem;
  }

  #cat-item div > div{
    padding: 0rem;
    margin: 0rem;
  }

  #cat-item p, #cat-item a {
    text-align: left;
    width: 80%;
    margin-left: 10%;
    font-size: 1.2rem;
    text-decoration: none;
  }

  #cat-item a {
    color: var(--color-text-green);
  }

  #cat-item h2 {
    text-align: center;
    color: var(--color-text-green);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  #cat-item h2:first-child {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  #cat-item img {
    width: 75%;
    height: auto;
    align-self: center;
  }

  b {
    font-weight: bold;
    color: var(--color-text);
  }
</style>