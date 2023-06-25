<template>
    <!-- href="http://customer.6ms.cn/Etc/test-detail.php" <div class="col-6 col-md-4 col-lg-3" data-scroll-reveal="" data-scroll-reveal-id="1" :style=" { '-webkit-transform' : 'translatey(0)' , 'transform' : 'translatey(0)' , 'opacity' : '1' , '-webkit-transition' : '-webkit-transform 0.66s ease-in-out 0s,  opacity 0.66s ease-in-out 0s' , 'transition': 'transform 0.66s ease-in-out 0s, opacity 0.66s ease-in-out 0s' ,'-webkit-perspective': '1000' ,'-webkit-backface-visibility' : 'hidden'  }">-->
	<div class="commidity"  title="" >				
		<img src="@/assets/QuizCommdity.png" alt="">
		<div class="content">
			<div class="title text-truncate2 text-dark">
					<span class="classOfCommodity d-inline-block border border-danger small p-1 mr-1 text-danger"> {{ classOfCommodity }} </span>	{{ name }}
					
			</div>
			<span class="price text-danger text-md price">價格 ： {{ price }}</span>
			<!--<div class="price-box d-flex justify-content-between align-items-end">-->
				<!--<span class="text-danger text-md price"></span>-->
			
			<!--</div>-->
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

//import peiiNavbar from '@/components/navbar.vue'

export default defineComponent({
  name: 'PeiiCommodity',
  components: {
  },
  props: {
    price : {
        type: String, //maybe is free
        required: false,
        default: "free",
	},
	classOfCommodity : {
		type: String, 
        required: true,
	},
	name : {
		type: String, //maybe is free
        required: true,
	}
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	//.container{
		//background-color: coral;
		//display : flex;
.commidity {
	flex : 0  0  20%;
	margin-left: 2.5%;
	margin-top: 2.5%;
	font-size : 25px;
	//background: blue;
	img{
		width : 100%;
	}
	.content {
		.OfCommodity{
			margin-right : 3%;
		}
		.price {
			margin-top: 3%;
		}
	}
}
@media screen and (max-width: 500px) {
	.commidity {
	flex : 0  0  40%;
	margin-left: 2.5%;
	margin-top: 2.5%;
	font-size : 3px;
		//background-color : blue;
	img{
		width : 100%;
	}
	.content {
		.OfCommodity{
			margin-right : 3%;
		}
		.price {
			margin-top: 3%;
		}
	}
}

}	
</style>