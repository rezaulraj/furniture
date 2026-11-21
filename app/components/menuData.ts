// Sub-categories shown in the header's mega menu (HATIL style).
// Each top-level item has up to 4 columns; each column stacks one or more groups.
// A group with no links is shown as a bold stand-alone category (no arrow).

export type MenuGroup = { title: string; links: string[] };
export type MegaMenu = { columns: MenuGroup[][] };

const g = (title: string, links: string[] = []): MenuGroup => ({ title, links });

export const MEGA: Record<string, MegaMenu> = {
  "Living Room": {
    columns: [
      [
        g("Sofa Set", ["Fabric Sofa", "Wooden Sofa", "L-Shaped Sofa", "Leather Sofa", "Rexin Sofa", "Sofa-Bed", "3-Seater Sofa", "2-Seater Sofa", "Single Seater", "Modular Sofa", "Sofa with Divan", "Multipurpose Sofa", "Storage Sofa", "Ottoman"]),
        g("Cushion"),
        g("Bedding Suite Set"),
      ],
      [
        g("Center Table", ["Center Table With Glass Top", "Center Table With Wooden Top", "Center Table With Storage", "Corner Table", "Modular Center Table", "Non-Lacquer Center Table", "Nested Table"]),
        g("Divan", ["Fabric Divan", "Wooden Divan", "Modular Divan"]),
        g("Shoe Rack", ["Storage", "Shoe Rack With Mirror"]),
        g("Cradle"),
        g("File Rack"),
      ],
      [
        g("Stand", ["Hanger Stand", "Iron Stand"]),
        g("TV Cabinet", ["TV Cabinet With Hanging Unit", "Low Height TV Cabinet", "Modular TV Cabinet"]),
        g("Open Shelves", ["Book Shelves", "Corner Shelves", "Display Rack"]),
      ],
      [
        g("Chair", ["Rocking Chair", "Easy Chair", "Accent Chair", "Bar Stool", "Foot Stool", "Telephone Seater", "Recliner Chair"]),
        g("Lobby", ["Lobby Table", "Lobby Chair"]),
      ],
    ],
  },
  Bedroom: {
    columns: [
      [
        g("Bed", ["King Size Bed", "Queen Size Bed", "Single Bed", "Semi Double Bed", "Storage Bed", "Hydraulic Bed", "Upholstered Bed", "Bunk Bed"]),
        g("Mattress", ["Spring Mattress", "Foam Mattress", "Orthopedic Mattress"]),
        g("Pillow"),
      ],
      [
        g("Wardrobe", ["2 Door Wardrobe", "3 Door Wardrobe", "4 Door Wardrobe", "Sliding Door Wardrobe", "Wardrobe With Mirror"]),
        g("Almirah", ["Wooden Almirah", "Steel Almirah"]),
        g("Chest of Drawers"),
      ],
      [
        g("Dressing Table", ["Dressing Table With Mirror", "Dressing Table With Stool", "Wall Mounted Dressing"]),
        g("Bedside Table", ["Bedside Table With Drawer", "Floating Bedside Table"]),
      ],
      [
        g("Bedroom Set", ["Master Bedroom Set", "Guest Bedroom Set"]),
        g("Bed Bench"),
        g("Blanket Box"),
      ],
    ],
  },
  Dining: {
    columns: [
      [
        g("Dining Table", ["4 Seater Dining Table", "6 Seater Dining Table", "8 Seater Dining Table", "Round Dining Table", "Extendable Dining Table", "Glass Top Dining Table", "Marble Top Dining Table"]),
      ],
      [
        g("Dining Chair", ["Wooden Dining Chair", "Upholstered Dining Chair", "Metal Dining Chair", "Dining Bench"]),
        g("Dining Set"),
      ],
      [
        g("Showcase", ["Crockery Showcase", "Glass Showcase", "Corner Showcase"]),
        g("Sideboard"),
      ],
      [
        g("Bar", ["Bar Stool", "Bar Cabinet", "Bar Table"]),
        g("Tea Trolley"),
      ],
    ],
  },
  Kitchen: {
    columns: [
      [g("Kitchen Cabinet", ["Base Cabinet", "Wall Cabinet", "Tall Unit", "Corner Unit"])],
      [g("Modular Kitchen", ["L-Shaped Kitchen", "U-Shaped Kitchen", "Parallel Kitchen", "Island Kitchen"])],
      [g("Kitchen Rack", ["Spice Rack", "Plate Rack", "Kitchen Trolley"]), g("Pantry Unit")],
      [g("Kitchen Seating", ["Counter Stool", "Breakfast Table"])],
    ],
  },
  "Kid's Room": {
    columns: [
      [g("Kids Bed", ["Single Bed", "Bunk Bed", "Trundle Bed"]), g("Cradle")],
      [g("Study Table", ["Study Table With Shelf", "Foldable Study Table"]), g("Study Chair")],
      [g("Kids Wardrobe", ["2 Door Wardrobe", "3 Door Wardrobe"]), g("Toy Storage")],
      [g("Book Rack"), g("Kids Chair")],
    ],
  },
  SmartFit: {
    columns: [
      [g("Space Saving", ["Wall Bed", "Sofa-Bed", "Foldable Table", "Extendable Dining"])],
      [g("Multi-Function", ["Storage Ottoman", "Convertible Desk", "Lift-Up Center Table"])],
      [g("Compact Living", ["Studio Apartment Set", "Compact Bedroom Set"])],
      [g("Balcony Furniture")],
    ],
  },
  Institutional: {
    columns: [
      [g("Education", ["Classroom Desk", "Lab Furniture", "Library Shelving", "Auditorium Chair"])],
      [g("Healthcare", ["Hospital Bed", "Waiting Chair", "Medicine Cabinet", "Bedside Locker"])],
      [g("Hospitality", ["Hotel Room Furniture", "Restaurant Seating", "Lobby Furniture"])],
      [g("Corporate", ["Workstation", "Conference Table", "Reception Desk", "Cafeteria Furniture"])],
    ],
  },
  Door: {
    columns: [
      [g("Wooden Door", ["Solid Wooden Door", "Panel Door", "Flush Door", "Veneer Door"])],
      [g("By Room", ["Main Entrance Door", "Bedroom Door", "Bathroom Door", "Kitchen Door"])],
      [g("Door Frame"), g("Door Hardware", ["Handle", "Lock", "Hinge"])],
    ],
  },
  Interior: {
    columns: [
      [g("Home Interior", ["Living Room Design", "Bedroom Design", "Kitchen Design", "Kids Room Design"])],
      [g("Office Interior", ["Workspace Design", "Reception Design", "Conference Room Design"])],
      [g("Commercial Projects", ["Hotel", "Restaurant", "Showroom"])],
      [g("3D Design Consultation"), g("Project Gallery")],
    ],
  },
  Office: {
    columns: [
      [g("Office Table", ["Executive Table", "Workstation", "Conference Table", "Reception Desk", "Computer Table"])],
      [g("Office Chair", ["Executive Chair", "Ergonomic Chair", "Visitor Chair", "Meeting Chair"])],
      [g("Office Storage", ["File Cabinet", "Bookcase", "Locker", "Pedestal"])],
      [g("Home Office", ["Study Desk", "Home Office Chair"]), g("Office Sofa")],
    ],
  },
};

// Product previews shown on the right side of the mega menu.
export type Featured = { name: string; price: string; img: string; tag?: string };

export const FEATURED: Record<string, Featured[]> = {
  "Living Room": [
    { name: "Andaman-184 Sofa", price: "34,800", img: "1555041469-a586c61ea9bc", tag: "Bestseller" },
    { name: "Dahlia Accent Chair", price: "18,450", img: "1567538096630-e0c55bd6374c", tag: "New" },
  ],
  Bedroom: [
    { name: "Linden-361 King Bed", price: "58,500", img: "1631679706909-1844bbd07221", tag: "New" },
    { name: "Aria Bedroom Set", price: "1,24,000", img: "1540518614846-7eded433c457" },
  ],
  Dining: [
    { name: "Marigold-113 Dining Set", price: "72,900", img: "1617806118233-18e1de247200", tag: "Bestseller" },
    { name: "Linden Dining Chair", price: "9,900", img: "1592078615290-033ee584e267" },
  ],
  Kitchen: [
    { name: "Oak Modular Kitchen", price: "1,85,000", img: "1556911220-bff31c812dba", tag: "Custom" },
    { name: "Andaman Counter Stool", price: "12,500", img: "1503602642458-232111445657" },
  ],
  "Kid's Room": [
    { name: "Nova Kids Room Set", price: "48,200", img: "1522708323590-d24dbb6b0267", tag: "New" },
    { name: "Pebble Toy Storage", price: "8,750", img: "1595428774223-ef52624120d2" },
  ],
  SmartFit: [
    { name: "Lucan Sofa-Bed", price: "42,300", img: "1493663284031-b7e3aefcae8e", tag: "Space Saving" },
    { name: "Fold Lounge Set", price: "36,900", img: "1586023492125-27b2c045efd7" },
  ],
  Institutional: [
    { name: "Corporate Lobby Set", price: "2,40,000", img: "1600566753190-17f0baa2a6c3", tag: "Project" },
    { name: "Team Workstation", price: "28,600", img: "1524758631624-e2822e304c36" },
  ],
  Door: [
    { name: "Solid Teak Main Door", price: "38,000", img: "1484101403633-562f891dc89a", tag: "Solid Wood" },
    { name: "Panel Bedroom Door", price: "16,500", img: "1558997519-83ea9252edf8" },
  ],
  Interior: [
    { name: "Modern Living Package", price: "3,50,000", img: "1600210492486-724fe5c67fb0", tag: "Turnkey" },
    { name: "Warm Lounge Design", price: "2,10,000", img: "1618220179428-22790b461013" },
  ],
  Office: [
    { name: "Executive Work Desk", price: "46,800", img: "1524758631624-e2822e304c36", tag: "New" },
    { name: "Ergo Pro Chair", price: "21,150", img: "1538688525198-9b88f6f53126" },
  ],
};

// URL helpers: "Living Room" -> "living-room", "Kid's Room" -> "kids-room"
export const slugify = (s: string) =>
  s.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const roomHref = (room: string) => `/categories/${slugify(room)}`;

export const ROOM_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.keys(MEGA).map((name) => [slugify(name), name]),
);
