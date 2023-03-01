<template>
	<view class="container">


		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box"><input class="ser-input" type="text" value="输入关键字搜索" disabled /></view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{ backgroundColor: titleNViewBackground }"></view>
			<swiper class="carousel" circular autoplay=true interval=3000 @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item"
					@click="formBanner(item)">
					<image :src="item.image" />
				</swiper-item>
			</swiper>


			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view>
		</view>



		<view class="classify-one">



			<view class="classify flex justify-between text-center text-white wrap">
				<view class="flex left width50">
					<view class="coul n1 postion-relative" @tap="goAuctionClassify">
						<image style="height: 100%;width: 100%;" src="~@/static/index/paiche.png"></image>
					</view>
					<view class="coul n2 postion-relative" @tap="goSyncAuction">
						<image style="height: 100%;width: 100%;" src="~@/static/index/tongbu.png"></image>
					</view>
				</view>
				<view class="width50 n3 postion-relative" @tap="goBiddingList(2)">
					<image style="height: 100%;width: 100%;" src="~@/static/index/jingpai.png"></image>
					<view class="classify-bottom-tips" v-if="start_auction > 0">
						{{start_auction}}
					</view>
				</view>
			</view>


		</view>
		<!-- 分类 -->
		<view class="classify-two classify-body">
			<view class="classify-tips"><text>常用功能</text></view>
			<view class="classify-two-btn">

				<view class="cate-item" @tap="navigateTo('../carfriend/publish')">
					<image src="/static/index/fenxiang.png"></image>
					<text>车主分享</text>
				</view>

				<view class="cate-item" @tap="goCarInquiry('wb')">
					<image src="/static/index/c7.png"></image>
					<text>出险查询</text>
				</view>
				<view class="cate-item" @tap="goCarInquiry('wz')" v-if="isShowWZ">
					<image src="/static/index/c8.png"></image>
					<text>违章查询</text>
				</view>
			</view>
		</view>



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


		<!-- *********** -->
		<zjc-scroll-nav :platformList='firstColumn'>
		</zjc-scroll-nav>
		<!-- <an-notice-bar :text='text'></an-notice-bar> -->
		<hometype></hometype>


		<view class="classify-three classify-body">
			<view class="classify-tips"><text>竞拍中车源</text></view>
			<view class="" style="margin-top: 10rpx;" v-if="auctionList.length > 0">
				<auctionlist v-for="(item, index) in auctionList" :key="index" :item="item" :id="item.id"
					@goAuctionCarList="goAuctionCarList"></auctionlist>


				<view class="margin-top flex flex-direction">

					<button class="cu-btn bg-blue lg" @tap="goBiddingList(2)">点击查看更多</button>
				</view>
			</view>
			<view class="padding" v-if="auctionList.length == 0">
				暂无竞拍中车源
			</view>
		</view>

	</view>
</template>

<script>
	import hometype from '../../components/d-swiper-type/pages/home/hometype.vue'
	import annoticebar from '../../components/an-notice-bar/an-notice-bar.vue'
	// import zjcscrollnav from '../../components/zjc-scroll-nav/zjc-scroll-nav.vue'
	import auctionlist from '../../components/auctionlist.vue'
	import zjcscrollnav from '../../components/zjc-scroll-nav/zjc-scroll-nav.vue'
	export default {
		components: {
			auctionlist,
			// zjcscrollnav,
			zjcscrollnav,
			annoticebar,
			hometype

		},
		data() {
			return {
				titleNViewBackground: '',
				carouselList: [],
				auctionList: [],
				swiperCurrent: 0,
				swiperLength: 0,
				start_auction: 0,
				isShowWZ: false,
				firstColumn: [],
				text: '我我我我我我|他他他他啊他'


			}

		},
		onLoad() {
			this.getAuctionlist()
			this.getIndexData()
			let time = new Date().getTime()
			if (1622087606000 < time) {
				console.log(11);
				this.isShowWZ = true
			}

		},

		methods: {
			// 获取首页轮播数据
			getIndexData() {
				this.$apiService.getIndexData().then(res => {
					this.loading = false;
					if (res.code != 1) {
						this.$msg(res.msg)
						return
					}
					this.swiperLength = res.data.ad.length
					this.carouselList = res.data.ad
					this.firstColumn = res.data.ad
					console.log(this.firstColumn)
					this.titleNViewBackground = res.data.ad[0].bgcolor;
					this.start_auction = res.data.start_auction
				})
			},
			// 获取竞拍数据
			getAuctionlist() {
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
					console.log(res, 5555555)
					this.auctionList = res.data.list
				});
			},


			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].bgcolor;
			},
			formBanner(item) {
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

				if (item.url) {
					uni.navigateTo({
						url: `../webview/webview?url=${item.url}`
					})
					return
				}
			},
			//跳转到专场分类页
			goAuctionClassify() {
				uni.navigateTo({
					// url: '../auction/classify'
					url: `/pages/acution/classify`
				})
			},

			goBiddingList(type) {
				uni.navigateTo({
					url: `../acution/biddinglist?type=${type}`,
				});
			},
			goSyncAuction() {
				uni.navigateTo({
					url: '../syncauction/syncauction'

				})
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			//查询维保违章
			goCarInquiry(type) {
				uni.navigateTo({
					url: "../carinquiry/carinquiry?type=" + type
				})
			},
			goAuctioncls(id) {
				uni.navigateTo({
					url: `../acution/biddinglist?id=${id}&type=5`

				})
			},


		}

	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		justify-content: space-around;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

		}
	}


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

	.addr-title {
		text-align: center;
		line-height: 40rpx;

		.maaa {
			margin: 0 10rpx;
		}
	}

	.gang {
		line-height: 40rpx;
		height: 4rpx;
		width: 28rpx;
		margin-top: 20rpx;
		background-color: #0093E9;
		background-image: linear-gradient(90deg, #0093E9 0%, #80D0C7 100%);


	}

	.bidding-swiper {
		height: 200rpx;
		overflow: hidden;
	}

	.noticelist {
		// position: absolute;
		// top: 120rpx;
		// left: 10rpx;
		color: #000000 !important;
		height: 200rpx;
		width: 100%;
		border-radius: 10rpx;

		// background-color: rgba(0, 0, 0 ,.4);
		/deep/ .uni-swiper-wrapper {
			overflow: visible !important;
		}

	}

	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, 0.6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */

	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
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
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: 0.7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm + 2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, 0.8);
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.f-header {
		display: flex;
		align-items: center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg + 2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg + 2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			width: 100%;
			padding: 0 30upx;
			display: flex;
		}

		image {
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {

			flex: 1.2;
			margin-right: 24upx;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-bottom: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.price {
			color: $uni-color-primary;
		}

		.m-price {
			font-size: $font-sm + 2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}

	.classify-one {
		padding: 30upx 22upx 0 22upx;
		text-align: center;

		.classify-top {
			margin-bottom: 2vw;
		}

		.classify-top,
		.classify-bottom {

			display: flex;
			justify-content: space-between;
			color: #ffffff;

			view {
				width: 46vw;
				height: 18vw;
				line-height: 18vw;
				background-image: linear-gradient(-30deg, #b69efe 0%, #8c67ff 100%), linear-gradient(#28e3ff, #28e3ff);
				background-blend-mode: normal, normal;
				border-radius: 11rpx;
			}

			view:last-child {
				background-image: linear-gradient(-30deg, #5bbdfa 0%, #2b7cfe 100%), linear-gradient(#fdae48, #fdae48);
			}

			.classify-bottom-text {
				position: relative;

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

		.classify-bottom {
			view {
				width: 46vw;
				height: 18vw;
			}

			view:nth-child(1) {
				background-image: linear-gradient(-30deg, #f5af3d 0%, #f87120 100%), linear-gradient(#ff6565, #ff6565);
			}

			view:nth-child(2) {
				background-image: linear-gradient(-30deg, #ff8cad 0%, #f96984 100%), linear-gradient(#f88bff, #f88bff);
			}

			view:nth-child(3) {
				background-image: linear-gradient(-30deg, #ff7d6d 0%, #fd4239 100%), linear-gradient(#6b76fd, #6b76fd);
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
				font-size: $font-sm + 2upx;
				color: $font-color-dark;
				width: 22vw;

			}

			// .cate-item:nth-child(n+5) {
			// 	margin-top: 30upx;
			// }
			// .cate-item:nth-child(n+4) {
			// 	margin-top: 30upx;
			// }
			/* 原图标颜色太深,不想改图了,所以加了透明度 */
			image {
				width: 66upx;
				height: 66upx;
				margin-bottom: 14upx;
				// border-radius: 50%;
				// opacity: 0.7;
				// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			}
		}
	}

	/* 分类推荐楼层 */
	.hot-floor {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

		.floor-img-box {
			width: 100%;
			height: 320upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
			}
		}

		.floor-img {
			width: 100%;
			height: 100%;
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top: -140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
			position: relative;
			z-index: 1;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;

			text:first-child {
				margin-bottom: 4upx;
			}
		}
	}

	.ss {
		max-height: 50vh;
		overflow: auto;
	}

	.grid {
		.col-4 {
			width: 25%;
		}

		.col-2 {
			width: 50%;
			background-color: red;
		}


	}


	.classify {

		.left {
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
</style>
