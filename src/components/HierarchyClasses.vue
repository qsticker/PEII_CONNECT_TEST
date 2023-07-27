<template>
  <div class="root">
    <!-- <div
      v-for="(currentClass, localeIndex) in currentLocation"
      :key="localeIndex"
    >
      <div class="row">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item border-0">
            {{ getLevelName(localeIndex) }}
          </li>
          <b-button
            squared
            variant="light"
            v-for="(classOfThisLevel, index) in getLevelByIndex(localeIndex)
              .rootLevel.classes"
            :key="index"
            class="list-group-item border border-white"
            :class="{ beClicked: checkClick(currentClass, classOfThisLevel) }"
            @click="beClicked(localeIndex, classOfThisLevel)"
          >
            {{ classOfThisLevel }}
          </b-button>
        </ul>
      </div>
    </div> -->
    <div v-for="(group, groupIndex) in displayArray" :key="groupIndex">
      <div class="row">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item border-0">
            <!-- {{ getLevelName(localeIndex) }} -->
          </li>
          <b-button
            squared
            variant="light"
            v-for="(element, elementIndex) in group"
            :key="element.uuid"
            class="list-group-item border border-white"
            :class="element.isSelected ? 'beClicked' : ''"
            @click="
              elementClickedHandler(groupIndex, elementIndex, element.uuid)
            "
          >
            {{ element.name }}
          </b-button>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from "vue";
import CategoryApi from "@/apis/CategoryApi";
import { levelClasses, quizunitRoot } from "@/models/levelClass";
// import isEqual from "lodash.isequal";
//import peiiNavbar from '@/components/navbar.vue'
export default defineComponent({
  name: "HierarchyClasses",
  components: {
    //peiiNavbar,
  },
  props: {
    clickedClass: {
      type: String,
      defualt: true,
    },
    type: {
      type: String,
      defualt: true,
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
    };
  },
  async created() {
    console.log(this.clickedClass);
    console.log(this.type);
    try {
      const courseCategory = await CategoryApi.getCoursePath();
      console.log(JSON.parse(JSON.stringify(courseCategory)).child);
      this.treeData = JSON.parse(JSON.stringify(courseCategory));
      let level0 = [] as any;
      this.treeData.child.forEach((element: { name: string; uuid: any }) => {
        // 設定第0層的每一個元素
        let elemetnObject = { uuid: "", name: "", isSelected: false, depth: 0 };
        elemetnObject.uuid = element.uuid;
        elemetnObject.name = element.name;
        level0.push(elemetnObject);
      });
      this.displayArray = [level0];
    } catch (error) {
      console.log(error);
    }

    //todo load this type level hierachy by api
    // if (this.type == "quiz") {
    //   this.levelClassesObj = quizunitRoot;

    // }
    // if (this.clickedClass != undefined) {
    //   this.currentLocation = this.clickedClass.split("/");
    // }
  },
  methods: {
    elementClickedHandler(depth: number, index: number, uuid: string) {
      console.log(depth, index, uuid);
      if (this.displayArray[depth][index].isSelected) {
        // 已選 -> 將原本已選改為未選中
        let tempDisplayArray = this.displayArray;
        tempDisplayArray[depth][index].isSelected = false;
        this.displayArray = tempDisplayArray;
        // if(depth!=0 && )
      } else {
        // 未選

        // 檢查同一層是不是已經有已選的element
        let hasSelected = false;
        this.displayArray[depth].forEach((element: { isSelected: any; }) => {
          if(element.isSelected){
            hasSelected = true;
          }
        });
      }
    },
    //   getLevelByIndex(index: number): levelClasses | undefined {
    //     let tempLevelClassesObj = this.levelClassesObj;
    //     for (let i = 0; i <= index; i++) {
    //       if (i == index) {
    //         return tempLevelClassesObj;
    //       } else {
    //         if (tempLevelClassesObj.classMap == null) {
    //           return undefined;
    //         } else {
    //           tempLevelClassesObj = tempLevelClassesObj.classMap.get(
    //             this.currentLocation[i]
    //           ) as levelClasses;
    //         }
    //       }
    //     }
    //   },
    //   getLevelName(index: number) {
    //     let tempLevelClassesObj = this.getLevelByIndex(index);
    //     if (tempLevelClassesObj != undefined) {
    //       return tempLevelClassesObj.rootLevel.levelName;
    //     }
    //   },
    //   checkClick(currentClass: string, classOfThisLevel: string) {
    //     if (isEqual(currentClass, classOfThisLevel)) {
    //       return true;
    //     }
    //     return false;
    //   },
    //   beClicked(localeIndex: number, classOfThisLevel: string) {
    //     const newCurrentLocation = [];
    //     for (let i = 0; i < this.currentLocation.length; i++) {
    //       if (i >= localeIndex) {
    //         break;
    //       } else {
    //         newCurrentLocation.push(this.currentLocation[i]);
    //       }
    //     }
    //     newCurrentLocation.push(classOfThisLevel);
    //     const tempLevelClassesObj = this.getLevelByIndex(localeIndex);
    //     if (tempLevelClassesObj != undefined) {
    //       if (!tempLevelClassesObj.isLeaf) {
    //         newCurrentLocation.push("*");
    //       }
    //     }
    //     this.currentLocation = newCurrentLocation;
    //   },
  },
});
</script>

<style scoped lang="scss">
.beClicked {
  background: black;
  color: white;
}
</style>