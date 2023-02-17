<script lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import User from '@/api/user.api'
import { ref, reactive } from 'vue'

export default {
  components: {
    TheWelcome,
  },

  setup() {
    const count = ref(0)
    const users = ref()

    console.log(count.value)
    console.log(users.value)

    // expose to template and other options API hooks
    return {
      count,
      users,
    }
  },

  async mounted() {
    console.log(this.count) // 0

    this.users = await User.search()

    // console.log(users)
  },
}

// const we = Auth.login({ username: 'ruje' })

// const users = await User.search()
// console.log(users.data)

// import { defineComponent } from 'vue'

// export default defineComponent({
//   components: {
//     TheWelcome,
//   },
//   data() {
//     return {
//       message: 'Hello!',
//     }
//   },
//   async mounted() {
//     const users = await User.search()
//     console.log(users)
//   },
// })
</script>

<template>
  <main>
    <pre> {{ users }}</pre>
    <TheWelcome />
  </main>
</template>
