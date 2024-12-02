localStorage 存離開瀏覽器還想存在的值
sessionStorage 存重新整理想留的值
global variable 存單頁或 SPA 共用的值
cookie 不要亂存

一個 tab 的生命週期 = sessionStorage 的 "session"

// global.js
export const token = ref(null)

// xxx.vue
import {token} from '@/global.js'

setXXX(token.value); // setter

// ooo.vue
import {token} from '@/global.js';

// 有變化的時候，對 token 做事
watch(token, () =>{
  fn(token.value);
});