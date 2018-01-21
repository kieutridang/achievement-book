const express = require('express')
const mongoose = require('mongoose')
const brain = require('brainjs')
var net = new brain.NeuralNetwork();

mongoose.connect('mongodb://localhost/machine-learing')
var db = mongoose.connection

exports.addData = function(req, res) {
  try {
    debugger
    var data = req.body
    var House = require('../models/house')(db)
    data = new House(data)
    data.save(function(err, data) {
      debugger
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
    House.find(function(err, data) {
      if (err) console.log(err)
      else {
        trainingData = data
        trainingData = trainingData.map((element) => {
          return {
            input: {
              square: Number(element.square)/100,
              numberOfBedrooms: Number(element.numberOfBedrooms)/10,
              distance: Number(element.distance)/100
            },
            output: {
              price: Number(element.price)/1000
            }
          }
        })
        net.train(trainingData)
        var dataTest = {
          square: Number(req.params.square)/100,
          numberOfBedrooms: Number(req.params.numberOfBedrooms)/10,
          distance: Number(req.params.distance)/100
        }
        debugger
        var output = net.run(dataTest);
        res.status(200).send(output).end()
      }
    })
  } catch(ex) {
    res.status(500).send(ex)
  }
}

exports.getHouses = function(req, res) {
  try {
    var House = require('../models/house')(db)
    House.find(function(err, data) {
      if (err) console.log(err)
      else {
        res.status(200).send(data).end()
      }
    })
  } catch(ex) {
    res.status(500).send(ex)
  }
}