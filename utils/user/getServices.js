import CONFIG from '../../config/config'

const URL_GET_SERVICES = `${CONFIG.URL_BASE}/services/get?userId=`
class Services {
    
  async getServicesResume(userId,token) {
    try {
        const query = await fetch(URL_GET_SERVICES + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
        let responseJson = await query.json()

        
        return [query.status, responseJson]
    } catch (error) {
        console.error(error)
    }
}
    
  }
  
  export default new Services()