# Live hero geometry audit — 2026-08-27

URL: https://www.active-medical.pp.ua/?hero-fix=e123f589

Overall result: **PASS**

\`json
{
  "pass": true,
  "results": [
    {
      "name": "desktop",
      "viewport": {
        "requestedWidth": 1280,
        "requestedHeight": 900,
        "measuredWidth": 1280,
        "measuredHeight": 900
      },
      "document": {
        "scrollWidth": 1280,
        "overflowX": false
      },
      "asset": {
        "src": "/manus-storage/active-medical-hero-reference-body_fda89e6a.png",
        "naturalWidth": 1536,
        "naturalHeight": 924,
        "expectedRatio": 1.6623376623376624,
        "naturalRatio": 1.6623376623376624,
        "measuredHeroRatio": 1.6623376623376624
      },
      "counts": {
        "primary": 1,
        "secondary": 1
      },
      "rects": {
        "hero": {
          "left": 0,
          "top": 82,
          "right": 1280,
          "bottom": 852,
          "width": 1280,
          "height": 770
        },
        "image": {
          "left": 0,
          "top": 82,
          "right": 1280,
          "bottom": 852,
          "width": 1280,
          "height": 770
        },
        "hotspots": {
          "left": 0,
          "top": 82,
          "right": 1280,
          "bottom": 852,
          "width": 1280,
          "height": 770
        },
        "mask": {
          "left": 0,
          "top": 667.188,
          "right": 652.797,
          "bottom": 851.985,
          "width": 652.797,
          "height": 184.797
        },
        "primary": {
          "left": 51.1875,
          "top": 744.203125,
          "right": 396.78125,
          "bottom": 813.5,
          "width": 345.59375,
          "height": 69.296875
        },
        "secondary": {
          "left": 345.59375,
          "top": 728.8125,
          "right": 627.1875,
          "bottom": 813.5,
          "width": 281.59375,
          "height": 84.6875
        }
      },
      "computed": {
        "heroAspectRatio": "1536 / 924",
        "heroMinHeight": "0px",
        "imageHeight": "770px",
        "maskBackground": "rgb(244, 245, 243)"
      },
      "assertions": {
        "heroMatchesArtworkRatio": true,
        "maskInsideImage": true,
        "primaryInsideImage": true,
        "secondaryInsideImage": true,
        "oneAccessiblePrimary": true,
        "oneAccessibleSecondary": true,
        "noHorizontalOverflow": true
      }
    },
    {
      "name": "mobile",
      "viewport": {
        "requestedWidth": 390,
        "requestedHeight": 844,
        "measuredWidth": 390,
        "measuredHeight": 844
      },
      "document": {
        "scrollWidth": 390,
        "overflowX": false
      },
      "asset": {
        "src": "/manus-storage/active-medical-hero-reference-body_fda89e6a.png",
        "naturalWidth": 1536,
        "naturalHeight": 924,
        "expectedRatio": 1.6623376623376624,
        "naturalRatio": 1.6623376623376624,
        "measuredHeroRatio": 1.6623376623376624
      },
      "counts": {
        "primary": 1,
        "secondary": 1
      },
      "rects": {
        "hero": {
          "left": 0,
          "top": 72,
          "right": 390,
          "bottom": 306.609375,
          "width": 390,
          "height": 234.609375
        },
        "image": {
          "left": 0,
          "top": 72,
          "right": 390,
          "bottom": 306.609375,
          "width": 390,
          "height": 234.609375
        },
        "hotspots": {
          "left": 0,
          "top": 72,
          "right": 390,
          "bottom": 306.609375,
          "width": 390,
          "height": 234.609375
        },
        "mask": {
          "left": 0,
          "top": 250.297,
          "right": 198.891,
          "bottom": 306.5939,
          "width": 198.891,
          "height": 56.2969
        },
        "primary": {
          "left": 15.59375,
          "top": 271.4375,
          "right": 194.984375,
          "bottom": 297.234375,
          "width": 179.390625,
          "height": 25.796875
        },
        "secondary": {
          "left": 195,
          "top": 266.75,
          "right": 351,
          "bottom": 297.234375,
          "width": 156,
          "height": 30.484375
        }
      },
      "computed": {
        "heroAspectRatio": "1536 / 924",
        "heroMinHeight": "0px",
        "imageHeight": "234.609px",
        "maskBackground": "rgb(244, 245, 243)"
      },
      "assertions": {
        "heroMatchesArtworkRatio": true,
        "maskInsideImage": true,
        "primaryInsideImage": true,
        "secondaryInsideImage": true,
        "oneAccessiblePrimary": true,
        "oneAccessibleSecondary": true,
        "noHorizontalOverflow": true
      }
    }
  ]
}
\`
