import App from './App'
import {
	http,
	httplive
} from './service/request.js'
import Api from 'service/api.js'

import store from './store'





import uView from "uview-ui";




// 刷新请求中的token
const updateHttpConfig = () => {
	http.config.header.Token = uni.getStorageSync('token') || ''
	httplive.config.header.Token = uni.getStorageSync('token') || ''
}


Vue.use(uView);



// 信息提示的封装
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return

	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	})
}


Vue.prototype.$http = http
Vue.prototype.$apiService = Api
Vue.prototype.$msg = msg
Vue.prototype.$updateHttpConfig = updateHttpConfig





// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
