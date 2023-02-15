<template>
	<view>
		1
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			console.log(JSON.stringify(option));
			this.loading = true;
			this.carInfo.auction_car_id = option.id;


		},
		methods: {

		}
	}
</script>

<style>

</style>
