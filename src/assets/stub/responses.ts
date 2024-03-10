export const responses: any = {
  'users/get': {
    'data': {
      'user': {
        'intakeData': {
          'tags': {
            'products': [
              'drinks',
              'vegetables',
              'fruits',
              'beer'
            ],
            'dishes': [
              'breakfast',
              'salad',
              'pilav'
            ]
          },
          'energyValue': {
            'calories': 300,
            'proteines': 300,
            'fats': 100,
            'carbohydrates': 50
          },
          'currency': {
            'name': 'Uzbekistan Sum',
            'symbol': 'лв',
            'short_code': 'UZS'
          }
        },
        '_id': '6495366ebb7d346edcd650bf',
        'name': 'joe doe paul6',
        'login': 'joe',
        'createdAt': '2023-06-23T06:06:38.966Z',
        'updatedAt': '2024-03-03T12:38:08.972Z',
        '__v': 0,
        'role': 'admin'
      }
    },
    'status': 200,
    'statusText': 'OK',
    'headers': {
      'content-length': '444',
      'content-type': 'application/json; charset=utf-8'
    },
    'config': {
      'transitional': {
        'silentJSONParsing': true,
        'forcedJSONParsing': true,
        'clarifyTimeoutError': false
      },
      'transformRequest': [
        null
      ],
      'transformResponse': [
        null
      ],
      'timeout': 0,
      'xsrfCookieName': 'XSRF-TOKEN',
      'xsrfHeaderName': 'X-XSRF-TOKEN',
      'maxContentLength': -1,
      'maxBodyLength': -1,
      'env': {
        'FormData': null
      },
      'headers': {
        'Accept': 'application/json, text/plain, */*'
      },
      'withCredentials': true,
      'method': 'get',
      'url': 'http://127.0.0.1:4000/api/users/get'
    },
    'request': {}
  },
  'currency/get_currencies_list': {
    'data': [
      {
        'name': 'UAE Dirham',
        'short_code': 'AED',
        'symbol': 'د.إ'
      },
      {
        'name': 'Afghani',
        'short_code': 'AFN',
        'symbol': '؋'
      },
      {
        'name': 'Lek',
        'short_code': 'ALL',
        'symbol': 'L'
      },
      {
        'name': 'Armenian Dram',
        'short_code': 'AMD',
        'symbol': 'դր.'
      },
      {
        'name': 'Netherlands Antillean Guilder',
        'short_code': 'ANG',
        'symbol': 'ƒ'
      },
      {
        'name': 'Kwanza',
        'short_code': 'AOA',
        'symbol': 'Kz'
      },
      {
        'name': 'Argentine Peso',
        'short_code': 'ARS',
        'symbol': '$'
      },
      {
        'name': 'Australian Dollar',
        'short_code': 'AUD',
        'symbol': '$'
      },
      {
        'name': 'Aruban Florin',
        'short_code': 'AWG',
        'symbol': 'ƒ'
      },
      {
        'name': 'Azerbaijanian Manat',
        'short_code': 'AZN',
        'symbol': '₼'
      },
      {
        'name': 'Convertible Mark',
        'short_code': 'BAM',
        'symbol': 'КМ'
      },
      {
        'name': 'Barbados Dollar',
        'short_code': 'BBD',
        'symbol': '$'
      },
      {
        'name': 'Taka',
        'short_code': 'BDT',
        'symbol': '৳'
      },
      {
        'name': 'Bulgarian Lev',
        'short_code': 'BGN',
        'symbol': 'лв'
      },
      {
        'name': 'Bahraini Dinar',
        'short_code': 'BHD',
        'symbol': 'ب.د'
      },
      {
        'name': 'Burundi Franc',
        'short_code': 'BIF',
        'symbol': 'Fr'
      },
      {
        'name': 'Bermudian Dollar',
        'short_code': 'BMD',
        'symbol': '$'
      },
      {
        'name': 'Brunei Dollar',
        'short_code': 'BND',
        'symbol': '$'
      },
      {
        'name': 'Boliviano',
        'short_code': 'BOB',
        'symbol': 'Bs.'
      },
      {
        'name': 'Mvdol',
        'short_code': 'BOV',
        'symbol': 'Bs.'
      },
      {
        'name': 'Brazilian Real',
        'short_code': 'BRL',
        'symbol': 'R$'
      },
      {
        'name': 'Bahamian Dollar',
        'short_code': 'BSD',
        'symbol': '$'
      },
      {
        'name': 'Ngultrum',
        'short_code': 'BTN',
        'symbol': 'Nu.'
      },
      {
        'name': 'Pula',
        'short_code': 'BWP',
        'symbol': 'P'
      },
      {
        'name': 'Belarussian Ruble',
        'short_code': 'BYN',
        'symbol': 'Br'
      },
      {
        'name': 'Belize Dollar',
        'short_code': 'BZD',
        'symbol': '$'
      },
      {
        'name': 'Canadian Dollar',
        'short_code': 'CAD',
        'symbol': '$'
      },
      {
        'name': 'Congolese Franc',
        'short_code': 'CDF',
        'symbol': 'Fr'
      },
      {
        'name': 'Swiss Franc',
        'short_code': 'CHF',
        'symbol': 'CHF'
      },
      {
        'name': 'Unidades de fomento',
        'short_code': 'CLF',
        'symbol': 'UF'
      },
      {
        'name': 'Chilean Peso',
        'short_code': 'CLP',
        'symbol': '$'
      },
      {
        'name': 'Yuan Renminbi',
        'short_code': 'CNY',
        'symbol': '¥'
      },
      {
        'name': 'Colombian Peso',
        'short_code': 'COP',
        'symbol': '$'
      },
      {
        'name': 'Costa Rican Colon',
        'short_code': 'CRC',
        'symbol': '₡'
      },
      {
        'name': 'Peso Convertible',
        'short_code': 'CUC',
        'symbol': '$'
      },
      {
        'name': 'Cuban Peso',
        'short_code': 'CUP',
        'symbol': '$'
      },
      {
        'name': 'Cape Verde Escudo',
        'short_code': 'CVE',
        'symbol': '$'
      },
      {
        'name': 'Czech Koruna',
        'short_code': 'CZK',
        'symbol': 'Kč'
      },
      {
        'name': 'Djibouti Franc',
        'short_code': 'DJF',
        'symbol': 'Fdj'
      },
      {
        'name': 'Danish Krone',
        'short_code': 'DKK',
        'symbol': 'kr'
      },
      {
        'name': 'Dominican Peso',
        'short_code': 'DOP',
        'symbol': '$'
      },
      {
        'name': 'Algerian Dinar',
        'short_code': 'DZD',
        'symbol': 'د.ج'
      },
      {
        'name': 'Egyptian Pound',
        'short_code': 'EGP',
        'symbol': 'ج.م'
      },
      {
        'name': 'Nakfa',
        'short_code': 'ERN',
        'symbol': 'Nfk'
      },
      {
        'name': 'Ethiopian Birr',
        'short_code': 'ETB',
        'symbol': 'Br'
      },
      {
        'name': 'Euro',
        'short_code': 'EUR',
        'symbol': '€'
      },
      {
        'name': 'Fiji Dollar',
        'short_code': 'FJD',
        'symbol': '$'
      },
      {
        'name': 'Falkland Islands Pound',
        'short_code': 'FKP',
        'symbol': '£'
      },
      {
        'name': 'Pound Sterling',
        'short_code': 'GBP',
        'symbol': '£'
      },
      {
        'name': 'Lari',
        'short_code': 'GEL',
        'symbol': 'ლ'
      },
      {
        'name': 'Ghana Cedi',
        'short_code': 'GHS',
        'symbol': '₵'
      },
      {
        'name': 'Gibraltar Pound',
        'short_code': 'GIP',
        'symbol': '£'
      },
      {
        'name': 'Dalasi',
        'short_code': 'GMD',
        'symbol': 'D'
      },
      {
        'name': 'Guinea Franc',
        'short_code': 'GNF',
        'symbol': 'Fr'
      },
      {
        'name': 'Quetzal',
        'short_code': 'GTQ',
        'symbol': 'Q'
      },
      {
        'name': 'Guyana Dollar',
        'short_code': 'GYD',
        'symbol': '$'
      },
      {
        'name': 'Hong Kong Dollar',
        'short_code': 'HKD',
        'symbol': '$'
      },
      {
        'name': 'Lempira',
        'short_code': 'HNL',
        'symbol': 'L'
      },
      {
        'name': 'Croatian Kuna',
        'short_code': 'HRK',
        'symbol': 'kn'
      },
      {
        'name': 'Gourde',
        'short_code': 'HTG',
        'symbol': 'G'
      },
      {
        'name': 'Forint',
        'short_code': 'HUF',
        'symbol': 'Ft'
      },
      {
        'name': 'Rupiah',
        'short_code': 'IDR',
        'symbol': 'Rp'
      },
      {
        'name': 'New Israeli Sheqel',
        'short_code': 'ILS',
        'symbol': '₪'
      },
      {
        'name': 'Indian Rupee',
        'short_code': 'INR',
        'symbol': '₹'
      },
      {
        'name': 'Iraqi Dinar',
        'short_code': 'IQD',
        'symbol': 'ع.د'
      },
      {
        'name': 'Iranian Rial',
        'short_code': 'IRR',
        'symbol': '﷼'
      },
      {
        'name': 'Iceland Krona',
        'short_code': 'ISK',
        'symbol': 'kr'
      },
      {
        'name': 'Jamaican Dollar',
        'short_code': 'JMD',
        'symbol': '$'
      },
      {
        'name': 'Jordanian Dinar',
        'short_code': 'JOD',
        'symbol': 'د.ا'
      },
      {
        'name': 'Yen',
        'short_code': 'JPY',
        'symbol': '¥'
      },
      {
        'name': 'Kenyan Shilling',
        'short_code': 'KES',
        'symbol': 'KSh'
      },
      {
        'name': 'Som',
        'short_code': 'KGS',
        'symbol': 'som'
      },
      {
        'name': 'Riel',
        'short_code': 'KHR',
        'symbol': '៛'
      },
      {
        'name': 'Comoro Franc',
        'short_code': 'KMF',
        'symbol': 'Fr'
      },
      {
        'name': 'North Korean Won',
        'short_code': 'KPW',
        'symbol': '₩'
      },
      {
        'name': 'Won',
        'short_code': 'KRW',
        'symbol': '₩'
      },
      {
        'name': 'Kuwaiti Dinar',
        'short_code': 'KWD',
        'symbol': 'د.ك'
      },
      {
        'name': 'Cayman Islands Dollar',
        'short_code': 'KYD',
        'symbol': '$'
      },
      {
        'name': 'Tenge',
        'short_code': 'KZT',
        'symbol': '〒'
      },
      {
        'name': 'Kip',
        'short_code': 'LAK',
        'symbol': '₭'
      },
      {
        'name': 'Lebanese Pound',
        'short_code': 'LBP',
        'symbol': 'ل.ل'
      },
      {
        'name': 'Sri Lanka Rupee',
        'short_code': 'LKR',
        'symbol': '₨'
      },
      {
        'name': 'Liberian Dollar',
        'short_code': 'LRD',
        'symbol': '$'
      },
      {
        'name': 'Loti',
        'short_code': 'LSL',
        'symbol': 'L'
      },
      {
        'name': 'Lithuanian Litas',
        'short_code': 'LTL',
        'symbol': 'Lt'
      },
      {
        'name': 'Latvian Lats',
        'short_code': 'LVL',
        'symbol': 'Ls'
      },
      {
        'name': 'Libyan Dinar',
        'short_code': 'LYD',
        'symbol': 'ل.د'
      },
      {
        'name': 'Moroccan Dirham',
        'short_code': 'MAD',
        'symbol': 'د.م.'
      },
      {
        'name': 'Moldovan Leu',
        'short_code': 'MDL',
        'symbol': 'L'
      },
      {
        'name': 'Malagasy Ariary',
        'short_code': 'MGA',
        'symbol': 'Ar'
      },
      {
        'name': 'Denar',
        'short_code': 'MKD',
        'symbol': 'ден'
      },
      {
        'name': 'Kyat',
        'short_code': 'MMK',
        'symbol': 'K'
      },
      {
        'name': 'Tugrik',
        'short_code': 'MNT',
        'symbol': '₮'
      },
      {
        'name': 'Pataca',
        'short_code': 'MOP',
        'symbol': 'P'
      },
      {
        'name': 'Ouguiya',
        'short_code': 'MRO',
        'symbol': 'UM'
      },
      {
        'name': 'Mauritius Rupee',
        'short_code': 'MUR',
        'symbol': '₨'
      },
      {
        'name': 'Rufiyaa',
        'short_code': 'MVR',
        'symbol': 'MVR'
      },
      {
        'name': 'Kwacha',
        'short_code': 'MWK',
        'symbol': 'MK'
      },
      {
        'name': 'Mexican Peso',
        'short_code': 'MXN',
        'symbol': '$'
      },
      {
        'name': 'Malaysian Ringgit',
        'short_code': 'MYR',
        'symbol': 'RM'
      },
      {
        'name': 'Mozambique Metical',
        'short_code': 'MZN',
        'symbol': 'MTn'
      },
      {
        'name': 'Namibia Dollar',
        'short_code': 'NAD',
        'symbol': '$'
      },
      {
        'name': 'Naira',
        'short_code': 'NGN',
        'symbol': '₦'
      },
      {
        'name': 'Cordoba Oro',
        'short_code': 'NIO',
        'symbol': 'C$'
      },
      {
        'name': 'Norwegian Krone',
        'short_code': 'NOK',
        'symbol': 'kr'
      },
      {
        'name': 'Nepalese Rupee',
        'short_code': 'NPR',
        'symbol': '₨'
      },
      {
        'name': 'New Zealand Dollar',
        'short_code': 'NZD',
        'symbol': '$'
      },
      {
        'name': 'Rial Omani',
        'short_code': 'OMR',
        'symbol': 'ر.ع.'
      },
      {
        'name': 'Balboa',
        'short_code': 'PAB',
        'symbol': 'B/.'
      },
      {
        'name': 'Sol',
        'short_code': 'PEN',
        'symbol': 'S/'
      },
      {
        'name': 'Kina',
        'short_code': 'PGK',
        'symbol': 'K'
      },
      {
        'name': 'Philippine Peso',
        'short_code': 'PHP',
        'symbol': '₱'
      },
      {
        'name': 'Pakistan Rupee',
        'short_code': 'PKR',
        'symbol': '₨'
      },
      {
        'name': 'Zloty',
        'short_code': 'PLN',
        'symbol': 'zł'
      },
      {
        'name': 'Guarani',
        'short_code': 'PYG',
        'symbol': '₲'
      },
      {
        'name': 'Qatari Rial',
        'short_code': 'QAR',
        'symbol': 'ر.ق'
      },
      {
        'name': 'New Romanian Leu',
        'short_code': 'RON',
        'symbol': 'Lei'
      },
      {
        'name': 'Serbian Dinar',
        'short_code': 'RSD',
        'symbol': 'РСД'
      },
      {
        'name': 'Russian Ruble',
        'short_code': 'RUB',
        'symbol': '₽'
      },
      {
        'name': 'Rwanda Franc',
        'short_code': 'RWF',
        'symbol': 'FRw'
      },
      {
        'name': 'Saudi Riyal',
        'short_code': 'SAR',
        'symbol': 'ر.س'
      },
      {
        'name': 'Solomon Islands Dollar',
        'short_code': 'SBD',
        'symbol': '$'
      },
      {
        'name': 'Seychelles Rupee',
        'short_code': 'SCR',
        'symbol': '₨'
      },
      {
        'name': 'Sudanese Pound',
        'short_code': 'SDG',
        'symbol': '£'
      },
      {
        'name': 'Swedish Krona',
        'short_code': 'SEK',
        'symbol': 'kr'
      },
      {
        'name': 'Singapore Dollar',
        'short_code': 'SGD',
        'symbol': '$'
      },
      {
        'name': 'Saint Helena Pound',
        'short_code': 'SHP',
        'symbol': '£'
      },
      {
        'name': 'Leone',
        'short_code': 'SLL',
        'symbol': 'Le'
      },
      {
        'name': 'Somali Shilling',
        'short_code': 'SOS',
        'symbol': 'Sh'
      },
      {
        'name': 'Surinam Dollar',
        'short_code': 'SRD',
        'symbol': '$'
      },
      {
        'name': 'South Sudanese Pound',
        'short_code': 'SSP',
        'symbol': '£'
      },
      {
        'name': 'Dobra',
        'short_code': 'STD',
        'symbol': 'Db'
      },
      {
        'name': 'El Salvador Colon',
        'short_code': 'SVC',
        'symbol': '₡'
      },
      {
        'name': 'Syrian Pound',
        'short_code': 'SYP',
        'symbol': '£S'
      },
      {
        'name': 'Lilangeni',
        'short_code': 'SZL',
        'symbol': 'E'
      },
      {
        'name': 'Baht',
        'short_code': 'THB',
        'symbol': '฿'
      },
      {
        'name': 'Somoni',
        'short_code': 'TJS',
        'symbol': 'ЅМ'
      },
      {
        'name': 'Turkmenistan New Manat',
        'short_code': 'TMT',
        'symbol': 'T'
      },
      {
        'name': 'Tunisian Dinar',
        'short_code': 'TND',
        'symbol': 'د.ت'
      },
      {
        'name': 'Pa’anga',
        'short_code': 'TOP',
        'symbol': 'T$'
      },
      {
        'name': 'Turkish Lira',
        'short_code': 'TRY',
        'symbol': '₺'
      },
      {
        'name': 'Trinidad and Tobago Dollar',
        'short_code': 'TTD',
        'symbol': '$'
      },
      {
        'name': 'New Taiwan Dollar',
        'short_code': 'TWD',
        'symbol': '$'
      },
      {
        'name': 'Tanzanian Shilling',
        'short_code': 'TZS',
        'symbol': 'Sh'
      },
      {
        'name': 'Hryvnia',
        'short_code': 'UAH',
        'symbol': '₴'
      },
      {
        'name': 'Uganda Shilling',
        'short_code': 'UGX',
        'symbol': 'USh'
      },
      {
        'name': 'US Dollar',
        'short_code': 'USD',
        'symbol': '$'
      },
      {
        'name': 'Peso Uruguayo',
        'short_code': 'UYU',
        'symbol': '$'
      },
      {
        'name': 'Uzbekistan Sum',
        'short_code': 'UZS',
        'symbol': 'лв'
      },
      {
        'name': 'Bolivar',
        'short_code': 'VEF',
        'symbol': 'Bs F'
      },
      {
        'name': 'Dong',
        'short_code': 'VND',
        'symbol': '₫'
      },
      {
        'name': 'Vatu',
        'short_code': 'VUV',
        'symbol': 'Vt'
      },
      {
        'name': 'Tala',
        'short_code': 'WST',
        'symbol': 'T'
      },
      {
        'name': 'CFA Franc BEAC',
        'short_code': 'XAF',
        'symbol': 'Fr'
      },
      {
        'name': 'East Caribbean Dollar',
        'short_code': 'XCD',
        'symbol': '$'
      },
      {
        'name': 'CFA Franc BCEAO',
        'short_code': 'XOF',
        'symbol': 'Fr'
      },
      {
        'name': 'CFP Franc',
        'short_code': 'XPF',
        'symbol': 'Fr'
      },
      {
        'name': 'Yemeni Rial',
        'short_code': 'YER',
        'symbol': '﷼'
      },
      {
        'name': 'Rand',
        'short_code': 'ZAR',
        'symbol': 'R'
      },
      {
        'name': 'Zambian Kwacha',
        'short_code': 'ZMW',
        'symbol': 'ZK'
      },
      {
        'name': 'Zimbabwe Dollar',
        'short_code': 'ZWL',
        'symbol': '$'
      }
    ],
    'status': 200,
    'statusText': 'OK',
    'headers': {
      'content-length': '9209',
      'content-type': 'application/json; charset=utf-8'
    },
    'config': {
      'transitional': {
        'silentJSONParsing': true,
        'forcedJSONParsing': true,
        'clarifyTimeoutError': false
      },
      'transformRequest': [
        null
      ],
      'transformResponse': [
        null
      ],
      'timeout': 0,
      'xsrfCookieName': 'XSRF-TOKEN',
      'xsrfHeaderName': 'X-XSRF-TOKEN',
      'maxContentLength': -1,
      'maxBodyLength': -1,
      'env': {
        'FormData': null
      },
      'headers': {
        'Accept': 'application/json, text/plain, */*'
      },
      'withCredentials': true,
      'method': 'get',
      'url': 'http://127.0.0.1:4000/api/currency/get_currencies_list'
    },
    'request': {}
  },
  'currency/get_exchange_rate?from=UZS&to=USD': {'data':
        {'timestamp':1710036695,'date':'2024-03-09','from':'UZS','to':'USD','amount':1,'value':0.00007998},'status':200,'statusText':'OK','headers':{'content-length':'98','content-type':'application/json; charset=utf-8'},'config':{'transitional':{'silentJSONParsing':true,'forcedJSONParsing':true,'clarifyTimeoutError':false},'transformRequest':[null],'transformResponse':[null],'timeout':0,'xsrfCookieName':'XSRF-TOKEN','xsrfHeaderName':'X-XSRF-TOKEN','maxContentLength':-1,'maxBodyLength':-1,'env':{'FormData':null},'headers':{'Accept':'application/json, text/plain, */*'},'withCredentials':true,'method':'get','url':'http://127.0.0.1:4000/api/currency/get_exchange_rate?from=UZS&to=USD'},'request':{}},
  'products/get_all': {
    'data': [
      {
        'energyValueForOneItem': {
          'calories': 157,
          'proteines': 12.7,
          'fats': 11.5,
          'carbohydrates': 0.7
        },
        '_id': '6583cfc326432446bb8141b7',
        'name': 'Яйца 15шт',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1,
        'isThatPieceItem': true,
        'amount': 15,
        'priceForAllItems': 60000,
        '__v': 0,
        'weightForAllItems': 750,
        'tags': [],
        'updatedAt': '2024-03-03T15:20:37.112Z'
      },
      {
        'energyValue': {
          'calories': 230,
          'proteines': 5.9,
          'fats': 0.9,
          'carbohydrates': 47.9
        },
        '_id': '6583d1b526432446bb8141c7',
        'name': 'Хлеб черный',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1,
        'weight': 500,
        'price': 500,
        'isThatPieceItem': false,
        '__v': 0,
        'tags': [],
        'updatedAt': '2024-03-03T15:50:11.160Z'
      },
      {
        'energyValue': {
          'calories': 478,
          'proteines': 11,
          'fats': 8,
          'carbohydrates': 70
        },
        'tags': [],
        '_id': '6583d26e26432446bb8141cc',
        'name': 'Овсянка сухая вьетнамская',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1.5,
        'weight': 500,
        'price': 300,
        'isThatPieceItem': false,
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 70,
          'proteines': 2.9,
          'fats': 3.2,
          'carbohydrates': 7.4
        },
        'tags': [],
        '_id': '6592b8a5f4fd3c8d33e1777c',
        'name': 'Молоко вьетнамское true milk белое',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1,
        'weight': 1000,
        'price': 160,
        'isThatPieceItem': false,
        'priceForAllItems': 0,
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 47,
          'proteines': 0.4,
          'fats': 0.4,
          'carbohydrates': 9.8
        },
        '_id': '65a73d7d8ef4eafff622e5ce',
        'name': 'Яблоко вьетнамское дорогое',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1,
        'weight': 1000,
        'price': 200,
        'isThatPieceItem': false,
        'priceForAllItems': 0,
        '__v': 0,
        'tags': [
          'fruits',
          'vegetables'
        ],
        'updatedAt': '2024-02-26T05:23:22.346Z'
      },
      {
        'energyValue': {
          'calories': 228,
          'proteines': 12,
          'fats': 20,
          'carbohydrates': 0
        },
        '_id': '65a746ab8ef4eafff622e63f',
        'name': 'Колбаса докторская',
        'type': 'PRODUCT',
        'description': 'тест',
        'cookingCoefficient': 1,
        'weight': 500,
        'price': 500,
        'isThatPieceItem': false,
        'priceForAllItems': 0,
        '__v': 0,
        'tags': [],
        'updatedAt': '2024-03-03T15:52:42.784Z'
      }
    ],
    'status': 200,
    'statusText': 'OK',
    'headers': {
      'content-length': '2038',
      'content-type': 'application/json; charset=utf-8'
    },
    'config': {
      'transitional': {
        'silentJSONParsing': true,
        'forcedJSONParsing': true,
        'clarifyTimeoutError': false
      },
      'transformRequest': [
        null
      ],
      'transformResponse': [
        null
      ],
      'timeout': 0,
      'xsrfCookieName': 'XSRF-TOKEN',
      'xsrfHeaderName': 'X-XSRF-TOKEN',
      'maxContentLength': -1,
      'maxBodyLength': -1,
      'env': {
        'FormData': null
      },
      'headers': {
        'Accept': 'application/json, text/plain, */*'
      },
      'withCredentials': true,
      'method': 'get',
      'url': 'http://127.0.0.1:4000/api/products/get_all'
    },
    'request': {}
  },
  'dishes/get_all': {
    'data': [
      {
        'energyValue': {
          'calories': 688,
          'proteines': 23.8,
          'fats': 21.8,
          'carbohydrates': 95.8
        },
        '_id': '65e1cb3dc4999f9f631da59f',
        'name': 'бутер',
        'type': 'DISH',
        'description': 'тест',
        'ingridients': [
          {
            'energyValue': {
              'calories': 460,
              'proteines': 11.8,
              'fats': 1.8,
              'carbohydrates': 95.8
            },
            'ingridient': {
              'energyValue': {
                'calories': 230,
                'proteines': 5.9,
                'fats': 0.9,
                'carbohydrates': 47.9
              },
              '_id': '6583d1b526432446bb8141c7',
              'name': 'Хлеб черный',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'weight': 500,
              'price': 500,
              'isThatPieceItem': false,
              '__v': 0,
              'tags': [],
              'updatedAt': '2024-03-03T15:50:11.160Z'
            },
            'type': 'PRODUCT',
            'weight': 200,
            'price': 200,
            '_id': '65e1cb3dc4999f9f631da5a0'
          },
          {
            'energyValue': {
              'calories': 228,
              'proteines': 12,
              'fats': 20,
              'carbohydrates': 0
            },
            'ingridient': {
              'energyValue': {
                'calories': 228,
                'proteines': 12,
                'fats': 20,
                'carbohydrates': 0
              },
              '_id': '65a746ab8ef4eafff622e63f',
              'name': 'Колбаса докторская',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'weight': 500,
              'price': 500,
              'isThatPieceItem': false,
              'priceForAllItems': 0,
              '__v': 0,
              'tags': [],
              'updatedAt': '2024-03-03T15:52:42.784Z'
            },
            'type': 'PRODUCT',
            'weight': 100,
            'price': 100,
            '_id': '65e1cb3dc4999f9f631da5a1'
          }
        ],
        'weight': 300,
        'price': 300,
        'tags': [
          'breakfast'
        ],
        'createdAt': '2024-03-01T12:34:05.127Z',
        'updatedAt': '2024-03-03T16:47:02.294Z',
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 1470,
          'proteines': 48.4,
          'fats': 44.4,
          'carbohydrates': 211.2
        },
        '_id': '65e1cb92c4999f9f631da5b8',
        'name': 'бутер с яблоком',
        'type': 'DISH',
        'description': 'тест',
        'ingridients': [
          {
            'energyValue': {
              'calories': 94,
              'proteines': 0.8,
              'fats': 0.8,
              'carbohydrates': 19.6
            },
            'ingridient': {
              'energyValue': {
                'calories': 47,
                'proteines': 0.4,
                'fats': 0.4,
                'carbohydrates': 9.8
              },
              '_id': '65a73d7d8ef4eafff622e5ce',
              'name': 'Яблоко вьетнамское дорогое',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'weight': 1000,
              'price': 200,
              'isThatPieceItem': false,
              'priceForAllItems': 0,
              '__v': 0,
              'tags': [
                'fruits',
                'vegetables'
              ],
              'updatedAt': '2024-02-26T05:23:22.346Z'
            },
            'type': 'PRODUCT',
            'weight': 200,
            'price': 40,
            '_id': '65e1cb92c4999f9f631da5b9'
          },
          {
            'energyValue': {
              'calories': 1376,
              'proteines': 47.6,
              'fats': 43.6,
              'carbohydrates': 191.6
            },
            'ingridient': {
              'energyValue': {
                'calories': 688,
                'proteines': 23.8,
                'fats': 21.8,
                'carbohydrates': 95.8
              },
              '_id': '65e1cb3dc4999f9f631da59f',
              'name': 'бутер',
              'type': 'DISH',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'ingridients': [
                {
                  'energyValue': {
                    'calories': 460,
                    'proteines': 11.8,
                    'fats': 1.8,
                    'carbohydrates': 95.8
                  },
                  'ingridient': '6583d1b526432446bb8141c7',
                  'type': 'PRODUCT',
                  'weight': 200,
                  'price': 200,
                  '_id': '65e1cb3dc4999f9f631da5a0'
                },
                {
                  'energyValue': {
                    'calories': 228,
                    'proteines': 12,
                    'fats': 20,
                    'carbohydrates': 0
                  },
                  'ingridient': '65a746ab8ef4eafff622e63f',
                  'type': 'PRODUCT',
                  'weight': 100,
                  'price': 100,
                  '_id': '65e1cb3dc4999f9f631da5a1'
                }
              ],
              'weight': 300,
              'price': 300,
              'tags': [
                'breakfast'
              ],
              'createdAt': '2024-03-01T12:34:05.127Z',
              'updatedAt': '2024-03-03T16:47:02.294Z',
              '__v': 0
            },
            'type': 'DISH',
            'weight': 200,
            'price': 56.53,
            '_id': '65e1cb92c4999f9f631da5ba'
          }
        ],
        'weight': 400,
        'price': 96.53,
        'tags': [
          'breakfast'
        ],
        'createdAt': '2024-03-01T12:35:30.727Z',
        'updatedAt': '2024-03-01T12:35:30.727Z',
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 1002,
          'proteines': 49.2,
          'fats': 44.8,
          'carbohydrates': 97.2
        },
        '_id': '65e48ee685c1c118165a0558',
        'name': 'завтрак с яйцами',
        'type': 'DISH',
        'description': 'тест',
        'ingridients': [
          {
            'energyValue': {
              'calories': 314,
              'proteines': 25.4,
              'fats': 23,
              'carbohydrates': 1.4
            },
            'ingridient': {
              'energyValueForOneItem': {
                'calories': 157,
                'proteines': 12.7,
                'fats': 11.5,
                'carbohydrates': 0.7
              },
              '_id': '6583cfc326432446bb8141b7',
              'name': 'Яйца 15шт',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'isThatPieceItem': true,
              'amount': 15,
              'priceForAllItems': 60000,
              '__v': 0,
              'weightForAllItems': 750,
              'tags': [],
              'updatedAt': '2024-03-03T15:20:37.112Z'
            },
            'type': 'PRODUCT',
            'amount': 2,
            'weightForTakenAmount': 100,
            'price': 8000,
            '_id': '65e48ee685c1c118165a0559'
          },
          {
            'energyValue': {
              'calories': 688,
              'proteines': 23.8,
              'fats': 21.8,
              'carbohydrates': 95.8
            },
            'ingridient': {
              'energyValue': {
                'calories': 688,
                'proteines': 23.8,
                'fats': 21.8,
                'carbohydrates': 95.8
              },
              '_id': '65e1cb3dc4999f9f631da59f',
              'name': 'бутер',
              'type': 'DISH',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'ingridients': [
                {
                  'energyValue': {
                    'calories': 460,
                    'proteines': 11.8,
                    'fats': 1.8,
                    'carbohydrates': 95.8
                  },
                  'ingridient': '6583d1b526432446bb8141c7',
                  'type': 'PRODUCT',
                  'weight': 200,
                  'price': 200,
                  '_id': '65e1cb3dc4999f9f631da5a0'
                },
                {
                  'energyValue': {
                    'calories': 228,
                    'proteines': 12,
                    'fats': 20,
                    'carbohydrates': 0
                  },
                  'ingridient': '65a746ab8ef4eafff622e63f',
                  'type': 'PRODUCT',
                  'weight': 100,
                  'price': 100,
                  '_id': '65e1cb3dc4999f9f631da5a1'
                }
              ],
              'weight': 300,
              'price': 300,
              'tags': [
                'breakfast'
              ],
              'createdAt': '2024-03-01T12:34:05.127Z',
              'updatedAt': '2024-03-03T16:47:02.294Z',
              '__v': 0
            },
            'type': 'DISH',
            'weight': 100,
            'price': 100,
            '_id': '65e48ee685c1c118165a055a'
          }
        ],
        'weight': 200,
        'price': 8100,
        'tags': [],
        'createdAt': '2024-03-03T14:53:26.102Z',
        'updatedAt': '2024-03-03T16:47:50.716Z',
        '__v': 0
      }
    ],
    'status': 200,
    'statusText': 'OK',
    'headers': {
      'content-length': '5074',
      'content-type': 'application/json; charset=utf-8'
    },
    'config': {
      'transitional': {
        'silentJSONParsing': true,
        'forcedJSONParsing': true,
        'clarifyTimeoutError': false
      },
      'transformRequest': [
        null
      ],
      'transformResponse': [
        null
      ],
      'timeout': 0,
      'xsrfCookieName': 'XSRF-TOKEN',
      'xsrfHeaderName': 'X-XSRF-TOKEN',
      'maxContentLength': -1,
      'maxBodyLength': -1,
      'env': {
        'FormData': null
      },
      'headers': {
        'Accept': 'application/json, text/plain, */*'
      },
      'withCredentials': true,
      'method': 'get',
      'url': 'http://127.0.0.1:4000/api/dishes/get_all'
    },
    'request': {}
  },
  'meals/get_all': {
    'data': [
      {
        'energyValue': {
          'calories': 2000,
          'proteines': 100,
          'fats': 45677,
          'carbohydrates': 50
        },
        '_id': '64d07dab62490c62f1d3af81',
        'name': 'meal 1',
        'type': 'MEAL',
        'description': 'description',
        'dateString': '7.8.2023',
        'ingridients': [
          {
            'energyValue': {
              'calories': 100,
              'proteines': 100,
              'fats': 10,
              'carbohydrates': 100
            },
            'ingridient': null,
            'type': 'PRODUCT',
            'price': 11,
            '_id': '64d07dab62490c62f1d3af82',
            'amount': 2
          },
          {
            'energyValue': {
              'calories': 100,
              'proteines': 100,
              'fats': 10,
              'carbohydrates': 100
            },
            'ingridient': null,
            'type': 'PRODUCT',
            'weight': 12,
            'price': 12,
            '_id': '64d07dab62490c62f1d3af83'
          },
          {
            'energyValue': {
              'calories': 100,
              'proteines': 100,
              'fats': 10,
              'carbohydrates': 100
            },
            'ingridient': null,
            'type': 'DISH',
            'weight': 13,
            'price': 13,
            '_id': '64d07dab62490c62f1d3af84'
          },
          {
            'energyValue': {
              'calories': 100,
              'proteines': 100,
              'fats': 10,
              'carbohydrates': 100
            },
            'ingridient': null,
            'type': 'DISH',
            'price': 14,
            '_id': '64d07dab62490c62f1d3af85',
            'amount': 3
          }
        ],
        'weight': 1666,
        'price': 16666,
        'createdAt': '2023-08-07T05:14:19.100Z',
        'updatedAt': '2023-08-07T05:14:19.100Z',
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 3254,
          'proteines': 122.19999999999999,
          'fats': 111.8,
          'carbohydrates': 423.79999999999995
        },
        '_id': '65e1f722c4999f9f631da611',
        'name': 'Завтрак',
        'type': 'MEAL',
        'description': 'тест',
        'ingridients': [
          {
            'energyValue': {
              'calories': 314,
              'proteines': 25.4,
              'fats': 23,
              'carbohydrates': 1.4
            },
            'ingridient': {
              'energyValueForOneItem': {
                'calories': 157,
                'proteines': 12.7,
                'fats': 11.5,
                'carbohydrates': 0.7
              },
              '_id': '6583cfc326432446bb8141b7',
              'name': 'Яйца 15шт',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'isThatPieceItem': true,
              'amount': 15,
              'priceForAllItems': 60000,
              '__v': 0,
              'weightForAllItems': 750,
              'tags': [],
              'updatedAt': '2024-03-03T15:20:37.112Z'
            },
            'type': 'PRODUCT',
            'amount': 2,
            'price': 26,
            'weightForTakenAmount': 120,
            '_id': '65e1f722c4999f9f631da612'
          },
          {
            'energyValue': {
              'calories': 2940,
              'proteines': 96.8,
              'fats': 88.8,
              'carbohydrates': 422.4
            },
            'ingridient': {
              'energyValue': {
                'calories': 1470,
                'proteines': 48.4,
                'fats': 44.4,
                'carbohydrates': 211.2
              },
              '_id': '65e1cb92c4999f9f631da5b8',
              'name': 'бутер с яблоком',
              'type': 'DISH',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'ingridients': [
                {
                  'energyValue': {
                    'calories': 94,
                    'proteines': 0.8,
                    'fats': 0.8,
                    'carbohydrates': 19.6
                  },
                  'ingridient': '65a73d7d8ef4eafff622e5ce',
                  'type': 'PRODUCT',
                  'weight': 200,
                  'price': 40,
                  '_id': '65e1cb92c4999f9f631da5b9'
                },
                {
                  'energyValue': {
                    'calories': 1376,
                    'proteines': 47.6,
                    'fats': 43.6,
                    'carbohydrates': 191.6
                  },
                  'ingridient': '65e1cb3dc4999f9f631da59f',
                  'type': 'DISH',
                  'weight': 200,
                  'price': 56.53,
                  '_id': '65e1cb92c4999f9f631da5ba'
                }
              ],
              'weight': 400,
              'price': 96.53,
              'tags': [
                'breakfast'
              ],
              'createdAt': '2024-03-01T12:35:30.727Z',
              'updatedAt': '2024-03-01T12:35:30.727Z',
              '__v': 0
            },
            'type': 'DISH',
            'weight': 200,
            'price': 48.27,
            '_id': '65e1f722c4999f9f631da613'
          }
        ],
        'weight': 320,
        'price': 74.27000000000001,
        'createdAt': '2024-03-01T15:41:22.213Z',
        'updatedAt': '2024-03-01T15:41:22.213Z',
        '__v': 0
      },
      {
        'energyValue': {
          'calories': 1690,
          'proteines': 73,
          'fats': 66.6,
          'carbohydrates': 193
        },
        '_id': '65e46fa685c1c118165a0448',
        'name': 'завтрак 2',
        'type': 'MEAL',
        'description': 'тест',
        'ingridients': [
          {
            'energyValue': {
              'calories': 314,
              'proteines': 25.4,
              'fats': 23,
              'carbohydrates': 1.4
            },
            'ingridient': {
              'energyValueForOneItem': {
                'calories': 157,
                'proteines': 12.7,
                'fats': 11.5,
                'carbohydrates': 0.7
              },
              '_id': '6583cfc326432446bb8141b7',
              'name': 'Яйца 15шт',
              'type': 'PRODUCT',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'cookingCoefficient': 1,
              'isThatPieceItem': true,
              'amount': 15,
              'priceForAllItems': 60000,
              '__v': 0,
              'weightForAllItems': 750,
              'tags': [],
              'updatedAt': '2024-03-03T15:20:37.112Z'
            },
            'type': 'PRODUCT',
            'amount': 2,
            'price': 26,
            'weightForTakenAmount': 120,
            '_id': '65e46fa685c1c118165a0449'
          },
          {
            'energyValue': {
              'calories': 1376,
              'proteines': 47.6,
              'fats': 43.6,
              'carbohydrates': 191.6
            },
            'ingridient': {
              'energyValue': {
                'calories': 688,
                'proteines': 23.8,
                'fats': 21.8,
                'carbohydrates': 95.8
              },
              '_id': '65e1cb3dc4999f9f631da59f',
              'name': 'бутер',
              'type': 'DISH',
              'description': 'тест',
              'owner': '6495366ebb7d346edcd650bf',
              'ingridients': [
                {
                  'energyValue': {
                    'calories': 460,
                    'proteines': 11.8,
                    'fats': 1.8,
                    'carbohydrates': 95.8
                  },
                  'ingridient': '6583d1b526432446bb8141c7',
                  'type': 'PRODUCT',
                  'weight': 200,
                  'price': 200,
                  '_id': '65e1cb3dc4999f9f631da5a0'
                },
                {
                  'energyValue': {
                    'calories': 228,
                    'proteines': 12,
                    'fats': 20,
                    'carbohydrates': 0
                  },
                  'ingridient': '65a746ab8ef4eafff622e63f',
                  'type': 'PRODUCT',
                  'weight': 100,
                  'price': 100,
                  '_id': '65e1cb3dc4999f9f631da5a1'
                }
              ],
              'weight': 300,
              'price': 300,
              'tags': [
                'breakfast'
              ],
              'createdAt': '2024-03-01T12:34:05.127Z',
              'updatedAt': '2024-03-03T16:47:02.294Z',
              '__v': 0
            },
            'type': 'DISH',
            'weight': 200,
            'price': 56.53,
            '_id': '65e46fa685c1c118165a044a'
          }
        ],
        'weight': 320,
        'price': 82.53,
        'priceUSD': 0.0065891952,
        'createdAt': '2024-03-03T12:40:06.239Z',
        'updatedAt': '2024-03-03T12:40:06.239Z',
        '__v': 0
      }
    ],
    'status': 200,
    'statusText': 'OK',
    'headers': {
      'content-length': '4711',
      'content-type': 'application/json; charset=utf-8'
    },
    'config': {
      'transitional': {
        'silentJSONParsing': true,
        'forcedJSONParsing': true,
        'clarifyTimeoutError': false
      },
      'transformRequest': [
        null
      ],
      'transformResponse': [
        null
      ],
      'timeout': 0,
      'xsrfCookieName': 'XSRF-TOKEN',
      'xsrfHeaderName': 'X-XSRF-TOKEN',
      'maxContentLength': -1,
      'maxBodyLength': -1,
      'env': {
        'FormData': null
      },
      'headers': {
        'Accept': 'application/json, text/plain, */*'
      },
      'withCredentials': true,
      'method': 'get',
      'url': 'http://127.0.0.1:4000/api/meals/get_all'
    },
    'request': {}
  },
  'error': {}
};
