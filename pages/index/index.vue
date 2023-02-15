<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<view class="titleNview-placing"></view>
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular autoplay="true" :interval="3000" :duration="1000" @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key='index' @click="chooseBanner(item)"
					class="carousel-item">
					<image class="swiperimage" :src="item.image" mode=""></image>

				</swiper-item>

			</swiper>
		</view>
		<view class="classify-one">
			<view class="classify flex justify-between text-center text-white">
				<view class="flex left  width50">
					<view class="coul n1 postion-relative" @tap="goAuctionClassify">
						<image style="height: 100%;width: 100%;" src="../../static/index/paiche.png"></image>
					</view>
					<view class="coul n2 postion-relative" @tap="goSyncAuction">
						<image style="height: 100%;width: 100%;" src="../../static/index/tongbu.png"></image>
					</view>
				</view>
				<view class="width50 n3 postion-relative" @tap="goBiddingList(2)">
					<image style="height: 100%;width: 100%;" src="../../static/index/jingpai.png"></image>
					<view class="classify-bottom-tips">
					</view>
				</view>
			</view>
		</view>


		<!-- 常用功能 -->
		<view class="classify-two classify-body">
			<view class="classify-tips"><text>常用功能</text></view>
			<view class="classify-two-btn">

				<view class="cate-item">
					<image src="../../static/index/fenxiang.png"></image>
					<text>车主分享</text>
				</view>

				<view class="cate-item">
					<image src="../../static/index/c7.png"></image>
					<text>出险查询</text>
				</view>
				<view class="cate-item">
					<image src="../../static/index/c8.png"></image>
					<text>违章查询</text>
				</view>
			</view>
		</view>


		<!-- 分类 -->
		<view class="classify-two classify-body">
			<view class="classify-tips flex justify-between">
				<text>专场分类</text>
				<text class="text-right text-gray" @tap="goAuctionClassify">查看更多</text>
			</view>
			<view class="classify-two-btn">


				<view class="cate-item" @tap="goAuctioncls(1)">
					<image src="/static/index/ershou.png"></image>
					<text>二手车</text>
				</view>

				<view class="cate-item" @tap="goAuctioncls(2)">
					<image src="/static/index/zaiquan.png"></image>
					<text>债权车</text>
				</view>
				<view class="cate-item" @tap="goAuctioncls(4)">
					<image src="/static/index/sahngyong.png"></image>
					<text>商用车</text>
				</view>
				<view class="cate-item" @tap="goAuctioncls(31)">
					<image src="/static/index/shigu.png"></image>
					<text>事故车</text>
				</view>
			</view>
		</view>




		<!-- 	<view class="classify-three classify-body">
			<view class="classify-tips"><text>竞拍中车源</text></view>
			<view class="" style="margin-top: 10rpx;" v-if="auctionList.length>0">
				<auctionlist v-for="(item,index) in auctionList" :key='index' :item='item' :id='item.id'>
				</auctionlist>


				<view class="margin-top flex flex-direction">

					<button class="cu-btn bg-blue lg" @tap="goBiddingList(2)">点击查看更多</button>
				</view>
			</view>
			<view class="padding">
				暂无竞拍中车源
			</view>
		</view> -->


	</view>
</template>

<script>
	import auctionlist from '../../components/auctionlist.vue'
	export default {
		components: {
			auctionlist
		},
		data() {
			return {
				titleNViewBackground: '',
				carouselList: [],
				auctionList: [],

			}
		},
		onLoad() {
			this.getIndexData()
			this.getAuctiionlist()
		},
		methods: {
			swiperChange(e) {
				const index = e.detail.current;
				this.titleNViewBackground = this.carouselList[index].bgcolor;
			},
			// 获取首页数据
			getIndexData() {
				this.$apiService.getIndexData().then(res => {
					this.titleNViewBackground = res.data.ad[0].bgcolor;
					this.carouselList = res.data.ad
				})
			},
			//获取拍卖数据
			getAuctiionlist() {
				let param = {
					type: 2,
					p: 1,
					row: 3
				}
				this.$apiService.getAuctionSessionIndex(param).then(res => {
					if (res.code != 1) {
						this.$msg('获取正在竞拍中车源失败')
						return
					}
					this.auctionList = res.data.list

					console.log(this.auctionList, 44444444444)
				})
			},
			// 点击轮播图时
			chooseBanner(item) {
				console.log(item, 22222)
				if (item.id == 20) {
					uni.switchTab({
						url: `/pages/fapai/fapai`
					})
					return
				}
				if (item.car_id) {
					uni.navigateTo({
						url: `/pages/auction/auction?id=${item.car_id}`
					})
					return
				}
				if (item.app_url) {
					uni.navigateTo({
						url: item.app_url
					})
					return
				}


				if (item.good_id) {
					uni.navigateTo({
						url: `/pages/product/product?id=${item.good_id}`
					})
					return
				}

				// if (item.url) {
				// 	uni.navigateTo({
				// 		url: `../webview/webview?url=${item.url}`
				// 	})
				// 	return
				// }
			},


			// 常用功能跳转
			goAuctionClassify() {
				console.log(11111111111)
				uni.navigateTo({
					url: `/pages/acution/classify`
				})
			},
			goSyncAuction() {
				uni.navigateTo({
					url: `/pages/syncauction/syncauction`
				})

			},
			goBiddingList(type) {
				uni.navigateTo({
					url: `/pages/acution/biddinglist?type=${type}`
				})


			}
		}


	}
</script>

<style lang="scss" scoped>
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: 0.4s;
		}
	}

	.carousel {
		padding-left: 20px;
		height: 340upx;
		border-radius: 0 0 16px 16px;

		.swiperimage {
			height: 100%;
			border-radius: 8px;
		}
	}

	.classify-one {
		padding: 30upx 22upx 0 22upx;
		text-align: center;

		.classify {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.coul {
					height: 48%;
				}
			}

			.width50 {
				width: 46vw;
				height: 36vw;
			}

			.postion-relative {
				position: relative;

				.class-name {
					position: absolute;
					top: 6upx;
					left: 20upx;
				}

				.n3-class-name {
					top: 16%;
				}

				.class-card {
					width: 50%;
					height: 60%;
					position: absolute;
					bottom: 10upx;
					right: 20upx;
				}

				.n3-class-card {
					width: 68%;
					height: 40%;
					bottom: 20%;
				}
			}


			.n1 {
				border-radius: 1vw;
				// background-image: linear-gradient(-30deg, #f5af3d 0%, #f87120 100%), linear-gradient(#ff6565, #ff6565);
			}

			.n2 {
				border-radius: 1vw;
				// background-image: linear-gradient(-30deg, #ff8cad 0%, #f96984 100%), linear-gradient(#f88bff, #f88bff);
			}

			.n3 {
				border-radius: 1vw;
				// background-image: linear-gradient(-30deg, #ff7d6d 0%, #fd4239 100%), linear-gradient(#6b76fd, #6b76fd);
			}


			.classify-bottom-tips {
				width: 50upx;
				height: 50upx;
				line-height: 50upx;
				border-radius: 50upx;
				background-color: red !important;
				background-image: none;
				position: absolute;
				top: -10upx;
				right: -10upx;
			}
		}
	}

	// 常用功能
	.classify-two {

		.classify-two-btn {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-wrap: wrap;
			margin: 30upx 0;
			background: #fff;

			.cate-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 2upx;
				// color:
				width: 22vw;

			}


			image {
				width: 66upx;
				height: 66upx;
				margin-bottom: 14upx;

			}
		}
	}


	.classify-body {
		background-color: #fff;
		margin: 30upx 22upx;
		padding: 30upx 22upx;
		text-align: center;
		border-radius: 1vw;

		.classify-tips {
			text-align: left;
			border-left: 1vw solid #2158cf;

			text {
				padding-left: 20upx;
			}
		}
	}
</style>
