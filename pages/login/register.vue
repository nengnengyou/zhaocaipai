<template>
	<view>
		<view class="">
			<form>
				<view class="cu-form-group">
					<view class="title">
						<input placeholder="请输入手机号" name='input' v-model="userInfo.mobile">
					</view>
				</view>


				<view class="cu-form-group">
					<view class="title">验证码</view>
					<input placeholder="请输入验证码" name="input" v-model="userInfo.code"></input>
					<button class='cu-btn bg-blue shadow' @tap="getCode"
						:class="codeTipsColor[getCodeStatus]">{{codeTips[getCodeStatus]}}</button>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input type="password" placeholder="请输入密码" name='input' v-model="userInfo.password">
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input type="password" name='input' placeholder="请确认密码">
				</view>
				<view class="cu-form-group">
					<view class="title">地区选择</view>
					<view class="araea">
						<selectarea></selectarea>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">邀请码</view>
					<input placeholder="请输入邀请码(非必填)" name="input" v-model="userInfo.invite_code"></input>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue margin-tb-sm lg" @tap="sendRegister">提交</button>
				</view>


			</form>




		</view>

	</view>

</template>

<script>
	import selectarea from '../../components/selectarea/selectarea.vue'
	export default {
		components: {
			selectarea
		},
		data() {
			return {
				userInfo: {
					type: '',
					password: '',
					mobile: '',
					invite_code: '',
					unionid: '',
					nickname: '',
					headimgurl: '',
					openid: '',
					code: '',
					model: '',
					uuid: '',
					cid: '',
					edition: '',
					province_id: '',
					city_id: '',
					district_id: ''
				},
				codeTips: ['获取验证码', '60秒后发送'],
				codeTipsColor: ['bg-green', 'bg-grey'],
				getCodeStatus: 0, //  0=未发送/倒计时结束  1 =已发送


			}
		},
		onLoad(option) {
			console.log(this, 1111111111111111)
			// console.log(option, "optipm000000000000000") //type=="1"

			uni.$on('select', (p) => {
				// console.log(p, 'pppppppppp1111111111111') //监听全局的自定义事件。事件可以由 uni.$emit 触发
				this.userInfo.province_id = p[0].value
				this.userInfo.city_id = p[1].value
				this.userInfo.district_id = p[2].value
			})
		},
		methods: {
			// 提交按钮
			sendRegister() {
				// 发送请求  把用户信息传过去
				this.$apiService.register(this.userInfo).then(res => {
					console.log(res, "resgust")
					this.$msg(res.msg)
					// 如果信息正确
					if (res.code == 1) {
						try {
							let token = res.data.userinfo.token
							uni.setStorageSync('token', token)
							this.$store.commit('login', res.data.userinfo)
							this.$updatehttpConfig()
							uni.switchTab({
								url: '../index/index'
							})
						} catch (e) {
							console.error('保存token失败')

						}

						//登录成功 跳转到个人中心或者首页
						if (this.loginType == 1) {

						} else if (this.loginType == 2) {

						} else if (this.loginType == 3) {
							uni.switchTab({
								url: '../index/index'
							})
						}

					} else {

					}
				})

			},
			// 发送验证码
			getCode() {
				let param = {
					mobile: this.userInfo.mobile,
					event: 'register'
				}
				// 1手机号为空 
				if (!param.mobile) {
					this.$msg('手机号为空')
				}
				// 发送验证码请求
				this.$apiService.getCodedat(param).then(res => {
					console.log(res)
					// 被注册，提示用户
					this.$msg(res.msg) //发送成功/已被注册
					if (res.code != 1) {
						return
					}
					clearInterval(timer)

					let countdown = 60
					this.getCodeStatus = 1
					// 发送完60秒倒计时
					let timer = setInterval(() => {

						if (countdown < 1) {
							this.getCodeStatus = 0
							this.$set(this.codeTips, 1, '60秒后发送')
							clearInterval(timer)
						}
						countdown--
						let tips = countdown + '秒后发送'
						this.$set(this.codeTips, 1, tips)
						console.log(this.codeTips)
					}, 1000)
				})


			},
		}


	}
</script>

<style lang="less">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.araea {
		flex: 1;
		justify-content: space-around;
	}

	.bg-blue {
		background-color: #0081ff;
		color: #ffffff;
	}

	.cu-btn {
		position: relative;
		border: 0upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 30upx;
		font-size: 28upx;
		height: 64upx;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		transform: translate(0upx, 0upx);
		margin-right: initial;
	}
</style>
