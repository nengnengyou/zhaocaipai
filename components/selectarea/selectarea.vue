<template>
	<view>
		<view class="flex araea justify-between" v-if="type=='zhudong'">
			<view class="" @click="show1 = true">
				{{province.label}}
				<u-icon name="arrow-down"></u-icon>
			</view>

			<view class="" @click="show2=true">
				{{city.label}}
				<u-icon name="arrow-down"></u-icon>
			</view>

			<view class="" @click="show3=true">
				{{area.label}}
				<u-icon name="arrow-down"></u-icon>
			</view>

		</view>

		<view class="beidong" v-if="type == 'beidong'">
			<view class="">
				<view class="tos" @click="show1 = true">
					{{province.label}}
				</view>

				<view class="tos" @click="show2 = true">
					{{city.label}}
				</view>

				<view class="tos" @click="show3 = true">
					{{area.label}}
				</view>
			</view>
		</view>

		<!-- 选择省份 -->

		<u-select v-model="show1" :list="p" value-name="id" label-name='name' @confirm='pconfirm'></u-select>
		<u-select v-model="show2" :list="c" value-name="id" label-name='name' @confirm='cconfirm'></u-select>
		<u-select v-model="show3" :list="a" value-name="id" label-name='name' @confirm='aconfirm'></u-select>



	</view>
</template>

<script>
	export default {
		name: "selectarea",
		props: {
			item: {
				type: Array
			},
			type: {
				type: String,
				default: 'zhudong'
			}

		},
		data() {
			return {
				province: {
					label: '省'
				},
				city: {
					label: '市'
				},
				area: {
					label: '区'
				},
				p: [],
				a: [],
				c: [],
				show1: false,
				show2: false,
				show3: false,

			};
		},
		mounted() {
			this.selectArea()
			// setTimeout(() => {
			// 	if (this.item[0].value == 0 && this.item[1].value == 0 && this.item[2].value == 0) {} else {
			// 		// console.log(11111111,this.item[0]);
			// 		this.province = this.item[0]
			// 		this.city = this.item[1]
			// 		this.area = this.item[2]
			// 		// console.log(this.province,'province');
			// 	}
			// }, 800)
		},
		methods: {
			// 点击省
			pconfirm(e) {
				// console.log(e, 6666666666666);
				this.province = e[0]
				// 调取省下市
				this.getClist(e[0].value)
			},
			// 点击市
			cconfirm(e) {
				this.city = e[0]
				// 调取市区下的县区
				this.getAlist(e[0].value)


			},
			// 点击地区
			aconfirm(e) {
				this.area = e[0]
			},
			getClist(id) {
				// console.log(id, "idididiid")
				let p = {
					id
				}
				this.$apiService.getArea(p).then(res => {
					// console.log(res)
					this.c = res.data
					let s = {
						label: res.data[0].name,
						value: res.data[0].id
					}
					this.city = s
					// 传值当前选择的市
					this.getAlist(res.data[0].id)


				})
			},
			getAlist(id) {
				let p = {
					id
				}
				// 发送请求回来地区
				this.$apiService.getArea(p).then(res => {
					this.a = res.data
					let s = {
						label: res.data[0].name,
						value: res.data[0].id
					}
					this.area = s
				})

			},
			// 全国的省
			selectArea() {
				this.$apiService.getArea().then(res => {
					this.p = res.data
					// console.log(this.p)
				})
			},

		},
		watch: {
			area() {
				let p = []
				p.push(this.province)
				p.push(this.city)
				p.push(this.area)
				uni.$emit('select', p) //触发全局的自定义事件
				console.log(p, "ppppppppppppp")

			}

		}
	}
</script>

<style lang="scss">
	.araea {
		flex: 1;
		justify-content: space-around;
	}

	.beidong {
		text-align: center;

		.tos {
			line-height: 60rpx;
			width: 60%;
			border: 1rpx solid #ccc;
			margin: 60rpx auto;
		}
	}
</style>
