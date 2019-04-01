import wepy from 'wepy'
import validate from '../utils/Validate';

export default class baseMixin extends wepy.mixin {
  data = {
    isLoading:false,
    pages:[],
    currentUser:{},//当前用户
    mixin: 'This is base mixin data.'
  }

  computed = {
    now () {
      return +new Date()
    }
  }
  methods = {
    tap () {
      this.mixin = 'base mixin data was changed'
      console.log('base mixin method tap')
    },
  }

  async storageKey(key,value){
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData[key] = value;
  }

  optional(value) {
    return validate.optional(value)
  }
  getCurrentUser(){
    this.currentUser = wepy.getStorageSync("user");
    console.log("baseMixin 获取当前用户",this.currentUser)

  }
  //模型结构拷贝去引用
  modelCopy (data) {
    return JSON.parse(JSON.stringify(data))
  }

  onShow() {
    this.pages = getCurrentPages();
    console.log('base mixin onShow this.pages',this.pages)
  }

  onLoad() {
    console.log('base mixin onLoad')
    this.getCurrentUser();
  }
}
