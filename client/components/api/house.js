import { _helper } from './_helper'

export const calculateHousePrice = (square, numberOfBedrooms, distance) => {
  return _helper.fetchGET(`/house/square/${square}/bedroom/${numberOfBedrooms}/distance/${distance}`)
    .then(data => data)
}

export const getHouses = () => {
  return _helper.fetchGET(`/houses`).then(data => data)
}

export const addHouse = (square, numberOfBedrooms, distance, price) => {
  return _helper.fetchPOST(`/house/add-training-data`, {
    square, numberOfBedrooms, distance, price
  }).then(data => data)
}