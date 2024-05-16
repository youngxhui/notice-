export { }
chrome.storage.local.get(['whiteList', 'noticeText'], function(items) {
  const value: string = items["whiteList"];
  const noticeText: string = items["noticeText"];
  const urls: string[] = value.split(";");
  const hostnameList: string[] = urls.map(url => new URL(url).hostname);
  const currentUrl: string = window.location.href;
  const url: URL = new URL(currentUrl); 
  const hostname: string = url.hostname;
  if (hostnameList.includes(hostname)) {
    // 创建canvas元素
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = 200; // 设置画布宽度
    canvas.height = 100; // 设置画布高度（增加高度以适应旋转后的文字）
    // 获取2D上下文
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
      // 绘制背景
      ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 旋转画布上下文
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 4); // 旋转45度

      // 绘制文字
      ctx.font = 'bold 20px Arial'; // 设置字体样式
      ctx.fillStyle = '#000000'; // 设置文字颜色为黑色
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(noticeText, 0, 0);

      
      // 导出图片
      const dataURL: string = canvas.toDataURL('image/png');

      // 创建背景图片元素
      const backgroundImage: HTMLImageElement = new Image();
      backgroundImage.src = dataURL;
      const watermarkDiv: HTMLDivElement = document.createElement('div');
      watermarkDiv.style.position = 'fixed';
      watermarkDiv.style.top = '0';
      watermarkDiv.style.left = '0';
      watermarkDiv.style.opacity = '0.05';
      watermarkDiv.style.width = '100%';
      watermarkDiv.style.height = '100%';
      watermarkDiv.style.zIndex = '9999';
      watermarkDiv.style.pointerEvents = 'none';
      // 设置背景图片样式
      watermarkDiv.style.backgroundImage = `url(${backgroundImage.src})`;
      watermarkDiv.style.backgroundRepeat = 'repeat';
      // 将水印层添加到页面顶层元素
      const topElement: ChildNode | null = document.documentElement.firstChild;
      if (topElement && topElement.parentNode) {
        topElement.parentNode.insertBefore(watermarkDiv, topElement);
      }
    }
  }
});
