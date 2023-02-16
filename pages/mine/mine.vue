<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="../../static/my-card-bg.jpg" mode=""></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="../../static/missing-face.png" mode=""></image>
				</view>
				<view class="info-box">
					<view class="">
						<text>暂未设置昵称</text>
					</view>

				</view>
			</view>
			<view class="user-info-wallter margin-top">
				<view class="user-info-wallter-balance">
					<text>账户余额</text>
					<view class="classify">
						<view class="">
							<view class="classify-num classify-split">
								123
							</view>
						</view>
					</view>
				</view>
				<view class="user-info-wallter-margin">
					<text>保证金余额</text>
					<view class="classify">
						<view class="">
							<view class="classify-num classify-split">
								lalala
							</view>
						</view>
					</view>
				</view>

				<view class="user-info-wallter-margin">
					<text>招财币</text>
					<view class="classify">
						<view class="">
							<view class="classify-num">
								暂无




							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex justify-between kefu">
			<view class="flex flex-direction kefu-w">
				<text>专属客服</text>
				<view class="avatar">
					<view class="portrait-box">
						<image class="portrait" src="../../static/missing-face.png" mode=""></image>
					</view>
					<view class="info-box">
						<view class="">
							<text>暂无</text>

						</view>
						<view class="">
							<text class="text-df cuIcon-phone text-orange"></text>
							<text class="text-df">暂无</text>
						</view>
						<view class="">
							<text class="text-df cuIcon-wexin text-orange"></text>
							<text class="text-df">暂无</text>
						</view>
					</view>
				</view>

			</view>
			<view class="appkkefu">
				申请更换客服
			</view>

		</view>




		<view class="cover-container">
			<view class="history-section icon">
				<listCell iconColor="#4390e2"></listCell>
				<listCell iconColor="#e07472" title="我的钱包"></listCell>
				<list-cell iconColor="#e07472" title="资金明细" @eventClick="navTo('/pages/money/details')"></list-cell>

				<listCell iconColor="#4390e2"></listCell>
				<listCell iconColor="#e07472" title="我的钱包"></listCell>
				<list-cell iconColor="#e07472" title="资金明细" @eventClick="navTo('/pages/money/details')"></list-cell>

				<listCell iconColor="#4390e2"></listCell>
				<listCell iconColor="#e07472" title="我的钱包"></listCell>
				<list-cell iconColor="#e07472" title="资金明细" @eventClick="navTo('/pages/money/details')"></list-cell>

			</view>



		</view>



	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	export default {
		components: {
			listCell

		},
		data() {
			return {
				userInfo: '',
				myLiveRoomStatus: 0
			}
		},
		onLoad() {
			this.getUserInfo()
		},

		methods: {
			//获取个人信息
			getUserInfo() {
				this.$apiService.getUserInfo().then(res => {
					console.log(res, 123)
					if (res.code != 1) {
						this.$msg(res.msg)
						uni.reLaunch({
							url: '../login/sellogin'
						})
					} else {
						this.userInfo = res.data
						this.myLiveRoomStatus = res.data.live_status

					}
				})
			}
		}

	};
</script>
<style lang="scss">
	.appkkefu {
		position: absolute;
		bottom: 10rpx;
		right: 20rpx;
		color: #007AFF;
		z-index: 999;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			// opacity: 0.7;
		}
	}

	.user-info-wallter {
		display: flex;
		text-align: center;
		color: #b3daff;
		font-size: 24upx;
		z-index: 7;
		position: relative;

		justify-content: space-between;

		.user-info-wallter-balance {
			flex: 1;
		}

		.user-info-wallter-margin {
			flex: 1;
		}

		.classify {
			display: flex;
			justify-content: space-around;

			view {
				flex: 1;
			}

			.classify-num {
				margin: 20upx 0;
				font-size: 40upx;
				color: $font-color-white;
			}

			.classify-split {
				border-right: 1rpx solid #87b5ff;
			}
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username,
		.vip-level {
			font-size: $font-lg + 6upx;
			color: $font-color-white;
			margin-left: 20upx;
		}

		.vip-level {
			font-size: $font-lg;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base + 2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		// margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		margin-top: -40upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
			// color: $font-color-blue;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

	.kefu {
		height: 200upx;
		z-index: 2;
		position: relative;
		top: -50upx;
		margin: 0 30upx;

		.kefu-w {
			padding: 10upx 20upx;
			// width: 44vw;
			width: 100%;
			background-color: #fff;
			border-radius: 20upx;
			flex-direction: column;
			justify-content: space-between;
		}

		.avatar {
			// height: 80upx;
			// image {
			// 	width: 80upx;
			// 	height: 80upx;
			// 	border-radius: 50%;
			// }
			// text {
			// 	line-height: 80upx;
			// }
			padding-bottom: 40upx;
			height: 80upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;

			.portrait {
				width: 80upx;
				height: 80upx;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-right: 20upx;
			}

			.username,
			.vip-level {
				// font-size: $font-lg ;
				// color: $font-color-white;
			}

			.vip-level {
				// font-size: $font-lg;
			}


			.info-box {
				width: 90%;
				display: flex;

				view {
					padding-right: 20upx;
				}
			}
		}
	}
</style>
