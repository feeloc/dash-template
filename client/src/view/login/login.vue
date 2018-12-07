<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleLogin"
       :style="{backgroundImage: 'url('+randomPhoto+')'}">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '_c/login-form'
  import { mapActions } from 'vuex'
  import { getSomePhotoByBaidu } from '@/api/tool'

  export default {
    data () {
      return { randomPhoto: '' }
    },
    async mounted () {
      await this.getRandomPhoto()
    },
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      handleSubmit ({ userName, password }) {
        this.handleLogin({ userName, password }).then(res => {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
        })
      },
      async getRandomPhoto () {
        const res = await getSomePhotoByBaidu()
        const data = res.data
        const photos = data.photos
        this.randomPhoto = photos[Math.floor(Math.random() * photos.length)]
      }
    }
  }
</script>

<style>

</style>
