// app/trips/[id]/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SidebarDemo from "@/components/SidebarDemo";
import {
  BedDouble,
  Train,
  Utensils,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Car,
  Map as MapGuide,
  Download,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Trip data: Himachal, Kerala, Kashmir
 * (Detailed itinerary text included for each day.)
 */
type ItinDay = {
  day: number;
  title: string;
  desc: string;
  accommodation?: boolean;
  transport?: boolean;
  train?: boolean;
  meals?: boolean;
  guide?: boolean;
};

type Trip = {
  id: string;
  name: string;
  duration: string;
  price: number;
  images: string[];
  highlights: string[];
  itinerary: ItinDay[];
};

const tripsData: Record<string, Trip> = {
  himachal: {
    id: "himachal",
    name: "Himachal Explorer",
    duration: "10 Days / 9 Nights",
    price: 14999,
    images: ["/images/himachal.jpg", "/images/himachal1.png", "/images/himachal2.png"],
    highlights: ["Shimla", "Manali", "Rohtang Pass", "Kullu"],
    itinerary: [
      {
        day: 1,
        title: "Mumbai → Journey Start (Overnight Train)",
        desc:
          "Board Paschim Express / reserved train from Bandra/Bandra Terminus as per itinerary. Evening check-in at the train, overnight journey toward northern India — dinner & light refreshments on board. Rest and prepare for arrival next day.",
        accommodation: false,
        train: true,
        transport: true,
        meals: false,
      },
      {
        day: 2,
        title: "Arrival at Shimla · Check-in & Local Evening",
        desc:
          "Arrival at the scheduled station, transfer to the hotel in Shimla. After check-in and a short rest, enjoy Mall Road walk, Christ Church, and ridge area. Evening free for shopping and local cuisine. Overnight stay at hotel in Shimla (Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 3,
        title: "Shimla Sightseeing & Kufri Excursion",
        desc:
          "Post breakfast, head to Kufri for panoramic views and photo stops. Visit Jakhoo Temple (monkey shrine) and local vantage points. Return to Shimla for an evening at leisure. Overnight at Shimla hotel (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 4,
        title: "Drive Shimla → Manali (Scenic Route)",
        desc:
          "After early breakfast depart for Manali by private coach. The drive covers beautiful valleys, river-side panoramas and small hill towns. En-route refreshments and short stops; arrive Manali by evening and check-in. Overnight stay (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 5,
        title: "Manali Local · Hadimba Temple & Old Manali",
        desc:
          "Explore Hadimba Temple, Manu Temple, Vashisht hot springs and stroll around Old Manali cafes. Evening free to explore Mall Road and local markets. Overnight at Manali hotel (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 6,
        title: "Solang Valley Adventure",
        desc:
          "Day trip to Solang Valley for adventure activities — paragliding, zorbing, and snow-play (seasonal). Return in evening to Manali. Overnight stay at hotel (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 7,
        title: "Manali → Kullu Excursion",
        desc:
          "Short drive to Kullu, enjoy riverside views, local markets and optional river rafting (seasonal). Return to Manali in the evening for rest and overnight.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 8,
        title: "Return Journey Begins",
        desc:
          "Check out after breakfast and start return towards Chandigarh/railhead. Evening departure by reserved train towards home (overnight in train).",
        accommodation: false,
        transport: true,
        train: true,
        meals: true,
      },
      {
        day: 9,
        title: "Overnight Travel / Transit",
        desc:
          "Overnight on board the train — rest on board as train moves toward the originating city. Meals as scheduled.",
        accommodation: false,
        transport: true,
        train: true,
        meals: true,
      },
      {
        day: 10,
        title: "Arrival Home · Trip End",
        desc: "Arrive Back at Bandra Terminus / home station. Trip ends with drop/assistance to final destination.",
        accommodation: false,
        transport: true,
        meals: false,
      },
    ],
  },

  kerala: {
    id: "kerala",
    name: "Kerala Backwaters & Hills",
    duration: "9 Days / 8 Nights",
    price: 14999,
    images: ["/images/Kerala.jpg", "/images/kerala1.png", "/images/kerala2.png"],
    highlights: ["Munnar", "Alleppey", "Thekkady", "Jatayu","varkala", "kovalam"],
    itinerary: [
      {
        day: 1,
        title: "Arrival — Cochin (Kochi)",
        desc:
          "Touch down at Cochin. Meet & greet at the airport/station and transfer to the hotel. Post check-in, explore Fort Kochi — Dutch Palace, St. Francis Church and the iconic Chinese fishing nets. Evening traditional Kerala dinner and overnight stay in Cochin.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 2,
        title: "Cochin → Munnar (Tea Country)",
        desc:
          "After breakfast depart for Munnar. Drive through winding roads with rolling tea plantations and scenic waterfalls. On arrival, check in and relax. Evening visit tea garden viewpoints for sunset. Overnight at Munnar (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        desc:
          "Full day in Munnar visiting Eravikulam National Park (home of Nilgiri tahr), Anamudi Peak viewpoints, Mattupetty Dam and Tea Museum. Learn about tea processing and enjoy panoramic vistas. Overnight at Munnar hotel (Breakfast & Dinner).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 4,
        title: "Munnar → Thekkady (Periyar)",
        desc:
          "After breakfast leave for Thekkady. Arrive and check in. Afternoon spice plantation visit and traditional cooking demo (optional). In the evening, enjoy a boat safari at Periyar Lake (wildlife/elephant spotting possible). Overnight at Thekkady (Breakfast & Dinner).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 5,
        title: "Thekkady → Alleppey (Houseboat Cruise)",
        desc:
          "Drive to Alleppey after breakfast. Board a traditional Kerala houseboat for an overnight backwater cruise — gliding through palm-fringed canals, village life, paddy fields and rustic waterways. All meals on board with local Kerala cuisine served onboard. Overnight on houseboat.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 6,
        title: "Alleppey → jatayu",
        desc: 
          "Earth Center - Varkala ,Have breakfast & proceed towards the Worlds Largest bird Sculpture of Jatayu. Then heads towards Varkala beach. Enjoy your evening free time at Varkala Beach where you can enjoy surfing, banana boat rides & some other water sports adventures.Travel towards our hotel in Kovalam, have dinner & rest.Meals: Breakfast & DinnerDay 07 Kovalam - Poovar IslandToday morning relax on the Kovalam Beach, Visit the Lighthouse then checkout from kovalam. We will visit Aazimala shiva temple followed by a mesmerizing boat ride to explore Poovar Island. Then visit the 260-Year-old Sri Padmanabha Swamy Temple. Followed by local market visit. Later we will head towards Trivandrum Central Railway station.Meals: Breakfast",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
    {
        day: 7,
        title: "Kovalam - Poovar Island",
        desc:
          "Today morning relax on the Kovalam Beach, Visit the Lighthouse then checkout from kovalam. We will visit Aazimala shiva temple followed by a mesmerizing boat ride to explore Poovar Island. Then visit the 260-Year-old Sri Padmanabha Swamy Temple. Followed by local market visit. Later we will head towards Trivandrum Central Railway station.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 8,
        title: "Train Journey",
        desc:
          "Board train TVC NZM EXPRESS (22653) at 12.50 am towards Mumbai..",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 9,
        title: "Mumbai",
        desc:"Reach Vasai Road/Panvel early morning at around 4.40am with beautiful travel memories to cherish forever. NOTE: Reaching time in Mumbai depends upon Train reservation.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
    ],
  },

  kashmir: {
    id: "kashmir",
    name: "Majestic Kashmir Tour",
    duration: "11 Days / 10 Nights",
    price: 18499,
    images: ["/images/kashmir.jpeg", "/images/kashmir1.png", "/images/kashmir2.png"],
    highlights: ["Srinagar", "Gulmarg", "Pahalgam", "Dal Lake", "Sonmarg"],
    itinerary: [
      {
        day: 1,
        title: "Mumbai",
        desc:
          "Arrival at mumbai to board the 12925 paschim express. overnight in train",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 2,
        title: "Amritsar",
        desc:
          "raeach amritsar and overnight stay in  hotel (DJ night and dinner)",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 3,
        title: "Srinagar",
        desc:
          "after breakfast visit golden temple,jalianwala baug and wagah border and later proceed toward srinagr overnight journey.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 4,
        title: "Srinagar ",
        desc:
          "After Check In Breakfast And Rest  Local Sightseeing. Over Night Stay At Hotel (Srinagar) Meals - Breakfast And Dinner.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 5,
        title: "Srinagar - Sonmarg",
        desc:
          "After Breakfast Proceed To Sonmarg Visit Localsightseeing And Back To Srinagar.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
      {
          day: 6,
        title: "Gulmarg - Srinagar",
        desc:
          "After Breakfast Explore Gulmarg Known As Meadow Of Flowers, Enjoy The World Highest Cable Car Ride Upto The Afterwards Snow Point Free Time To Enjoy With Snow And Photography, Evening Back To Srinagar Hotel.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
       {
        day: 7,
        title: "Srinagar -Gulmarg - Srinagar",
        desc:
          "Early Morning Breakfast And Visit To Shankaracharya Hill And Mughal Garden, Shalimar Garden, cheshma Shahi Garden, Shikara Ride. Dinner And Over Night Stay In Houseboat.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
       {
        day: 8,
        title: "Pahalgam",
        desc:
          "After Breakfast Early Morning Check Out. Proceed To Phalagam Check In Hotel. Visit Aru Valley And Betaab Valley. Over Night Stay In Phalagam Meals - Breakfast and Dinner (Note: 4x4 Vehicle Extra Cost not included)",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
       {
        day: 9,
        title: "Pahalgam",
        desc:
          "After breakfast check out Proceed to Amritsar Over  night journey to Amritsar",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
       {
        day: 10,
        title: "Amritsar",
        desc:
          "Morning Reach At Railway Station Catch Train Towards Mumbai Over Night Journey In Train.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
       {
        day: 11,
        title: "Mumbai",
        desc:
          " Reach Mumbai With Beautiful Memories.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
    ],
  },

uttarakhand:{

    id:"uttatrakhand",
    name: "feel the richness of uttarakhand",
    duration: "9 Days / 8 Nights",
    price: 14999,
    images: ["/images/uttarakhand2.png", "/images/uttarakhand3.png","/images/uttarakhand.png"],
    highlights: ["Munnar", "Alleppey", "Thekkady", "Jatayu","varkala", "kovalam"],
    itinerary: [
      {
        day: 1,
        title: "Arrival — Cochin (Kochi)",
        desc:
          "Touch down at Cochin. Meet & greet at the airport/station and transfer to the hotel. Post check-in, explore Fort Kochi — Dutch Palace, St. Francis Church and the iconic Chinese fishing nets. Evening traditional Kerala dinner and overnight stay in Cochin.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 2,
        title: "Cochin → Munnar (Tea Country)",
        desc:
          "After breakfast depart for Munnar. Drive through winding roads with rolling tea plantations and scenic waterfalls. On arrival, check in and relax. Evening visit tea garden viewpoints for sunset. Overnight at Munnar (Breakfast & Dinner included).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        desc:
          "Full day in Munnar visiting Eravikulam National Park (home of Nilgiri tahr), Anamudi Peak viewpoints, Mattupetty Dam and Tea Museum. Learn about tea processing and enjoy panoramic vistas. Overnight at Munnar hotel (Breakfast & Dinner).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 4,
        title: "Munnar → Thekkady (Periyar)",
        desc:
          "After breakfast leave for Thekkady. Arrive and check in. Afternoon spice plantation visit and traditional cooking demo (optional). In the evening, enjoy a boat safari at Periyar Lake (wildlife/elephant spotting possible). Overnight at Thekkady (Breakfast & Dinner).",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 5,
        title: "Thekkady → Alleppey (Houseboat Cruise)",
        desc:
          "Drive to Alleppey after breakfast. Board a traditional Kerala houseboat for an overnight backwater cruise — gliding through palm-fringed canals, village life, paddy fields and rustic waterways. All meals on board with local Kerala cuisine served onboard. Overnight on houseboat.",
        accommodation: true,
        transport: true,
        meals: true,
        guide: true,
      },
      {
        day: 6,
        title: "Alleppey → jatayu",
        desc: 
          "Earth Center - Varkala ,Have breakfast & proceed towards the Worlds Largest bird Sculpture of Jatayu. Then heads towards Varkala beach. Enjoy your evening free time at Varkala Beach where you can enjoy surfing, banana boat rides & some other water sports adventures.Travel towards our hotel in Kovalam, have dinner & rest.Meals: Breakfast & DinnerDay 07 Kovalam - Poovar IslandToday morning relax on the Kovalam Beach, Visit the Lighthouse then checkout from kovalam. We will visit Aazimala shiva temple followed by a mesmerizing boat ride to explore Poovar Island. Then visit the 260-Year-old Sri Padmanabha Swamy Temple. Followed by local market visit. Later we will head towards Trivandrum Central Railway station.Meals: Breakfast",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
    {
        day: 7,
        title: "Kovalam - Poovar Island",
        desc:
          "Today morning relax on the Kovalam Beach, Visit the Lighthouse then checkout from kovalam. We will visit Aazimala shiva temple followed by a mesmerizing boat ride to explore Poovar Island. Then visit the 260-Year-old Sri Padmanabha Swamy Temple. Followed by local market visit. Later we will head towards Trivandrum Central Railway station.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 8,
        title: "Train Journey",
        desc:
          "Board train TVC NZM EXPRESS (22653) at 12.50 am towards Mumbai..",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
      {
        day: 9,
        title: "Mumbai",
        desc:"Reach Vasai Road/Panvel early morning at around 4.40am with beautiful travel memories to cherish forever. NOTE: Reaching time in Mumbai depends upon Train reservation.",
        accommodation: false,
        transport: true,
        meals: true,
        guide: false,
      },
    ],
  },

chardham:{
  id: "chardham",
  name: "The Sacred Char Dham Yatra",
  duration: "14 Days / 13 Nights",
  price: 25500,
    images: ["/images/badrinath.png", "/images/kedarnath1.png", "/images/gangotri.png", "/images/yamunotri.png"],
  highlights: [
    "Haridwar Ganga Aarti",
    "Yamunotri Glacier",
    "Devprayag Sangam",
    "Gangotri Temple",
    "Badrinath & Mana Village",
    "Kedarnath Temple",
    "Rishikesh River Rafting"
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure from Bandra Terminus",
      desc: "Begin your journey from Bandra Terminus to Delhi by train.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false,
    },
    {
      day: 2,
      title: "Arrival in Delhi & Transfer to Haridwar",
      desc: "Arrive in Delhi and proceed to Haridwar. Check-in and enjoy evening sightseeing including Ganga Aarti at Hari Ki Pauri.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 3,
      title: "Haridwar → Barkot",
      desc: "After breakfast, drive to Barkot via Kempty Falls. Check-in and relax.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 4,
      title: "Yamunotri Darshan",
      desc: "Travel to Hanuman Chatti, then Janki Chatti by jeep. Trek 6 km to Yamunotri Temple and return to Barkot.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 5,
      title: "Barkot → Uttarkashi",
      desc: "Drive to Uttarkashi via Prakateshwar Gufa. Visit Kashi Vishwanath Temple in the evening.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 6,
      title: "Gangotri Darshan",
      desc: "Visit Gangotri Temple and return to Uttarkashi for overnight stay.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 7,
      title: "Uttarkashi → Guptkashi",
      desc: "Early breakfast and drive to Guptkashi. Check-in and rest.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 8,
      title: "Guptkashi → Kedarnath",
      desc: "Proceed to Sonprayag and begin 22 km trek to Kedarnath Temple. Overnight stay near the temple.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 9,
      title: "Kedarnath → Guptkashi",
      desc: "Morning temple visit, then descend to Sonprayag and return to Guptkashi.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 10,
      title: "Guptkashi → Badrinath",
      desc: "Drive to Badrinath. Check-in and enjoy leisure time.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 11,
      title: "Badrinath → Pipalkoti",
      desc: "Visit Badrinath Temple, Vyas Gufa, Mana Village. Proceed to Pipalkoti for overnight stay.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 12,
      title: "Pipalkoti → Rishikesh",
      desc: "Drive to Rishikesh. Check-in and enjoy leisure time.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 13,
      title: "Rishikesh Sightseeing & Departure",
      desc: "Visit Laxman Jhula, local market, optional river rafting. Evening train to Mumbai.",
      accommodation: false,
      transport: true,
      meals: true,
      guide: true,
    },
    {
      day: 14,
      title: "Arrival in Mumbai",
      desc: "Reach Mumbai early morning with cherished memories.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false,
    },
  ],
},

kedarnath: {
  id: "kedarnath",
  name: "Kedarnath Spiritual Journey",
  duration: "8 Days / 7 Nights",
  price: 14999,
images: [
    "/images/kedarnath2.png",
    "/images/haridwar.png",
    "/images/rishikesh.png"
  ],

  highlights: [
    "Kedarnath Temple",
    "Guptkashi",
    "Sonprayag & Gaurikund",
    "Rudraprayag",
    "Ganga Aarti at Haridwar",
    "Devprayag Sangam",
    "18 km Trek to Kedarnath",
    "White Water Rafting at Rishikesh"
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure from Mumbai",
      desc: "Board train from Mumbai to Delhi.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false
    },
    {
      day: 2,
      title: "Arrival in Delhi & Transfer to Haridwar",
      desc: "Check-in at hotel, rest till evening, then enjoy Ganga Aarti at Har Ki Pauri.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 3,
      title: "Haridwar → Guptkashi",
      desc: "Early breakfast and drive to Guptkashi. Check-in and relax.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 4,
      title: "Guptkashi → Kedarnath Trek",
      desc: "Depart for Sonprayag and begin 18 km trek to Kedarnath. Overnight stay near temple.",
      accommodation: true,
      transport: true,
      meals: false,
      guide: true
    },
    {
      day: 5,
      title: "Kedarnath → Guptkashi",
      desc: "Morning check-out and return trek to Sonprayag. Drive back to Guptkashi.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 6,
      title: "Guptkashi → Rishikesh",
      desc: "Drive to Rishikesh. Visit Ram Jhula & Laxman Jhula. Enjoy DJ night.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 7,
      title: "Rishikesh → Delhi",
      desc: "Breakfast and packed food served. Depart to railway station.",
      accommodation: false,
      transport: true,
      meals: true,
      guide: false
    },
    {
      day: 8,
      title: "Arrival in Mumbai",
      desc: "Reach Mumbai with unforgettable memories.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false
    },
  ],
},
dodham:{
  id: "dodham",
  name: "Kedarnath & Badrinath Do Dham Yatra",
  duration: "9 Days / 8 Nights",
  price: 18999,
  images: [
    "/images/kedarnath3.png",
    "/images/badrinath.png",
    "/images/haridwar.png",
    "/images/rishikesh.png"
  ],
  highlights: [
    "Kedarnath Temple",
    "Badrinath Temple",
    "Guptkashi",
    "Sonprayag & Gaurikund",
    "Rudraprayag",
    "Ganga Aarti at Haridwar",
    "Devprayag Sangam",
    "18 km Trek to Kedarnath",
    "White Water Rafting at Rishikesh"
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure from Mumbai",
      desc: "Board train from Mumbai to Delhi.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false
    },
    {
      day: 2,
      title: "Arrival in Delhi & Transfer to Haridwar",
      desc: "Arrive in Delhi and proceed to Haridwar. Evening sightseeing includes Ganga Aarti at Har Ki Pauri.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 3,
      title: "Haridwar → Guptkashi",
      desc: "Early breakfast and drive to Guptkashi. Check-in and relax.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 4,
      title: "Guptkashi → Kedarnath Trek",
      desc: "Depart for Sonprayag and begin 18 km trek to Kedarnath. Overnight stay near temple.",
      accommodation: true,
      transport: true,
      meals: false,
      guide: true
    },
    {
      day: 5,
      title: "Kedarnath → Guptkashi",
      desc: "Morning check-out and return trek to Sonprayag. Drive back to Guptkashi.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 6,
      title: "Guptkashi → Badrinath",
      desc: "Drive to Badrinath. Evening darshan at Badrinath Temple.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 7,
      title: "Badrinath → Rishikesh",
      desc: "Drive to Rishikesh. Visit Ram Jhula & Laxman Jhula. Enjoy DJ night.",
      accommodation: true,
      transport: true,
      meals: true,
      guide: true
    },
    {
      day: 8,
      title: "Rishikesh → Delhi",
      desc: "Breakfast and packed food served. Depart to railway station.",
      accommodation: false,
      transport: true,
      meals: true,
      guide: false
    },
    {
      day: 9,
      title: "Arrival in Mumbai",
      desc: "Reach Mumbai with unforgettable memories.",
      accommodation: false,
      transport: true,
      meals: false,
      guide: false
    },
  ],
},


}


// mapping to PDF file names in public/pdfs
const pdfMap: Record<string, string> = {
  himachal: "/pdfs/himachal-itinerary.pdf",
  kerala: "/pdfs/Kerala-itinerary.pdf",
  kashmir: "/pdfs/kashmir-itinerary.pdf",
  uttarakhand:"/pdfs/uttarakhand-itinerary.pdf",
  chardham:"/pdfs/chardham-itinerary.pdf",
  dodham:"/pdfs/dodhaam-itinerary.pdf",
  kedarnath:"/pdfs/Kedarnath-itinerary.pdf",
};



// ================== Component ===================
export default function TripDetailPage(): React.ReactElement {
  const { id } = useParams();
  const trip = id ? tripsData[id as keyof typeof tripsData] : undefined;

  const [current, setCurrent] = useState(0);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLaunching, setIsLaunching] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const planeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trip) return;
    const t = setInterval(
      () => setCurrent((s) => (trip.images ? (s + 1) % trip.images.length : 0)),
      4000
    );
    return () => clearInterval(t);
  }, [trip]);

  if (!trip) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-900">Trip not found.</p>
      </main>
    );
  }

  const totalAmount = Math.round(trip.price * adults + trip.price * 0.5 * children);

  const handleDownloadItinerary = () => {
    const pdfPath = pdfMap[trip.id];
    if (!pdfPath) {
      alert("PDF not available for this trip.");
      return;
    }
    setShowPlane(true);
    setIsLaunching(true);
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = pdfPath;
      a.download = `${trip.id}-itinerary.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setIsLaunching(false);
      setTimeout(() => setShowPlane(false), 600);
    }, 1100);
  };

  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Image
              src={trip.images[current]}
              alt={trip.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {trip.name}
              </h1>
              <p className="text-sm md:text-lg text-gray-200 max-w-2xl mt-3">
                {trip.duration} • {trip.highlights.join(" • ")}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* SIDEBAR */}
        <aside className="md:col-span-1">
          <div className="bg-gradient-to-b from-orange-600 to-black p-6 rounded-2xl text-white sticky top-8 z-20">
            <div className="mb-4">
              <Image
                src={trip.images[0]}
                alt={trip.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-extrabold">{trip.name}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-orange-200">
              <Calendar className="w-4 h-4" />
              <span>{trip.duration}</span>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold">{`₹${trip.price.toLocaleString()}`}</p>
              <p className="text-xs text-orange-100 mt-1">All-inclusive pricing</p>
            </div>

            {/* Booking form */}
            <div className="mt-6 space-y-3 text-white">
              <label className="block text-sm font-semibold">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md px-3 py-2 text-black"
              />

              <div className="flex gap-3 mt-2">
                <div className="flex-1">
                  <label className="text-sm font-semibold">Adults</label>
                  <input
                    type="number"
                    min={1}
                    value={adults}
                    onChange={(e) =>
                      setAdults(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full rounded-md px-3 py-2 text-black"
                  />
                </div>
                <div className="w-28">
                  <label className="text-sm font-semibold">Children</label>
                  <input
                    type="number"
                    min={0}
                    value={children}
                    onChange={(e) =>
                      setChildren(Math.max(0, Number(e.target.value) || 0))
                    }
                    className="w-full rounded-md px-3 py-2 text-black"
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="font-semibold">Total</p>
                <p className="text-2xl font-extrabold">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => {
                    if (!selectedDate) {
                      alert("Select a date first.");
                      return;
                    }
                    setShowQR(true);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded-xl"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* ITINERARY SECTION */}
        <article className="md:col-span-2">
          <h3 className="text-2xl font-bold text-orange-500 mb-4">Detailed Itinerary</h3>
          <div className="space-y-6">
            {trip.itinerary.map((d) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="p-5 rounded-2xl border border-orange-200 bg-white/5 backdrop-blur-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold">Day {d.day} — {d.title}</h4>
                    <p className="text-sm text-gray-300 mt-2">{d.desc}</p>
                  </div>
                  <div className="ml-4 flex flex-col items-end gap-2 text-orange-400">
                    <div className="flex gap-2">
                      {d.accommodation && <BedDouble className="w-5 h-5" />}
                      {d.train && <Train className="w-5 h-5" />}
                      {d.transport && <Car className="w-5 h-5" />}
                      {d.guide && <MapGuide className="w-5 h-5" />}
                      {d.meals && <Utensils className="w-5 h-5" />}
                    </div>
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download CTA */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleDownloadItinerary}
              className="flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold px-5 py-3"
            >
              <Download className="w-4 h-4" />
              Download Full PDF Itinerary
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-orange-600 text-orange-400 px-5 py-3"
            >
              Print
            </button>
          </div>
        </article>
      </section>

      {/* ===== QR Modal ===== */}
      {showQR && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[10000]">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-3 text-orange-500">Scan to Book</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Use any UPI / payment scanner to complete your booking.
            </p>

            <div className="border-2 border-orange-500 rounded-xl p-3 bg-white dark:bg-gray-800">
              <Image
                src="/images/qr1.jpg"
                alt="Booking QR"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Once payment is done, our team will confirm your booking via WhatsApp 📩
            </p>
          </div>
        </div>
      )}

      {/* Paper plane animation */}
      {showPlane && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <motion.div
            ref={planeRef}
            initial={{ x: -80, y: window.innerHeight / 2 - 80, rotate: -15, scale: 0.9 }}
            animate={{ x: window.innerWidth + 40, y: 40, rotate: 0, scale: 0.5 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
            className="absolute"
          >
            <svg
              width="84"
              height="84"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <path d="M2 30L62 2L34 62L26 38L2 30Z" fill="#FF7A00" stroke="#fff" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      )}

      <SidebarDemo />
    </main>
  );
}
