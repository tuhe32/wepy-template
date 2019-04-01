import wepy from 'wepy';

export default class Share {

    static drawImage(obj) {
        var that = obj;
        const ctx = wx.createCanvasContext('myCanvas')
        var bgPath = '../assets/images/share.jpg'
        var portraitPath = that.data.portrait_temp
        var hostNickname = that.currentUser.nickName

        var qrPath = that.data.qrcode_temp
        var windowWidth = that.data.windowWidth
        that.setData({
            scale: 1.6
        })
        //绘制背景图片
        ctx.drawImage(bgPath, 0, 0, windowWidth, that.data.scale * windowWidth)

        //绘制头像
        ctx.save()
        ctx.beginPath()
        ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(portraitPath, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth)
        ctx.restore()
        //绘制第一段文本
        ctx.setFillStyle('#ffffff')
        ctx.setFontSize(0.037 * windowWidth)
        ctx.setTextAlign('center')
        ctx.fillText(hostNickname + ' 正在参加疯狂红包活动', windowWidth / 2, 0.52 * windowWidth)
        //绘制第二段文本
        ctx.setFillStyle('#ffffff')
        ctx.setFontSize(0.037 * windowWidth)
        ctx.setTextAlign('center')
        ctx.fillText('邀请你一起来领券抢红包啦~', windowWidth / 2, 0.57 * windowWidth)
        //绘制二维码
        ctx.drawImage(qrPath, 0.64 * windowWidth / 2, 0.75 * windowWidth, 0.36 * windowWidth, 0.36 * windowWidth)
        //绘制第三段文本
        ctx.setFillStyle('#ffffff')
        ctx.setFontSize(0.037 * windowWidth)
        ctx.setTextAlign('center')
        ctx.fillText('长按二维码领红包', windowWidth / 2, 1.36 * windowWidth)
        ctx.draw();
    }
}