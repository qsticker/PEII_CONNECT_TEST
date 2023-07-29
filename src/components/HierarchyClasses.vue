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
import SellPlanApi from "@/apis/SellPlanApi";
import { levelClasses, quizunitRoot } from "@/models/levelClass";
import { Json } from "aws-sdk/clients/robomaker";
import isEqual from "lodash.isequal";
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
    // console.log(this.clickedClass);
    // console.log(this.type);
    let remoteCategory;
    try {
      if (isEqual( this.type , "course" )) {
        remoteCategory = await CategoryApi.getCoursePath();
        console.log(JSON.parse(JSON.stringify(remoteCategory)).child);
      } else{
        remoteCategory = await CategoryApi.getQuizPath();
      }

      this.treeData = JSON.parse(JSON.stringify(remoteCategory));
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
      this.$store.commit("updateSellPlanId", uuid); // 用於顯示列表
      console.log(depth, index, uuid);
      let tempDisplayArray = this.displayArray;
      if (this.displayArray[depth][index].isSelected) {
        // 已選 -> 將原本已選改為未選中

        tempDisplayArray[depth][index].isSelected = false;
        if (
          tempDisplayArray.length != 0 &&
          depth + 1 != this.displayArray.length
        ) {
          tempDisplayArray.pop();
        }
        this.displayArray = tempDisplayArray;
      } else {
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
          console.log("tempDisplayArray: " + JSON.stringify(tempDisplayArray));
        }

        if (depth == 0 && this.displayArray.length > 1) {
          this.displayArray[1].array.forEach(
            (element: { isSelected: boolean }) => {
              element.isSelected = false;
            }
          );
        }

        // 沒有已選

        const resultChildData = this.get_child_at_depth(
          this.treeData.child,
          index,
          depth
        ).child;
        if (!resultChildData.isLeaf) {
          this.displayArray.push(resultChildData);
          this.displayArray[depth][index].isSelected = true;
        }
      }
    },
    get_child_at_depth(data: any, objectIndex: any, depth: any) {
      // Helper function - recursively traverse the JSON object
      function dfs(obj: any, currentDepth: any) {
        if (currentDepth === depth) {
          return obj;
        }
        if (obj.child && Array.isArray(obj.child)) {
          for (const childObj of obj.child) {
            const result = dfs(childObj, currentDepth + 1) as any;
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }

      if (objectIndex >= 0 && objectIndex < data.length) {
        const desiredObject = data[objectIndex];
        const desiredChild = dfs(desiredObject, 0); // Start traversing from depth 0
        return desiredChild;
      } else {
        return null;
      }

        // 沒有已選
        
        const resultChildData = this.get_child_at_depth(this.treeData.child, index, depth).child;
        if (!resultChildData.isLeaf){
          this.displayArray.push(resultChildData);
          this.displayArray[depth][index].isSelected = true;
        }

      }
    },
    get_child_at_depth(data: any, objectIndex: any, depth: any) {
      // Helper function - recursively traverse the JSON object
      function dfs(obj: any, currentDepth: any) {
        if (currentDepth === depth) {
          return obj;
        }
        if (obj.child && Array.isArray(obj.child)) {
          for (const childObj of obj.child) {
            const result = dfs(childObj, currentDepth + 1) as any;
            if (result !== null) {
              return result;
            }
          }
        }
        return null;
      }

      if (objectIndex >= 0 && objectIndex < data.length) {
        const desiredObject = data[objectIndex];
        const desiredChild = dfs(desiredObject, 0); // Start traversing from depth 0
        return desiredChild;
      } else {
        return null;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.beClicked {
  background: black;
  color: white;
}
</style>