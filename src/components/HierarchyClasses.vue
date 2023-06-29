<template>
    <div class="row">
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item border-0">item 1</li>
            <li class="list-group-item border-0">item 2</li>
            <li class="list-group-item border-0">item 3</li>
        </ul>
    </div>
    
</template>
  
<script lang="ts">
import { defineComponent , PropType} from "vue";
import { levelClasses , levelClassesObj } from "@/models/levelClass"
//import peiiNavbar from '@/components/navbar.vue'
export default defineComponent({
    name: 'HierarchyClasses',
    components: {
      //peiiNavbar,
    },
    data() {
        return {
      
        };
    },
});

</script>
  