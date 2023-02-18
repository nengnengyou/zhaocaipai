<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">手机号</view>
				<input v-if="from == 'user'" placeholder="请输入手机号" name="input" v-model="param.mobile"
					disabled="false"></input>
				<input v-if="from == 'login'" placeholder="请输入手机号" name="input" v-model="param.mobile"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">密码</view>
				<input placeholder="请输入新的密码" name="input" password='true' v-model="param.password"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">确认密码</view>
				<input placeholder="请再次输入新的密码" name="input" password='true' v-model="param.newpassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码111111111</view>
				<input placeholder="请输入验证码" name="input" type='number' maxlength='6' v-model="param.captcha"></input>
				<button class='cu-btn bg-blue shadow' :class="codeTipsColor[getCodeStatus]"
					@tap="getCode">{{codeTips[getCodeStatus]}}</button>
			</view>
		</form>
		<view class="padding flex flex-direction">

			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: {
					mobile: '',
					password: '',
					newpassword: '',
					captcha: ''
				},
				codeTips: ['获取验证码', '60秒后发送'],
				codeTipsColor: ['bg-green', 'bg-grey'],
				getCodeStatus: 0, //  0=未发送/倒计时结束  1 =已发送
				from: 'user'
			};
		},
		onLoad(options) {

			if (options.type == 'nouserinfo') {
				this.from = 'login'
			} else {
				this.from = 'user'
				this.init()
			}
		},
		methods: {
			init() {
				this.$apiService.getUserInfo().then(res => {
					if (res.code != 1) {
						this.$msg(res.msg)
						return
					}
					this.param.mobile = res.data.mobile
				})
			},
			submit() {
				if (this.param.password == '' || this.param.newpassword == '') {
					this.$msg('密码为空，请输入')
					return
				}

				if (this.param.password != this.param.newpassword) {
					this.$msg('两次输入的密码不相同')
					return
				}

				if (!this.param.captcha) {
					this.$msg('请输入验证码')
					return
				}
				this.$apiService.resetPwd(this.param).then(res => {
					this.$msg(res.msg)
					if (res.code != 1) {

						return
					}
					setTimeout(() => {
						uni.redirectTo({
							url: '../public/selectLogin'
						})
					}, 600)
				})
			},
			getCode() {
				// 如果=1  说明在60秒内已经成功发送了验证码
				if (this.getCodeStatus) {
					return
				}

				let param = {
					mobile: this.param.mobile,
					event: 'resetpwd'
				}

				if (!param.mobile) {
					this.$msg('手机号为空！#1')
				}
				this.$apiService.getCode(param).then(res => {
					this.$msg(res.msg)
					if (res.code != 1) {
						return
					}
					clearInterval(timer)
					console.log(111);


					let countdown = 60
					this.getCodeStatus = 1
					let timer = setInterval(() => {
						if (countdown < 1) {
							this.getCodeStatus = 0
							this.$set(this.codeTips, 1, '60秒后发送')
							clearInterval(timer)
						}

						countdown--
						let tips = countdown + '秒后发送'
						this.$set(this.codeTips, 1, tips)
						console.log(this.codeTips);
					}, 1000)


				})
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
