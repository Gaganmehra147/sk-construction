import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding architectural database...");

  // 1. Admin Account
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: "admin@skconstruction.com" },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("admin@sk2026", salt);
    await prisma.adminUser.create({
      data: {
        email: "admin@skconstruction.com",
        passwordHash,
        name: "SK Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log("Admin user created: admin@skconstruction.com / admin@sk2026");
  }

  // 2. Services (10 Architectural Services)
  const servicesData = [
    {
      number: "01",
      name: "Interior Design",
      slug: "interior-design",
      shortDesc: "Bespoke spatial planning, bespoke millwork, curated furnishings, and refined architectural detailing.",
      longDesc: "Our core interior design practice weaves structural discipline with poetic materiality. We engineer complete living and working environments tailored to human movement, light cycles, and acoustic balance. From initial zoning sketches to custom furniture curation, every square millimetre is considered with uncompromising architectural intent.",
      icon: "Compass",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Concept sketching & 3D photorealistic renderings",
        "Spatial circulation & ergonomic layout planning",
        "Custom millwork, boiserie, and paneling design",
        "Curated art, lighting, and soft furnishing procurement",
      ]),
      sortOrder: 1,
    },
    {
      number: "02",
      name: "Residential Interiors",
      slug: "residential-interiors",
      shortDesc: "Bespoke sanctuaries for luxury villas, penthouses, and private estates crafted with warmth and permanence.",
      longDesc: "Residential spaces are deeply intimate expressions of those who inhabit them. We merge tactile materials—travertine, smoked oak, tactile linens, and brushed bronze—into unified residential experiences that age with quiet grace.",
      icon: "Home",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Private villa & penthouse full-scope interior architecture",
        "Acoustic living room treatments and home theatres",
        "Bespoke primary suites with walk-in wardrobe integration",
        "Climate-responsive window treatments and smart lighting",
      ]),
      sortOrder: 2,
    },
    {
      number: "03",
      name: "Commercial Interiors",
      slug: "commercial-interiors",
      shortDesc: "High-impact corporate headquarters, boutique retail galleries, and signature hospitality destinations.",
      longDesc: "We design commercial environments that elevate brand prestige and accelerate operational velocity. Blending ergonomic workstation systems with impressive client greeting atriums, our commercial spaces articulate institutional confidence.",
      icon: "Building2",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Executive boardrooms & acoustic conference suites",
        "Biophilic wellness zones & modern breakout lounges",
        "Retail flagship display engineering & circulation",
        "Compliance with international fire, life safety & accessibility codes",
      ]),
      sortOrder: 3,
    },
    {
      number: "04",
      name: "Modular Kitchen",
      slug: "modular-kitchen",
      shortDesc: "Precision-engineered culinary architecture featuring German hardware, quartz monolithic islands, and hidden utility.",
      longDesc: "The modern kitchen is the structural anchor of the luxury home. We design custom modular kitchens manufactured with micron-level tolerances, integrating concealed appliances, motorized pocket doors, and seamless stone preparation counters.",
      icon: "Utensils",
      coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "German Blum / Hettich soft-close internal hardware",
        "Book-matched Italian porcelain and composite quartz tops",
        "Concealed spice pullouts and motorized tambour cabinets",
        "Integrated dual-zone induction and professional extraction venting",
      ]),
      sortOrder: 4,
    },
    {
      number: "05",
      name: "Wardrobes & Storage",
      slug: "wardrobes-and-storage",
      shortDesc: "Architectural dressing suites with fluted glass, leather-lined drawer trays, and integrated linear luminescence.",
      longDesc: "Storage elevated to the status of fine art. Our wardrobe systems feature anodized aluminum slender profiles, sensor-activated interior lighting, dehumidified watch winders, and velvet-lined jewelry vitrines.",
      icon: "Box",
      coverImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Floor-to-ceiling walk-in dressing rooms",
        "Smoked and fluted tempered glass sliding systems",
        "Integrated climate and humidity protection zones",
        "Custom leather and brass pull hardware",
      ]),
      sortOrder: 5,
    },
    {
      number: "06",
      name: "False Ceiling & Lighting",
      slug: "false-ceiling-and-lighting",
      shortDesc: "Layered architectural lighting design with trimless magnetic tracks, cove glows, and acoustic ceiling baffles.",
      longDesc: "Light shapes spatial emotion. We orchestrate daylight and artificial luminescence using museum-grade high-CRI trimless architectural fixtures, concealed perimeter coves, and CNC-perforated acoustic ceiling rafts.",
      icon: "Lightbulb",
      coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Trimless magnetic low-voltage track lighting",
        "Concealed indirect perimeter light coves (2700K–3000K warm)",
        "Acoustic gypsum and timber slat baffle integration",
        "DALI / KNX smart scene programming and dimming",
      ]),
      sortOrder: 6,
    },
    {
      number: "07",
      name: "Renovation & Remodeling",
      slug: "renovation-and-remodeling",
      shortDesc: "Structural restoration, spatial reconfiguration, and contemporary luxury revival of existing properties.",
      longDesc: "Breathing new vitality into heritage and aging structures. We remove redundant load walls, reinforce structural spans with steel beams, modernize vintage plumbing and HVAC networks, and re-envelope old spaces in modern luxury.",
      icon: "Hammer",
      coverImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Structural load-bearing wall modifications & steel shoring",
        "Complete electrical and concealed plumbing overhaul",
        "Balcony enclosure and thermal double-glazed window retrofits",
        "Historic facade restoration and waterproof insulation membranes",
      ]),
      sortOrder: 7,
    },
    {
      number: "08",
      name: "Civil Construction",
      slug: "civil-construction",
      shortDesc: "End-to-end reinforced concrete construction, foundation engineering, and structural masonry built to last generations.",
      longDesc: "From deep foundation piles to monolithic RCC roof slabs, our civil construction division operates with industrial rigor. We employ laboratory-tested concrete mixes, seismic tie-beams, precision shuttering, and strict curing regimens.",
      icon: "HardHat",
      coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=75",
      features: JSON.stringify([
        "Soil bearing capacity testing and raft foundation engineering",
        "M25/M30 certified ready-mix concrete structural framing",
        "Multi-layer chemical waterproofing for subterranean basements",
        "Fly ash / autoclaved aerated concrete (AAC) high-insulation masonry",
      ]),
      sortOrder: 8,
    },
    {
      number: "09",
      name: "Turnkey Projects",
      slug: "turnkey-projects",
      shortDesc: "Complete single-point accountability from bare site excavation through interior handover and final styling.",
      longDesc: "Eliminate the friction of managing disparate contractors. Our turnkey project methodology assigns a dedicated project director, master timeline schedule, transparent bill of quantities, and strict quality sign-offs at every milestone.",
      icon: "Key",
      coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Single-source responsibility and guaranteed completion schedules",
        "Itemized transparent Bill of Quantities (BOQ) with no hidden escalations",
        "Weekly digital progress reports with high-resolution site photography",
        "Comprehensive post-handover warranty and maintenance support",
      ]),
      sortOrder: 9,
    },
    {
      number: "10",
      name: "Office & Commercial Construction",
      slug: "office-and-commercial-construction",
      shortDesc: "Turnkey design-build solutions for corporate campuses, tech parks, co-working studios, and retail complexes.",
      longDesc: "Rapid-deployment commercial structures engineered for peak business performance. We integrate heavy-duty VRV/HVAC central chillers, diesel generator backup grids, server room FM-200 fire suppression, and flexible modular floor plans.",
      icon: "Briefcase",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      features: JSON.stringify([
        "Fast-track pre-engineered steel framing & composite deck slabs",
        "Integrated central VRV/VRF air conditioning and fresh air ventilation",
        "Tier-ready server server rooms with precision cooling and access control",
        "High-performance low-E structural glazing facades",
      ]),
      sortOrder: 10,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log("Services seeded (10 services).");

  // 3. Projects (Architectural Case Studies)
  const projectsData = [
    {
      title: "The Courtyard Residence",
      slug: "the-courtyard-residence",
      category: "Residential",
      location: "Jubilee Hills, Hyderabad",
      year: "2024",
      area: "7,200 sq.ft",
      clientType: "Private Family",
      overview: "A monolithic private estate organized around an open-air central water courtyard, balancing contemporary architectural geometry with traditional Indian climatic wisdom.",
      concept: "The design anchors living spaces around a reflective courtyard pool that acts as a natural convective cooling lung. Seamless floor-to-ceiling sliding glass portals dissolve boundaries between interior living lounges and exterior stone terraces.",
      challenge: "The steep rocky topography of Jubilee Hills presented significant elevation differentials. Additionally, the western facade was exposed to intense solar heat gain during peak summer months.",
      solution: "We carved the residence into the rock face using stepped cantilevered RCC slabs. Deep architectural overhangs, motorized terracotta louvers, and double-wall insulated masonry block thermal transmission while allowing cross-ventilation.",
      execution: "Cast-in-place board-marked concrete paired with flamed Dholpur sandstone paving and bespoke Italian smoked oak millwork executed over an 18-month turnkey lifecycle.",
      results: "The residence achieved 35% reduction in mechanical cooling energy and won acclaim for its serene, monastery-like acoustic serenity amidst the metropolitan core.",
      materialsUsed: "Board-marked concrete, Flamed Dholpur Sandstone, Smoked European Oak, Brushed Champagne Brass, Low-E Double Glazing",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      seoTitle: "The Courtyard Residence | Luxury Architecture & Interior by SK Construction",
      seoDesc: "7,200 sq.ft private estate in Jubilee Hills, Hyderabad featuring central water court, board-marked concrete, and bespoke interior millwork.",
    },
    {
      title: "Soma Penthouse Atrium",
      slug: "soma-penthouse-atrium",
      category: "Luxury Interiors",
      location: "Worli Sea Face, Mumbai",
      year: "2024",
      area: "5,400 sq.ft",
      clientType: "Private Collector",
      overview: "A high-altitude duplex penthouse overlooking the Arabian Sea, featuring a double-height travertine fireplace, sculptural brass spiral staircase, and curated art lighting.",
      concept: "Conceived as an inhabitable sculpture where ocean panoramas form the living artwork. Neutral ivory plaster and warm walnut provide an understated canvas for the client's modern South Asian art collection.",
      challenge: "High saline ocean winds and structural restrictions inside a premium high-rise required ultra-lightweight structural retrofits and marine-grade stainless hardware.",
      solution: "Engineered lightweight honeycomb marble slabs for vertical wall claddings and specified 316-marine grade PVD titanium brass coatings for all exposed architectural hardware.",
      execution: "Fabricated the 14-tonne custom spiral staircase offsite in precision modular steel segments and hoisted it via external crane before final leather and timber wrapping.",
      results: "Delivered on schedule with complete acoustic isolation from external coastal traffic and wind buffeting.",
      materialsUsed: "Roman Navona Travertine, American Black Walnut, PVD Titanium Brass, Saddle Leather, Fluted Smoked Glass",
      coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
      seoTitle: "Soma Penthouse Atrium | Luxury Penthouse Interior by SK Construction",
      seoDesc: "Duplex penthouse interior architecture in Worli, Mumbai with sculptural spiral staircase and travertine paneling.",
    },
    {
      title: "Verdant Villa Renovation",
      slug: "verdant-villa-renovation",
      category: "Renovation",
      location: "Koramangala, Bengaluru",
      year: "2023",
      area: "6,100 sq.ft",
      clientType: "Tech Founder",
      overview: "Transformation of an outdated 1990s red-brick villa into a light-filled minimalist biophilic residence with indoor micro-gardens and integrated home automation.",
      concept: "Surgical removal of claustrophobic internal partitions to liberate sightlines toward lush perimeter foliage, uniting indoor living areas with landscaped perimeter decks.",
      challenge: "Deteriorated plumbing stacks, damp masonry foundations, and non-conforming structural spans without original blueprint documentation.",
      solution: "3D laser scanning of the entire structure followed by structural steel underpinning (I-beams) to support open-concept spans without sagging.",
      execution: "Stripped the structure down to its bare RCC skeleton, applied crystal growth chemical waterproofing, and installed concealed VRF air conditioning throughout.",
      results: "Increased usable natural daylight by 240% while preserving the original foundation and reducing demolition waste by 60%.",
      materialsUsed: "Microcement Floors, Quarter-Sawn Teak, Matte Black Architectural Aluminum, Fluted Cast Glass",
      coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=75",
      afterImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
      seoTitle: "Verdant Villa Renovation | Architectural Remodeling by SK Construction",
      seoDesc: "Full structural renovation of a 6,100 sq.ft villa in Bengaluru with microcement floors and biophilic courtyards.",
    },
    {
      title: "Linea Corporate Headquarters",
      slug: "linea-corporate-headquarters",
      category: "Commercial",
      location: "Cyber City, Gurugram",
      year: "2024",
      area: "18,500 sq.ft",
      clientType: "Venture Capital Firm",
      overview: "An institutional-grade investment management headquarters balancing high-security privacy with expansive, light-suffused hospitality lounges.",
      concept: "A sequence of progressive privacy zones transitioning from a bronze-clad public reception to acoustic consultation chambers and an executive library boardroom.",
      challenge: "Strict NC-30 acoustic isolation standards required between concurrent partner negotiation rooms sharing a single floorplate.",
      solution: "Engineered double-stud acoustic drywalls with staggered gypsum layers, green glue dampening, and acoustic double-glazed glass partitions with drop seals.",
      execution: "Executed on a fast-track 90-day turnaround while complying with Grade-A commercial building night-work restrictions.",
      results: "Delivered with zero snag defects on day 89, providing an inspiring working environment for 120 professionals.",
      materialsUsed: "Statutario Marble, Architectural Slatted Walnut, Brushed Bronze Anodized Aluminum, Wool Felt Acoustic Wallcoverings",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      isPublished: true,
      sortOrder: 4,
      seoTitle: "Linea Corporate Headquarters | Commercial Interior & Turnkey by SK Construction",
      seoDesc: "18,500 sq.ft investment headquarters in Gurugram featuring high-performance acoustic architecture and marble reception.",
    },
    {
      title: "The Travertine Retreat",
      slug: "the-travertine-retreat",
      category: "Construction",
      location: "Alibaug, Maharashtra",
      year: "2024",
      area: "8,900 sq.ft",
      clientType: "Industrialist Family",
      overview: "A monolithic ground-up coastal sanctuary formed of rammed earth walls, monolithic travertine floor slabs, and an infinity lap pool.",
      concept: "Horizontal architectural lines responding to the coastal tree canopy, with raw mineral finishes that weather gracefully in the tropical climate.",
      challenge: "Extremely high subterranean water table during monsoon and lack of municipal fresh water infrastructure on the remote site.",
      solution: "Constructed deep pile foundations with an integrated 150,000-litre rainwater harvesting cistern and dual-stage greywater filtration plant.",
      execution: "Self-consolidating concrete with local aggregates, monolithic stone masonry, and timber pergola canopies.",
      results: "The villa operates at net-zero water independence through the dry summer season while providing sublime thermal mass comfort.",
      materialsUsed: "Monolithic Roman Travertine, Stabilized Rammed Earth, Teak Decking, Copper Guttering",
      coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true,
      isPublished: true,
      sortOrder: 5,
      seoTitle: "The Travertine Retreat | Ground-Up Construction by SK Construction",
      seoDesc: "8,900 sq.ft coastal estate construction in Alibaug featuring monolithic travertine and net-zero water harvesting.",
    },
    {
      title: "Aethel Minimalist Kitchen & Living",
      slug: "aethel-minimalist-kitchen",
      category: "Luxury Interiors",
      location: "Vasant Vihar, New Delhi",
      year: "2024",
      area: "3,200 sq.ft",
      clientType: "Culinary Entrepreneur",
      overview: "A monolithic culinary studio integrating an 18-foot single-slab quartz kitchen island, concealed pocket pantries, and ambient linear lighting.",
      concept: "Treating the kitchen not as a utility back-of-house, but as an architectural performance altar where culinary craft and social connection coexist.",
      challenge: "Concealing heavy commercial-grade 1800 CFM extraction ducts and multi-circuit electrical loads within historic low ceiling beams.",
      solution: "Custom architectural ceiling drop with linear negative reveals, housing sound-baffled remote external blowers mounted on the rooftop.",
      execution: "Precision-milled German hardware, pocket door mechanisms with zero visible floor tracks, and hand-rubbed smoked walnut veneer.",
      results: "Flawless operational flow, whisper-quiet ventilation under 40dB, and recognition as a benchmark in modern Indian kitchen design.",
      materialsUsed: "Engineered Neolith Calacatta Quartz, Smoked Walnut, Anodized Gunmetal Aluminum, Seamless Micro-terrazzo",
      coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=75",
      ]),
      beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false,
      isPublished: true,
      sortOrder: 6,
      seoTitle: "Aethel Minimalist Kitchen & Living | Modular Kitchen by SK Construction",
      seoDesc: "Architectural kitchen studio in Vasant Vihar, New Delhi with 18-foot quartz island and German hardware.",
    },
  ];

  for (const p of projectsData) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log("Projects seeded (6 architectural case studies).");

  // 4. Craftsmanship Materials (8 Materials)
  const materialsData = [
    {
      name: "Calacatta Viola Marble",
      category: "Marble",
      finish: "Honed Silk & Bookmatched",
      application: "Statement Islands, Powder Rooms, Architectural Fireplaces",
      description: "Quarried in Tuscany, Italy. Characterized by deep cabernet-purple veining across an ivory-white brecciated calcite field.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      sortOrder: 1,
    },
    {
      name: "Quarter-Sawn Smoked Oak",
      category: "Wood",
      finish: "Natural Matte Oil (Zero Sheen)",
      application: "Architectural Boiserie, Custom Cabinetry, Fluted Ceilings",
      description: "Vacuum-fumed European oak displaying straight vertical growth rings, high dimensional stability, and deep espresso tones.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      sortOrder: 2,
    },
    {
      name: "Roman Navona Travertine",
      category: "Stone",
      finish: "Open-Pore Vein Cut & Cross Cut",
      application: "Monolithic Claddings, Outdoor Loggias, Bathroom Vanities",
      description: "Classic Italian sedimentary limestone formed in mineral hot springs. Exceptional thermal comfort underfoot and timeless patina.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      sortOrder: 3,
    },
    {
      name: "Architectural Fluted Glass",
      category: "Glass",
      finish: "Low-Iron Acid-Etched & Tempered",
      application: "Spatial Dividers, Dressing Suites, Shower Enclosures",
      description: "Precision-extruded linear reeds that refract ambient light while providing sophisticated visual privacy.",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80",
      sortOrder: 4,
    },
    {
      name: "PVD Burnished Brass",
      category: "Metal",
      finish: "Hand-Brushed Antique Satin",
      application: "Door Pulls, Custom Stair Balustrades, Trim Inlays",
      description: "Solid brass treated with Physical Vapor Deposition for extreme scratch and oxidation resistance without artificial gloss.",
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
      sortOrder: 5,
    },
    {
      name: "Seamless Microcement",
      category: "Stone",
      finish: "Polymer-Infused Natural Stippled",
      application: "Continuous Flooring, Wet Rooms, Minimalist Stairs",
      description: "3mm mineral topping creating jointless spatial expanses with waterproof elastomeric durability.",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
      sortOrder: 6,
    },
    {
      name: "Handwoven Belgian Linen",
      category: "Fabric",
      finish: "Stonewashed Textured Drape",
      application: "Motorized Window Portals, Upholstered Headboards",
      description: "Natural flax fibers that soften incoming daylight, providing natural acoustic dampening and tactile softness.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      sortOrder: 7,
    },
    {
      name: "Trimless Low-Glare Optical Modules",
      category: "Lighting",
      finish: "Matte Black Baffle, 2700K 98-CRI",
      application: "Architectural Ceiling Washing, Art Highlighting",
      description: "Deep recess miniature LED fixtures that emit glare-free light where the source remains invisible to the eye.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      sortOrder: 8,
    },
  ];

  await prisma.material.deleteMany();
  for (const m of materialsData) {
    await prisma.material.create({ data: m });
  }
  console.log("Materials seeded (8 items).");

  // 5. Trust Metrics (Stats)
  const statsData = [
    { key: "projects_completed", label: "Completed Projects", value: "180", suffix: "+", sortOrder: 1 },
    { key: "years_experience", label: "Years of Practice", value: "14", suffix: "+", sortOrder: 2 },
    { key: "residential_crafted", label: "Residential Spaces", value: "125", suffix: "+", sortOrder: 3 },
    { key: "commercial_delivered", label: "Commercial Sites", value: "55", suffix: "+", sortOrder: 4 },
    { key: "cities_served", label: "Metros Served", value: "6", suffix: "", sortOrder: 5 },
  ];

  for (const stat of statsData) {
    await prisma.statItem.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat,
    });
  }
  console.log("Stats seeded.");

  // 6. Testimonials
  const testimonialsData = [
    {
      clientName: "Raghavendra & Sunita Rao",
      projectTitle: "The Courtyard Residence",
      location: "Jubilee Hills, Hyderabad",
      review: "SK Construction delivered what three prior architecture firms deemed impossible on our rocky site. The precision of their civil masonry and the sheer poetry of the interior woodwork has given us a sanctuary our family cherishes daily. Their turnkey discipline meant we never had to worry about contractors.",
      rating: 5,
      clientPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      isPublished: true,
      sortOrder: 1,
    },
    {
      clientName: "Vikram Singhania",
      projectTitle: "Soma Penthouse Atrium",
      location: "Worli, Mumbai",
      review: "Working with SK's team was an exercise in pure architectural rigor. The custom 14-tonne spiral staircase is a work of engineering art. They respect material integrity and never settle for standard catalog solutions. Truly a world-class studio.",
      rating: 5,
      clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      isPublished: true,
      sortOrder: 2,
    },
    {
      clientName: "Dr. Ananya Sen",
      projectTitle: "Verdant Villa Renovation",
      location: "Koramangala, Bengaluru",
      review: "Our 1990s house was dark and felt congested. SK's team took down structural walls, re-engineered the concrete columns, and brought the garden right into our living space. The transformation was completed within the agreed budget and handover date.",
      rating: 5,
      clientPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      isPublished: true,
      sortOrder: 3,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("Testimonials seeded.");

  // 7. Seed Sample Leads & CRM Notes
  const existingLeads = await prisma.lead.count();
  if (existingLeads === 0) {
    const lead1 = await prisma.lead.create({
      data: {
        name: "Devendra Verma",
        phone: "+91 98234 56789",
        email: "devendra.verma@example.com",
        city: "New Delhi",
        projectType: "Interior Design",
        propertyType: "Penthouse",
        approxArea: "4,200 sq.ft",
        budgetRange: "₹50 Lakh+",
        preferredStartDate: "Within 1 Month",
        message: "Looking for complete turnkey interior design for a 4-BHK penthouse in Greater Kailash. Interested in minimalist stone and wood aesthetics.",
        status: "QUALIFIED",
        assignedTo: "SK Admin",
      },
    });

    await prisma.leadNote.create({
      data: {
        leadId: lead1.id,
        author: "SK Admin",
        note: "Spoke with client. Site visit scheduled for this Saturday at 11:00 AM. Prepared portfolio samples of The Courtyard Residence.",
      },
    });

    const lead2 = await prisma.lead.create({
      data: {
        name: "Meera Krishnan",
        phone: "+91 97456 12340",
        email: "meera.k@innovatelabs.in",
        city: "Bengaluru",
        projectType: "Turnkey Projects",
        propertyType: "Villa",
        approxArea: "5,800 sq.ft",
        budgetRange: "₹50 Lakh+",
        preferredStartDate: "Immediate",
        message: "Need end-to-end civil construction and interior finishing for an independent villa plot in Whitefield.",
        status: "SITE_VISIT",
        assignedTo: "SK Admin",
      },
    });

    await prisma.leadNote.create({
      data: {
        leadId: lead2.id,
        author: "SK Admin",
        note: "Initial site inspection completed. Soil test report reviewed. Preparing structural BOQ and 3D concept render.",
      },
    });
  }

  // 8. Site Settings
  const settings = [
    { key: "business_name", value: "SK Construction" },
    { key: "tagline", value: "Spaces Designed To Be Lived In." },
    { key: "phone", value: "+91 98765 43210" },
    { key: "whatsapp", value: "+91 98765 43210" },
    { key: "email", value: "contact@skconstruction.com" },
    { key: "address", value: "Plot 42, Architectural Enclave, Design District, New Delhi 110001" },
    { key: "working_hours", value: "Monday – Saturday: 9:30 AM – 7:00 PM" },
    { key: "google_maps_url", value: "https://maps.google.com/?q=New+Delhi+Design+District" },
    { key: "instagram", value: "https://instagram.com" },
    { key: "linkedin", value: "https://linkedin.com" },
    { key: "youtube", value: "https://youtube.com" },
    { key: "footer_bio", value: "SK Construction is a comprehensive architecture, interior design, and turnkey civil construction firm crafting timeless spaces with unmatched material discipline." },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log("Site settings seeded.");

  // 9. SEO Settings
  const seoSettings = [
    {
      pageKey: "homepage",
      title: "SK Construction | Luxury Architecture, Interiors & Turnkey Projects",
      description: "Refined architecture, bespoke residential & commercial interiors, and turnkey civil construction. Spaces designed to be lived in.",
      ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      keywords: "interior design, luxury architecture, turnkey construction, residential interiors, modular kitchen, civil construction, India",
    },
    {
      pageKey: "projects",
      title: "Selected Works & Architectural Portfolio | SK Construction",
      description: "Explore our architectural portfolio spanning luxury villas, penthouses, commercial headquarters, and residential transformations.",
      ogImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      keywords: "architectural projects, interior design portfolio, luxury residences, renovation case studies",
    },
    {
      pageKey: "services",
      title: "Architectural Services & Turnkey Execution | SK Construction",
      description: "Comprehensive design and construction disciplines: interior architecture, modular kitchens, civil construction, and turnkey project delivery.",
      ogImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      keywords: "interior architecture services, turnkey contractor, civil construction company, modular kitchen design",
    },
  ];

  for (const seo of seoSettings) {
    await prisma.seoSetting.upsert({
      where: { pageKey: seo.pageKey },
      update: seo,
      create: seo,
    });
  }
  console.log("SEO settings seeded.");

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
