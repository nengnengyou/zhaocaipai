<template>
	<view class="list">
		<view class="list-item auction-item" @tap="goAuctionCarList(id, item)" :class="auctionStatus ? '' : 'end-bg'">
			<view class="">
				<view class="auction-item-title">
					<view class="tips">
						<text class="text-padding" space="nbsp" decode="true" v-if="item.is_pack == 1">打包拍</text>
						<text class="text-padding" space="nbsp" decode="true" v-if="item.is_pack == 2">单台</text>
						<text class="text-padding" space="nbsp" decode="true">{{ item.status_text }}</text>
						<text class="text-padding" space="nbsp" decode="true" v-if="item.second"> 二轮报价</text>
					</view>
					<text>{{ item.title }}</text>
					<!-- <text>{{ item.resource_path }}</text> -->
					<text>{{ item.car_num }}台</text>
				</view>

				<view class="auction-item-text  text-left">
					<view v-html="item.rule" class="item-text"></view>
					<!-- <jyf-parser :html="item.rule" ref="article"></jyf-parser> -->
				</view>

				<view class="auction-item-tips">
					<text>{{ item.company }}</text>
					<uni-countdown :show-day="true" :second="time" :reset="reset"></uni-countdown>
					<!-- <text>截止时间：{{$u.timeFormat(item.end_time, 'yyyy年mm月dd日 hh:MM:ss')}}</text> -->
				</view>
			</view>
		</view>

		<!-- 	<view class="auction-list-tips">
			{{item.status_text}}
		</view> -->

		<view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">竞拍公告</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl text-left ss">
					<view v-html="item.rule" class="text-left"></view>
					<!-- <jyf-parser :html="item.rule" ref="article"></jyf-parser> -->
				</view>

				<!-- <view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="goCarList(modalItem.id)">进入</button>
				
					</view>
				</view> -->
				<view class="padding flex flex-direction"><button class="cu-btn bg-blue lg"
						@tap="goCarList(item.id,item.catid)">进入</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from '@/components/linnian-CountDown/linnian-CountDown.vue';
	export default {
		data() {
			return {
				reset: true,
				modalName: null,
				auctionStatus: true,
				nowTime: '',
				time: 0,
			};
		},
		components: {
			uniCountdown
		},
		props: {
			item: {
				type: Object
			},
			id: {
				type: Number
			}
		},
		mounted() {
			let NowTime = Date.parse(new Date()) / 1000;
			this.nowTime = NowTime
			// console.log(this.item.end_time - this.nowTime);
			// console.log(this.item.end_time , this.nowTime);
			this.reset = !this.reset
			this.time = this.item.end_time - this.nowTime
			// console.log(this.item.end_time);
			// console.log(this.time);
			// console.log(this.time);
			if (this.item.end_time > NowTime) {} else {
				this.auctionStatus = false;
			}
		},
		methods: {
			resetTime() {
				let NowTime = Date.parse(new Date()) / 1000;
				this.nowTime = NowTime
				// console.log(this.item.end_time - this.nowTime);
				// console.log(this.item.end_time , this.nowTime);
				this.reset = !this.reset
				this.time = this.item.end_time - this.nowTime
				// console.log(this.item.end_time);
				// console.log(this.time);
				// console.log(this.time);
				if (this.item.end_time > NowTime) {} else {
					this.auctionStatus = false;
				}
			},

			goAuctionCarList(id, item) {
				// this.$emit('goAuctionCarList', id,item);
				// this.modalName = 'Modal';
				this.goCarList(id, item.catid)
			},
			goCarList(id, catid) {
				this.modalName = null;
				let p = {
					cat_id: catid
				}
				this.$apiService.getUserInterest(p).then(res => {
					console.log(res);
				})
				setTimeout(() => {
					console.log(id);
					this.$emit('goAuctionCarList', id);
				}, 500)

			},
			hideModal() {
				this.modalName = null;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.end-bg {
		background-image: url('https://zcp.zhaocaipaipai.com/app/auction/card-bg-end.jpeg') !important;
	}

	.list {
		position: relative;

		.auction-list-tips {
			position: absolute;
			left: 10upx;
			top: -20upx;
			padding: 5upx 10upx;
			background-color: red;
		}

		.list-item {
			position: relative;
			height: 200rpx;
			width: 88vw;
			margin: 40upx auto 0;
			border-radius: 10upx;
			background-size: 100% 100%;
			background-image: url('https://zcp.zhaocaipaipai.com/app/auction/card-bg.jpeg');

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
			height: 410upx;

			.auction-item-title {
				color: $font-color-white;
				display: flex;
				// justify-content: space-around;
				justify-content: space-between;

				padding: 14upx 10upx;
				line-height: 40upx;

				.tips {
					padding: 0 10upx;
					border-radius: 8upx;
					// line-height: 40upx;
					font-weight: bold;
					font-size: 20upx;
					background-color: #ffffff;
					color: #d14214;

				}

				.text-padding {
					padding-right: 6upx;
				}
			}

			.auction-item-text {
				height: 270upx;
				min-height: 200upx;
				padding: 0 20upx;
				overflow: hidden;
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
	}

	.ss {
		max-height: 50vh;
		overflow: auto;
	}
</style>
