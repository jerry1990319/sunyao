import { notification, Modal } from 'antd';

const Helper = {
  convertCanvasToImage: (canvas) => {
    var imageEle = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL
    const src = canvas.toDataURL("image/png");
    imageEle.src = src;
    return { src, imageEle };
  },
  preloadImage: (img, loadeds) => {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        if (loadeds) loadeds.count += 1;
        resolve();
      }
      image.onerror = (err) => {
        if (loadeds) loadeds.count += 1;
        resolve();
      }
      image.src = img;
    })
  },
  /**
 * @Description: 错误消息反馈
 * @param
 */
  error:(title, content)=>{
    Modal.error({
      title: title,
      content: content,
      okText:'知道了'
    });
  }
}
export default Helper;
