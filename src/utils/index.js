// 图片前缀地址
export const ImageUrl = 'https://aicresource.blob.core.chinacloudapi.cn/aicwensli/tagtool-png';
// 图片下载
export async function downAttendanceList(id, single = false) {
  return new Promise(async (resolve, reject) => {
    const downloadDoc = `https://aicresource.blob.core.chinacloudapi.cn/aicwensli/tagtool`;
    let url = `${downloadDoc}/${id}.svg`
    let name = `${id}.svg`
    // 发送http请求，将文件链接转换成文件流
    try {
      const xhr = await fileAjax(url, {
        responseType: 'blob'
      });
      single && downloadFile(xhr.response, name);
      resolve([xhr.response, id])
    } catch (error) {
      reject(error);
    }

  })
}
export function fileAjax(url, options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    if (options.responseType) {
      xhr.responseType = options.responseType
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr)
      }
      if (xhr.readyState === 4 && xhr.status === 500) {
        reject();
      }
    }
    xhr.send();
  })

}

export function downloadFile(content, filename) {
  window.URL = window.URL || window.webkitURL
  let a = document.createElement('a')
  let blob = new Blob([content])
  // 通过二进制文件创建url
  let url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  // 销毁创建的url
  window.URL.revokeObjectURL(url)
}

export async function Download(data) {
  console.log('data2', data)
  var zip = new JSZip();
  var filename = 'wansili' + '.zip';
  const arr = [];

  data.forEach(async function (obj) {
    arr.push(downAttendanceList(obj));
  });
  try {
    const res = await Promise.all(arr);
    res.forEach(row => {
      zip.file(row[1] + '.svg', row[0]);
    })
    zip.generateAsync({
      type: 'blob'
    }).then(function (content) {
      saveAs(content, filename)
    });
  } catch (error) {
    console.log('多个文件下载',error)
  }
}