import axios, { AxiosError } from 'axios'
import { Response, Request } from 'express'

interface FruitInformation{
  genus: string,
  name: string,
  id: number,
  family: string,
  order: string,
  nutritions: FruitNutritions
}

interface FruitNutritions {
  carbohydrates: number,
  protein: number,
  fat: number,
  calories: number,
  sugar: number
}

type FruitNutritionType = 'carbohydrates' | 'protein' | 'fat' | 'calories' | 'sugar'

interface ErrorResponse{
  error: string
}

const connection = axios.create({
  baseURL: 'https://www.fruityvice.com/api/fruit'
})

class FruitController{
  async getFruitsByNutritionValue(request: Request<{nutrition: FruitNutritionType}, any, any, {min: number, max: number}>, response: Response<Array<FruitInformation> | ErrorResponse>){
    try{
      const {nutrition} = request.params
      const {min, max} = request.query
      connection.get<Array<FruitInformation>>(`/${nutrition}?${min ? `min=${min}&` : ''}${max ? `max=${max}` : ''}`)
        .then((res) => {response.status(200).send(res.data)})
        .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }

  async getAllFruits(request: Request, response: Response<Array<FruitInformation> | ErrorResponse>){
    try{
      connection.get<Array<FruitInformation>>('/all')
        .then((res) => {response.status(200).send(res.data)})
        .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }

  async getFruitsByFamily(request: Request<{family: string}>, response: Response<Array<FruitInformation> | ErrorResponse>){
    try{
      const {family} = request.params
      connection.get<Array<FruitInformation>>(`/family/${family ? family : ''}`)
        .then((res) => {response.status(200).send(res.data)})
        .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }

  async getFruitsByGenus(request: Request<{genus: string}>, response: Response<Array<FruitInformation> | ErrorResponse>){
    try{
      const {genus} = request.params
      connection.get<Array<FruitInformation>>(`/genus/${genus ? genus : ''}`)
        .then((res) => {response.status(200).send(res.data)})
        .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }

  async getFruitsByOrder(request: Request<{order: string}>, response: Response<Array<FruitInformation> | ErrorResponse>){
    try{
      const {order} = request.params
      connection.get<Array<FruitInformation>>(`/order/${order ? order : ''}`)
        .then((res) => {response.status(200).send(res.data)})
        .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }

  async addFruit(request: Request<any, any, FruitInformation>, response: Response){
    try{
      const data = request.body
      connection.put('/', data)
      .then((res) => {response.status(201).send({message: 'fruit added', data, res})})
      .catch((error: AxiosError) => {response.status(Number(error.code) || 500).send({error: error.message})})
    }
    catch(exception){
      response.status(500).send()
    }
  }
}

export default FruitController
