<template>
  <div class="detail">
    <h1>Random User</h1>
    <div class="person" v-for="(person,index) in persons" :key="index">
      <div class="left">
        <img v-lazy='person.picture.large' alt="">
      </div>
      <div class="right">
        <p>{{person.name.first}} {{person.name.last}}</p>
        <ul>
          <li>
            <strong>Birthday:</strong>{{fmtDate(person.dob)}}
          </li>
          <div class="text-capitalize">
            <strong>Location:</strong> {{person.location.city}}, {{person.location.state}}
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name:"Detail",
  data(){
    return {
      persons:[]
    }
  },
  methods:{
    getInfo(){
      for(let i=0;i<5;i++){
        axios.get(`https://randomuser.me/api/`).then(res => {
          this.persons.push(res.data.results[0])
        })
      }
    },
    fmtDate(date){
      if(date){
        return moment(String(date)).format('MM/DD/YYYY')
      }
    },
    scroll(person){
      let isLoading = false
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.offsetHeight - 
          document.documentElement.scrollTop
        if(bottomOfWindow && !isLoading){
          isLoading = true
          axios.get(`https://randomuser.me/api/`).then(res => {
            person.push(res.data.results[0])
            isLoading = false
          })
        }
      }
    }
  },
  beforeMount(){
    this.getInfo()
  },
  mounted(){
    this.scroll(this.persons)
  }
}
</script>
<style lang="scss" scoped>
  .detail{
    background: rgba(204, 204, 204, 0.13);
    border-radius: 2px;
    width: 90%;
    margin: 0 auto 15px auto;
    padding: 15px;
    .person{
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
    img{
      // width: 100%;
      height: auto;
      border-radius: 2px;
    }
    p:first-child{
      text-transform: capitalize;
      font-size: 2rem;
      font-weight: 900;
    }
    .text-capitalize{
      text-transform: capitalize;
    }
  }
</style>
