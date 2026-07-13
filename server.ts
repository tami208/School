import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Inquiry {
  code: string;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  notes: string;
  date: string;
  status: "Awaiting Staff Review" | "Accepted" | "Rejected";
  filesCount: number;
  isBoarding: boolean;
  deviceId: string;
  staffAnswer?: string;
  answeredBy?: string;
  answeredAt?: string;

  // Differentiated Day vs Boarding Admission Fields
  admissionType?: "Day" | "Boarding";
  boardingHousePreference?: string;
  localGuardianName?: string;
  localGuardianPhone?: string;
  dietaryRestrictions?: string;
  busServiceRoute?: string;
  lunchPlan?: string;

  // New fields
  studentGender?: string;
  studentAge?: number;
  enrollmentStatus?: "Pending Documents" | "Awaiting Tuition Payment" | "Fully Enrolled" | "Deferred";
  docsSubmitted?: boolean;
  uniformIssued?: boolean;
  booksIssued?: boolean;
  feesCleared?: boolean;
  boardingAssignedRoom?: string;
}

interface Payment {
  reference: string;
  studentName: string;
  parentName: string;
  email: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: "Awaiting Verification" | "Verified" | "Declined";
  verifiedBy?: string;
  verifiedAt?: string;
  division: string;
  isBoarding: boolean;
  deviceId: string;
  bankAccountLinked?: string;
}

const DB_PATH = path.join(process.cwd(), "db.json");

function loadDb() {
  const defaultDb = {
    inquiries: [
      {
        code: "GDBG-INQ-4821-2026",
        parentName: "Engr. Kolawole Alao",
        studentName: "Tolulope Alao",
        email: "kolabayo@gmail.com",
        phone: "+234 803 111 2222",
        gradeLevel: "Primary 1",
        notes: "Interested in co-educational boarding options and math mentoring clinics.",
        date: "2026-06-25",
        status: "Awaiting Staff Review",
        filesCount: 1,
        isBoarding: true,
        deviceId: "sample-device-1",
        staffAnswer: ""
      },
      {
        code: "GDBG-INQ-9102-2026",
        parentName: "Dr. Ngozi Obi",
        studentName: "Chinedu Obi",
        email: "ngozi.obi@healthmail.ng",
        phone: "+234 812 345 6789",
        gradeLevel: "SS 1",
        notes: "Applying for the comprehensive science lab curriculum and boarding.",
        date: "2026-06-27",
        status: "Awaiting Staff Review",
        filesCount: 2,
        isBoarding: true,
        deviceId: "sample-device-2",
        staffAnswer: ""
      }
    ] as Inquiry[],
    payments: [
      {
        reference: "TXN-GDBG-83021",
        studentName: "Tolulope Alao",
        parentName: "Engr. Kolawole Alao",
        email: "kolabayo@gmail.com",
        amount: 850000,
        paymentMethod: "Bank Transfer",
        date: "2026-06-28",
        status: "Awaiting Verification",
        division: "Primary 1",
        isBoarding: true,
        deviceId: "sample-device-1",
        bankAccountLinked: "Access Bank (Goldbridge Main - 1029384756)"
      },
      {
        reference: "TXN-GDBG-11092",
        studentName: "Amina Yusuf",
        parentName: "Alhaji Yusuf Ibrahim",
        email: "yusuf.ibrahim@northernlink.com",
        amount: 550000,
        paymentMethod: "Card Payment",
        date: "2026-06-26",
        status: "Verified",
        verifiedBy: "BURSAR ALIYU",
        verifiedAt: "2026-06-27 10:30 AM",
        division: "JSS 2",
        isBoarding: false,
        deviceId: "sample-device-3",
        bankAccountLinked: "GTBank (Goldbridge Fees - 0987654321)"
      }
    ] as Payment[]
  };

  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading database file, using defaults:", err);
  }

  // Create database file with defaults if missing
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2));
  } catch (err) {
    console.error("Could not write database file:", err);
  }

  return defaultDb;
}

function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to database file:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Inquiries Endpoints
  app.get("/api/inquiries", (req, res) => {
    const { deviceId, role } = req.query;
    const db = loadDb();

    // If signed in as staff (EDUCATOR or ADMINISTRATOR or BURSAR), return everything
    if (role === "EDUCATOR" || role === "ADMINISTRATOR" || role === "BURSAR") {
      return res.json(db.inquiries);
    }

    // Otherwise, return inquiries filtered by deviceId
    if (!deviceId) {
      return res.json([]);
    }

    const filtered = db.inquiries.filter((inq: Inquiry) => inq.deviceId === deviceId);
    res.json(filtered);
  });

  app.post("/api/inquiries", (req, res) => {
    const { 
      parentName, 
      studentName, 
      email, 
      phone, 
      gradeLevel, 
      notes, 
      filesCount, 
      isBoarding, 
      deviceId,
      admissionType,
      boardingHousePreference,
      localGuardianName,
      localGuardianPhone,
      dietaryRestrictions,
      busServiceRoute,
      lunchPlan,
      studentGender,
      studentAge
    } = req.body;
    
    if (!parentName || !studentName || !email || !deviceId) {
      return res.status(400).json({ error: "Missing required inquiry fields" });
    }

    const db = loadDb();
    const code = `GDBG-INQ-${Math.floor(1000 + Math.random() * 9000)}-2026`;
    
    const newInquiry: Inquiry = {
      code,
      parentName,
      studentName,
      email,
      phone: phone || "",
      gradeLevel,
      notes: notes || "",
      date: new Date().toISOString().split("T")[0],
      status: "Awaiting Staff Review",
      filesCount: filesCount || 0,
      isBoarding: admissionType === "Boarding" || !!isBoarding,
      deviceId,
      staffAnswer: "",
      
      // Save specific attributes
      admissionType: admissionType || (isBoarding ? "Boarding" : "Day"),
      boardingHousePreference: boardingHousePreference || "",
      localGuardianName: localGuardianName || "",
      localGuardianPhone: localGuardianPhone || "",
      dietaryRestrictions: dietaryRestrictions || "",
      busServiceRoute: busServiceRoute || "",
      lunchPlan: lunchPlan || "",

      // Gender & Age & Monitoring defaults
      studentGender: studentGender || "Male",
      studentAge: studentAge ? Number(studentAge) : 6,
      enrollmentStatus: "Pending Documents",
      docsSubmitted: false,
      uniformIssued: false,
      booksIssued: false,
      feesCleared: false,
      boardingAssignedRoom: ""
    };

    db.inquiries.unshift(newInquiry);
    saveDb(db);

    res.status(201).json(newInquiry);
  });

  app.put("/api/inquiries/:code", (req, res) => {
    const { code } = req.params;
    const { 
      status, 
      staffAnswer, 
      answeredBy,
      enrollmentStatus,
      docsSubmitted,
      uniformIssued,
      booksIssued,
      feesCleared,
      boardingAssignedRoom
    } = req.body;
    const db = loadDb();

    const idx = db.inquiries.findIndex((inq: Inquiry) => inq.code === code);
    if (idx === -1) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    if (status) {
      db.inquiries[idx].status = status;
    }
    if (staffAnswer !== undefined) {
      db.inquiries[idx].staffAnswer = staffAnswer;
    }
    if (answeredBy) {
      db.inquiries[idx].answeredBy = answeredBy;
      db.inquiries[idx].answeredAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Update monitoring fields if provided
    if (enrollmentStatus !== undefined) {
      db.inquiries[idx].enrollmentStatus = enrollmentStatus;
    }
    if (docsSubmitted !== undefined) {
      db.inquiries[idx].docsSubmitted = !!docsSubmitted;
    }
    if (uniformIssued !== undefined) {
      db.inquiries[idx].uniformIssued = !!uniformIssued;
    }
    if (booksIssued !== undefined) {
      db.inquiries[idx].booksIssued = !!booksIssued;
    }
    if (feesCleared !== undefined) {
      db.inquiries[idx].feesCleared = !!feesCleared;
    }
    if (boardingAssignedRoom !== undefined) {
      db.inquiries[idx].boardingAssignedRoom = boardingAssignedRoom;
    }

    saveDb(db);
    res.json(db.inquiries[idx]);
  });

  // API: Payments Endpoints
  app.get("/api/payments", (req, res) => {
    const { deviceId, role } = req.query;
    const db = loadDb();

    // If signed in as BURSAR or ADMINISTRATOR, they see all payments
    if (role === "BURSAR" || role === "ADMINISTRATOR") {
      return res.json(db.payments);
    }

    // Otherwise, return payments filtered by deviceId so parent can view their own ledger
    if (!deviceId) {
      return res.json([]);
    }

    const filtered = db.payments.filter((p: Payment) => p.deviceId === deviceId);
    res.json(filtered);
  });

  app.post("/api/payments", (req, res) => {
    const { studentName, parentName, email, amount, paymentMethod, division, isBoarding, deviceId, bankAccountLinked } = req.body;
    
    if (!studentName || !parentName || !amount || !deviceId) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const db = loadDb();
    const reference = `TXN-GDBG-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPayment: Payment = {
      reference,
      studentName,
      parentName,
      email: email || "",
      amount: Number(amount),
      paymentMethod: paymentMethod || "Bank Transfer",
      date: new Date().toISOString().split("T")[0],
      status: "Awaiting Verification",
      division: division || "General",
      isBoarding: !!isBoarding,
      deviceId,
      bankAccountLinked: bankAccountLinked || "Access Bank (Goldbridge Main - 1029384756)"
    };

    db.payments.unshift(newPayment);
    saveDb(db);

    res.status(201).json(newPayment);
  });

  app.put("/api/payments/:reference", (req, res) => {
    const { reference } = req.params;
    const { status, verifiedBy } = req.body;
    const db = loadDb();

    const idx = db.payments.findIndex((p: Payment) => p.reference === reference);
    if (idx === -1) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    if (status) {
      db.payments[idx].status = status;
    }
    if (verifiedBy) {
      db.payments[idx].verifiedBy = verifiedBy;
      db.payments[idx].verifiedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    saveDb(db);
    res.json(db.payments[idx]);
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
