import CONFIG from '../../config/config'

const URL_LOGIN = `${CONFIG.URL_BASE}/auth/phone`
const URL_REGISTER = `${CONFIG.URL_BASE}/auth/confirm/send`
const URL_CONFIRM = `${CONFIG.URL_BASE}/auth/confirm?code=`
const URL_UPDATE_USER = `${CONFIG.URL_BASE}/users/update`
//const URL_PASSWORD_RECOVER = `${CONFIG.URL_BASE}:${CONFIG.PORT_LOGIN}/${CONFIG.VERSION_API_EKOSAVE}/leadis/recover-pass`
//const URL_IMAGE =`${CONFIG.URL_BASE}:${CONFIG.PORT_IMAGE}/${CONFIG.VERSION_API_EKOSAVE}/configuration-image/`
import dbAPI from '../db/dbApi'

class apiUserAuth {
    
  async loginUser(phone, password) {
    try {
      const query = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone:phone,
          passwordHash: password,
        
        }
        )
      })
      //console.log(body)
      let responseJson = await query.json()

      return [query.status, responseJson]

    } catch (error) {
      console.error(error)
    }
  }
  async createUser(phone, password, code) {
    var objectToSend = {};
    try {
      if(code){
        objectToSend.codePromotional = code
      }
      objectToSend.phone = phone
      objectToSend.password = password
      
      query = await fetch(URL_REGISTER, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          objectToSend
        )
      })
      //console.log(body)
      let responseJson = await query.json()

      return [query.status, responseJson]

    } catch (error) {
      console.error(error)
    }
  }

  async confirmUser(userId) {
    try {
      const query = await fetch(URL_CONFIRM+'/'+userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      //console.log(body)
      let responseJson = await query.json()

      return [query.status, responseJson]

    } catch (error) {
      console.error(error)
    }
  }
  async confirmUserCode(code) {
    try {
      const query = await fetch(URL_CONFIRM+code, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        
        
      })
      //console.log(body)
      let responseJson = await query.json()

      return [query.status, responseJson]

    } catch (error) {
      console.error(error)
    }
  }

  async updateUser(name, email, city, address, userId) {
    try {
      const query = await fetch(URL_UPDATE_USER, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': await dbAPI.getData("customToken"),
        },
        body: JSON.stringify({
          basicInformation : {
              name:name,
              email : email,
              city: city,
              address: address
          },
          _id: userId
      }
    )
      })
      //console.log(body)
      let responseJson = await query.json()

      return [query.status, responseJson]

    } catch (error) {
      console.error(error)
    }
  }
}

export default new apiUserAuth()