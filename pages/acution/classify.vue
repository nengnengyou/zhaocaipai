<template>
	<view class="body" v-if='!loading'>
		<view class="nav"></view>
		<view class="menu">

			<view class="left" @click="goFavorite">
				<image src="../../static/auction/collect.png" mode=""></image>
				<text>竞拍收藏</text>
			</view>
			<view class="right" @click="goRecord">
				<image src="../../static/auction/record.png" mode=""></image>
				<text>竞拍记录</text>

			</view>

		</view>

		<!-- 专场分类 全部竞拍 -->
		<scroll-view scroll-x class="bgColor nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" @tap="tabSelect" :class="index==TabCur ? 'text-blue':''"
					v-for="(item,index) in navList" :data-id="index">
					{{item}}

				</view>
			</view>
		</scroll-view>


		<!-- 专场分类 -->
		<view class="list" v-if="TabCur==0">
			<view class="list-item list-item-text" v-for="(item,index) in carCateList" :key='index'
				@tap='goCatAuctionList(item.id)'>
				<image class="item-img" :src="item.image[0]" mode=""></image>
			</view>
		</view>
		<!-- 全部场次 -->
		<view class="list" v-if='TabCur==1'>
			<view class="auction-tips">
				<text>预拍</text>
				<text>竞拍中</text>
				<text>已结束</text>
				<auctionList v-for="(item, index) in auctionList" :key="item.id" :item="item" :id="item.id">
				</auctionList>
			</view>


		</view>
	</view>
</template>

<script>
	import auctionList from '@/components/auctionlist.vue';

	export default {
		data() {
			return {
				TabCur: 0,
				navList: ['专场分类', '全部竞拍'],
				carCateList: [],
				auctionList: [],
				AuctionSessionParam: {
					catid: 0,
					p: 1,
					row: 20
				},

			}
		},
		components: {
			auctionList

		},
		onLoad() {
			this.getCarCate()
			this.getAuctionSession()
		},
		methods: {
			// 获取车辆分类数据
			getCarCate() {
				this.$apiService.getCarCate().then(res => {
					if (res.code === 1) {
						this.carCateList = res.data
						cons
					} else {
						this.$msg(res.mag)
					}
				})

			},
			// 获取场次列表
			getAuctionSession() {
				let param = this.AuctionSessionParam;
				this.$apiService.getAuctionSessionIndex(param).then(res => {
					console.log(res, 55555555555)
					// this.auctionList = res.data.list;

				})
			},


			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id; //自定义属性
				console.log(e, 333333)
			},
			//点击导航栏 buttons 时触发
			// onNavigationBarButtonTap(e) {
			// 	const index = e.index;
			// 	if (index === 0) {
			// 		console.log(e, 6666666);
			// 		this.modalName = 'Modal'

			// 	}
			// },
			goFavorite() {
				uni.navigateTo({
					url: './favorite'
				})
			},
			goRecord() {
				uni.navigateTo({
					url: './records'
				})
			},
			goCatAuctionList(id) {
				uni.navigateTo({
					url: `biddinglist?id=${id}&type=5`
				})

			}




		},


	}
</script>

<style lang="scss" scoped>
	.menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 40upx;
		margin-bottom: 40upx;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		image {
			width: 60upx;
			height: 60upx;
		}
	}

	.text-center {
		background-color: #eee;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.cu-item {
			display: flex;
			justify-content: center;

			align-items: center;
			width: 50%;
			height: 80upx;
			font-size: 30upx;
		}
	}

	.text-blue {
		color: blue;
	}



	.list {
		.list-item {
			position: relative;
			height: 250rpx;
			width: 88vw;
			margin: 40upx auto 0;
			background-size: 100% 100%;

			// background-image: url('https://s2.ax1x.com/2020/03/03/3h5vrt.png');
			.item-img {
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}

			.dot {
				position: absolute;
				top: -20upx;
				right: 0;
				width: 56upx;
				height: 56upx;
				border-radius: 50%;
				background-color: #ff3600;
				text-align: center;
				line-height: 56upx;
				color: #ffffff;
				font-size: 40upx;
			}
		}

		.list-item-text {
			text-align: center;
			line-height: 200rpx;
			color: white;
		}

		//全部场次样式

		.auction-item {
			height: auto;

			// .auction-item-title {
			// 	color: $font-color-white;
			// 	display: flex;
			// 	justify-content: space-around;
			// 	line-height: 60upx;
			// }
			.auction-item-text {
				// height: 130upx;
				min-height: 200upx;
				padding: 0 20upx;
				font-size: 18upx;

				.item-text {
					color: #ffffff;
				}
			}

			.auction-item-tips {
				display: flex;
				padding: 15upx;
				justify-content: space-between;
			}
		}

		.auction-tips {
			display: flex;
			justify-content: space-between;
			width: 70vw;
			margin: 10upx auto 0;

		}
	}
</style>
