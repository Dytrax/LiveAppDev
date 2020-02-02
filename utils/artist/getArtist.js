import CONFIG from '../../config/config'

const URL_GET_ARTIST = `${CONFIG.URL_BASE}/artists/search?`

const URL_CONTRACT_SERVICE = `${CONFIG.URL_BASE}/payments/create`

class apiArtistInfo {
    async getArtist(category, city,token) {
        try {
            const query = await fetch(URL_GET_ARTIST + `category=${category}&city=${city}`, {
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

    async contractService(serviceDate,expiredDate,hourDate,price,
        category,artistId,userId,service_place,state,token) {
        const prueba = {
          serviceDate: serviceDate,
          expiredDate: expiredDate,
          hourDate: hourDate,
          price: price,
          category: category,
          artistId: artistId,
          userId: userId,
          service_place: service_place,
          state: state
      }
        try {
          const query = await fetch(URL_CONTRACT_SERVICE, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':token,
            },
            body: JSON.stringify(prueba
            )
          })
          console.log(prueba)
          let responseJson = await query.json()
    
          return [query.status, responseJson]
    
        } catch (error) {
          console.error(error)
        }
      }
}

export default new apiArtistInfo()