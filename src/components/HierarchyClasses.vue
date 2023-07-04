<template>
    <div class="root">
        <div v-for="( currentClass ,localeIndex ) in currentLocation" :key="localeIndex">
            <div class="row">
                <ul class="list-group list-group-horizontal">
                    <li  class="list-group-item border-0"> {{ getLevelName(localeIndex) }} </li>
                    <li v-for="( classOfThisLevel ,index ) in getLevelByIndex( localeIndex ).rootLevel.classes" :key="index"  class="list-group-item border-0" :class="{'beClicked': checkClick( currentClass , classOfThisLevel ) }" @click="beClicked( localeIndex , classOfThisLevel )">{{ classOfThisLevel }}</li>
                </ul>
            </div>
        </div> 
    </div>
</template>
  
<script lang="ts">
import { defineComponent , PropType} from "vue";
import { levelClasses , quizunitRoot } from "@/models/levelClass"
import isEqual from 'lodash.isequal';
//import peiiNavbar from '@/components/navbar.vue'
export default defineComponent({
    name: 'HierarchyClasses',
    components: {
      //peiiNavbar,
    },
    props: {
        clickedClass : {
            type: String ,
            defualt: true,
        },
        type : {
            type: String ,
            defualt: true,
        },
    },
    
    data() {
        return {
            levelClassesObj : {} as levelClasses,
            //rootLevelClassMap : new Map< string , >
            currentLocation : new Array<string>(),
            levelChooses : new Map<string , string>(),
            classChooses : new Map<string , boolean>(),
        };
    },
    methods: {
        getLevelByIndex(index : number) : levelClasses | undefined {
            let tempLevelClassesObj = this.levelClassesObj
            for( let i = 0 ; i <= index ; i++ ){
                if( i == index ){
                    return tempLevelClassesObj
                }else{
                    if( tempLevelClassesObj.classMap == null){
                        return undefined;
                    }else{
                        tempLevelClassesObj = tempLevelClassesObj.classMap.get( this.currentLocation[i] ) as levelClasses
                    }
                }
            }
        },
        getLevelName( index : number){
            let tempLevelClassesObj = this.getLevelByIndex( index )
            if( tempLevelClassesObj!=undefined){
                return tempLevelClassesObj.rootLevel.levelName;
            }
        },
        checkClick( currentClass: string  , classOfThisLevel : string){
            if( isEqual( currentClass , classOfThisLevel ) ){
                return true;
            }
            return false;
        },
        beClicked( localeIndex : number , classOfThisLevel : string){
          const newCurrentLocation = []
          for(let i = 0 ; i < this.currentLocation.length ; i++ ){
              if( i >= localeIndex  ){
                  break
              }else{
                  newCurrentLocation.push( this.currentLocation[i] )
              }
          }
          newCurrentLocation.push( classOfThisLevel )
          const tempLevelClassesObj = this.getLevelByIndex(localeIndex) 
          if( tempLevelClassesObj != undefined ){
              if( !tempLevelClassesObj.isLeaf){
                  newCurrentLocation.push("*")
              }   
          }
          this.currentLocation = newCurrentLocation
        },
    },
    created() {
        console.log( this.clickedClass )
        console.log( this.type )
        //todo load this type level hierachy by api
        if(this.type == "quiz"){
            this.levelClassesObj = quizunitRoot

            //for( )
        }
        /*
        else if( this.type == "quiz-review"){
            this.levelClassesObj = reviewquizLevelClassesObj
        }else {
            this.levelClassesObj = courseLevelClassesObj
        }*/

        //let propClickedChooses = new Array<string>();
        if( this.clickedClass != undefined){
            this.currentLocation = this.clickedClass.split("/")
        }

        
    }
});

</script>

<style scoped lang="scss">
    .beClicked{
        background: blue;
        color: white;
    } 
</style>