<template>
	<view class="container" v-if="!isAutoLogin">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zoujiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign"></view>
			<view class="welcome">
				欢迎回来!

			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="nnumber" :value="mobile" placeholder="请输入手机号" maxlength="11" data-key="mobile"
						@input="inputChange">

				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" value="" password data-key="password" @input='inputChange' @confirm="toLogin"
						placeholder="8-18位不含特殊字符的数字,字母组合">
				</view>
			</view>


			<button class="confirm-btn bg-blue" :disabled="logining" @click="toLogin">登录</button>
			<view class="forget-section">
				忘记密码？
			</view>
		</view>
		<view class="register-section">
			还没有账号？
			<text>马上注册</text>
			<u-checkbox v-model="checked" :disabled="false">知悉并同意《隐私协议》《用户使用协议》</u-checkbox>
		</view>

		<view class="" v-if="isAutoLogin">
			<view class="cu-load load-modal">
				<image src="../../static/index/logo.png" mode=""></image>
				<view class="gray-text">
					正在加载一键登录
				</view>

			</view>

		</view>



	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				isAutoLogin: false,
				checked: false,
				mobile: '',
				password: "",
				logining: false,
				type: '',
				// 用户信息
				user: {
					mobile: '',
					password: '',
					model: '',
					uuid: '',
					cid: '',
					edition: ''
				}
			}
		},
		methods: {


			inputChange(e) {
				console.log(e, 1234)
				const key = e.currentTarget.dataset.key
				this[key] = e.detail.value
				console.log(this[key])

			},

			toLogin() {
				// 先判断是否勾选选了隐私协议
				if (!this.checked) {
					this.$msg('请先勾选同意隐私协议')
					console.log('勾选用户隐私协议')
					return

				}
				this.type = 3
				this.logining = true
				//判断是否输入了账号和密码
				if (this.mobile == '' || this.password == '') {
					this.$msg('请输入账号或密码')
					return
				}


				// 用户输入账号密码后，将账号密码存到user中
				this.user.mobile = this.mobile
				this.user.password = this.password
				this.user.type = this.type


				//发送请求，核对信息是否正确
				this.$apiService.login(this.user).then(res => {
					console.log(res, 77777)
					// 如果账户不正确
					if (res.code != 1) {
						this.$msg(res.msg)
						this.logining = false
						return
					} else {
						this.$msg(res.msg)
						console.log(res)
						let token = res.data.userinfo.token

						this.$store.commit('login', res.data.userinfo)

						try {
							uni.setStorageSync('token',
								token); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								})
							}, 300)

							this.$updateHttpConfig()


							console.log(uni.getStorageSync('token'), 3333333333);
						} catch (e) {
							// error
							console.error('保存token失败');
						}


					}
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		/* 	&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
	
		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		} */

		&:after {
			/* position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0; */
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		/* position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx; */
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		/* background: $uni-color-primary; */
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
