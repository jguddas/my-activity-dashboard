import parseGpx from './parseGpx'

describe('parseGpx basic', () => {
  it('graphhopper track', () => {
    expect(parseGpx(`
<?xml version="1.0" encoding="UTF-8" standalone="no" ?><gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" creator="Graphhopper version 3.0" version="1.1" xmlns:gh="https://graphhopper.com/public/schema/gpx/1.1">
<metadata><copyright author="OpenStreetMap contributors"/><link href="http://graphhopper.com"><text>GraphHopper GPX</text></link><time>2021-04-20T06:41:56Z</time></metadata>
<trk><name>GraphHopper Track</name><trkseg>
<trkpt lat="52.799271" lon="-0.569696"><ele>100.29</ele><time>2021-04-20T06:41:56Z</time></trkpt>
<trkpt lat="52.801438" lon="-0.55554"><ele>84.27</ele></trkpt>
<trkpt lat="52.801637" lon="-0.554866"><ele>84.9</ele></trkpt>
<trkpt lat="52.809516" lon="-0.539389"><ele>74.09</ele></trkpt>
<trkpt lat="52.809529" lon="-0.539011"><ele>74.48</ele></trkpt>
<trkpt lat="52.809406" lon="-0.536734"><ele>77.29</ele></trkpt>
<trkpt lat="52.809409" lon="-0.536477"><ele>77.93</ele></trkpt>
<trkpt lat="52.809507" lon="-0.535704"><ele>77.71</ele></trkpt>
<trkpt lat="52.812222" lon="-0.522587"><ele>59.9</ele></trkpt>
<trkpt lat="52.812215" lon="-0.521841"><ele>62.05</ele></trkpt>
<trkpt lat="52.812178" lon="-0.521034"><ele>64.4</ele></trkpt>
<trkpt lat="52.812111" lon="-0.520337"><ele>68.44</ele></trkpt>
<trkpt lat="52.812041" lon="-0.519857"><ele>69.05</ele><time>2021-04-20T06:44:43Z</time></trkpt>
</trkseg>
</trk>
</gpx>
    `.trim())).toMatchInlineSnapshot(`
      Object {
        "_declaration": Object {
          "_attributes": Object {
            "encoding": "UTF-8",
            "standalone": "no",
            "version": "1.0",
          },
        },
        "gpx": Object {
          "_attributes": Object {
            "creator": "Graphhopper version 3.0",
            "version": "1.1",
            "xmlns": "http://www.topografix.com/GPX/1/1",
            "xmlns:gh": "https://graphhopper.com/public/schema/gpx/1.1",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          },
          "metadata": Object {
            "copyright": Object {
              "_attributes": Object {
                "author": "OpenStreetMap contributors",
              },
            },
            "link": Object {
              "_attributes": Object {
                "href": "http://graphhopper.com",
              },
              "text": Object {
                "_text": "GraphHopper GPX",
              },
            },
            "time": Object {
              "_text": "2021-04-20T06:41:56Z",
            },
          },
          "trk": Object {
            "name": Object {
              "_text": "GraphHopper Track",
            },
            "trkseg": Object {
              "trkpt": Array [
                Object {
                  "_attributes": Object {
                    "lat": "52.799271",
                    "lon": "-0.569696",
                  },
                  "ele": Object {
                    "_text": "100.29",
                  },
                  "time": Object {
                    "_text": "2021-04-20T06:41:56Z",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.801438",
                    "lon": "-0.55554",
                  },
                  "ele": Object {
                    "_text": "84.27",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.801637",
                    "lon": "-0.554866",
                  },
                  "ele": Object {
                    "_text": "84.9",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.809516",
                    "lon": "-0.539389",
                  },
                  "ele": Object {
                    "_text": "74.09",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.809529",
                    "lon": "-0.539011",
                  },
                  "ele": Object {
                    "_text": "74.48",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.809406",
                    "lon": "-0.536734",
                  },
                  "ele": Object {
                    "_text": "77.29",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.809409",
                    "lon": "-0.536477",
                  },
                  "ele": Object {
                    "_text": "77.93",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.809507",
                    "lon": "-0.535704",
                  },
                  "ele": Object {
                    "_text": "77.71",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.812222",
                    "lon": "-0.522587",
                  },
                  "ele": Object {
                    "_text": "59.9",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.812215",
                    "lon": "-0.521841",
                  },
                  "ele": Object {
                    "_text": "62.05",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.812178",
                    "lon": "-0.521034",
                  },
                  "ele": Object {
                    "_text": "64.4",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.812111",
                    "lon": "-0.520337",
                  },
                  "ele": Object {
                    "_text": "68.44",
                  },
                },
                Object {
                  "_attributes": Object {
                    "lat": "52.812041",
                    "lon": "-0.519857",
                  },
                  "ele": Object {
                    "_text": "69.05",
                  },
                  "time": Object {
                    "_text": "2021-04-20T06:44:43Z",
                  },
                },
              ],
            },
          },
        },
      }
    `)
  })
})
