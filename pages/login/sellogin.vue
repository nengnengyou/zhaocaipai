<template>
	<view class="select-login">
		<view class="content">
			<view class="logo-c">
				<view class="logo"></view>
				<text>欢迎使用招财拍</text>
			</view>

			<view class="login-btns">
				<view class="padding flex flex-direction">
					<button class="cu-btn btn-color-blue lg" @tap="toWXLogin" v-if="loginShow"> 微信快速登录</button>
					<button class="cu-btn btn-color-blue margin-tb-lg lg" @tap="toPhoneLogin">手机一键登录</button>
					<button class="cu-btn btn-color-blue margin-tb-lg lg" @tap="toPwd">账号密码登录</button>
				</view>
			</view>
		</view>
		<!-- 登录即表明知悉并同意《隐私协议》《用户使用协议》 -->
		<view class="tips1 text-center">
			<u-checkbox v-model="checked" :disabled="false">知悉并同意《隐私协议》《用户使用协议》</u-checkbox>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				loginShow: false,

			}
		},

		methods: {

			ifIosLogin() {
				let platform = uni.getSystemInfoSync().platform //获取系统信息的同步接口
				// 如果是android
				if (platform == 'android') {
					this.loginShow = true
				}
			},
			// 微信登录
			toWXLogin() {
				// 检验是否勾选了隐私协议
				if (!this.checked) {
					this.$msg('请先勾选页面下方的"知悉并同意《隐私协议》《用户使用协议》')
					return
				}
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(JSON.stringify(loginRes))

					}
				})
			},
			// 账号密码登录
			toPwd() {
				if (!this.checked) {
					this.$msg('请先勾选页面下方的"知悉并同意《隐私协议》《用户使用协议》')
					return
				}
				uni.navigateTo({
					url: 'login'
				});

			},
			// 手机一键登录
			toPhoneLogin() {
				if (!this.checked) {
					this.$msg('请先勾选页面下方的"知悉并同意《隐私协议》《用户使用协议》')
					return
				}
				setTimeout(() => {
					uni.navigateTo({
						url: './login?type=phone'
					})
				}, 600)
			}

		}
	}
</script>

<style lang="less">
	.select-login {
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		background-image: url('https://zcp.zhaocaipaipai.com/app/selectlogin.jpeg');
		background-size: 100% 100%;

		.content {
			height: 60vh;
			width: 80%;
			margin: 25vh auto;
			// background-color: #4CD964;

			.logo-c {
				text-align: center;
				color: #0055ff;
				font-weight: bold;
				z-index: 5;

				.logo {
					margin: 0 auto;
					margin-bottom: 20upx;
					width: 160upx;
					height: 160upx;

					background-image: url('https://zcp.zhaocaipaipai.com/app/logo1.png');
					background-size: 100% 100%;
				}
			}

			.login-btns {
				// height: 100px;
				margin-top: 100upx;
				text-align: center;

				.body-center {
					line-height: 60upx;
					margin-top: 40upx;
				}

				.margin-tb-lg {
					margin-bottom: 0;
				}
			}
		}

		.tips {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			line-height: 40upx;
			// background-color: #999999;
			display: flex;
			justify-content: space-between;
			padding: 0 20upx;
			margin-bottom: 24upx;
		}

		.tips1 {
			position: absolute;
			bottom: 80upx;
			left: 0;
			right: 0;
			line-height: 40upx;
			// background-color: #999999;
			font-size: 14upx;

			margin-bottom: 24upx;
		}


	}
</style>
