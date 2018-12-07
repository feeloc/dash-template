import Base from './base'
import axios from 'axios'

const CONFIG = {
  GET_PHOTO_API: 'http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&ie=utf-8&word={keyword}&rn=60&itg=0&z=0&fr=&width=&height=&lm=-1&ic=0&s=0&st=-1&pn={pageNumber}&gsm=1e0000001e'
}

module.exports = class extends Base {
  async getPhotoAction () {
    const photos = await this.cache('DESKTOP_WALLPAPER') || []

    if (photos.length === 0) {
      const api = CONFIG.GET_PHOTO_API.replace('{keyword}', encodeURIComponent('桌面壁纸1920x1080高清壁纸风景')).replace('{pageNumber}', '0')
      const response = await axios.get(api)
      think.logger.debug(api)

      const images = response.data.imgs
      try {
        const promises = images.map(async img => {
          const url = img.objURL
          const res = await axios.head(url,
            {
              headers: {
                'Referer': 'https://www.github.com/'
              },
              maxRedirects: 0,
              timeout: 1000
            }
          )
          if (res.status === 200 && res.headers['content-type'].match(/image\/*/)) {
            photos.push(url)
          }
        })
        await Promise.all(promises)
      } catch (e) {
        // think.logger.error(e.message)
      }

      await this.cache('DESKTOP_WALLPAPER', photos)
    }

    return this.success({ photos })
  }
}
