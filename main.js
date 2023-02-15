import App from './App'
import {
	http,
	httplive
} from './service/request.js'
import Api from 'service/api.js'


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

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
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
