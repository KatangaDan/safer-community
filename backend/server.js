const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// OpenAI API Key
const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;

// Example data for Johannesburg areas
const AREA_DATA = `
{
	"data
		{"c": "abduction", "area": "alexandra", "rate": 1},
		{"c": "abduction", "area": "eldorado park", "rate": 0},
		{"c": "abduction", "area": "florida", "rate": 0},
		{"c": "abduction", "area": "hillbrow", "rate": 1},
		{"c": "abduction", "area": "jhb central", "rate": 1},
		{"c": "abduction", "area": "linden", "rate": 0},
		{"c": "abduction", "area": "midrand", "rate": 0},
		{"c": "abduction", "area": "norwood", "rate": 0},
		{"c": "abduction", "area": "parkveiw", "rate": 0},
		{"c": "abduction", "area": "randburg", "rate": 0},
		{"c": "abduction", "area": "rosebank", "rate": 0},
		{"c": "abduction", "area": "sandton", "rate": 2},
		{"c": "abduction", "area": "sophia town", "rate": 0},
		{"c": "arson", "area": "alexandra", "rate": 16},
		{"c": "arson", "area": "eldorado park", "rate": 1},
		{"c": "arson", "area": "florida", "rate": 1},
		{"c": "arson", "area": "hillbrow", "rate": 3},
		{"c": "arson", "area": "jhb central", "rate": 2},
		{"c": "arson", "area": "linden", "rate": 1},
		{"c": "arson", "area": "midrand", "rate": 0},
		{"c": "arson", "area": "norwood", "rate": 2},
		{"c": "arson", "area": "parkveiw", "rate": 0},
		{"c": "arson", "area": "randburg", "rate": 0},
		{"c": "arson", "area": "rosebank", "rate": 1},
		{"c": "arson", "area": "sandton", "rate": 3},
		{"c": "arson", "area": "sophia town", "rate": 8},
		{"c": "violent assault", "area": "alexandra", "rate": 1367},
		{"c": "violent assault", "area": "eldorado park", "rate": 1107},
		{"c": "violent assault", "area": "florida", "rate": 349},
		{"c": "violent assault", "area": "hillbrow", "rate": 993},
		{"c": "violent assault", "area": "jhb central", "rate": 1017},
		{"c": "violent assault", "area": "linden", "rate": 144},
		{"c": "violent assault", "area": "midrand", "rate": 104},
		{"c": "violent assault", "area": "norwood", "rate": 181},
		{"c": "violent assault", "area": "parkveiw", "rate": 46},
		{"c": "violent assault", "area": "randburg", "rate": 196},
		{"c": "violent assault", "area": "rosebank", "rate": 56},
		{"c": "violent assault", "area": "sandton", "rate": 95},
		{"c": "violent assault", "area": "sophia town", "rate": 523},
		{"c": "attempted murder", "area": "alexandra", "rate": 175},
		{"c": "attempted murder", "area": "eldorado park", "rate": 209},
		{"c": "attempted murder", "area": "florida", "rate": 95},
		{"c": "attempted murder", "area": "hillbrow", "rate": 138},
		{"c": "attempted murder", "area": "jhb central", "rate": 229},
		{"c": "attempted murder", "area": "linden", "rate": 23},
		{"c": "attempted murder", "area": "midrand", "rate": 95},
		{"c": "attempted murder", "area": "norwood", "rate": 20},
		{"c": "attempted murder", "area": "parkveiw", "rate": 7},
		{"c": "attempted murder", "area": "randburg", "rate": 30},
		{"c": "attempted murder", "area": "rosebank", "rate": 1},
		{"c": "attempted murder", "area": "sandton", "rate": 37},
		{"c": "attempted murder", "area": "sophia town", "rate": 205},
		{"c": "attempted sexual offence", "area": "alexandra", "rate": 9},
		{"c": "attempted sexual offence", "area": "eldorado park", "rate": 5},
		{"c": "attempted sexual offence", "area": "florida", "rate": 4},
		{"c": "attempted sexual offence", "area": "hillbrow", "rate": 15},
		{"c": "attempted sexual offence", "area": "jhb central", "rate": 1},
		{"c": "attempted sexual offence", "area": "linden", "rate": 4},
		{"c": "attempted sexual offence", "area": "midrand", "rate": 4},
		{"c": "attempted sexual offence", "area": "norwood", "rate": 4},
		{"c": "attempted sexual offence", "area": "parkveiw", "rate": 0},
		{"c": "attempted sexual offence", "area": "randburg", "rate": 3},
		{"c": "attempted sexual offence", "area": "rosebank", "rate": 1},
		{"c": "attempted sexual offence", "area": "sandton", "rate": 2},
		{"c": "attempted sexual offence", "area": "sophia town", "rate": 0},
		{"c": "non-residential burglary", "area": "alexandra", "rate": 93},
		{"c": "non-residential burglary", "area": "eldorado park", "rate": 174},
		{"c": "non-residential burglary", "area": "florida", "rate": 260},
		{"c": "non-residential burglary", "area": "hillbrow", "rate": 167},
		{"c": "non-residential burglary", "area": "jhb central", "rate": 634},
		{"c": "non-residential burglary", "area": "linden", "rate": 121},
		{"c": "non-residential burglary", "area": "midrand", "rate": 511},
		{"c": "non-residential burglary", "area": "norwood", "rate": 93},
		{"c": "non-residential burglary", "area": "parkveiw", "rate": 101},
		{"c": "non-residential burglary", "area": "randburg", "rate": 246},
		{"c": "non-residential burglary", "area": "rosebank", "rate": 61},
		{"c": "non-residential burglary", "area": "sandton", "rate": 242},
		{"c": "non-residential burglary", "area": "sophia town", "rate": 192},
		{"c": "residential burglary", "area": "alexandra", "rate": 424},
		{"c": "residential burglary", "area": "eldorado park", "rate": 455},
		{"c": "residential burglary", "area": "florida", "rate": 590},
		{"c": "residential burglary", "area": "hillbrow", "rate": 181},
		{"c": "residential burglary", "area": "jhb central", "rate": 148},
		{"c": "residential burglary", "area": "linden", "rate": 626},
		{"c": "residential burglary", "area": "midrand", "rate": 710},
		{"c": "residential burglary", "area": "norwood", "rate": 391},
		{"c": "residential burglary", "area": "parkveiw", "rate": 421},
		{"c": "residential burglary", "area": "randburg", "rate": 417},
		{"c": "residential burglary", "area": "rosebank", "rate": 65},
		{"c": "residential burglary", "area": "sandton", "rate": 660},
		{"c": "residential burglary", "area": "sophia town", "rate": 570},
		{"c": "carjacking", "area": "alexandra", "rate": 264},
		{"c": "carjacking", "area": "eldorado park", "rate": 299},
		{"c": "carjacking", "area": "florida", "rate": 196},
		{"c": "carjacking", "area": "hillbrow", "rate": 132},
		{"c": "carjacking", "area": "jhb central", "rate": 239},
		{"c": "carjacking", "area": "linden", "rate": 63},
		{"c": "carjacking", "area": "midrand", "rate": 372},
		{"c": "carjacking", "area": "norwood", "rate": 36},
		{"c": "carjacking", "area": "parkveiw", "rate": 17},
		{"c": "carjacking", "area": "randburg", "rate": 85},
		{"c": "carjacking", "area": "rosebank", "rate": 6},
		{"c": "carjacking", "area": "sandton", "rate": 217},
		{"c": "carjacking", "area": "sophia town", "rate": 116},
		{"c": "commercial crime", "area": "alexandra", "rate": 357},
		{"c": "commercial crime", "area": "eldorado park", "rate": 272},
		{"c": "commercial crime", "area": "florida", "rate": 714},
		{"c": "commercial crime", "area": "hillbrow", "rate": 1041},
		{"c": "commercial crime", "area": "jhb central", "rate": 1601},
		{"c": "commercial crime", "area": "linden", "rate": 697},
		{"c": "commercial crime", "area": "midrand", "rate": 2698},
		{"c": "commercial crime", "area": "norwood", "rate": 657},
		{"c": "commercial crime", "area": "parkveiw", "rate": 373},
		{"c": "commercial crime", "area": "randburg", "rate": 1108},
		{"c": "commercial crime", "area": "rosebank", "rate": 331},
		{"c": "commercial crime", "area": "sandton", "rate": 2495},
		{"c": "commercial crime", "area": "sophia town", "rate": 362},
		{"c": "common assault", "area": "alexandra", "rate": 2336},
		{"c": "common assault", "area": "eldorado park", "rate": 1668},
		{"c": "common assault", "area": "florida", "rate": 772},
		{"c": "common assault", "area": "hillbrow", "rate": 1388},
		{"c": "common assault", "area": "jhb central", "rate": 1323},
		{"c": "common assault", "area": "linden", "rate": 250},
		{"c": "common assault", "area": "midrand", "rate": 821},
		{"c": "common assault", "area": "norwood", "rate": 388},
		{"c": "common assault", "area": "parkveiw", "rate": 121},
		{"c": "common assault", "area": "randburg", "rate": 360},
		{"c": "common assault", "area": "rosebank", "rate": 50},
		{"c": "common assault", "area": "sandton", "rate": 720},
		{"c": "common assault", "area": "sophia town", "rate": 505},
		{"c": "common robbery", "area": "alexandra", "rate": 344},
		{"c": "common robbery", "area": "eldorado park", "rate": 331},
		{"c": "common robbery", "area": "florida", "rate": 295},
		{"c": "common robbery", "area": "hillbrow", "rate": 1097},
		{"c": "common robbery", "area": "jhb central", "rate": 1653},
		{"c": "common robbery", "area": "linden", "rate": 281},
		{"c": "common robbery", "area": "midrand", "rate": 456},
		{"c": "common robbery", "area": "norwood", "rate": 158},
		{"c": "common robbery", "area": "parkveiw", "rate": 324},
		{"c": "common robbery", "area": "randburg", "rate": 458},
		{"c": "common robbery", "area": "rosebank", "rate": 93},
		{"c": "common robbery", "area": "sandton", "rate": 504},
		{"c": "common robbery", "area": "sophia town", "rate": 153},
		{"c": "sexual offence", "area": "alexandra", "rate": 4},
		{"c": "sexual offence", "area": "eldorado park", "rate": 0},
		{"c": "sexual offence", "area": "florida", "rate": 2},
		{"c": "sexual offence", "area": "hillbrow", "rate": 2},
		{"c": "sexual offence", "area": "jhb central", "rate": 2},
		{"c": "sexual offence", "area": "linden", "rate": 3},
		{"c": "sexual offence", "area": "midrand", "rate": 2},
		{"c": "sexual offence", "area": "norwood", "rate": 4},
		{"c": "sexual offence", "area": "parkveiw", "rate": 0},
		{"c": "sexual offence", "area": "randburg", "rate": 1},
		{"c": "sexual offence", "area": "rosebank", "rate": 0},
		{"c": "sexual offence", "area": "sandton", "rate": 3},
		{"c": "sexual offence", "area": "sophia town", "rate": 1},
		{"c": "culpable homicide", "area": "alexandra", "rate": 12},
		{"c": "culpable homicide", "area": "eldorado park", "rate": 72},
		{"c": "culpable homicide", "area": "florida", "rate": 41},
		{"c": "culpable homicide", "area": "hillbrow", "rate": 41},
		{"c": "culpable homicide", "area": "jhb central", "rate": 40},
		{"c": "culpable homicide", "area": "linden", "rate": 13},
		{"c": "culpable homicide", "area": "midrand", "rate": 82},
		{"c": "culpable homicide", "area": "norwood", "rate": 16},
		{"c": "culpable homicide", "area": "parkveiw", "rate": 14},
		{"c": "culpable homicide", "area": "randburg", "rate": 19},
		{"c": "culpable homicide", "area": "rosebank", "rate": 2},
		{"c": "culpable homicide", "area": "sandton", "rate": 52},
		{"c": "culpable homicide", "area": "sophia town", "rate": 13},
		{"c": "dui", "area": "alexandra", "rate": 287},
		{"c": "dui", "area": "eldorado park", "rate": 202},
		{"c": "dui", "area": "florida", "rate": 197},
		{"c": "dui", "area": "hillbrow", "rate": 696},
		{"c": "dui", "area": "jhb central", "rate": 823},
		{"c": "dui", "area": "linden", "rate": 399},
		{"c": "dui", "area": "midrand", "rate": 1031},
		{"c": "dui", "area": "norwood", "rate": 134},
		{"c": "dui", "area": "parkveiw", "rate": 175},
		{"c": "dui", "area": "randburg", "rate": 450},
		{"c": "dui", "area": "rosebank", "rate": 71},
		{"c": "dui", "area": "sandton", "rate": 313},
		{"c": "dui", "area": "sophia town", "rate": 171},
		{"c": "drug-related crime", "area": "alexandra", "rate": 377},
		{"c": "drug-related crime", "area": "eldorado park", "rate": 915},
		{"c": "drug-related crime", "area": "florida", "rate": 589},
		{"c": "drug-related crime", "area": "hillbrow", "rate": 483},
		{"c": "drug-related crime", "area": "jhb central", "rate": 2003},
		{"c": "drug-related crime", "area": "linden", "rate": 145},
		{"c": "drug-related crime", "area": "midrand", "rate": 485},
		{"c": "drug-related crime", "area": "norwood", "rate": 95},
		{"c": "drug-related crime", "area": "parkveiw", "rate": 31},
		{"c": "drug-related crime", "area": "randburg", "rate": 88},
		{"c": "drug-related crime", "area": "rosebank", "rate": 9},
		{"c": "drug-related crime", "area": "sandton", "rate": 231},
		{"c": "drug-related crime", "area": "sophia town", "rate": 1941},
		{"c": "illegal possession of firearms and ammunition", "area": "alexandra", "rate": 110},
		{"c": "illegal possession of firearms and ammunition", "area": "eldorado park", "rate": 117},
		{"c": "illegal possession of firearms and ammunition", "area": "florida", "rate": 51},
		{"c": "illegal possession of firearms and ammunition", "area": "hillbrow", "rate": 147},
		{"c": "illegal possession of firearms and ammunition", "area": "jhb central", "rate": 288},
		{"c": "illegal possession of firearms and ammunition", "area": "linden", "rate": 14},
		{"c": "illegal possession of firearms and ammunition", "area": "midrand", "rate": 62},
		{"c": "illegal possession of firearms and ammunition", "area": "norwood", "rate": 29},
		{"c": "illegal possession of firearms and ammunition", "area": "parkveiw", "rate": 17},
		{"c": "illegal possession of firearms and ammunition", "area": "randburg", "rate": 13},
		{"c": "illegal possession of firearms and ammunition", "area": "rosebank", "rate": 1},
		{"c": "illegal possession of firearms and ammunition", "area": "sandton", "rate": 32},
		{"c": "illegal possession of firearms and ammunition", "area": "sophia town", "rate": 143},
		{"c": "kidnapping", "area": "alexandra", "rate": 86},
		{"c": "kidnapping", "area": "eldorado park", "rate": 223},
		{"c": "kidnapping", "area": "florida", "rate": 132},
		{"c": "kidnapping", "area": "hillbrow", "rate": 108},
		{"c": "kidnapping", "area": "jhb central", "rate": 295},
		{"c": "kidnapping", "area": "linden", "rate": 39},
		{"c": "kidnapping", "area": "midrand", "rate": 257},
		{"c": "kidnapping", "area": "norwood", "rate": 22},
		{"c": "kidnapping", "area": "parkveiw", "rate": 14},
		{"c": "kidnapping", "area": "randburg", "rate": 134},
		{"c": "kidnapping", "area": "rosebank", "rate": 3},
		{"c": "kidnapping", "area": "sandton", "rate": 112},
		{"c": "kidnapping", "area": "sophia town", "rate": 57},
		{"c": "malicious damage to property", "area": "alexandra", "rate": 1019},
		{"c": "malicious damage to property", "area": "eldorado park", "rate": 1170},
		{"c": "malicious damage to property", "area": "florida", "rate": 372},
		{"c": "malicious damage to property", "area": "hillbrow", "rate": 467},
		{"c": "malicious damage to property", "area": "jhb central", "rate": 482},
		{"c": "malicious damage to property", "area": "linden", "rate": 199},
		{"c": "malicious damage to property", "area": "midrand", "rate": 239},
		{"c": "malicious damage to property", "area": "norwood", "rate": 171},
		{"c": "malicious damage to property", "area": "parkveiw", "rate": 62},
		{"c": "malicious damage to property", "area": "randburg", "rate": 212},
		{"c": "malicious damage to property", "area": "rosebank", "rate": 75},
		{"c": "malicious damage to property", "area": "sandton", "rate": 252},
		{"c": "malicious damage to property", "area": "sophia town", "rate": 476},
		{"c": "murder", "area": "alexandra", "rate": 201},
		{"c": "murder", "area": "eldorado park", "rate": 152},
		{"c": "murder", "area": "florida", "rate": 92},
		{"c": "murder", "area": "hillbrow", "rate": 254},
		{"c": "murder", "area": "jhb central", "rate": 270},
		{"c": "murder", "area": "linden", "rate": 14},
		{"c": "murder", "area": "midrand", "rate": 45},
		{"c": "murder", "area": "norwood", "rate": 4},
		{"c": "murder", "area": "parkveiw", "rate": 3},
		{"c": "murder", "area": "randburg", "rate": 16},
		{"c": "murder", "area": "rosebank", "rate": 1},
		{"c": "murder", "area": "sandton", "rate": 19},
		{"c": "murder", "area": "sophia town", "rate": 105},
		{"c": "neglect and ill-treatment of children", "area": "alexandra", "rate": 26},
		{"c": "neglect and ill-treatment of children", "area": "eldorado park", "rate": 19},
		{"c": "neglect and ill-treatment of children", "area": "florida", "rate": 3},
		{"c": "neglect and ill-treatment of children", "area": "hillbrow", "rate": 56},
		{"c": "neglect and ill-treatment of children", "area": "jhb central", "rate": 24},
		{"c": "neglect and ill-treatment of children", "area": "linden", "rate": 6},
		{"c": "neglect and ill-treatment of children", "area": "midrand", "rate": 13},
		{"c": "neglect and ill-treatment of children", "area": "norwood", "rate": 6},
		{"c": "neglect and ill-treatment of children", "area": "parkveiw", "rate": 0},
		{"c": "neglect and ill-treatment of children", "area": "randburg", "rate": 3},
		{"c": "neglect and ill-treatment of children", "area": "rosebank", "rate": 0},
		{"c": "neglect and ill-treatment of children", "area": "sandton", "rate": 5},
		{"c": "neglect and ill-treatment of children", "area": "sophia town", "rate": 21},
		{"c": "public violence", "area": "alexandra", "rate": 7},
		{"c": "public violence", "area": "eldorado park", "rate": 9},
		{"c": "public violence", "area": "florida", "rate": 5},
		{"c": "public violence", "area": "hillbrow", "rate": 5},
		{"c": "public violence", "area": "jhb central", "rate": 10},
		{"c": "public violence", "area": "linden", "rate": 0},
		{"c": "public violence", "area": "midrand", "rate": 4},
		{"c": "public violence", "area": "norwood", "rate": 2},
		{"c": "public violence", "area": "parkveiw", "rate": 1},
		{"c": "public violence", "area": "randburg", "rate": 0},
		{"c": "public violence", "area": "rosebank", "rate": 1},
		{"c": "public violence", "area": "sandton", "rate": 4},
		{"c": "public violence", "area": "sophia town", "rate": 1},
		{"c": "rape", "area": "alexandra", "rate": 265},
		{"c": "rape", "area": "eldorado park", "rate": 147},
		{"c": "rape", "area": "florida", "rate": 74},
		{"c": "rape", "area": "hillbrow", "rate": 220},
		{"c": "rape", "area": "jhb central", "rate": 201},
		{"c": "rape", "area": "linden", "rate": 49},
		{"c": "rape", "area": "midrand", "rate": 110},
		{"c": "rape", "area": "norwood", "rate": 25},
		{"c": "rape", "area": "parkveiw", "rate": 12},
		{"c": "rape", "area": "randburg", "rate": 66},
		{"c": "rape", "area": "rosebank", "rate": 11},
		{"c": "rape", "area": "sandton", "rate": 117},
		{"c": "rape", "area": "sophia town", "rate": 67},
		{"c": "non-residential robbery", "area": "alexandra", "rate": 50},
		{"c": "non-residential robbery", "area": "eldorado park", "rate": 113},
		{"c": "non-residential robbery", "area": "florida", "rate": 129},
		{"c": "non-residential robbery", "area": "hillbrow", "rate": 157},
		{"c": "non-residential robbery", "area": "jhb central", "rate": 429},
		{"c": "non-residential robbery", "area": "linden", "rate": 39},
		{"c": "non-residential robbery", "area": "midrand", "rate": 166},
		{"c": "non-residential robbery", "area": "norwood", "rate": 26},
		{"c": "non-residential robbery", "area": "parkveiw", "rate": 23},
		{"c": "non-residential robbery", "area": "randburg", "rate": 110},
		{"c": "non-residential robbery", "area": "rosebank", "rate": 14},
		{"c": "non-residential robbery", "area": "sandton", "rate": 53},
		{"c": "non-residential robbery", "area": "sophia town", "rate": 65},
		{"c": "residential robbery", "area": "alexandra", "rate": 64},
		{"c": "residential robbery", "area": "eldorado park", "rate": 78},
		{"c": "residential robbery", "area": "florida", "rate": 129},
		{"c": "residential robbery", "area": "hillbrow", "rate": 35},
		{"c": "residential robbery", "area": "jhb central", "rate": 42},
		{"c": "residential robbery", "area": "linden", "rate": 169},
		{"c": "residential robbery", "area": "midrand", "rate": 149},
		{"c": "residential robbery", "area": "norwood", "rate": 54},
		{"c": "residential robbery", "area": "parkveiw", "rate": 92},
		{"c": "residential robbery", "area": "randburg", "rate": 90},
		{"c": "residential robbery", "area": "rosebank", "rate": 18},
		{"c": "residential robbery", "area": "sandton", "rate": 239},
		{"c": "residential robbery", "area": "sophia town", "rate": 95},
		{"c": "robbery of cash in transit", "area": "alexandra", "rate": 0},
		{"c": "robbery of cash in transit", "area": "eldorado park", "rate": 1},
		{"c": "robbery of cash in transit", "area": "florida", "rate": 2},
		{"c": "robbery of cash in transit", "area": "hillbrow", "rate": 0},
		{"c": "robbery of cash in transit", "area": "jhb central", "rate": 3},
		{"c": "robbery of cash in transit", "area": "linden", "rate": 0},
		{"c": "robbery of cash in transit", "area": "midrand", "rate": 1},
		{"c": "robbery of cash in transit", "area": "norwood", "rate": },
		{"c": "robbery of cash in transit", "area": "parkveiw", "rate": 0},
		{"c": "robbery of cash in transit", "area": "randburg", "rate": 0},
		{"c": "robbery of cash in transit", "area": "rosebank", "rate": 0},
		{"c": "robbery of cash in transit", "area": "sandton", "rate": 0},
		{"c": "robbery of cash in transit", "area": "sophia town", "rate": 0},
		{"c": "robbery with aggravating circumstances", "area": "alexandra", "rate": 1052},
		{"c": "robbery with aggravating circumstances", "area": "eldorado park", "rate": 1266},
		{"c": "robbery with aggravating circumstances", "area": "florida", "rate": 985},
		{"c": "robbery with aggravating circumstances", "area": "hillbrow", "rate": 1462},
		{"c": "robbery with aggravating circumstances", "area": "jhb central", "rate": 2619},
		{"c": "robbery with aggravating circumstances", "area": "linden", "rate": 514},
		{"c": "robbery with aggravating circumstances", "area": "midrand", "rate": 1478},
		{"c": "robbery with aggravating circumstances", "area": "norwood", "rate": 265},
		{"c": "robbery with aggravating circumstances", "area": "parkveiw", "rate": 260},
		{"c": "robbery with aggravating circumstances", "area": "randburg", "rate": 657},
		{"c": "robbery with aggravating circumstances", "area": "rosebank", "rate": 95},
		{"c": "robbery with aggravating circumstances", "area": "sandton", "rate": 930},
		{"c": "robbery with aggravating circumstances", "area": "sophia town", "rate": 725},
		{"c": "sexual assault", "area": "alexandra", "rate": 42},
		{"c": "sexual assault", "area": "eldorado park", "rate": 49},
		{"c": "sexual assault", "area": "florida", "rate": 28},
		{"c": "sexual assault", "area": "hillbrow", "rate": 41},
		{"c": "sexual assault", "area": "jhb central", "rate": 43},
		{"c": "sexual assault", "area": "linden", "rate": 15},
		{"c": "sexual assault", "area": "midrand", "rate": 30},
		{"c": "sexual assault", "area": "norwood", "rate": 14},
		{"c": "sexual assault", "area": "parkveiw", "rate": 14},
		{"c": "sexual assault", "area": "randburg", "rate": 16},
		{"c": "sexual assault", "area": "rosebank", "rate": 5},
		{"c": "sexual assault", "area": "sandton", "rate": 33},
		{"c": "sexual assault", "area": "sophia town", "rate": 36},
		{"c": "shoplifting", "area": "alexandra", "rate": 361},
		{"c": "shoplifting", "area": "eldorado park", "rate": 397},
		{"c": "shoplifting", "area": "florida", "rate": 197},
		{"c": "shoplifting", "area": "hillbrow", "rate": 234},
		{"c": "shoplifting", "area": "jhb central", "rate": 749},
		{"c": "shoplifting", "area": "linden", "rate": 283},
		{"c": "shoplifting", "area": "midrand", "rate": 610},
		{"c": "shoplifting", "area": "norwood", "rate": 140},
		{"c": "shoplifting", "area": "parkveiw", "rate": 9},
		{"c": "shoplifting", "area": "randburg", "rate": 205},
		{"c": "shoplifting", "area": "rosebank", "rate": 196},
		{"c": "shoplifting", "area": "sandton", "rate": 543},
		{"c": "shoplifting", "area": "sophia town", "rate": 218},
		{"c": "stock-theft", "area": "alexandra", "rate": 0},
		{"c": "stock-theft", "area": "eldorado park", "rate": 6},
		{"c": "stock-theft", "area": "florida", "rate": 0},
		{"c": "stock-theft", "area": "hillbrow", "rate": 0},
		{"c": "stock-theft", "area": "jhb central", "rate": 0},
		{"c": "stock-theft", "area": "linden", "rate": 0},
		{"c": "stock-theft", "area": "midrand", "rate": 3},
		{"c": "stock-theft", "area": "norwood", "rate": 0},
		{"c": "stock-theft", "area": "parkveiw", "rate": 0},
		{"c": "stock-theft", "area": "randburg", "rate": 0},
		{"c": "stock-theft", "area": "rosebank", "rate": 0},
		{"c": "stock-theft", "area": "sandton", "rate": 0},
		{"c": "stock-theft", "area": "sophia town", "rate": 0},
		{"c": "Theft of motor vehicle and motorcycle", "area": "alexandra", "rate": 202},
		{"c": "Theft of motor vehicle and motorcycle", "area": "eldorado park", "rate": 126},
		{"c": "Theft of motor vehicle and motorcycle", "area": "florida", "rate": 677},
		{"c": "Theft of motor vehicle and motorcycle", "area": "hillbrow", "rate": 355},
		{"c": "Theft of motor vehicle and motorcycle", "area": "jhb central", "rate": 601},
		{"c": "Theft of motor vehicle and motorcycle", "area": "linden", "rate": 433},
		{"c": "Theft of motor vehicle and motorcycle", "area": "midrand", "rate": 342},
		{"c": "Theft of motor vehicle and motorcycle", "area": "norwood", "rate": 195},
		{"c": "Theft of motor vehicle and motorcycle", "area": "parkveiw", "rate": 369},
		{"c": "Theft of motor vehicle and motorcycle", "area": "randburg", "rate": 255},
		{"c": "Theft of motor vehicle and motorcycle", "area": "rosebank", "rate": 74},
		{"c": "Theft of motor vehicle and motorcycle", "area": "sandton", "rate": 419},
		{"c": "Theft of motor vehicle and motorcycle", "area": "sophia town", "rate": 274},
		{"c": "Theft out of or from motor vehicle", "area": "alexandra", "rate": 217},
		{"c": "Theft out of or from motor vehicle", "area": "eldorado park", "rate": 242},
		{"c": "Theft out of or from motor vehicle", "area": "florida", "rate": 512},
		{"c": "Theft out of or from motor vehicle", "area": "hillbrow", "rate": 635},
		{"c": "Theft out of or from motor vehicle", "area": "jhb central", "rate": 1309},
		{"c": "Theft out of or from motor vehicle", "area": "linden", "rate": 478},
		{"c": "Theft out of or from motor vehicle", "area": "midrand", "rate": 1076},
		{"c": "Theft out of or from motor vehicle", "area": "norwood", "rate": 270},
		{"c": "Theft out of or from motor vehicle", "area": "parkveiw", "rate": 447},
		{"c": "Theft out of or from motor vehicle", "area": "randburg", "rate": 648},
		{"c": "Theft out of or from motor vehicle", "area": "rosebank", "rate": 201},
		{"c": "Theft out of or from motor vehicle", "area": "sandton", "rate": 749},
		{"c": "Theft out of or from motor vehicle", "area": "sophia town", "rate": 275},
		{"c": "Truck hijacking", "area": "alexandra", "rate": 7},
		{"c": "Truck hijacking", "area": "eldorado park", "rate": 17},
		{"c": "Truck hijacking", "area": "florida", "rate": 21},
		{"c": "Truck hijacking", "area": "hillbrow", "rate": 4},
		{"c": "Truck hijacking", "area": "jhb central", "rate": 16},
		{"c": "Truck hijacking", "area": "linden", "rate": 0},
		{"c": "Truck hijacking", "area": "midrand", "rate": 35},
		{"c": "Truck hijacking", "area": "norwood", "rate": 1},
		{"c": "Truck hijacking", "area": "parkveiw", "rate": 0},
		{"c": "Truck hijacking", "area": "randburg", "rate": 23},
		{"c": "Truck hijacking", "area": "rosebank", "rate": 0},
		{"c": "Truck hijacking", "area": "sandton", "rate": 15},
		{"c": "Truck hijacking", "area": "sophia town", "rate": 2},
	}
}
`;



// Define a combined prompt for both safety advice and emergency numbers
const BASE_PROMPT = `
You are an AI specializing in providing safety advice and emergency information for travelers in Johannesburg. When a user mentions an area, offer practical safety tips and detailed information about known dangers based on crime data for that location. 
Provide emergency contact numbers and the address of that areas police station.
The data provided includes c (crime), the area, and the rate (amount of times it has happened).

Data: ${AREA_DATA}

Emergency Numbers:
1. Police: 10111
2. Ambulance: 10177
3. Fire Department: 011 375 5911
4. General Emergency: 112 (on mobile)
`;

app.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  const prompt = `${BASE_PROMPT}\nUser input: ${query}\nResponse:`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: BASE_PROMPT },
          { role: "user", content: query },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const prediction = response.data.choices[0].message.content.trim();
    res.json({ response: prediction });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
