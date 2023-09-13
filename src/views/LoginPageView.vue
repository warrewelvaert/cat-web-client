<script setup>
    import axios from 'axios';
    import Navigation from '@/components/Navigation.vue';
    import API_URL from '@/config';
</script>

<template>
    <Navigation></Navigation>
    <div id="login-container" :class="{hidden: loginFormHidden}">
        <h1>{{ $t('login.title') }}</h1>
        <p :class="{hidden: loginFailureHidden}" id="error-message">{{ $t('login.error') }}</p>
        <p>{{ $t('login.register.text') }} <router-link :to="`/register`" class="link">{{ $t('login.register')}}</router-link></p>
        <form @submit.prevent="login" id="login-form">
            <label for="email">{{ $t('login.email') }}</label>
            <input type="email" id="email" v-model="email" required email>
            <label for="password">{{ $t('login.password') }}</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">{{ $t('login.submit') }}</button>
        </form>
    </div>
    <div id="login-success" :class="{hidden: loginSuccessHidden}">
        <h1>{{ $t('login.success.title') }}</h1>
        <p>{{ $t('login.success.text') }}</p>
        <p><router-link :to="`/addbreed`" class="link">{{ $t('login.adminpage')}}</router-link></p>
        <button @click="logout">{{ $t('login.logout') }}</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      loginFormHidden: false,
      loginFailureHidden: true,
      loginSuccessHidden: true
    };
  },
  created() {
    let token = localStorage.getItem('token');
    if (token) {
        this.loginFormHidden = true;
        this.loginFailureHidden = true;
        this.loginSuccessHidden = false;
    } else {
        this.loginFormHidden = false;
        this.loginFailureHidden = true;
        this.loginSuccessHidden = true;
    }
  },
  methods: {
    async login() {
        try {
            const response = await axios.post(`${API_URL}login`, {
            "email": this.email,
            "password": this.password
            })
            if (response.status === 200) {
                this.loginFormHidden = true;
                this.loginSuccessHidden = false;
                localStorage.setItem('token', response.data.authorisation.token);
            }
            else if (response.status === 401) {
                this.loginFailureHidden = false;
            }
        }
        catch (error) {
            this.loginFailureHidden = false;
        }
    },
    logout() {
        localStorage.removeItem('token');
        this.loginFormHidden = false;
        this.loginFailureHidden = true;
        this.loginSuccessHidden = true;
    }
  }
};
</script>

<style>
    #login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #login-form label {
        width: 15vw;
        text-align: left;
        font-size: 1.5rem;
    }

    #login-form input {
        width: 15vw;
        font-size: 1.2rem;
        padding: 0.3rem;
        border-radius: 0.3rem;
        margin-bottom: 1.5rem;
    }

    #login-form input:focus {
        outline: none;
        border: 3px solid var(--color-text-green);
        border-color: var(--color-text-green);
    }

    #login-form button, #login-success button {
        background-color: var(--color-text-green);
        color: white;
        padding: 0.5rem 2rem 0.7rem 2rem;
        border-radius: 0.5rem;
        margin-top: 2rem;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
        margin-bottom: 3rem;
    }

    #login-form button:hover, #login-success button:hover {
        box-shadow: 0 0 0.5rem var(--color-text-green);
    }

    #login-container, #login-success {
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 2rem;
        justify-content: center;
        align-items: center;
        background-color: var(--color-background-soft);
        padding: 2rem;
        border-radius: 0.5rem;
        text-align: center;
    }

    #login-container h1, #login-success h1 {
        color: var(--color-text-green);
        margin-bottom: 3rem;
    }

    #login-container p, #login-success p {
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
    }

    #login-container .link, #login-success .link {
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