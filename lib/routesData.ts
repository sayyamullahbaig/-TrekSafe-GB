export interface Checkpoint {
  id: string;
  name: string;
  elevationMeters: number;
  hazards: string[];
  nearestHelp: string;
}

export interface EmergencyContact {
  service: string;
  phone: string;
  location: string;
}

export interface Route {
  id: string;
  name: string;
  region: 'Gilgit' | 'Hunza' | 'Nagar' | 'Skardu' | 'Diamer' | 'Ghanche';
  distanceKm: number;
  maxAltitudeMeters: number;
  difficulty: 'Moderate' | 'Challenging' | 'Strenuous' | 'Extreme';
  typicalDays: number;
  bestSeason: string;
  summary: string;
  permitsRequired: {
    locals: string;
    foreigners: string;
  };
  checkpoints: Checkpoint[];
  emergencyContacts: EmergencyContact[];
}

export const ROUTES_DATA: Route[] = [
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows & Nanga Parbat Base Camp',
    region: 'Diamer',
    distanceKm: 26,
    maxAltitudeMeters: 3967,
    difficulty: 'Moderate',
    typicalDays: 3,
    bestSeason: 'June to September',
    summary: 'A world-famous trek offering panoramic views of Nanga Parbat (8,126m). Involves an adventurous jeep track from Raikot Bridge followed by a hike through pine forests to Beyal Camp and the base camp.',
    permitsRequired: {
      locals: 'CNIC registration required at Raikot Bridge police checkpost.',
      foreigners: 'Passport registration at Raikot Bridge. Police escort / NOC required due to security protocols in Diamer district.'
    },
    checkpoints: [
      {
        id: 'raikot-bridge',
        name: 'Raikot Bridge (Jeep Takeoff)',
        elevationMeters: 1150,
        hazards: ['Extreme heat', 'Narrow, unpaved cliffside jeep track'],
        nearestHelp: 'Raikot Police Checkpost'
      },
      {
        id: 'tatto-village',
        name: 'Tatto Village (Trailhead)',
        elevationMeters: 2600,
        hazards: ['Loose gravel', 'Sun exposure', 'Dehydration'],
        nearestHelp: 'Tatto Village Local Council'
      },
      {
        id: 'fairy-meadows-camp',
        name: 'Fairy Meadows Campsite',
        elevationMeters: 3300,
        hazards: ['Cold night temperatures', 'Mild altitude sickness symptoms'],
        nearestHelp: 'Local First Aid Huts / Tourist Police'
      },
      {
        id: 'beyal-camp',
        name: 'Beyal Camp',
        elevationMeters: 3500,
        hazards: ['Forest wildlife', 'Freezing night temperatures'],
        nearestHelp: 'Beyal Tea Houses'
      },
      {
        id: 'nanga-parbat-bc',
        name: 'Nanga Parbat Base Camp (Jalipur)',
        elevationMeters: 3967,
        hazards: ['Icefall noise/avalanche proximity', 'Crevasses on glacier margin', 'Rapid weather shifts'],
        nearestHelp: 'Fairy Meadows Tourist Police Post'
      }
    ],
    emergencyContacts: [
      { service: 'Chilas District Police', phone: '+92-5812-920100', location: 'Chilas HQ' },
      { service: 'Raikot Police Checkpost', phone: '15 (Local Emergency)', location: 'Raikot Bridge' },
      { service: 'RHQ Hospital Chilas', phone: '+92-5812-920022', location: 'Chilas' }
    ]
  },
  {
    id: 'rakaposhi-bc',
    name: 'Rakaposhi Base Camp (Taghafari)',
    region: 'Nagar',
    distanceKm: 18,
    maxAltitudeMeters: 3500,
    difficulty: 'Moderate',
    typicalDays: 2,
    bestSeason: 'May to October',
    summary: 'One of the most accessible high-altitude treks in GB. Starts from Minapin village in Nagar Valley and leads up to Taghafari, offering front-row views of Rakaposhi and Diran peak glaciers.',
    permitsRequired: {
      locals: 'No special permit required. Entry fee at Minapin tourist desk.',
      foreigners: 'Passport registration at Minapin police post.'
    },
    checkpoints: [
      {
        id: 'minapin-village',
        name: 'Minapin Village',
        elevationMeters: 2000,
        hazards: ['None'],
        nearestHelp: 'Minapin Basic Health Unit (BHU)'
      },
      {
        id: 'hapakun',
        name: 'Hapakun Campsite',
        elevationMeters: 2800,
        hazards: ['Steep switchbacks', 'Rockfall on narrow ridge'],
        nearestHelp: 'Hapakun Summer Huts'
      },
      {
        id: 'taghafari',
        name: 'Taghafari (Rakaposhi Base Camp)',
        elevationMeters: 3500,
        hazards: ['Moraine collapse along Diran Glacier', 'Strong cold winds'],
        nearestHelp: 'Nagar District Police / Minapin Base'
      }
    ],
    emergencyContacts: [
      { service: 'Nagar District Police', phone: '+92-5813-920011', location: 'Nagarkhas' },
      { service: 'Civil Hospital Aliabad', phone: '+92-5813-920120', location: 'Aliabad, Hunza' }
    ]
  },
  {
    id: 'deosai-plains',
    name: 'Deosai National Park Wilderness Traverse',
    region: 'Skardu',
    distanceKm: 65,
    maxAltitudeMeters: 4114,
    difficulty: 'Moderate',
    typicalDays: 3,
    bestSeason: 'July to September',
    summary: 'Traversing the second-highest alpine plateau in the world ("Land of the Giants"). Features rolling alpine grasslands, wildflower meadows, Sheosar Lake, and Himalayan Brown Bear habitats.',
    permitsRequired: {
      locals: 'Gilgit-Baltistan Wildlife Department entry fee required at Sadpara or Chilam checkposts.',
      foreigners: 'Wildlife Department entry ticket + Passport check at Sadpara gate.'
    },
    checkpoints: [
      {
        id: 'sadpara-lake',
        name: 'Sadpara Lake Checkpoint',
        elevationMeters: 2630,
        hazards: ['Winding high-altitude road'],
        nearestHelp: 'Sadpara Wildlife Checkpost'
      },
      {
        id: 'ali-malik-pass',
        name: 'Ali Malik Mar Pass',
        elevationMeters: 4080,
        hazards: ['Rapid onset of Acute Mountain Sickness (AMS)', 'Hypothermia'],
        nearestHelp: 'Wildlife Ranger Hut'
      },
      {
        id: 'bara-pani',
        name: 'Bara Pani Camp',
        elevationMeters: 4000,
        hazards: ['Freezing nighttime temperatures', 'Wildlife encounters (Himalayan Brown Bear)', 'Flash river flow'],
        nearestHelp: 'Deosai Wildlife Main Camp'
      },
      {
        id: 'sheosar-lake',
        name: 'Sheosar Lake',
        elevationMeters: 4114,
        hazards: ['High wind chill', 'Extreme UV exposure'],
        nearestHelp: 'Chilam Wildlife Post'
      }
    ],
    emergencyContacts: [
      { service: 'Skardu Rescue 1122', phone: '1122 / +92-5815-922122', location: 'Skardu City' },
      { service: 'GB Wildlife Dept (Deosai Division)', phone: '+92-5815-920231', location: 'Skardu' },
      { service: 'DHQ Hospital Skardu', phone: '+92-5815-920202', location: 'Skardu' }
    ]
  },
  {
    id: 'rush-lake',
    name: 'Rush Lake & Rush Peak Expedition',
    region: 'Nagar',
    distanceKm: 38,
    maxAltitudeMeters: 4694,
    difficulty: 'Strenuous',
    typicalDays: 4,
    bestSeason: 'Late June to Mid-September',
    summary: 'One of the highest alpine lakes in the world (4,694m). Demands crossing the active Hopar/Barpu Glacier moraines before ascending steep slopes to command views of Spantik (Golden Peak), Malubiting, and K2 on clear days.',
    permitsRequired: {
      locals: 'Register at Hopar Valley Local Guide Association desk.',
      foreigners: 'Passport registration at Hopar Police Checkpost. Local guide mandatory.'
    },
    checkpoints: [
      {
        id: 'hopar-valley',
        name: 'Hopar Valley (Hopar Hilton Trailhead)',
        elevationMeters: 2800,
        hazards: ['Glacial silt dust'],
        nearestHelp: 'Hopar Police Post'
      },
      {
        id: 'barpu-glacier',
        name: 'Barpu Glacier Crossing',
        elevationMeters: 3200,
        hazards: ['Slippery ice ridges', 'Rockfall zone', 'Shifting glacier crevasses'],
        nearestHelp: 'Local Porters / Guides'
      },
      {
        id: 'chidin-harai',
        name: 'Chidin Harai Campsite',
        elevationMeters: 4000,
        hazards: ['Steep continuous altitude gain', 'Dehydration'],
        nearestHelp: 'Seasonal Shepherd Huts'
      },
      {
        id: 'rush-lake-camp',
        name: 'Rush Lake Campsite',
        elevationMeters: 4694,
        hazards: ['Freezing temperatures year-round', 'Severe altitude sickness', 'High exposure to wind'],
        nearestHelp: 'Nagar Rescue Base / Nagar Police'
      }
    ],
    emergencyContacts: [
      { service: 'Nagar District Police', phone: '+92-5813-920011', location: 'Nagarkhas' },
      { service: 'Rescue 1122 Hunza/Nagar', phone: '1122', location: 'Aliabad' }
    ]
  },
  {
    id: 'k2-base-camp',
    name: 'K2 Base Camp & Concordia via Baltoro Glacier',
    region: 'Ghanche',
    distanceKm: 160,
    maxAltitudeMeters: 5150,
    difficulty: 'Extreme',
    typicalDays: 14,
    bestSeason: 'July to Mid-August',
    summary: 'The ultimate holy grail of world trekking. A multi-week expedition moving up the massive Baltoro Glacier past Trango Towers, Masherbrum, and Broad Peak to Concordia ("Throne Room of the Mountain Gods") and K2 Base Camp.',
    permitsRequired: {
      locals: 'GB Tourism Dept trek registration. Trekking permit fee applies.',
      foreigners: 'Restricted Zone NOC from Ministry of Interior / GB Tourism. Licensed tour operator & registered guide mandatory. Trekking visa required.'
    },
    checkpoints: [
      {
        id: 'askole',
        name: 'Askole Village (Last Roadhead)',
        elevationMeters: 3000,
        hazards: ['Road blockage due to Braldu river flooding/landslides'],
        nearestHelp: 'Askole Army/Police Post'
      },
      {
        id: 'jhola',
        name: 'Jhola Camp',
        elevationMeters: 3200,
        hazards: ['Extreme heat', 'Dust storms along Braldu river'],
        nearestHelp: 'Jhola Army Checkpost'
      },
      {
        id: 'paiju',
        name: 'Paiju Camp',
        elevationMeters: 3450,
        hazards: ['Swollen glacial streams', 'Porter fatigue'],
        nearestHelp: 'Paiju Campsite Management'
      },
      {
        id: 'urdukas',
        name: 'Urdukas Camp',
        elevationMeters: 4050,
        hazards: ['Rockfall from granite towers', 'First severe altitude threshold'],
        nearestHelp: 'Urdukas Army Post'
      },
      {
        id: 'concordia',
        name: 'Concordia Camp',
        elevationMeters: 4600,
        hazards: ['Sub-zero sleeping conditions', 'Crevasses on ice', 'Snowstorms'],
        nearestHelp: 'Concordia High-Altitude Military Post'
      },
      {
        id: 'k2-bc',
        name: 'K2 Base Camp',
        elevationMeters: 5150,
        hazards: ['Extremely thin air (Hypoxia)', 'Avalanche paths', 'Severe frostbite risk'],
        nearestHelp: 'Expedition Doctor Tents / Military Helipad'
      }
    ],
    emergencyContacts: [
      { service: 'Askole Army Post Command', phone: 'Satellite / Military Line', location: 'Askole' },
      { service: 'Askari Aviation Helipad (Emergency Evac)', phone: '+92-51-5505500', location: 'Rawalpindi / Skardu Base' },
      { service: 'GB Tourism Dept Skardu', phone: '+92-5815-920253', location: 'Skardu' }
    ]
  },
  {
    id: 'naltar-lakes',
    name: 'Naltar Lakes & Pari Lake Trek',
    region: 'Gilgit',
    distanceKm: 22,
    maxAltitudeMeters: 3200,
    difficulty: 'Moderate',
    typicalDays: 2,
    bestSeason: 'June to October',
    summary: 'A trek through thick alpine forests and vibrant turquoise lakes (Bashkiri / Satrangi Lakes) up to high-altitude Pari Lake in Naltar Valley near Gilgit.',
    permitsRequired: {
      locals: 'CNIC check at Naltar Bala Army/Police post.',
      foreigners: 'Passport registration at Naltar Army Checkpost due to PAF base presence.'
    },
    checkpoints: [
      {
        id: 'naltar-bala',
        name: 'Naltar Bala Village',
        elevationMeters: 2900,
        hazards: ['Rough 4x4 road conditions'],
        nearestHelp: 'Naltar Police Station'
      },
      {
        id: 'satrangi-lake',
        name: 'Satrangi & Bashkiri Lakes',
        elevationMeters: 3050,
        hazards: ['Marshy grounds'],
        nearestHelp: 'Naltar Tourist Info Desk'
      },
      {
        id: 'pari-lake',
        name: 'Pari Lake',
        elevationMeters: 3200,
        hazards: ['Cold mountain winds', 'Rapid afternoon rainstorms'],
        nearestHelp: 'Naltar Bala Post'
      }
    ],
    emergencyContacts: [
      { service: 'Gilgit Central Police Control', phone: '+92-5811-920222', location: 'Gilgit City' },
      { service: 'Provincial Headquarter Hospital (PHQ)', phone: '+92-5811-920250', location: 'Gilgit' },
      { service: 'Rescue 1122 Gilgit', phone: '1122', location: 'Gilgit' }
    ]
  }
];