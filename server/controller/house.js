import express from 'express'
import mongoose from 'mongoose'
import brain from 'brainjs'
var net = new brain.NeuralNetwork();

mongoose.connect('mongodb://localhost/machine-learing')
var db = mongoose.connection

exports.addData = function(req, res) {
  try {
    var data = req.body
    var House = require('../models/house')(db)
    data = new House(data)
    data.save(function(err, data) {
      if (err) console.log(err)
      else {
        House.find({}, function(err,data) {
          console.log(data)
        })
        res.status(200).end()
      }
    })
  } catch (ex) {
    res.status(500).send(ex).end()
  }
}

exports.predictHousePrice = function(req, res) {
  try {
    var data = req.params;
    var House = require('../models/house')(db)
    var trainingData;
    House.find({}, function(err, data) {
      if (err) console.log(err)
      else {
        trainingData = data
      }
    })
    trainingData = trainingData.map((element) => {
      return {
        input: {
          square: element.square,
          numberOfBedrooms: element.numberOfBedrooms,
          distance: element.distance
        },
        output: {
          price: element.price
        }
      }
    })
    net.train(trainingData)
    var output = net.run(data);
    res.status(200).send(output).end()
  } catch(ex) {
    res.status(500).send(ex)
  }
}