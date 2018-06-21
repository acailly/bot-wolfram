const request = require('request')
const chalk = require('chalk')

module.exports = function (vorpal) {
  vorpal
    .command('wolfram <input...>')
    .alias('wf')
    .description('Ask Wolfram Alpha')
    .action(function (args, callback) {
      const input = args.input.join(' ')
      const apikey = vorpal.config.wolfram.token

      const requestUrl = `https://api.wolframalpha.com/v2/query?input=${input}&format=plaintext&output=JSON&appid=${apikey}`
      this.log(requestUrl)

      request
        .get(requestUrl, (error, response, body) => {
          if (error) {
            callback(error)
            return error
          }
          body = JSON.parse(body)

          if (!body.queryresult.pods) {
            const message = chalk.red('No result')
            callback(message)
            return message
          }

          const result = body.queryresult.pods.map(item => {
            const title = chalk.yellow(item.title)

            let description
            const subpods = item.subpods
            if (subpods && subpods[0]) {
              description = subpods[0].plaintext
            }

            return `${title}\n ${description}`
          }).join('\n')

          callback(result)
        })
    })
}

/*
{"queryresult" : {
  "success" : true,
  "error" : false,
  "numpods" : 11,
  "datatypes" : "AdministrativeDivision,Airport,City,Country,NuclearReactor",
  "timedout" : "Data,Character",
  "timedoutpods" : "",
  "timing" : 6.333,
  "parsetiming" : 0.133,
  "parsetimedout" : false,
  "recalculate" : "http:\/\/www5a.wolframalpha.com\/api\/v2\/recalc.jsp?id=MSPa20991c8e29b17d67gd11000033de6c463iedd4593436011785288614423&output=JSON",
  "id" : "MSPa21001c8e29b17d67gd1100006460gi7131ge3b11",
  "host" : "http:\/\/www5a.wolframalpha.com",
  "server" : "58",
  "related" : "http:\/\/www5a.wolframalpha.com\/api\/v2\/relatedQueries.jsp?id=MSPa21011c8e29b17d67gd11000063b8fbfgc66g9dge3436011785288614423",
  "version" : "2.6",
  "pods" : [
    {
      "title" : "Input interpretation",
      "scanner" : "Identity",
      "id" : "Input",
      "position" : 100,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "Donnay, Basse?Normandie"
        }
      ]
    },
    {
      "title" : "Population",
      "scanner" : "Data",
      "id" : "Population:CityData",
      "position" : 200,
      "error" : false,
      "numsubpods" : 1,
      "primary" : true,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "city population | 195 people  (2004 estimate)"
        }
      ],
      "states" : [
        {
          "name" : "Show history",
          "input" : "Population:CityData__Show history"
        }
      ]
    },
    {
      "title" : "Location",
      "scanner" : "Data",
      "id" : "Location:CityData",
      "position" : 300,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : ""
        }
      ],
      "states" : [
        {
          "name" : "World map",
          "input" : "Location:CityData__World map"
        },
        {
          "name" : "Show coordinates",
          "input" : "Location:CityData__Show coordinates"
        }
      ],
      "infos" : {
        "links" : {
          "url" : "http:\/\/maps.google.com?ie=UTF8&z=12&t=k&ll=48.95%2C-0.42&q=48.95%20N%2C%200.42%20W",
          "text" : "Satellite image"
        }
      }
    },
    {
      "title" : "Local map",
      "scanner" : "Data",
      "id" : "Map:CityData",
      "position" : 400,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : ""
        }
      ],
      "states" : [
        {
          "count" : 13,
          "value" : "10 kilometers across",
          "delimiters" : "",
          "states" : [
            {
              "name" : "7 kilometers across",
              "input" : "Map:CityData__7 kilometers across"
            },
            {
              "name" : "10 kilometers across",
              "input" : "Map:CityData__10 kilometers across"
            },
            {
              "name" : "30 kilometers across",
              "input" : "Map:CityData__30 kilometers across"
            },
            {
              "name" : "60 kilometers across",
              "input" : "Map:CityData__60 kilometers across"
            },
            {
              "name" : "110 kilometers across",
              "input" : "Map:CityData__110 kilometers across"
            },
            {
              "name" : "220 kilometers across",
              "input" : "Map:CityData__220 kilometers across"
            },
            {
              "name" : "450 kilometers across",
              "input" : "Map:CityData__450 kilometers across"
            },
            {
              "name" : "900 kilometers across",
              "input" : "Map:CityData__900 kilometers across"
            },
            {
              "name" : "1800 kilometers across",
              "input" : "Map:CityData__1800 kilometers across"
            },
            {
              "name" : "3500 kilometers across",
              "input" : "Map:CityData__3500 kilometers across"
            },
            {
              "name" : "6900 kilometers across",
              "input" : "Map:CityData__6900 kilometers across"
            },
            {
              "name" : "11000 kilometers across",
              "input" : "Map:CityData__11000 kilometers across"
            },
            {
              "name" : "22000 kilometers across",
              "input" : "Map:CityData__22000 kilometers across"
            }
          ]
        },
        {
          "name" : "Non?metric",
          "input" : "Map:CityData__Non?metric"
        }
      ],
      "infos" : {
        "links" : {
          "url" : "http:\/\/maps.google.com?ie=UTF8&z=12&t=k&ll=48.95%2C-0.42&q=48.95%20N%2C%200.42%20W",
          "text" : "Satellite image"
        }
      }
    },
    {
      "title" : "Administrative regions",
      "scanner" : "Data",
      "id" : "AdministrativeRegions:CityData",
      "position" : 500,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "region | Basse?Normandie\ncountry | France"
        }
      ]
    },
    {
      "title" : "Current local time",
      "scanner" : "Data",
      "id" : "CurrentTime:CityData",
      "position" : 600,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "2:41 pm CET  |  Tuesday, January 31, 2017"
        }
      ]
    },
    {
      "title" : "Current weather",
      "scanner" : "Data",
      "id" : "WeatherPod:CityData",
      "position" : 700,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "13 �C  |  relative humidity: 94%  |  wind: 4 m\/s  |  rain, fog, overcast"
        }
      ],
      "states" : [
        {
          "name" : "Show history",
          "input" : "WeatherPod:CityData__Show history"
        },
        {
          "name" : "Show non-metric",
          "input" : "WeatherPod:CityData__Show non-metric"
        }
      ]
    },
    {
      "title" : "Nearby cities",
      "scanner" : "Data",
      "id" : "CityHierarchyInfo:CityData",
      "position" : 800,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "Caen, Basse?Normandie | 27 km  (kilometers) north | 111200 people\nLe Havre, Haute?Normandie | 73 km  (kilometers) north?northeast | 186700 people\nParis, Ile?de?France | 203 km  (kilometers) east | 2.234 million people\nLondon, Greater London | 284 km  (kilometers) north | 8.174 million people\n(straight?line distances between city centers)"
        }
      ],
      "states" : [
        {
          "name" : "Show non?metric",
          "input" : "CityHierarchyInfo:CityData__Show non?metric"
        },
        {
          "name" : "More",
          "input" : "CityHierarchyInfo:CityData__More"
        }
      ]
    },
    {
      "title" : "Nearby airport",
      "scanner" : "Data",
      "id" : "AirportHierarchyInfo:CityData",
      "position" : 900,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "Caen-Carpiquet Airport | 25 km  (kilometers) north\n(straight?line distances between city center and airport)"
        }
      ],
      "states" : [
        {
          "name" : "Show non?metric",
          "input" : "AirportHierarchyInfo:CityData__Show non?metric"
        },
        {
          "name" : "More",
          "input" : "AirportHierarchyInfo:CityData__More"
        }
      ]
    },
    {
      "title" : "Geographic properties",
      "scanner" : "Data",
      "id" : "GeographicProperties:CityData",
      "position" : 1000,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "elevation | 197 m"
        }
      ],
      "states" : [
        {
          "name" : "Show non?metric",
          "input" : "GeographicProperties:CityData__Show non?metric"
        }
      ],
      "infos" : {
        "units" : {
          "short" : "m",
          "long" : "meters"
        }
      }
    },
    {
      "title" : "Nearby feature",
      "scanner" : "Data",
      "id" : "FeaturesHierarchyInfo:CityData",
      "position" : 1100,
      "error" : false,
      "numsubpods" : 1,
      "subpods" : [
        {
          "title" : "",
          "plaintext" : "nuclear power site | Flamanville | 125 km  (kilometers) west?northwest\n(straight?line distances between city center and feature coordinates)"
        }
      ],
      "states" : [
        {
          "name" : "Show non?metric",
          "input" : "FeaturesHierarchyInfo:CityData__Show non?metric"
        }
      ]
    }
  ],
  "sources" : [
    {
      "url" : "http:\/\/www.wolframalpha.com\/sources\/CityDataSourceInformationNotes.html",
      "text" : "City data"
    },
    {
      "url" : "http:\/\/www.wolframalpha.com\/sources\/NuclearReactorDataSourceInformationNotes.html",
      "text" : "Nuclear reactor data"
    },
    {
      "url" : "http:\/\/www.wolframalpha.com\/sources\/OpenStreetMapSourceInformationNotes.html",
      "text" : "Open street map"
    },
    {
      "url" : "http:\/\/www.wolframalpha.com\/sources\/USCensusDataSourceInformationNotes.html",
      "text" : "US census data"
    },
    {
      "url" : "http:\/\/www.wolframalpha.com\/sources\/WeatherDataSourceInformationNotes.html",
      "text" : "Weather data"
    }
  ]
}}
 */