<template>
    <b-container>
      <ul class="text-center" />
      <b-progress :max="pMax">
        <b-progress-bar :value="pValue" :label="`${((pValue / pMax) * 100).toFixed(0)}%`" animated />
      </b-progress>
      <br>
      <b-alert class="text-center" show variant="info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
        &nbsp; 總題數 : {{ amount }}&nbsp;&nbsp;&nbsp;
        <br> 已完成 : {{ amount - unfinished }}&nbsp;&nbsp;&nbsp; 待完成 : {{ unfinished }}
      </b-alert>
      <b-row>
        <div v-for="(item, index) in ansSet" :key="item" style="float: left;line-height: 34px;width:25%; text-align: right">
          <b-col v-if="!buttonStateCheck(index)" class="p-3 text-center ">
            <b-button variant="secondary" @click="changeNum(index)">
              {{ index + 1 }}
            </b-button>
          </b-col>
          <b-col v-else class="p-3 text-center ">
            <b-button variant="success" @click="changeNum(index)">
              {{ index + 1 }}
            </b-button>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </template>
  
  <script lang="ts">

  import {  defineComponent , PropType  } from "vue";
  import { Answer } from '@/models/AnswerModel';

  export default defineComponent( {
    name: 'AnswerPorgress',
    props: {
      answers : {
        type: [] as PropType<Array<Answer>> ,
        defualt: true,
      },
    },
    data() {
      return {
        pValue: 0,
        pMax: 100,
        amount: 0,
        unfinished: 0,
        ansSet: this.answers,
      };
    },
    computed: {
    },
    created() {
      let unfinishedCount = 0;
      this.pValue = 0;
      this.unfinished = 0;
      this.ansSet = [];
      this.ansSet = this.answers;
      for (let i = 0; i < this.ansSet.length; i += 1) {
        if (!this.checkSignleQuestion(this.ansSet[i].userAnswer)) {
          if (this.ansSet[i].isBlankFill) {
            if (this.ansSet[i].blankFillAnswer === '') {
              unfinishedCount += 1;
            }
          } else { unfinishedCount += 1; }
        }
      }
      this.amount = this.ansSet.length;
      this.pValue = ((this.amount - unfinishedCount) / this.amount) * 100;
      this.unfinished = unfinishedCount;
    },
    methods: {
      changeNum(e : number) {
        this.$emit('numChanged', e);
      },
      checkSignleQuestion(data) {
        const checkResult = false;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i] !== '' && data[i] !== undefined && data[i] !== null) {
            return true;
          }
        }
        return checkResult;
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, consistent-return
      buttonStateCheck(index) {
        if (this.ansSet[index].isBlankFill) {
          if (this.ansSet[index].blankFillAnswer === '') {
            return false;
          }
          return true;
        }
        return this.checkSignleQuestion(this.ansSet[index].userAnswer);
      },
    },
   
  });
  </script>
  
  <style>
  </style>