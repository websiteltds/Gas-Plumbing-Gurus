/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  pricingInfo: string;
  commonIssues: string[];
  features: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  serviceType: string;
  urgency: 'emergency' | 'high' | 'standard';
  description: string;
  preferredDateTime: string;
  status: 'pending' | 'assigned' | 'en_route' | 'completed';
  createdAt: string;
  assignedGuru?: {
    name: string;
    gasSafeId: string;
    avatarUrl: string;
    etaMinutes: number;
    distanceMiles: number;
    phone: string;
  };
}

export const LONDON_SERVICES: Service[] = [
  {
    id: 'emergency-plumbing',
    title: 'Emergency Plumbing',
    shortDescription: '24/7 rapid response for active leaks, severe blockages, and pipe bursts.',
    longDescription: 'When water is flooding your home, every minute counts. Our emergency plumbers arrive within 45 minutes to isolate and repair critical plumbing issues right away.',
    iconName: 'ShieldAlert',
    pricingInfo: 'Request a Free Quote. Call 24/7 for immediate help.',
    commonIssues: [
      'Burst pipes and severe water leaks',
      'Blocked toilets, sinks, and main drains',
      'Flooding and pipe pressure failures'
    ],
    features: [
      'Active 24/7 dispatcher on call',
      'Rapid arrival under 45 minutes',
      'Full pipe isolation and fast repair'
    ]
  },
  {
    id: 'boiler-installation',
    title: 'Boiler Installation',
    shortDescription: 'Certified boiler installations and energy-efficient system upgrades.',
    longDescription: 'Upgrade to a modern, energy-efficient combi boiler and save up to 30% on heating bills. We handle expert installations with full warranties.',
    iconName: 'FlameKindling',
    pricingInfo: 'Book an Engineer today for a free visual on-site survey.',
    commonIssues: [
      'Old boiler replacement',
      'High heating bills and system noise',
      'Smart thermostat setup (Nest/Hive)'
    ],
    features: [
      'Up to 12 year warranties',
      'Certified Worcester/Vaillant experts',
      'Free visual on-site quote'
    ]
  },
  {
    id: 'boiler-repairs',
    title: 'Boiler Repairs & Servicing',
    shortDescription: 'Boiler breakdown diagnostics, fast repairs, and compliance servicing.',
    longDescription: 'No heating or hot water? Our Gas Safe engineers diagnose and repair boiler faults quickly. We also provide yearly safety servicing.',
    iconName: 'Wrench',
    pricingInfo: 'Request a Free Quote. Boiler service & maintenance on call.',
    commonIssues: [
      'No heating or hot water',
      'Low boiler pressure and lockouts',
      'Strange boiler noises'
    ],
    features: [
      'Gas Safe safety certificates',
      'Fault codes diagnostic experts',
      'Annual maintenance and servicing'
    ]
  },
  {
    id: 'leak-detection',
    title: 'Leak Detection & Pipe Repairs',
    shortDescription: 'Non-invasive acoustic and thermal imaging leak detection.',
    longDescription: 'Mystery damp patches or high water bills? We use non-invasive tools like thermal cameras and acoustic detectors to find hidden leaks.',
    iconName: 'Search',
    pricingInfo: 'Contact Us Today. Accurate detection and full repair support.',
    commonIssues: [
      'Mystery water pressure drop',
      'Damp or wet spots on walls',
      'Constantly spinning water meter'
    ],
    features: [
      'Non-invasive detection tools',
      'Precise moisture profiling',
      'Full report for insurance claims'
    ]
  },
  {
    id: 'general-plumbing',
    title: 'General Plumbing Maintenance',
    shortDescription: 'Taps, toilets, showers, and pipe maintenance.',
    longDescription: 'From leaking taps to custom bathroom waste setups, we offer highly professional general plumbing repairs with upfront pricing.',
    iconName: 'Hammer',
    pricingInfo: 'Book an Engineer. Straightforward, professional service with clear estimates.',
    commonIssues: [
      'Constantly running toilets',
      'Leaking taps and valves',
      'Shower pressure adjustments'
    ],
    features: [
      'Clean, respectful engineers',
      'Van stocked with general fittings',
      'All parts and labor guaranteed'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'James McAllister',
    location: 'Brixton Hill, SW2 Area',
    rating: 5,
    text: 'Excellent service! Professional and friendly team. Solved our bathroom leak quickly and left the place spotless.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    location: 'Clapham, SW2 Area',
    rating: 5,
    text: 'Arrived in under 30 minutes to fix an overflowing toilet. Helpful, fast, and highly professional service. Highly recommended!',
    date: '1 month ago',
    verified: true
  },
  {
    id: '3',
    author: 'Marcus Vance',
    location: 'Dulwich, SW2 Area',
    rating: 5,
    text: 'Located and fixed a complex, hidden pipe leak that another plumber had missed. Outstanding expertise.',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: '4',
    author: 'Clara Hughes',
    location: 'Streatham, SW2 Area',
    rating: 5,
    text: 'Our heating failed on Sunday morning. The engineer arrived within 30 minutes and got everything working before lunch.',
    date: '3 days ago',
    verified: true
  },
  {
    id: '5',
    author: 'Thomas Wright',
    location: 'Herne Hill, SW2 Area',
    rating: 5,
    text: 'Very clean and professional boiler installation. Clear upfront communication and great communication throughout.',
    date: '2 months ago',
    verified: true
  }
];

export const NEIGHBOURHOODS = [
  'Brixton Hill', 'Brixton', 'Clapham', 'Streatham', 'Dulwich', 'Herne Hill',
  'Balham', 'Tooting', 'Stockwell', 'Tulse Hill', 'Camberwell', 'Battersea',
  'Wandsworth', 'Lambeth', 'Southwark', 'Peckham', 'Kennington', 'Vauxhall'
];
