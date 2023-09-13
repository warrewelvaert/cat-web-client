<template>
    <nav>
      <img src="../assets/images/cat-head.png" alt="logo" />
      <h1><router-link :to="`/`" class="link">{{ $t('nav.title')}}</router-link></h1>
      <h2><router-link :to="`/login`" class="link">{{ $t('nav.login')}}</router-link></h2>
      <div>
        <label for="language">{{ $t('nav.language') }}</label>
        <select name="language" id="language" v-model="$i18n.locale">
          <option selected value="en"> English </option>
          <option value="nl"> Nederlands </option>
        </select>
      </div>
    </nav>
</template>

<script>
  export default {
    watch: {
      '$i18n.locale': {
        handler() {
          document.title = this.$t('app.title');
        }
      }
    }
  }
</script>

<style>
nav {
  display: flex;
  flex-direction: row;  
  align-items: center;
  justify-content: right;
  min-height: 8vh;
  background-color: var(--color-background-soft);
}

nav h1, nav h2, nav div {
  color: var(--color-text-green);
  margin-left: 10rem;
  width: 22rem;
}

nav div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-size: 1.5rem;
  margin-right: 1rem;
}

nav div select {
  border: none;
  font-size: 1rem;
  margin-left: 1rem;
  margin-top: 0.3rem;
}

nav .link {
  text-decoration: none;
  color: var(--color-text-green);
}

nav img {
  position: absolute;
  left: 1rem;
  top: 1vh;
  height: 6vh;
  width: auto;
}
</style>