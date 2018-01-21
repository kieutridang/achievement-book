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
              square: Number(element.square),
              numberOfBedrooms: Number(element.numberOfBedrooms),
              distance: Number(element.distance)
            },
            output: {
              price: Number(element.price)
            }
          }
        })
        net.train(trainingData)
        var output = net.run(data);
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