<script setup>
  import axios from 'axios';
  import Navigation from '@/components/Navigation.vue';
  import API_URL from '@/config';
</script>

<template>
  <main>
    <Navigation></Navigation>
    <form @submit.prevent="fetchData" id="front-filter">
      <label for="name">{{ $t('list.filter.label') }}</label>
      <div>
        <input type="text" v-model="nameFilter">
        <button type="submit">{{ $t('list.filter.submit') }}</button>
      </div>
    </form>
    <div class="cat-list">
        <div>
            <div v-if="apiData">
                <div class="cat-list-item" v-for="entry in apiData" :key="entry.id">
                  <img :src="entry.image_url" alt="cat image">
                  <div>
                    <h2><router-link :to="`/detail/${entry.id}`" class="link">{{ entry.detail[0].name }}</router-link></h2>
                    <p>{{ $t('list.origin') }} {{ entry.detail[0].origin }}</p>
                    <p>{{ $t('list.lifespan') }} {{ entry.lifespan }} {{ $t('list.years') }}</p>
                  </div>
                  <p>{{ entry.detail[0].temperament }}</p>
                </div>
            </div>
            <p v-else-if="error">Error: {{ error }}</p>
            <p v-else>{{ $t('list.loading') }}</p>
        </div>
    </div>
  </main>
</template>

<script>
  export default {
  data() {
    return {
      apiData: null,
      error: null,
      nameFilter: ''
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
      axios.get(`${API_URL}${this.$i18n.locale}/cats/`)
        .then(response => {
          this.apiData = response.data;
          this.apiData = this.apiData.filter(cat => cat.detail[0].name.toLowerCase().includes(this.nameFilter.toLowerCase()));
        })
        .catch(error => {
          this.error = error.message;
        });
      }
  },
};
</script>

<style>
  .cat-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    height: 16vh;
    width: 50%;
    margin: 1% 25% 1% 25%;
    border-radius: 0.3rem;
    background-color: var(--color-background-soft);
  }

  .cat-list-item img {
    width: 180px;
    height: auto;
    margin: 0 3vw 0 3vw;
  }

  .cat-list-item h2 {
    font-size: 2rem;
    font-weight: normal;
    color: lightgoldenrodyellow;
    cursor: pointer;
  }

  .cat-list-item p {
    font-size: 1.3rem;
    font-weight: lighter;
    width: 18vw;
  }

  .cat-list-item > p {
    margin-left: 5rem;
    width: 1rem;
    font-size: 1.3rem;
  }

  .cat-list-item .link {
    text-decoration: none;
    color: var(--color-text-green);
  }

  #front-filter {
    display: flex;
    flex-direction: column;
    margin: 1% 25% 1% 25%;
    font-size: 1.2rem;
  }

  #front-filter div{
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
  }

  #front-filter div input {
    width: 80%;
    margin-right: 2%;
    font-size: 1.2rem;
    padding: 0.3rem;
    border-radius: 0.3rem;
  }

  #front-filter div input:focus {
      outline: none;
      border: 2px solid var(--color-text-green);
      border-color: var(--color-text-green);
  }

  #front-filter button {
    width: 18%;
    font-size: 1.2rem;
    background-color: var(--color-text-green);
    color: white;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
  }

  #front-filter button:hover {
      box-shadow: 0 0 0.5rem var(--color-text-green);
  }

</style>