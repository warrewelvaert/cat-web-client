<script setup>
    import axios from 'axios';
    import Navigation from '@/components/Navigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <Navigation></Navigation>
    <div id="register-container" :class="{hidden: regHidden}">
        <h1>{{ $t('register.title') }}</h1>
        <p :class="{hidden: failureHidden}" id="error-message">{{ $t('register.error') }}</p>
        <p>{{ $t('register.text') }} <router-link :to="`/login`" class="link">{{ $t('login.submit')}}</router-link></p>
        <form @submit.prevent="register" id="register-form">
            <label for="name">{{ $t('login.name') }}</label>
            <input type="text" id="name" v-model="name" required maxlength="255">
            <label for="email">{{ $t('login.email') }}</label>
            <input type="email" id="email" v-model="email" required email maxlength="255">
            <label for="password">{{ $t('login.password') }}</label>
            <input type="password" id="password" v-model="password" required minlength="6">
            <button type="submit">{{ $t('register.submit') }}</button>
        </form>
    </div>
    <div id="register-success" :class="{hidden: successHidden}">
        <h1>{{ $t('register.success.title') }}</h1>
        <p>{{ $t('register.success.text') }}</p>
        <p>{{ $t('register.success.next') }}<router-link :to="`/login`" class="link">{{ $t('register.success.login') }}</router-link></p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      regHidden: false,
      successHidden: true,
      failureHidden: true
    };
  },
  created() {
    this.regHidden = false;
    this.successHidden = true;
    this.failureHidden = true;
  },
  methods: {
    async register() {
        try {
            const response = await axios.post(`${API_URL}register`, {
            "name": this.name,
            "email": this.email,
            "password": this.password
            })
            if (response.status === 204) {
                this.regHidden = true;
                this.successHidden = false;
            }
            else if (response.status === 400) {
                this.failureHidden = false;
            }
        }
        catch (error) {
            this.failureHidden = false;
        }
    }
  }
};
</script>

<style>
    #register-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #register-form label {
        width: 15vw;
        text-align: left;
        font-size: 1.5rem;
    }

    #register-form input {
        width: 15vw;
        font-size: 1.2rem;
        padding: 0.3rem;
        border-radius: 0.3rem;
        margin-bottom: 1.5rem;
    }

    #register-form input:focus {
        outline: none;
        border: 3px solid var(--color-text-green);
        border-color: var(--color-text-green);
    }

    #register-form button {
        background-color: var(--color-text-green);
        color: white;
        padding: 0.5rem 2rem 0.7rem 2rem;
        border-radius: 0.5rem;
        margin-top: 2rem;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
    }

    #register-form button:hover {
        box-shadow: 0 0 0.5rem var(--color-text-green);
    }

    #register-container, #register-success {
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 2rem;
        justify-content: center;
        align-items: center;
        background-color: var(--color-background-soft);
        padding: 2rem;
        border-radius: 0.5rem;
        text-align: center;
        height: 40rem;
    }

    #register-success {
        height: 20rem;
    }

    #register-container h1, #register-success h1 {
        color: var(--color-text-green);
        margin-bottom: 3rem;
    }

    #register-container p, #register-success p {
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
    }

    #register-container .link, #register-success .link {
        text-decoration: none;
        color: var(--color-text-green);
    }

    #error-message {
        color: red;
    }

    .hidden {
        display: none;
    }

</style>