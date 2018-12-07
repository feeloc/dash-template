import axios from '@/libs/api.request'

export const getSomePhotoByBaidu = () => {
  return axios.request({
    url: '/tool/getPhoto',
    method: 'get'
  })
}
