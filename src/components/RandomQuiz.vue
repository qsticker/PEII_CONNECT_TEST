<template>
<div>
  <div class="b-downs-container">
    <b-dropdown id="dropdown-1" :text="getbeClickLevelName(groupIndex)" class="m-md-2"  v-for="(group, groupIndex) in displayArray" :key="groupIndex">
      <b-dropdown-item 
            v-for="(element, elementIndex) in group"
            :key="element.uuid"
            @click="elementClickedHandler(groupIndex, elementIndex, element.uuid)"
            >
        {{element.name}}
      </b-dropdown-item>  
    </b-dropdown>
  </div>

  <div class="pathConatiner">
    <div v-for="(pathItem , pathListIndex) in pathList" :key="pathListIndex">
      <div :style="{ 'background-color' : '#c4c4c4' , 'border-radius': '5px' , 'margin-right' : '0.1vw' , 'margin-top' : '0.1vw' , 'margin-bottom' : '0.5vw' }">
        {{ pathItem.path }}
        <button type="button" class="btn-close" aria-label="Close" @click="removePathFromPathList(pathItem.path)"> </button>
      </div>
    </div>
  </div>

  <b-button
          squared
          
          @click="addNewPathInList()"
        >
        增加路径
  </b-button>
</div>
</template>
  
<script lang="ts">
  import Vue , { defineComponent } from "vue";
  
  import { levelClasses } from "@/models/levelClass";
  import axios from 'axios';
  import isEqual from "lodash.isequal";
  export default defineComponent({
    name: 'RandomQuiz',
    components: {
      //peiiNavbar,
    },
    props: {
        categoryNodeId : {
            type: String ,
            required: false,
            default: null,
        },
    },
    data() {
      return {
        levelClassesObj: {} as levelClasses,
        //rootLevelClassMap : new Map< string , >
        currentLocation: new Array<string>(),
        levelChooses: new Map<string, string>(),
        classChooses: new Map<string, boolean>(),
        treeData: null as any,
        displayArray: [] as any[],
        beClickLevelList: [] as any[],
        pathList: [] as any[],
      };
    },
    computed: {
      
    },
    methods: {
    getbeClickLevelName(index: number){
      if( index >= this.beClickLevelList.length ){
        return "请选择"
      }else{
        return this.beClickLevelList[index].name
      }
    },
    elementClickedHandler(depth: number, index: number, uuid: string) {
      console.log(depth, index, uuid);
      let tempDisplayArray = this.displayArray;

      //你選完後 數量應該是 depth +1

      while(depth != this.beClickLevelList.length){
        this.beClickLevelList.pop();
      }

      // 檢查同一層,是不是已經有已選的element
      let hasSelected = false;
      this.displayArray[depth].forEach(
        (element: { isSelected: any }, forEachIndex: any) => {
          if (element.isSelected) {
            hasSelected = true;
            tempDisplayArray[depth][forEachIndex].isSelected = false;
          }
        }
      );

      if (depth < tempDisplayArray.length) {
        this.displayArray = this.displayArray.slice(0, depth + 1);  
      }

      //前面選過 再選前面的 把它 mark 掉
      if (depth == 0 && this.displayArray.length > 1) {
        this.displayArray[1].array.forEach(
          (element: { isSelected: boolean }) => {
            element.isSelected = false;
          }
        );
      }

      if (!this.displayArray[depth][index].isLeaf) {
        this.displayArray.push( this.displayArray[depth][index].child );
        this.displayArray[depth][index].isSelected = true;
        for( let i = 0 ; i < this.displayArray[depth+1].length ; i ++ ){
          this.displayArray[depth + 1][i].isSelected = false
        }
      }else{
        this.displayArray[depth][index].isSelected = true;
      }

      let pushItem = { uuid: "", name: "" };
      pushItem.uuid = this.displayArray[depth][index].uuid;
      pushItem.name = this.displayArray[depth][index].name;
        
      this.beClickLevelList.push(pushItem);
       console.log( this.beClickLevelList )
    },
    addNewPathInList(){
      if( this.beClickLevelList.length != 0){
        let path = "";
        for(let i = 0 ; i < this.beClickLevelList.length  ; i++){
          path = path + this.beClickLevelList[i].name 
          if( i < this.beClickLevelList.length - 1){
            path = path + "/"
          }else{
            let pathItem = { uuid: "", path: "" };
            pathItem.path = path;
            pathItem.uuid = this.beClickLevelList[i].uuid;
            if( !this.checkDuplicatePath( pathItem.path )){
              this.pathList.push( pathItem );
            }
          }
        }
        this.refreshBeclicked();
      }
    },
    removePathFromPathList(path : string){
      let paths = [] as any;
      this.pathList.forEach(( pathItem: any) =>{
          if( !isEqual(pathItem.path , path ) ){
            paths.push(pathItem)
          }
        });
      this.pathList = paths
    },
    checkDuplicatePath(path : string){
      if(this.pathList.length == 0){
        return false;
      }
      for(let i = 0 ; i < this.pathList.length ; i++){
        if( isEqual(this.pathList[i].path , path) ){
          return true
        }
      }
      return false;
    },
    refreshBeclicked(){
      let level0 = [] as any;
      this.treeData.child.forEach((element: { name: string; uuid: any; child: any;}) => {
      // 設定第0層的每一個元素
       let elementObject = { uuid: "", name: "" , child: [], isSelected: false, depth: 0 };
       elementObject.uuid = element.uuid;
       elementObject.name = element.name;
       elementObject.child = element.child
       level0.push(elementObject);
      });
      this.displayArray = [level0];
      this.beClickLevelList = [] as any;
    },
},
    async created() {
    try{
      let remoteCategory;
       
      remoteCategory = await axios.post(process.env.VUE_APP_PEII_BASE_API_URL + '/category/retrieveByCategoryNodeId' , {categoryId : this.categoryNodeId } )
      remoteCategory = remoteCategory.data
      console.log(JSON.parse(JSON.stringify(remoteCategory)).child);
        

      this.treeData = JSON.parse(JSON.stringify(remoteCategory));
      let level0 = [] as any;
      this.treeData.child.forEach((element: { name: string; uuid: any; child: any;}) => {
      // 設定第0層的每一個元素
       let elementObject = { uuid: "", name: "" , child: [], isSelected: false, depth: 0 };
       elementObject.uuid = element.uuid;
       elementObject.name = element.name;
       elementObject.child = element.child
       level0.push(elementObject);
      });
      this.displayArray = [level0];
    } catch (error) {
        console.log(error);
    }
},
});
  </script>
<style lang="scss" scoped>
  .pathConatiner{
    width : 10vw;
    display: flex;
    flex-wrap: wrap;
    //align-items: stretch;
    //background : blue;
    margin: auto;
    justify-content: center;
  }
  .b-downs-container{
    display: flex;
    flex-direction:column;
    width : 10vw;
    margin: auto;
  }
</style>