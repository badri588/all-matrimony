import React, { createContext, useContext, useMemo, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

const MatrimonyContext = createContext(null);

const img = (imageFile) => imageFile;

/*
  IMPORTANT:
  Mee images folder:
  assets/Images/

  Ippudu anni images anjali.avif ki set chesanu.
  Later meeru prati id ki separate image pettali ante,
  only below PROFILE_IMAGES / SERVICE_IMAGES lo require file name change cheyyandi.

  Example:
  b1: img(require("../../assets/Images/anjali.avif")),
  b2: img(require("../../assets/Images/priya.avif")),
  g1: img(require("../../assets/Images/rahul.avif")),
  s1: img(require("../../assets/Images/functionhall.avif")),
*/

const PROFILE_IMAGES = {
  // Brides
  b1: img(require("../../assets/Images/anjali-varghese.avif")),
  b2: img(require("../../assets/Images/priya-sharma.avif")),
  b3: img(require("../../assets/Images/fathima-rahman.avif")),
  b4: img(require("../../assets/Images/sneha-reddy.avif")),
  b5: img(require("../../assets/Images/maria-thomas.avif")),
  b6: img(require("../../assets/Images/ayesha-khan.avif")),
  b7: img(require("../../assets/Images/kavya-nair.avif")),
  b8: img(require("../../assets/Images/neha-patel.avif")),
  b9: img(require("../../assets/Images/divya-menon.avif")),
  b10: img(require("../../assets/Images/rachel-mathew.avif")),
  b11: img(require("../../assets/Images/sana-shaikh.avif")),
  b12: img(require("../../assets/Images/meera-iyer.avif")),
  b13: img(require("../../assets/Images/christina-joseph.avif")),
  b14: img(require("../../assets/Images/lakshmi-rao.avif")),
  b15: img(require("../../assets/Images/nimisha-george.avif")),

  // Grooms
  g1: img(require("../../assets/Images/rahul-nair.avif")),
  g2: img(require("../../assets/Images/arjun-reddy.avif")),
  g3: img(require("../../assets/Images/mohammed-sameer.avif")),
  g4: img(require("../../assets/Images/kevin-thomas.avif")),
  g5: img(require("../../assets/Images/vishnu-menon.avif")),
  g6: img(require("../../assets/Images/imran-khan.avif")),
  g7: img(require("../../assets/Images/mathew-kurian.avif")),
  g8: img(require("../../assets/Images/nikhil-sharma.avif")),
  g9: img(require("../../assets/Images/aditya-rao.avif")),
  g10: img(require("../../assets/Images/joel-joseph.avif")),
  g11: img(require("../../assets/Images/faizal-ahmed.avif")),
  g12: img(require("../../assets/Images/sandeep-patel.avif")),
  g13: img(require("../../assets/Images/alan-george.avif")),
  g14: img(require("../../assets/Images/kiran-kumar.avif")),
  g15: img(require("../../assets/Images/rohit-verma.avif")),

  defaultProfile: img(require("../../assets/Images/all-hero.png")),
};

const SERVICE_IMAGES = {
  // s1: Royal Function Hall
  s1: img(require("../../assets/Images/functionhall.avif")),

  // s2: Dream Wedding Photography
  s2: img(require("../../assets/Images/weddingphotography.avif")),

  // s3: Traditional Wedding Cooking
  s3: img(require("../../assets/Images/cooking.avif")),

  // s4: Bridal Glow Makeup
  s4: img(require("../../assets/Images/bridalmakeup.avif")),

  // s5: Elegant Wedding Decor
  s5: img(require("../../assets/Images/decor.avif")),

  // s6: Elite Event Planners
  s6: img(require("../../assets/Images/eventplanner.avif")),

  // s7: Melody Wedding Arkestra
  s7: img(require("../../assets/Images/arkestra.webp")),

  // s8: Grand Arkestra Night
  s8: img(require("../../assets/Images/arkestranight.jpg")),

  // s9: Royal Wedding Cooking Team
  s9: img(require("../../assets/Images/cookingteam.jpg")),

  // s10: Wedding Cleaning Support
  s10: img(require("../../assets/Images/cleaningteam.avif")),

  // s11: Premium Event Cleaning Team
  s11: img(require("../../assets/Images/eventclanteam.avif")),

  // s12: Sri Lakshmi Function Hall
  s12: img(require("../../assets/Images/functionhall-wed.avif")),

  // s13: Bride Luxury Car Service
  s13: img(require("../../assets/Images/bridecar.avif")),

  // s14: Groom Premium Car Service
  s14: img(require("../../assets/Images/groomcar.avif")),

  defaultService: img(require("../../assets/Images/all-hero.png")),
};

const demoProfiles = [
  {
    id: "b1",
    name: "Anjali Varghese",
    gender: "Bride",
    age: 25,
    community: "Christian",
    religion: "Christian",
    location: "Kochi, Kerala",
    education: "M.Tech",
    job: "Software Engineer",
    income: "₹12 LPA",
    height: "5'4",
    image: PROFILE_IMAGES.b1,
    photos: [PROFILE_IMAGES.b1],
    about:
      "Family oriented and career focused. Looking for a caring, educated and respectful life partner.",
  },
  {
    id: "b2",
    name: "Priya Sharma",
    gender: "Bride",
    age: 24,
    community: "Hindu",
    religion: "Hindu",
    location: "Hyderabad, Telangana",
    education: "B.Tech",
    job: "UI Designer",
    income: "₹8 LPA",
    height: "5'3",
    image: PROFILE_IMAGES.b2,
    photos: [PROFILE_IMAGES.b2],
    about:
      "Creative, simple and family loving person. Interested in design, travel and cultural values.",
  },
  {
    id: "b3",
    name: "Fathima Rahman",
    gender: "Bride",
    age: 24,
    community: "Muslim",
    religion: "Muslim",
    location: "Calicut, Kerala",
    education: "BDS",
    job: "Dentist",
    income: "₹9 LPA",
    height: "5'3",
    image: PROFILE_IMAGES.b3,
    photos: [PROFILE_IMAGES.b3],
    about:
      "Dentist from Calicut. Looking for a respectful, well settled and family-oriented groom.",
  },
  {
    id: "b4",
    name: "Sneha Reddy",
    gender: "Bride",
    age: 26,
    community: "Hindu",
    religion: "Hindu",
    location: "Bengaluru, Karnataka",
    education: "MBA",
    job: "HR Manager",
    income: "₹10 LPA",
    height: "5'5",
    image: PROFILE_IMAGES.b4,
    photos: [PROFILE_IMAGES.b4],
    about:
      "Warm, responsible and ambitious. Looking for a partner with good values and positive mindset.",
  },
  {
    id: "b5",
    name: "Maria Thomas",
    gender: "Bride",
    age: 27,
    community: "Christian",
    religion: "Christian",
    location: "Kottayam, Kerala",
    education: "M.Sc Nursing",
    job: "Nurse",
    income: "₹7 LPA",
    height: "5'4",
    image: PROFILE_IMAGES.b5,
    photos: [PROFILE_IMAGES.b5],
    about:
      "Caring and soft-spoken person. Believes in family bonding, faith and mutual respect.",
  },
  {
    id: "b6",
    name: "Ayesha Khan",
    gender: "Bride",
    age: 25,
    community: "Muslim",
    religion: "Muslim",
    location: "Mumbai, Maharashtra",
    education: "B.Com",
    job: "Bank Executive",
    income: "₹6 LPA",
    height: "5'2",
    image: PROFILE_IMAGES.b6,
    photos: [PROFILE_IMAGES.b6],
    about:
      "Simple, educated and family oriented. Looking for a supportive and settled partner.",
  },
  {
    id: "b7",
    name: "Kavya Nair",
    gender: "Bride",
    age: 23,
    community: "Hindu",
    religion: "Hindu",
    location: "Thrissur, Kerala",
    education: "B.Arch",
    job: "Architect",
    income: "₹8.5 LPA",
    height: "5'6",
    image: PROFILE_IMAGES.b7,
    photos: [PROFILE_IMAGES.b7],
    about:
      "Passionate about architecture, arts and family life. Looking for a mature and kind partner.",
  },
  {
    id: "b8",
    name: "Neha Patel",
    gender: "Bride",
    age: 26,
    community: "Hindu",
    religion: "Hindu",
    location: "Ahmedabad, Gujarat",
    education: "CA",
    job: "Chartered Accountant",
    income: "₹14 LPA",
    height: "5'4",
    image: PROFILE_IMAGES.b8,
    photos: [PROFILE_IMAGES.b8],
    about:
      "Professionally qualified and family loving. Looking for an understanding and responsible groom.",
  },
  {
    id: "b9",
    name: "Divya Menon",
    gender: "Bride",
    age: 28,
    community: "Hindu",
    religion: "Hindu",
    location: "Chennai, Tamil Nadu",
    education: "MCA",
    job: "Software Developer",
    income: "₹13 LPA",
    height: "5'5",
    image: PROFILE_IMAGES.b9,
    photos: [PROFILE_IMAGES.b9],
    about:
      "Calm, confident and career focused. Values honesty, respect and family traditions.",
  },
  {
    id: "b10",
    name: "Rachel Mathew",
    gender: "Bride",
    age: 25,
    community: "Christian",
    religion: "Christian",
    location: "Ernakulam, Kerala",
    education: "B.Pharm",
    job: "Pharmacist",
    income: "₹6.5 LPA",
    height: "5'3",
    image: PROFILE_IMAGES.b10,
    photos: [PROFILE_IMAGES.b10],
    about:
      "Kind-hearted and family attached. Looking for a caring groom with good education and values.",
  },
  {
    id: "b11",
    name: "Sana Shaikh",
    gender: "Bride",
    age: 24,
    community: "Muslim",
    religion: "Muslim",
    location: "Pune, Maharashtra",
    education: "MBA",
    job: "Marketing Executive",
    income: "₹7.5 LPA",
    height: "5'4",
    image: PROFILE_IMAGES.b11,
    photos: [PROFILE_IMAGES.b11],
    about:
      "Modern yet traditional. Interested in family, career growth and meaningful relationships.",
  },
  {
    id: "b12",
    name: "Meera Iyer",
    gender: "Bride",
    age: 27,
    community: "Hindu",
    religion: "Hindu",
    location: "Coimbatore, Tamil Nadu",
    education: "M.A English",
    job: "Teacher",
    income: "₹5.5 LPA",
    height: "5'2",
    image: PROFILE_IMAGES.b12,
    photos: [PROFILE_IMAGES.b12],
    about:
      "Teacher by profession. Loves reading, family gatherings and simple living.",
  },
  {
    id: "b13",
    name: "Christina Joseph",
    gender: "Bride",
    age: 26,
    community: "Christian",
    religion: "Christian",
    location: "Trivandrum, Kerala",
    education: "B.Tech",
    job: "QA Engineer",
    income: "₹9 LPA",
    height: "5'6",
    image: PROFILE_IMAGES.b13,
    photos: [PROFILE_IMAGES.b13],
    about:
      "Positive, practical and family focused. Looking for a loyal and supportive life partner.",
  },
  {
    id: "b14",
    name: "Lakshmi Rao",
    gender: "Bride",
    age: 23,
    community: "Hindu",
    religion: "Hindu",
    location: "Mysuru, Karnataka",
    education: "B.Sc",
    job: "Lab Technician",
    income: "₹4.8 LPA",
    height: "5'1",
    image: PROFILE_IMAGES.b14,
    photos: [PROFILE_IMAGES.b14],
    about:
      "Simple and caring person. Looking for a groom who respects family and relationships.",
  },
  {
    id: "b15",
    name: "Nimisha George",
    gender: "Bride",
    age: 29,
    community: "Christian",
    religion: "Christian",
    location: "Alappuzha, Kerala",
    education: "MBA Finance",
    job: "Finance Analyst",
    income: "₹11 LPA",
    height: "5'5",
    image: PROFILE_IMAGES.b15,
    photos: [PROFILE_IMAGES.b15],
    about:
      "Finance professional with strong family values. Looking for a mature and caring partner.",
  },

  {
    id: "g1",
    name: "Rahul Nair",
    gender: "Groom",
    age: 29,
    community: "Hindu",
    religion: "Hindu",
    location: "Trivandrum, Kerala",
    education: "MBA",
    job: "Business Consultant",
    income: "₹18 LPA",
    height: "5'9",
    image: PROFILE_IMAGES.g1,
    photos: [PROFILE_IMAGES.g1],
    about:
      "MBA graduate and business consultant. Looking for an educated and family-oriented bride.",
  },
  {
    id: "g2",
    name: "Arjun Reddy",
    gender: "Groom",
    age: 30,
    community: "Hindu",
    religion: "Hindu",
    location: "Hyderabad, Telangana",
    education: "B.Tech",
    job: "Software Engineer",
    income: "₹20 LPA",
    height: "5'10",
    image: PROFILE_IMAGES.g2,
    photos: [PROFILE_IMAGES.g2],
    about:
      "Software engineer working in Hyderabad. Values family, career and mutual understanding.",
  },
  {
    id: "g3",
    name: "Mohammed Sameer",
    gender: "Groom",
    age: 28,
    community: "Muslim",
    religion: "Muslim",
    location: "Kochi, Kerala",
    education: "B.Com",
    job: "Entrepreneur",
    income: "₹15 LPA",
    height: "5'8",
    image: PROFILE_IMAGES.g3,
    photos: [PROFILE_IMAGES.g3],
    about:
      "Running own business. Looking for a kind, educated and family-loving bride.",
  },
  {
    id: "g4",
    name: "Kevin Thomas",
    gender: "Groom",
    age: 31,
    community: "Christian",
    religion: "Christian",
    location: "Bengaluru, Karnataka",
    education: "M.Tech",
    job: "Tech Lead",
    income: "₹28 LPA",
    height: "5'11",
    image: PROFILE_IMAGES.g4,
    photos: [PROFILE_IMAGES.g4],
    about:
      "Tech lead in Bengaluru. Looking for a caring bride with strong family values.",
  },
  {
    id: "g5",
    name: "Vishnu Menon",
    gender: "Groom",
    age: 27,
    community: "Hindu",
    religion: "Hindu",
    location: "Thrissur, Kerala",
    education: "BBA",
    job: "Family Business",
    income: "₹16 LPA",
    height: "5'9",
    image: PROFILE_IMAGES.g5,
    photos: [PROFILE_IMAGES.g5],
    about:
      "Involved in family business. Friendly, responsible and family attached.",
  },
  {
    id: "g6",
    name: "Imran Khan",
    gender: "Groom",
    age: 29,
    community: "Muslim",
    religion: "Muslim",
    location: "Mumbai, Maharashtra",
    education: "MBA",
    job: "Sales Manager",
    income: "₹14 LPA",
    height: "5'10",
    image: PROFILE_IMAGES.g6,
    photos: [PROFILE_IMAGES.g6],
    about:
      "Sales manager in Mumbai. Looking for a simple, educated and understanding bride.",
  },
  {
    id: "g7",
    name: "Mathew Kurian",
    gender: "Groom",
    age: 32,
    community: "Christian",
    religion: "Christian",
    location: "Kottayam, Kerala",
    education: "MBBS",
    job: "Doctor",
    income: "₹30 LPA",
    height: "5'11",
    image: PROFILE_IMAGES.g7,
    photos: [PROFILE_IMAGES.g7],
    about:
      "Doctor by profession. Looking for a caring, educated and family-oriented bride.",
  },
  {
    id: "g8",
    name: "Nikhil Sharma",
    gender: "Groom",
    age: 28,
    community: "Hindu",
    religion: "Hindu",
    location: "Delhi",
    education: "CA",
    job: "Finance Consultant",
    income: "₹22 LPA",
    height: "5'8",
    image: PROFILE_IMAGES.g8,
    photos: [PROFILE_IMAGES.g8],
    about:
      "Finance consultant with modern outlook and traditional values. Looking for a compatible partner.",
  },
  {
    id: "g9",
    name: "Aditya Rao",
    gender: "Groom",
    age: 30,
    community: "Hindu",
    religion: "Hindu",
    location: "Chennai, Tamil Nadu",
    education: "MCA",
    job: "Product Manager",
    income: "₹24 LPA",
    height: "5'10",
    image: PROFILE_IMAGES.g9,
    photos: [PROFILE_IMAGES.g9],
    about:
      "Product manager working in tech industry. Believes in respect, honesty and shared goals.",
  },
  {
    id: "g10",
    name: "Joel Joseph",
    gender: "Groom",
    age: 28,
    community: "Christian",
    religion: "Christian",
    location: "Ernakulam, Kerala",
    education: "B.Tech",
    job: "Civil Engineer",
    income: "₹10 LPA",
    height: "5'9",
    image: PROFILE_IMAGES.g10,
    photos: [PROFILE_IMAGES.g10],
    about:
      "Civil engineer from Ernakulam. Looking for a simple, caring and supportive bride.",
  },
  {
    id: "g11",
    name: "Faizal Ahmed",
    gender: "Groom",
    age: 31,
    community: "Muslim",
    religion: "Muslim",
    location: "Calicut, Kerala",
    education: "B.Tech",
    job: "Project Engineer",
    income: "₹13 LPA",
    height: "5'10",
    image: PROFILE_IMAGES.g11,
    photos: [PROFILE_IMAGES.g11],
    about:
      "Project engineer with stable career. Looking for a bride who values family and respect.",
  },
  {
    id: "g12",
    name: "Sandeep Patel",
    gender: "Groom",
    age: 29,
    community: "Hindu",
    religion: "Hindu",
    location: "Ahmedabad, Gujarat",
    education: "MBA",
    job: "Business Owner",
    income: "₹25 LPA",
    height: "5'9",
    image: PROFILE_IMAGES.g12,
    photos: [PROFILE_IMAGES.g12],
    about:
      "Business owner from Ahmedabad. Looking for an educated and family-loving partner.",
  },
  {
    id: "g13",
    name: "Alan George",
    gender: "Groom",
    age: 27,
    community: "Christian",
    religion: "Christian",
    location: "Pune, Maharashtra",
    education: "B.Sc IT",
    job: "System Analyst",
    income: "₹12 LPA",
    height: "5'8",
    image: PROFILE_IMAGES.g13,
    photos: [PROFILE_IMAGES.g13],
    about:
      "System analyst working in Pune. Calm, responsible and family focused.",
  },
  {
    id: "g14",
    name: "Kiran Kumar",
    gender: "Groom",
    age: 33,
    community: "Hindu",
    religion: "Hindu",
    location: "Mysuru, Karnataka",
    education: "M.Com",
    job: "Bank Manager",
    income: "₹17 LPA",
    height: "5'7",
    image: PROFILE_IMAGES.g14,
    photos: [PROFILE_IMAGES.g14],
    about:
      "Bank manager with stable career. Looking for a mature and caring bride.",
  },
  {
    id: "g15",
    name: "Rohit Verma",
    gender: "Groom",
    age: 26,
    community: "Hindu",
    religion: "Hindu",
    location: "Bhopal, Madhya Pradesh",
    education: "B.Tech",
    job: "Data Analyst",
    income: "₹9 LPA",
    height: "5'9",
    image: PROFILE_IMAGES.g15,
    photos: [PROFILE_IMAGES.g15],
    about:
      "Data analyst with positive mindset. Looking for an understanding and supportive life partner.",
  },
];

const demoServices = [
  {
    id: "s1",
    title: "Royal Function Hall",
    category: "Function Hall",
    location: "Kochi",
    price: "₹1,50,000 onwards",
    rating: 4.8,
    image: SERVICE_IMAGES.s1,
    description:
      "Premium AC function hall with 1000 seating capacity, parking, grand stage, dining area and decoration support.",
  },
  {
    id: "s2",
    title: "Dream Wedding Photography",
    category: "Photography",
    location: "Kerala",
    price: "₹75,000 onwards",
    rating: 4.7,
    image: SERVICE_IMAGES.s2,
    description:
      "Wedding photography, candid shoot, pre-wedding shoot and cinematic video coverage.",
  },
  {
    id: "s3",
    title: "Traditional Wedding Cooking",
    category: "Cooking",
    location: "Thrissur",
    price: "₹350 per plate",
    rating: 4.6,
    image: SERVICE_IMAGES.s3,
    description:
      "Traditional wedding cooking, Kerala sadya, biriyani, buffet, live counters and custom wedding menu.",
  },
  {
    id: "s4",
    title: "Bridal Glow Makeup",
    category: "Makeup",
    location: "Kottayam",
    price: "₹25,000 onwards",
    rating: 4.9,
    image: SERVICE_IMAGES.s4,
    description:
      "Professional bridal makeup, engagement makeup and family makeup packages.",
  },
  {
    id: "s5",
    title: "Elegant Wedding Decor",
    category: "Decoration",
    location: "Hyderabad",
    price: "₹85,000 onwards",
    rating: 4.7,
    image: SERVICE_IMAGES.s5,
    description:
      "Stage decoration, floral decor, mandap setup, reception theme and lighting design.",
  },
  {
    id: "s6",
    title: "Elite Event Planners",
    category: "Event Planner",
    location: "Bengaluru",
    price: "₹1,20,000 onwards",
    rating: 4.8,
    image: SERVICE_IMAGES.s6,
    description:
      "Complete wedding planning, guest management, vendor coordination and event execution.",
  },
  {
    id: "s7",
    title: "Melody Wedding Arkestra",
    category: "Arkestra",
    location: "Vijayawada",
    price: "₹45,000 onwards",
    rating: 4.6,
    image: SERVICE_IMAGES.s7,
    description:
      "Live arkestra, wedding music band, singers, sound system, devotional songs and reception music setup.",
  },
  {
    id: "s8",
    title: "Grand Arkestra Night",
    category: "Arkestra",
    location: "Hyderabad",
    price: "₹65,000 onwards",
    rating: 4.8,
    image: SERVICE_IMAGES.s8,
    description:
      "Professional stage arkestra with singers, keyboard, drums, lights, DJ support and full sound setup.",
  },
  {
    id: "s9",
    title: "Royal Wedding Cooking Team",
    category: "Cooking",
    location: "Rajahmundry",
    price: "₹300 per plate",
    rating: 4.7,
    image: SERVICE_IMAGES.s9,
    description:
      "Expert cooking team for marriage functions, breakfast, lunch, dinner, sweets and special traditional menus.",
  },
  {
    id: "s10",
    title: "Wedding Cleaning Support",
    category: "Cleaning",
    location: "Kochi",
    price: "₹18,000 onwards",
    rating: 4.5,
    image: SERVICE_IMAGES.s10,
    description:
      "Pre-function and post-function cleaning, hall cleaning, dining area cleaning, waste management and support staff.",
  },
  {
    id: "s11",
    title: "Premium Event Cleaning Team",
    category: "Cleaning",
    location: "Bengaluru",
    price: "₹25,000 onwards",
    rating: 4.7,
    image: SERVICE_IMAGES.s11,
    description:
      "Professional cleaning team for large marriage events, stage area, kitchen area, guest area and after-event cleanup.",
  },
  {
    id: "s12",
    title: "Sri Lakshmi Function Hall",
    category: "Function Hall",
    location: "Hyderabad",
    price: "₹2,00,000 onwards",
    rating: 4.8,
    image: SERVICE_IMAGES.s12,
    description:
      "Spacious function hall with AC, stage, dining hall, parking, rooms, decoration support and power backup.",
  },
  {
    id: "s13",
    title: "Bride Luxury Car Service",
    category: "Bride And Groom Car Services",
    location: "Kochi",
    price: "₹18,000 onwards",
    rating: 4.7,
    image: SERVICE_IMAGES.s13,
    description:
      "Luxury bride entry car, decorated wedding car, pickup and drop service with professional driver.",
  },
  {
    id: "s14",
    title: "Groom Premium Car Service",
    category: "Bride And Groom Car Services",
    location: "Hyderabad",
    price: "₹22,000 onwards",
    rating: 4.8,
    image: SERVICE_IMAGES.s14,
    description:
      "Premium decorated groom car, luxury sedan/SUV options, driver service and wedding day transport support.",
  },
];

const defaultMyProfile = {
  name: "My Matrimony Profile",
  gender: "Groom",
  age: "",
  dob: "",
  phone: "",
  email: "",
  community: "",
  religion: "",
  caste: "",
  location: "",
  education: "",
  job: "",
  income: "",
  height: "",
  maritalStatus: "Never Married",
  familyType: "",
  fatherName: "",
  motherName: "",
  siblings: "",
  about: "",
  partnerAge: "",
  partnerCommunity: "",
  partnerLocation: "",
  partnerEducation: "",
  image: PROFILE_IMAGES.defaultProfile,
  photos: [PROFILE_IMAGES.defaultProfile],
  profileCompletion: 25,
  approvalStatus: "Not Submitted",
  verificationStatus: "Not Submitted",
};

export function MatrimonyProvider({ children }) {
  const [profiles, setProfiles] = useState(demoProfiles);
  const [services, setServices] = useState(demoServices);
  const [wishlist, setWishlist] = useState([]);
  const [myProfile, setMyProfile] = useState(defaultMyProfile);
  const [interests, setInterests] = useState([]);
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [serviceCustomer, setServiceCustomer] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      to: "user",
      userId: "current-user",
      type: "GENERAL",
      title: "New Match Found",
      message: "Anjali profile matches your preferences.",
      time: "Today",
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "n2",
      to: "user",
      userId: "current-user",
      type: "GENERAL",
      title: "Wedding Service Offer",
      message:
        "Function hall, arkestra and bride/groom car services are available.",
      time: "Yesterday",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const createId = (prefix = "ID") =>
    `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  const getCurrentUserId = (profileData = myProfile) => {
    const email = String(profileData?.email || "").trim().toLowerCase();
    const phone = String(
      profileData?.phone || profileData?.contactNumber || ""
    ).trim();

    if (email) return email;
    if (phone) return phone;

    return "current-user";
  };

  const addNotification = (title, message, options = {}) => {
    const newNotification = {
      id: createId("NOTI"),
      to: options.to || "user",
      userId: options.userId || "current-user",
      type: options.type || "GENERAL",
      requestId: options.requestId || null,
      title,
      message,
      time: options.time || "Now",
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  };

  const getUserNotifications = (userId) => {
    const activeUserId = userId || getCurrentUserId();

    return notifications.filter((item) => {
      if (item.to === "admin") return false;
      if (item.to === activeUserId || item.userId === activeUserId) {
        return true;
      }

      return (
        item.to === "user" &&
        (!item.userId ||
          item.userId === "current-user" ||
          item.userId === activeUserId)
      );
    });
  };

  const getAdminNotifications = () =>
    notifications.filter((item) => item.to === "admin");

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, read: true } : item
      )
    );
  };

  const submitProfileForApproval = (profileData = myProfile) => {
    const userId = getCurrentUserId(profileData);

    const alreadyPending = approvalRequests.find(
      (item) => item.userId === userId && item.status === "Pending"
    );

    if (alreadyPending) {
      addNotification(
        "Approval Already Pending",
        "Mee profile already admin approval kosam pending lo undi.",
        {
          to: "user",
          userId,
          type: "PROFILE_APPROVAL_PENDING",
          requestId: alreadyPending.id,
        }
      );

      return {
        success: false,
        message: "Profile already pending for admin approval.",
        request: alreadyPending,
      };
    }

    const request = {
      id: createId("APPROVAL"),
      profileId: profileData?.id || createId("PROFILE"),
      userId,
      profileName:
        profileData?.name || profileData?.fullName || "My Matrimony Profile",
      gender: profileData?.gender || "Groom",
      age: profileData?.age || "",
      phone: profileData?.phone || profileData?.contactNumber || "",
      email: profileData?.email || "",
      community: profileData?.community || "",
      religion: profileData?.religion || "",
      caste: profileData?.caste || "",
      location: profileData?.location || "",
      education: profileData?.education || "",
      job: profileData?.job || "",
      income: profileData?.income || "",
      height: profileData?.height || "",
      image: profileData?.image || defaultMyProfile.image,
      photos: profileData?.photos || defaultMyProfile.photos,
      status: "Pending",
      submittedAt: "Now",
      approvedAt: "",
      rejectedAt: "",
      adminMessage: "",
      profileData,
    };

    setApprovalRequests((prev) => [request, ...prev]);

    addNotification(
      "New Profile Approval Request",
      `${request.profileName} profile approval kosam submit chesaru.`,
      {
        to: "admin",
        userId: "admin",
        type: "PROFILE_APPROVAL_REQUEST",
        requestId: request.id,
      }
    );

    addNotification(
      "Profile Sent to Admin",
      "Mee profile admin approval kosam send ayindi. Admin approve chesthe notification vastundi.",
      {
        to: "user",
        userId,
        type: "PROFILE_SUBMITTED",
        requestId: request.id,
      }
    );

    return {
      success: true,
      message: "Profile sent to admin approval.",
      request,
    };
  };

  const approveProfile = (
    requestId,
    adminMessage = "Congratulations! Mee profile admin approve chesaru."
  ) => {
    const request = approvalRequests.find((item) => item.id === requestId);

    if (!request) {
      return {
        success: false,
        message: "Approval request not found.",
      };
    }

    const updatedRequest = {
      ...request,
      status: "Approved",
      approvedAt: "Now",
      rejectedAt: "",
      adminMessage,
    };

    setApprovalRequests((prev) =>
      prev.map((item) => (item.id === requestId ? updatedRequest : item))
    );

    const approvedProfile = {
      ...request.profileData,
      id: request.profileId,
      name: request.profileName,
      gender: request.gender,
      age: request.age,
      phone: request.phone,
      email: request.email,
      community: request.community,
      religion: request.religion,
      caste: request.caste,
      location: request.location,
      education: request.education,
      job: request.job,
      income: request.income,
      height: request.height,
      image: request.image,
      photos: request.photos || [request.image],
      approvalStatus: "Approved",
    };

    setProfiles((prev) => {
      const exists = prev.find((item) => item.id === approvedProfile.id);

      if (exists) {
        return prev.map((item) =>
          item.id === approvedProfile.id ? approvedProfile : item
        );
      }

      return [approvedProfile, ...prev];
    });

    setMyProfile((prev) => {
      const currentUserId = getCurrentUserId(prev);

      if (currentUserId === request.userId) {
        return {
          ...prev,
          approvalStatus: "Approved",
        };
      }

      return prev;
    });

    addNotification("Profile Approved", adminMessage, {
      to: "user",
      userId: request.userId,
      type: "PROFILE_APPROVED",
      requestId,
    });

    return {
      success: true,
      message: "Profile approved successfully.",
      request: updatedRequest,
    };
  };

  const rejectProfile = (
    requestId,
    reason = "Mee profile admin reject chesaru. Details correct chesi malli submit cheyyandi."
  ) => {
    const request = approvalRequests.find((item) => item.id === requestId);

    if (!request) {
      return {
        success: false,
        message: "Approval request not found.",
      };
    }

    const updatedRequest = {
      ...request,
      status: "Rejected",
      approvedAt: "",
      rejectedAt: "Now",
      adminMessage: reason,
    };

    setApprovalRequests((prev) =>
      prev.map((item) => (item.id === requestId ? updatedRequest : item))
    );

    setMyProfile((prev) => {
      const currentUserId = getCurrentUserId(prev);

      if (currentUserId === request.userId) {
        return {
          ...prev,
          approvalStatus: "Rejected",
        };
      }

      return prev;
    });

    addNotification("Profile Rejected", reason, {
      to: "user",
      userId: request.userId,
      type: "PROFILE_REJECTED",
      requestId,
    });

    return {
      success: true,
      message: "Profile rejected successfully.",
      request: updatedRequest,
    };
  };

  const getPendingApprovalRequests = () =>
    approvalRequests.filter((item) => item.status === "Pending");

  const getApprovedApprovalRequests = () =>
    approvalRequests.filter((item) => item.status === "Approved");

  const getRejectedApprovalRequests = () =>
    approvalRequests.filter((item) => item.status === "Rejected");

  const addToWishlist = (profile) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === profile.id);
      if (exists) return prev;
      return [...prev, profile];
    });

    addNotification("Profile Shortlisted", `${profile.name} added to wishlist.`);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const readApiJson = async (response) => {
    const text = await response.text();

    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch (error) {
      return { message: text };
    }
  };

  const getApiMessage = (data, fallback) =>
    data?.message || data?.error || data?.title || fallback;

  const normalizeServiceRequestStatus = (status = "Pending") => {
    const normalized = String(status || "Pending").trim().toUpperCase();

    if (normalized === "APPROVED") return "Approved";
    if (normalized === "REJECTED") return "Rejected";
    return "Pending";
  };

  const formatDateTime = (value) => {
    if (!value) return "Now";

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Now" : date.toLocaleString();
  };

  const getServiceDecisionMessage = (request, status = request?.status) => {
    const serviceTitle = request?.serviceTitle || "Wedding Service";

    if (status === "Approved") {
      return `Your ${serviceTitle} booking request is approved. Vendor will contact you soon.`;
    }

    if (status === "Rejected") {
      return `Your ${serviceTitle} booking request is rejected. Please contact support for details.`;
    }

    return "";
  };

  const parseBookingDate = (value) => {
    if (!value) return null;

    const normalized = String(value).trim();
    const date = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
      ? new Date(`${normalized}T00:00:00`)
      : new Date(normalized);

    return Number.isNaN(date.getTime()) ? null : date;
  };

  const isServiceBookingDateActive = (request, referenceDate = new Date()) => {
    const bookingDate = parseBookingDate(
      request?.bookingEndDate || request?.bookingDate
    );

    if (!bookingDate) return true;

    bookingDate.setHours(23, 59, 59, 999);
    return bookingDate >= referenceDate;
  };

  const getServiceRequestSortValue = (request) => {
    if (request?.requestedAt) {
      const requestedAt = new Date(request.requestedAt).getTime();
      if (!Number.isNaN(requestedAt)) return requestedAt;
    }

    const localTimestamp = String(request?.id || "").match(/_(\d{10,})_/);
    if (localTimestamp) return Number(localTimestamp[1]);

    const numericId = Number(request?.backendId || "");
    return Number.isNaN(numericId) ? 0 : numericId;
  };

  const mapBackendServiceRequest = (item) => ({
    id: item?.id ? `SERVICE_REQ_${item.id}` : createId("SERVICE_REQ"),
    backendId: item?.id || null,
    serviceId: item?.serviceId || "",
    serviceTitle: item?.serviceTitle || "Wedding Service",
    category: item?.category || "",
    location: item?.location || "",
    price: item?.price || "",
    bookingDate: item?.bookingDate || "",
    bookingEndDate: item?.bookingEndDate || "",
    bookingTime: item?.bookingTime || "",
    userId: item?.customer?.userKey || "current-user",
    userName: item?.customer?.fullName || "User",
    phone: item?.customer?.phone || "",
    email: item?.customer?.email || "",
    status: normalizeServiceRequestStatus(item?.status),
    requestedAt: item?.requestedAt || "",
    submittedAt: formatDateTime(item?.requestedAt),
    approvedAt:
      normalizeServiceRequestStatus(item?.status) === "Approved"
        ? formatDateTime(item?.statusUpdatedAt)
        : "",
    rejectedAt:
      normalizeServiceRequestStatus(item?.status) === "Rejected"
        ? formatDateTime(item?.statusUpdatedAt)
        : "",
    statusUpdatedAt: item?.statusUpdatedAt || "",
    adminMessage:
      item?.adminMessage ||
      getServiceDecisionMessage(item, normalizeServiceRequestStatus(item?.status)),
    directConfirmed:
      normalizeServiceRequestStatus(item?.status) === "Approved" &&
      Boolean(item?.adminMessage),
    service: services.find((service) => service.id === item?.serviceId) || null,
  });

  const mergeServiceRequests = (nextRequests = []) => {
    setServiceRequests((prev) => {
      const merged = [...prev];

      nextRequests.forEach((nextRequest) => {
        const existingIndex = merged.findIndex(
          (item) => item.id === nextRequest.id
        );

        if (existingIndex >= 0) {
          const existingRequest = merged[existingIndex];
          const statusChanged = existingRequest.status !== nextRequest.status;

          merged[existingIndex] = {
            ...existingRequest,
            ...nextRequest,
            adminMessage: statusChanged
              ? nextRequest.adminMessage
              : existingRequest.adminMessage || nextRequest.adminMessage,
          };
          return;
        }

        merged.push(nextRequest);
      });

      return merged;
    });
  };

  const loadServiceRequests = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.SERVICE_REQUEST_STATUS);
      const data = await readApiJson(response);

      if (!response.ok) {
        return {
          success: false,
          message: getApiMessage(data, "Unable to load service requests."),
        };
      }

      const requests = Array.isArray(data)
        ? data.map(mapBackendServiceRequest)
        : [];

      mergeServiceRequests(requests);

      return {
        success: true,
        requests,
      };
    } catch (error) {
      return {
        success: false,
        message: "Backend connect avvadam ledu. Local requests matrame chupistunnam.",
      };
    }
  };

  const hasApprovedServiceBooking = (userId = getCurrentUserId()) =>
    serviceRequests.some(
      (item) =>
        item.userId === userId &&
        item.status === "Approved" &&
        isServiceBookingDateActive(item)
    );

  const createLocalServiceRequest = (service, options = {}) => {
    const userId = getCurrentUserId();
    const status = options.status || "Pending";
    const directConfirmed = Boolean(options.directConfirmed);
    const serviceTitle = service?.title || "Wedding Service";
    const decisionMessage =
      options.adminMessage ||
      getServiceDecisionMessage({ serviceTitle }, status);

    const request = {
      id: options.requestId || createId("SERVICE_REQ"),
      serviceId: service?.id || "",
      serviceTitle,
      category: service?.category || "",
      location: service?.location || "",
      price: service?.price || "",
      bookingDate: options.bookingDate || "",
      bookingEndDate: options.bookingEndDate || "",
      bookingTime: options.bookingTime || "",
      userId,
      userName:
        options.customer?.fullName || serviceCustomer?.fullName || myProfile?.name || "User",
      phone: options.customer?.phone || serviceCustomer?.phone || myProfile?.phone || "",
      email: options.customer?.email || serviceCustomer?.email || myProfile?.email || "",
      status,
      submittedAt: "Now",
      approvedAt: status === "Approved" ? "Now" : "",
      rejectedAt: status === "Rejected" ? "Now" : "",
      adminMessage:
        status === "Approved" && directConfirmed && !options.adminMessage
          ? "Booking confirmed directly because admin already approved your previous service booking."
          : decisionMessage,
      directConfirmed,
      service,
    };

    setServiceRequests((prev) => [request, ...prev]);

    addNotification(
      directConfirmed ? "Booking Confirmed" : "Service Request Sent",
      directConfirmed
        ? `Mee ${request.serviceTitle} booking confirm ayindi. Vendor will contact you soon.`
        : `Mee request ${request.serviceTitle} service ki send ayindi.`,
      {
        to: "user",
        userId,
        type: directConfirmed
          ? "SERVICE_BOOKING_CONFIRMED"
          : "SERVICE_REQUEST_SENT",
        requestId: request.id,
      }
    );

    if (!options.skipAdminNotification) {
      addNotification(
        "New Wedding Service Booking",
        `${request.userName} ${request.serviceTitle} service book cheyyadaniki request pampaaru.`,
        {
          to: "admin",
          userId: "admin",
          type: "SERVICE_BOOKING_REQUEST",
          requestId: request.id,
        }
      );
    }

    return {
      success: true,
      directConfirmed,
      message: directConfirmed
        ? "Booking confirmed successfully."
        : "Wedding service request sent to admin.",
      request,
    };
  };

  const checkServiceCustomerStatus = async () => {
    const userKey = getCurrentUserId();
    const response = await fetch(
      `${API_ENDPOINTS.CUSTOMER_STATUS}?userKey=${encodeURIComponent(userKey)}`
    );
    const data = await readApiJson(response);

    if (!response.ok) {
      throw new Error(
        getApiMessage(data, "Unable to check registration status.")
      );
    }

    if (data?.registered) {
      setServiceCustomer(data);
    }

    return data;
  };

  const registerServiceCustomer = async (formData) => {
    const userKey = getCurrentUserId();
    const response = await fetch(API_ENDPOINTS.CUSTOMER_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userKey,
        fullName: String(formData?.fullName || "").trim(),
        phone: String(formData?.phone || "").trim(),
        email: String(formData?.email || "").trim(),
        address: String(formData?.address || "").trim(),
        city: String(formData?.city || "").trim(),
      }),
    });
    const data = await readApiJson(response);

    if (!response.ok) {
      return {
        success: false,
        message: getApiMessage(data, "Unable to register service customer."),
      };
    }

    if (data?.registered) {
      setServiceCustomer(data);
      return {
        success: true,
        customer: data,
        message: getApiMessage(data, "Registration completed successfully."),
      };
    }

    return {
      success: false,
      message: getApiMessage(data, "Registration failed."),
    };
  };

  const sendServiceRequest = async (service, bookingDetails = {}) => {
    try {
      const userKey = getCurrentUserId();

      const status = serviceCustomer?.registered
        ? serviceCustomer
        : await checkServiceCustomerStatus();

      if (!status?.registered) {
        return {
          success: false,
          registrationRequired: true,
          message: "Please complete one-time registration before booking.",
        };
      }

      const response = await fetch(API_ENDPOINTS.SERVICE_REQUEST_SEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userKey,
          serviceId: service?.id || "",
          title: service?.title || "Wedding Service",
          category: service?.category || "",
          location: service?.location || "",
          price: service?.price || "",
          bookingDate: bookingDetails?.bookingDate || "",
          bookingEndDate: bookingDetails?.bookingEndDate || "",
          bookingTime: bookingDetails?.bookingTime || "",
        }),
      });
      const data = await readApiJson(response);

      if (!response.ok) {
        return {
          success: false,
          message: getApiMessage(data, "Unable to send service request."),
        };
      }

      if (!data?.registered) {
        return {
          success: false,
          registrationRequired: true,
          message: getApiMessage(
            data,
            "Registration required before sending service request."
          ),
        };
      }

      if (!data?.requestCreated) {
        return {
          success: false,
          message: getApiMessage(data, "Service request was not created."),
        };
      }

      return createLocalServiceRequest(service, {
        requestId: data?.requestId ? `SERVICE_REQ_${data.requestId}` : undefined,
        customer: status,
        status: normalizeServiceRequestStatus(data?.status),
        directConfirmed: Boolean(data?.directConfirmed),
        skipAdminNotification: Boolean(data?.directConfirmed),
        adminMessage: data?.directConfirmed
          ? getApiMessage(
              data,
              `Your ${service?.title || "Wedding Service"} booking is confirmed. Vendor will contact you soon.`
            )
          : "",
        bookingDate: bookingDetails?.bookingDate || "",
        bookingEndDate: bookingDetails?.bookingEndDate || "",
        bookingTime: bookingDetails?.bookingTime || "",
      });
    } catch (error) {
      return {
        success: false,
        message:
          "Backend connect avvadam ledu. Server run lo unda? API_BASE_URL correct aa check cheyyandi.",
      };
    }
  };

  const registerServiceCustomerAndSendRequest = async (
    formData,
    service,
    bookingDetails = {}
  ) => {
    const registerResult = await registerServiceCustomer(formData);

    if (!registerResult.success) {
      return registerResult;
    }

    return sendServiceRequest(service, bookingDetails);
  };

  const updateServiceRequestStatus = async (
    requestId,
    status,
    adminMessage = ""
  ) => {
    const request = serviceRequests.find((item) => item.id === requestId);

    if (!request) {
      return {
        success: false,
        message: "Service request not found.",
      };
    }

    const finalMessage =
      adminMessage ||
      (status === "Approved"
        ? `Mee ${request.serviceTitle} service booking admin approve chesaru.`
        : `Mee ${request.serviceTitle} service booking admin reject chesaru.`);

    const updatedRequest = {
      ...request,
      status,
      approvedAt: status === "Approved" ? "Now" : "",
      rejectedAt: status === "Rejected" ? "Now" : "",
      adminMessage: finalMessage,
    };

    const backendRequestId = String(requestId).replace("SERVICE_REQ_", "");

    if (/^\d+$/.test(backendRequestId)) {
      try {
        const query = new URLSearchParams({
          status,
          adminMessage: finalMessage,
        });

        await fetch(
          `${API_ENDPOINTS.SERVICE_REQUEST_STATUS}/${backendRequestId}/status?${query.toString()}`,
          {
            method: "PATCH",
          }
        );
      } catch (error) {
        // Local state still updates so the demo flow is not blocked by network issues.
      }
    }

    setServiceRequests((prev) =>
      prev.map((item) => (item.id === requestId ? updatedRequest : item))
    );

    if (status === "Approved") {
      setServiceCustomer((prev) =>
        prev
          ? {
              ...prev,
              approved: true,
            }
          : prev
      );
    }

    addNotification(`Service Booking ${status}`, finalMessage, {
      to: "user",
      userId: request.userId || "current-user",
      type:
        status === "Approved"
          ? "SERVICE_BOOKING_APPROVED"
          : "SERVICE_BOOKING_REJECTED",
      requestId,
    });

    return {
      success: true,
      message: `Service booking ${status}.`,
      request: updatedRequest,
    };
  };

  const getPendingServiceRequests = () =>
    serviceRequests.filter((item) => item.status === "Pending");

  const getApprovedServiceRequests = () =>
    serviceRequests.filter((item) => item.status === "Approved");

  const getRejectedServiceRequests = () =>
    serviceRequests.filter((item) => item.status === "Rejected");

  const getLatestServiceBookingDecision = (
    userId = getCurrentUserId(),
    referenceDate = new Date()
  ) =>
    serviceRequests
      .filter(
        (item) =>
          item.userId === userId &&
          (item.status === "Approved" || item.status === "Rejected") &&
          isServiceBookingDateActive(item, referenceDate)
      )
      .sort(
        (first, second) =>
          getServiceRequestSortValue(second) - getServiceRequestSortValue(first)
      )[0] || null;

  const saveMyProfile = (profileData) => {
    const requiredFields = [
      "name",
      "gender",
      "age",
      "phone",
      "community",
      "religion",
      "location",
      "education",
      "job",
      "height",
      "about",
    ];

    const filledCount = requiredFields.filter(
      (key) => String(profileData[key] || "").trim().length > 0
    ).length;

    const completion = Math.round((filledCount / requiredFields.length) * 100);

    const updatedProfile = {
      ...myProfile,
      ...profileData,
      profileCompletion: completion,
      approvalStatus: "Pending",
    };

    setMyProfile(updatedProfile);

    addNotification(
      "Profile Updated",
      `Your profile is now ${completion}% complete.`
    );

    const approvalResult = submitProfileForApproval(updatedProfile);

    return {
      success: true,
      profile: updatedProfile,
      approvalResult,
    };
  };

  const sendInterest = (profile) => {
    const existing = interests.find((item) => item.profile.id === profile.id);

    if (existing) {
      return {
        success: false,
        message: `Interest already ${existing.status}.`,
      };
    }

    const newInterest = {
      id: createId("INTEREST"),
      profile,
      status: "Pending",
      createdAt: "Now",
    };

    setInterests((prev) => [newInterest, ...prev]);

    addNotification(
      "Interest Sent",
      `Your interest request sent to ${profile.name}.`
    );

    return {
      success: true,
      message: `Interest sent to ${profile.name}.`,
    };
  };

  const updateInterestStatus = (interestId, status) => {
    let selectedProfileName = "";

    setInterests((prev) =>
      prev.map((item) => {
        if (item.id === interestId) {
          selectedProfileName = item.profile.name;
          return {
            ...item,
            status,
          };
        }

        return item;
      })
    );

    addNotification(
      `Interest ${status}`,
      `${selectedProfileName || "Profile"} interest marked as ${status}.`
    );

    return {
      success: true,
      message: `Interest ${status}.`,
    };
  };

  const getInterestStatus = (profileId) => {
    const item = interests.find((interest) => interest.profile.id === profileId);
    return item?.status || null;
  };

  const submitVerificationRequest = (data = {}) => {
    const userId = getCurrentUserId(myProfile);

    const alreadyPending = verificationRequests.find(
      (item) => item.userId === userId && item.status === "Pending"
    );

    if (alreadyPending) {
      addNotification(
        "Verification Already Pending",
        "Mee background verification request already admin approval kosam pending lo undi.",
        {
          to: "user",
          userId,
          type: "VERIFICATION_PENDING",
          requestId: alreadyPending.id,
        }
      );

      return {
        success: false,
        message: "Your verification request is already pending.",
        request: alreadyPending,
      };
    }

    const newRequest = {
      id: createId("VERIFY"),
      userId,
      profileName: myProfile?.name || "My Profile",
      gender: myProfile?.gender || "Groom",
      age: myProfile?.age || "",
      phone: myProfile?.phone || "",
      email: myProfile?.email || "",
      community: myProfile?.community || "",
      religion: myProfile?.religion || "",
      caste: myProfile?.caste || "",
      location: myProfile?.location || "",
      education: myProfile?.education || "",
      job: myProfile?.job || "",
      image: myProfile?.image || defaultMyProfile.image,
      status: "Pending",
      submittedAt: "Now",
      approvedAt: "",
      rejectedAt: "",
      adminMessage: "",
      ...data,
    };

    setVerificationRequests((prev) => [newRequest, ...prev]);

    setMyProfile((prev) => ({
      ...prev,
      verificationStatus: "Pending",
    }));

    addNotification(
      "Verification Submitted",
      "Mee background verification request admin ki send ayindi. Admin approve/reject chesthe notification vastundi.",
      {
        to: "user",
        userId,
        type: "VERIFICATION_SUBMITTED",
        requestId: newRequest.id,
      }
    );

    addNotification(
      "New Background Verification Request",
      `${newRequest.profileName} background verification kosam request pampaaru.`,
      {
        to: "admin",
        userId: "admin",
        type: "VERIFICATION_REQUEST",
        requestId: newRequest.id,
      }
    );

    return {
      success: true,
      message: "Verification request sent to admin.",
      request: newRequest,
    };
  };

  const updateVerificationStatus = (
    requestId,
    status,
    adminMessage = ""
  ) => {
    const request = verificationRequests.find((item) => item.id === requestId);

    if (!request) {
      return {
        success: false,
        message: "Verification request not found.",
      };
    }

    const finalMessage =
      adminMessage ||
      (status === "Approved"
        ? "Congratulations! Mee background verification admin approve chesaru."
        : "Mee background verification admin reject chesaru. Details correct chesi malli submit cheyyandi.");

    const updatedRequest = {
      ...request,
      status,
      approvedAt: status === "Approved" ? "Now" : "",
      rejectedAt: status === "Rejected" ? "Now" : "",
      adminMessage: finalMessage,
    };

    setVerificationRequests((prev) =>
      prev.map((item) => (item.id === requestId ? updatedRequest : item))
    );

    setMyProfile((prev) => {
      const currentUserId = getCurrentUserId(prev);

      if (currentUserId === request.userId) {
        return {
          ...prev,
          verificationStatus: status,
        };
      }

      return prev;
    });

    addNotification(`Background Verification ${status}`, finalMessage, {
      to: "user",
      userId: request.userId || "current-user",
      type:
        status === "Approved"
          ? "VERIFICATION_APPROVED"
          : "VERIFICATION_REJECTED",
      requestId,
    });

    return {
      success: true,
      message: `Verification ${status}.`,
      request: updatedRequest,
    };
  };

  const getPendingVerificationRequests = () =>
    verificationRequests.filter((item) => item.status === "Pending");

  const getApprovedVerificationRequests = () =>
    verificationRequests.filter((item) => item.status === "Approved");

  const getRejectedVerificationRequests = () =>
    verificationRequests.filter((item) => item.status === "Rejected");

  const value = useMemo(
    () => ({
      profiles,
      services,
      wishlist,
      notifications,
      myProfile,
      interests,
      verificationRequests,
      approvalRequests,
      serviceRequests,
      serviceCustomer,

      addNotification,
      getUserNotifications,
      getAdminNotifications,
      markNotificationRead,

      addToWishlist,
      removeFromWishlist,

      sendServiceRequest,
      registerServiceCustomer,
      registerServiceCustomerAndSendRequest,
      checkServiceCustomerStatus,
      hasApprovedServiceBooking,
      loadServiceRequests,
      updateServiceRequestStatus,
      getPendingServiceRequests,
      getApprovedServiceRequests,
      getRejectedServiceRequests,
      getLatestServiceBookingDecision,

      saveMyProfile,

      submitProfileForApproval,
      approveProfile,
      rejectProfile,
      getPendingApprovalRequests,
      getApprovedApprovalRequests,
      getRejectedApprovalRequests,

      sendInterest,
      updateInterestStatus,
      getInterestStatus,

      submitVerificationRequest,
      updateVerificationStatus,
      getPendingVerificationRequests,
      getApprovedVerificationRequests,
      getRejectedVerificationRequests,

      setProfiles,
      setServices,
      setNotifications,
      setApprovalRequests,
      setVerificationRequests,
      setServiceRequests,
    }),
    [
      profiles,
      services,
      wishlist,
      notifications,
      myProfile,
      interests,
      verificationRequests,
      approvalRequests,
      serviceRequests,
      serviceCustomer,
    ]
  );

  return (
    <MatrimonyContext.Provider value={value}>
      {children}
    </MatrimonyContext.Provider>
  );
}

export function useMatrimony() {
  const context = useContext(MatrimonyContext);

  if (!context) {
    throw new Error("useMatrimony must be used inside MatrimonyProvider");
  }

  return context;
}
