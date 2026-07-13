import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Inbox, 
  Send, 
  Download, 
  CheckCircle2, 
  ClipboardCheck, 
  ArrowRight,
  GraduationCap,
  Upload,
  Trash2,
  FileImage,
  Bed,
  ShieldCheck,
  XCircle,
  Coins,
  Building,
  User,
  Users,
  Search,
  Check,
  Info,
  ExternalLink
} from 'lucide-react';
import { FAQS, TUITION_FEES } from '../data';

// Device ID isolation helper
const getDeviceId = () => {
  let id = localStorage.getItem('goldbridge_device_id');
  if (!id) {
    id = 'dev-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now().toString(36);
    localStorage.setItem('goldbridge_device_id', id);
  }
  return id;
};

export default function AdmissionsView() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [faqCategory, setFaqCategory] = useState<'All' | 'Admissions' | 'Academics' | 'General' | 'Student Life'>('All');

  const deviceId = getDeviceId();

  // Active user / staff states
  const [staffSession, setStaffSession] = useState<any | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'inquiries' | 'payments' | 'admitted'>('inquiries');

  // Online Inquiry Form state
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGender, setStudentGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [studentAge, setStudentAge] = useState('6');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Primary 1');
  const [notes, setNotes] = useState('');
  const [applyBoarding, setApplyBoarding] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submissionCode, setSubmissionCode] = useState('');

  // New differentiated Day vs Boarding inquiry state fields
  const [admissionType, setAdmissionType] = useState<'Day' | 'Boarding'>('Day');
  const [boardingHousePreference, setBoardingHousePreference] = useState('Goldbridge Manor (Boys)');
  const [localGuardianName, setLocalGuardianName] = useState('');
  const [localGuardianPhone, setLocalGuardianPhone] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [busServiceRoute, setBusServiceRoute] = useState('None');
  const [lunchPlan, setLunchPlan] = useState('None');

  // Staff registry filters
  const [staffInqFilter, setStaffInqFilter] = useState<'All' | 'Day' | 'Boarding'>('All');
  
  // Tuition list category filters
  const [tuitionCategoryFilter, setTuitionCategoryFilter] = useState<'All' | 'Early Years' | 'Primary School' | 'Junior Secondary' | 'Senior Secondary'>('All');

  // Interactive Fee Calculator state
  const [calcClass, setCalcClass] = useState('Primary 1 (Age 6)');
  const [calcAdmissionType, setCalcAdmissionType] = useState<'Day' | 'Boarding'>('Day');
  const [calcSibling, setCalcSibling] = useState(false);
  const [calcTransport, setCalcTransport] = useState<'None' | 'Zone A' | 'Zone B'>('None');
  const [calcLunch, setCalcLunch] = useState<'None' | 'Gourmet Meal'>('None');
  const [calcUniformBook, setCalcUniformBook] = useState(false);
  const [calcExtraSTEM, setCalcExtraSTEM] = useState(false);

  // Parent Payment Submission Form state
  const [paymentStudentName, setPaymentStudentName] = useState('');
  const [paymentParentName, setPaymentParentName] = useState('');
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [paymentDivision, setPaymentDivision] = useState('Primary 1');
  const [paymentBoarding, setPaymentBoarding] = useState(false);
  const [paymentAccount, setPaymentAccount] = useState('Access Bank (Goldbridge Main - 1029384756)');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [paymentReference, setPaymentReference] = useState('');

  // Data loaded from server API
  const [myInquiries, setMyInquiries] = useState<any[]>([]);
  const [myPayments, setMyPayments] = useState<any[]>([]);
  const [allInquiries, setAllInquiries] = useState<any[]>([]);
  const [allPayments, setAllPayments] = useState<any[]>([]);

  // Staff intervention / reply state
  const [selectedInq, setSelectedInq] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Admitted monitoring editor state
  const [selectedAdmitted, setSelectedAdmitted] = useState<any | null>(null);
  const [monEnrollmentStatus, setMonEnrollmentStatus] = useState('Pending Documents');
  const [monDocsSubmitted, setMonDocsSubmitted] = useState(false);
  const [monUniformIssued, setMonUniformIssued] = useState(false);
  const [monBooksIssued, setMonBooksIssued] = useState(false);
  const [monFeesCleared, setMonFeesCleared] = useState(false);
  const [monBoardingRoom, setMonBoardingRoom] = useState('');

  // Sync editor state when active selection changes
  useEffect(() => {
    if (selectedAdmitted) {
      setMonEnrollmentStatus(selectedAdmitted.enrollmentStatus || 'Pending Documents');
      setMonDocsSubmitted(!!selectedAdmitted.docsSubmitted);
      setMonUniformIssued(!!selectedAdmitted.uniformIssued);
      setMonBooksIssued(!!selectedAdmitted.booksIssued);
      setMonFeesCleared(!!selectedAdmitted.feesCleared);
      setMonBoardingRoom(selectedAdmitted.boardingAssignedRoom || '');
    }
  }, [selectedAdmitted]);

  // Drag and drop / image upload states
  const [uploadedImages, setUploadedImages] = useState<{ name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Load and refresh data
  const loadData = async () => {
    // Check staff session
    const savedStaff = localStorage.getItem('goldbridge_staff_session');
    let staffObj = null;
    if (savedStaff) {
      try {
        staffObj = JSON.parse(savedStaff);
        setStaffSession(staffObj);
      } catch (e) {
        console.error(e);
      }
    } else {
      setStaffSession(null);
    }

    const currentRole = staffObj ? staffObj.role : '';

    try {
      // 1. Fetch Inquiries
      const inquiriesUrl = `/api/inquiries?deviceId=${deviceId}&role=${currentRole}`;
      const resInq = await fetch(inquiriesUrl);
      const dataInq = await resInq.json();
      if (currentRole === 'EDUCATOR' || currentRole === 'ADMINISTRATOR' || currentRole === 'BURSAR') {
        setAllInquiries(dataInq);
      } else {
        setMyInquiries(dataInq);
      }

      // 2. Fetch Payments
      const paymentsUrl = `/api/payments?deviceId=${deviceId}&role=${currentRole}`;
      const resPay = await fetch(paymentsUrl);
      const dataPay = await resPay.json();
      if (currentRole === 'BURSAR' || currentRole === 'ADMINISTRATOR') {
        setAllPayments(dataPay);
      } else {
        setMyPayments(dataPay);
      }
    } catch (err) {
      console.error("API Fetch error, falling back to local simulation", err);
    }
  };

  useEffect(() => {
    loadData();
    // Listen for login changes
    window.addEventListener('staff-login-change', loadData);
    return () => {
      window.removeEventListener('staff-login-change', loadData);
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const list = [...uploadedImages];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const sizeKB = Math.round(file.size / 1024);
        const sizeStr = sizeKB > 1000 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        list.push({ name: file.name, size: sizeStr });
      }
    }
    setUploadedImages(list);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    document.getElementById('file-upload-input')?.click();
  };

  const handleFAQToggle = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  // Submit Inquiry through API
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const isBoardingVal = admissionType === 'Boarding';

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          studentName,
          email,
          phone,
          gradeLevel,
          notes,
          isBoarding: isBoardingVal,
          filesCount: uploadedImages.length,
          deviceId,
          admissionType,
          boardingHousePreference: isBoardingVal ? boardingHousePreference : '',
          localGuardianName: isBoardingVal ? localGuardianName : '',
          localGuardianPhone: isBoardingVal ? localGuardianPhone : '',
          dietaryRestrictions: isBoardingVal ? dietaryRestrictions : '',
          busServiceRoute: !isBoardingVal ? busServiceRoute : '',
          lunchPlan: !isBoardingVal ? lunchPlan : '',
          studentGender,
          studentAge: Number(studentAge) || 6
        })
      });

      if (response.ok) {
        const newInq = await response.json();
        setSubmissionCode(newInq.code);
        setFormStatus('success');

        // Clear values
        setParentName('');
        setStudentName('');
        setStudentGender('Male');
        setStudentAge('6');
        setEmail('');
        setPhone('');
        setNotes('');
        setApplyBoarding(false);
        setBoardingHousePreference('Goldbridge Manor (Boys)');
        setLocalGuardianName('');
        setLocalGuardianPhone('');
        setDietaryRestrictions('');
        setBusServiceRoute('None');
        setLunchPlan('None');
        setUploadedImages([]);
        loadData();
      } else {
        throw new Error("Failed to save on server");
      }
    } catch (err) {
      console.error(err);
      // Client-side fallback if server fails
      const code = `GDBG-INQ-${Math.floor(1000 + Math.random() * 9000)}-2026`;
      const fallbackInq = {
        code,
        parentName,
        studentName,
        email,
        phone,
        gradeLevel,
        date: new Date().toISOString().split('T')[0],
        status: 'Awaiting Staff Review',
        filesCount: uploadedImages.length,
        isBoarding: isBoardingVal,
        notes,
        deviceId,
        admissionType,
        boardingHousePreference: isBoardingVal ? boardingHousePreference : '',
        localGuardianName: isBoardingVal ? localGuardianName : '',
        localGuardianPhone: isBoardingVal ? localGuardianPhone : '',
        dietaryRestrictions: isBoardingVal ? dietaryRestrictions : '',
        busServiceRoute: !isBoardingVal ? busServiceRoute : '',
        lunchPlan: !isBoardingVal ? lunchPlan : '',
        studentGender,
        studentAge: Number(studentAge) || 6
      };
      const savedInquiries = JSON.parse(localStorage.getItem('goldbridge_inquiries') || '[]');
      const updated = [fallbackInq, ...savedInquiries];
      localStorage.setItem('goldbridge_inquiries', JSON.stringify(updated));
      setMyInquiries(updated);

      setSubmissionCode(code);
      setFormStatus('success');
      
      setParentName('');
      setStudentName('');
      setStudentGender('Male');
      setStudentAge('6');
      setEmail('');
      setPhone('');
      setNotes('');
      setApplyBoarding(false);
      setBoardingHousePreference('Goldbridge Manor (Boys)');
      setLocalGuardianName('');
      setLocalGuardianPhone('');
      setDietaryRestrictions('');
      setBusServiceRoute('None');
      setLunchPlan('None');
      setUploadedImages([]);
    }
  };

  // Submit Simulated Payment through API
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('submitting');

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: paymentStudentName,
          parentName: paymentParentName,
          email: paymentEmail,
          amount: Number(paymentAmount),
          paymentMethod,
          division: paymentDivision,
          isBoarding: paymentBoarding,
          bankAccountLinked: paymentAccount,
          deviceId
        })
      });

      if (response.ok) {
        const newPay = await response.json();
        setPaymentReference(newPay.reference);
        setPaymentStatus('success');

        setPaymentStudentName('');
        setPaymentParentName('');
        setPaymentEmail('');
        setPaymentAmount('');
        setPaymentBoarding(false);
        loadData();
      } else {
        throw new Error("Payment upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Payment submitted successfully under offline simulation!");
      setPaymentStatus('idle');
    }
  };

  // Staff: Update Inquiry status/answer
  const handleInquiryReview = async (code: string, status: 'Accepted' | 'Rejected') => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/inquiries/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          staffAnswer: replyText,
          answeredBy: staffSession ? staffSession.name : 'STAF DESK'
        })
      });

      if (response.ok) {
        setReplyText('');
        setSelectedInq(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Bursar: Verify Payment
  const handleVerifyPayment = async (reference: string, status: 'Verified' | 'Declined') => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/payments/${reference}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          verifiedBy: staffSession ? staffSession.name : 'BURSAR DESK'
        })
      });

      if (response.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Staff: Update Admitted Student Monitoring metrics
  const handleUpdateMonitoring = async (
    code: string,
    updates: {
      enrollmentStatus?: string;
      docsSubmitted?: boolean;
      uniformIssued?: boolean;
      booksIssued?: boolean;
      feesCleared?: boolean;
      boardingAssignedRoom?: string;
    }
  ) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/inquiries/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        loadData();
      }
    } catch (err) {
      console.error("Error updating monitoring status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePrintAdmissionForm = () => {
    window.print();
  };

  const filteredFaqs = faqCategory === 'All' 
    ? FAQS 
    : FAQS.filter(f => f.category === faqCategory);

  const steps = [
    { title: 'Inquiry', desc: 'Complete our online admission inquiry form or request a physical campus guided tour.' },
    { title: 'Assessments', desc: 'The student participates in age-graded verbal, mathematical, and writing aptitude test sessions.' },
    { title: 'Admittance', desc: 'Secure an admission offer letter from the Board of Governors once grading metrics align.' },
    { title: 'Settlement', desc: 'Submit uniform sizes, birth certificate, previous results, and clear initial ledger balances.' }
  ];

  const officialAccounts = [
    { bank: 'Access Bank', accountName: 'Goldbridge Academy Main', accountNumber: '1029384756', purpose: 'Tuition & Academic Fees' },
    { bank: 'GTBank', accountName: 'Goldbridge Academy Fees', accountNumber: '0987654321', purpose: 'Nursery & Early Years' },
    { bank: 'Zenith Bank', accountName: 'Goldbridge Boarding Wing', accountNumber: '5060708090', purpose: 'Boarding & Hostel Residency' }
  ];

  return (
    <div className="w-full font-sans text-brand-blue bg-white py-12 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        
        {/* Title Segment */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-gold font-bold uppercase tracking-wider text-[11px] font-mono block">
            Join our academic community
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight leading-none font-display">
            Admission Portal
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            Take the initial steps. Secure premium educational training and strong ethical grooming for your children.
          </p>
        </div>

        {/* STAFF REGISTRY & BURSARY CONSOLE BOARD */}
        {staffSession && (
          <div className="bg-slate-50 border-2 border-brand-gold rounded-3xl p-6 md:p-8 space-y-6 shadow-xl text-left animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0 animate-pulse" />
                  <span className="text-xs font-mono text-brand-gold font-extrabold uppercase tracking-widest bg-brand-gold/10 px-2.5 py-1 rounded">
                    {staffSession.role} Workspace
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-brand-blue font-display">
                  Official Administrative Registry Console
                </h2>
                <p className="text-xs text-gray-500">
                  Logged in as <strong className="text-brand-blue">{staffSession.name}</strong> • Live synchronization active.
                </p>
              </div>

              {/* Console Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('inquiries'); setSelectedInq(null); setSelectedAdmitted(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-2 cursor-pointer ${
                    activeConsoleTab === 'inquiries' 
                      ? 'bg-brand-blue text-brand-gold shadow' 
                      : 'bg-white border text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>Inquiries Review ({allInquiries.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('payments'); setSelectedInq(null); setSelectedAdmitted(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-2 cursor-pointer ${
                    activeConsoleTab === 'payments' 
                      ? 'bg-brand-blue text-brand-gold shadow' 
                      : 'bg-white border text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span>Bursary Verifications ({allPayments.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveConsoleTab('admitted'); setSelectedInq(null); setSelectedAdmitted(allInquiries.find(i => i.status === 'Accepted') || null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-2 cursor-pointer ${
                    activeConsoleTab === 'admitted' 
                      ? 'bg-brand-blue text-brand-gold shadow' 
                      : 'bg-white border text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Admitted Status Monitor ({allInquiries.filter(i => i.status === 'Accepted').length})</span>
                </button>
              </div>
            </div>

            {/* INQUIRIES REVIEW TAB */}
            {activeConsoleTab === 'inquiries' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left panel: List of all inquiries with pathway filters */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <h3 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest font-mono">
                      Admissions Inquiries Review
                    </h3>
                    <div className="flex bg-slate-200/60 border rounded-xl p-0.5 text-[10px] font-bold font-sans">
                      {(['All', 'Day', 'Boarding'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setStaffInqFilter(f)}
                          className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                            staffInqFilter === f
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {f} ({
                            f === 'All' 
                              ? allInquiries.length 
                              : f === 'Day'
                              ? allInquiries.filter(i => i.isBoarding === false || i.admissionType === 'Day').length
                              : allInquiries.filter(i => i.isBoarding === true || i.admissionType === 'Boarding').length
                          })
                        </button>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const filteredInquiries = allInquiries.filter(i => {
                      if (staffInqFilter === 'All') return true;
                      if (staffInqFilter === 'Day') return i.isBoarding === false || i.admissionType === 'Day';
                      if (staffInqFilter === 'Boarding') return i.isBoarding === true || i.admissionType === 'Boarding';
                      return true;
                    });

                    return filteredInquiries.length === 0 ? (
                      <div className="bg-white p-8 border rounded-2xl text-center text-gray-400 font-sans space-y-2">
                        <Inbox className="w-10 h-10 mx-auto text-gray-300" />
                        <p className="font-bold text-xs">No {staffInqFilter !== 'All' ? staffInqFilter.toLowerCase() : ''} inquiries registered yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                        {filteredInquiries.map((inq, idx) => (
                          <div
                            key={idx}
                            onClick={() => { setSelectedInq(inq); setReplyText(inq.staffAnswer || ''); }}
                            className={`p-4 rounded-2xl border text-left cursor-pointer transition flex justify-between items-start gap-3 ${
                              selectedInq?.code === inq.code
                                ? 'bg-brand-blue text-white border-brand-gold shadow animate-none'
                                : 'bg-white hover:bg-slate-50 border-gray-150'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-sm block">
                                  {inq.studentName}
                                </span>
                                {(inq.isBoarding || inq.admissionType === 'Boarding') && (
                                  <span className="bg-brand-gold text-brand-blue text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                                    BOARDING
                                  </span>
                                )}
                              </div>
                              <span className={`text-[10px] block font-mono ${selectedInq?.code === inq.code ? 'text-brand-gold-light' : 'text-brand-gold-dark'}`}>
                                {inq.code} • {inq.gradeLevel}
                              </span>
                              <p className={`text-xs ${selectedInq?.code === inq.code ? 'text-gray-200' : 'text-gray-500'} line-clamp-1`}>
                                Parent: {inq.parentName} • {inq.phone}
                              </p>
                            </div>
                            
                            <span className={`py-1 px-2.5 rounded font-mono font-bold text-[9px] uppercase border tracking-wider shrink-0 ${
                              inq.status === 'Accepted'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : inq.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-600 border-rose-200'
                                : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Right panel: Detail Review & Answer */}
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-150 space-y-4">
                  {selectedInq ? (
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">Candidate Review Sheet</span>
                        <h4 className="font-extrabold text-brand-blue text-base">{selectedInq.studentName}</h4>
                        <p className="text-xs text-gray-500">Submitted on {selectedInq.date}</p>
                      </div>

                      <div className="space-y-2.5 text-xs text-gray-600">
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-semibold text-gray-500">Parent Name:</span>
                          <span className="font-bold text-brand-blue">{selectedInq.parentName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-semibold text-gray-500">Email Contact:</span>
                          <span className="font-mono">{selectedInq.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-semibold text-gray-500">Phone Contact:</span>
                          <span className="font-mono">{selectedInq.phone}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="font-semibold text-gray-500">Pathway:</span>
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            selectedInq.isBoarding || selectedInq.admissionType === 'Boarding'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {selectedInq.isBoarding || selectedInq.admissionType === 'Boarding' ? 'BOARDING WING' : 'DAY SCHOLAR'}
                          </span>
                        </div>

                        {/* Pathway Specific Display */}
                        {(selectedInq.isBoarding || selectedInq.admissionType === 'Boarding') ? (
                          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-150 space-y-1.5 text-[11px] text-gray-700 text-left">
                            <p className="font-extrabold text-indigo-800 text-[10px] uppercase tracking-wide">Boarding Student Details:</p>
                            <p><strong>Hostel Preference:</strong> {selectedInq.boardingHousePreference || 'Goldbridge Manor (Boys)'}</p>
                            <p><strong>Local Guardian:</strong> {selectedInq.localGuardianName || 'N/A'}</p>
                            <p><strong>Guardian Phone:</strong> {selectedInq.localGuardianPhone || 'N/A'}</p>
                            <p><strong>Dietary Restrictions:</strong> {selectedInq.dietaryRestrictions || 'None Declared'}</p>
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-150 space-y-1.5 text-[11px] text-gray-700 text-left">
                            <p className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wide">Day Scholar Details:</p>
                            <p><strong>Shuttle Route:</strong> {selectedInq.busServiceRoute || 'None (Parent pickup)'}</p>
                            <p><strong>Hot Lunch Plan:</strong> {selectedInq.lunchPlan || 'No'}</p>
                          </div>
                        )}

                        <div className="space-y-1">
                          <span className="font-bold block">Inquiry Notes:</span>
                          <div className="bg-brand-gray p-3 rounded-xl border border-gray-100 italic text-gray-500">
                            "{selectedInq.notes || 'No custom remarks provided.'}"
                          </div>
                        </div>

                        {selectedInq.filesCount > 0 && (
                          <div className="flex items-center gap-1.5 text-brand-gold-dark font-bold bg-brand-gold/5 border border-brand-gold/15 p-2 rounded-xl">
                            <FileImage className="w-4 h-4 text-brand-gold shrink-0" />
                            <span>{selectedInq.filesCount} uploaded credential images attached</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <label className="text-xs font-bold text-gray-700 block text-left">Registrar Official Response / Admissions Note *</label>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="e.g., We would love to offer Tolulope admission. Please bring him in for exams on Tuesday..."
                          rows={3}
                          className="w-full text-xs p-3 border rounded-xl outline-none focus:border-brand-gold text-brand-blue bg-slate-55"
                        />
                      </div>

                      {/* Review Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleInquiryReview(selectedInq.code, 'Accepted')}
                          disabled={actionLoading}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Admission</span>
                        </button>
                        <button
                          onClick={() => handleInquiryReview(selectedInq.code, 'Rejected')}
                          disabled={actionLoading}
                          className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline/Reject</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-2 py-16">
                      <Inbox className="w-12 h-12 text-slate-300" />
                      <p className="text-xs font-bold font-mono">SELECT AN INQUIRY TO REVIEW AND RESPOND</p>
                      <p className="text-[10px] text-gray-400">Review candidate files, update statuses, and send official feedback notices.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* BURSARY REVIEW TAB */}
            {activeConsoleTab === 'payments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest font-mono">
                    Tuition Fees Payments Verification Board
                  </h3>
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>Total Submissions: {allPayments.length}</span>
                  </div>
                </div>

                {allPayments.length === 0 ? (
                  <div className="bg-white p-12 border rounded-2xl text-center text-gray-400 font-sans space-y-2">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="font-bold text-xs">No ledger payments submitted for review.</p>
                  </div>
                ) : (
                  <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-brand-blue text-white uppercase font-mono font-bold text-[10px] tracking-wide">
                          <tr>
                            <th className="py-3.5 px-5">Student / Parent Details</th>
                            <th className="py-3.5 px-3">Txn Reference</th>
                            <th className="py-3.5 px-3">Bank Account Linked</th>
                            <th className="py-3.5 px-3 text-right">Amount Paid</th>
                            <th className="py-3.5 px-3 text-center">Status</th>
                            <th className="py-3.5 px-5 text-center">Action Console</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 text-gray-600 font-medium">
                          {allPayments.map((p, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition">
                              <td className="py-4 px-5">
                                <div className="space-y-0.5 text-left">
                                  <span className="font-bold text-brand-blue block text-[13px]">{p.studentName}</span>
                                  <span className="text-[10px] text-gray-400 block font-mono">
                                    Grade: {p.division} {p.isBoarding ? '• BOARDING' : '• DAY'}
                                  </span>
                                  <span className="text-[10px] text-gray-400 block">Parent: {p.parentName}</span>
                                </div>
                              </td>
                              <td className="py-4 px-3 font-mono font-bold text-brand-gold-dark">{p.reference}</td>
                              <td className="py-4 px-3 text-gray-500 font-mono text-[10px]">{p.bankAccountLinked}</td>
                              <td className="py-4 px-3 text-right font-extrabold text-brand-blue">₦{p.amount.toLocaleString()}</td>
                              <td className="py-4 px-3 text-center">
                                <span className={`py-1 px-2.5 rounded font-mono font-bold text-[9px] uppercase border tracking-wider ${
                                  p.status === 'Verified'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                    : p.status === 'Declined'
                                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                                    : 'bg-amber-50 text-amber-600 border-amber-200'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-4 px-5 text-center">
                                {p.status === 'Awaiting Verification' ? (
                                  <div className="flex gap-1.5 justify-center">
                                    <button
                                      onClick={() => handleVerifyPayment(p.reference, 'Verified')}
                                      disabled={actionLoading}
                                      className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition cursor-pointer"
                                    >
                                      Verify Ledger
                                    </button>
                                    <button
                                      onClick={() => handleVerifyPayment(p.reference, 'Declined')}
                                      disabled={actionLoading}
                                      className="py-1 px-2.5 bg-rose-650 hover:bg-rose-700 text-white font-bold rounded-lg text-[10px] transition cursor-pointer"
                                    >
                                      Decline
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-[10px] text-gray-400 font-mono uppercase">
                                    Reviewed by {p.verifiedBy || 'Bursar'}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ADMITTED STATUS MONITOR TAB */}
            {activeConsoleTab === 'admitted' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
                {/* Left panel: List of all admitted students */}
                <div className="lg:col-span-6 space-y-3 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest font-mono">
                      Admitted Candidates Status Board
                    </h3>
                  </div>

                  {(() => {
                    const admitted = allInquiries.filter(i => i.status === 'Accepted');
                    return admitted.length === 0 ? (
                      <div className="bg-white p-12 border rounded-2xl text-center text-gray-400 font-sans space-y-2">
                        <Users className="w-10 h-10 mx-auto text-gray-300" />
                        <p className="font-bold text-xs">No admitted candidates registered on campus yet.</p>
                        <p className="text-[10px] text-gray-400">Accepted inquiries will automatically appear on this ledger monitor.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
                        {admitted.map((inq, idx) => {
                          const isSel = selectedAdmitted?.code === inq.code;
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedAdmitted(inq)}
                              className={`p-4 rounded-2xl border text-left cursor-pointer transition relative overflow-hidden ${
                                isSel
                                  ? 'bg-brand-blue text-white border-brand-gold shadow'
                                  : 'bg-white hover:bg-slate-50 border-gray-150'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-sm">{inq.studentName}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                      inq.studentGender === 'Female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {inq.studentGender || 'Male'}, {inq.studentAge || 6} yrs
                                    </span>
                                  </div>
                                  <span className={`py-0.5 px-2 rounded-md font-mono font-bold text-[9px] uppercase border shrink-0 ${
                                    inq.enrollmentStatus === 'Fully Enrolled'
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                      : inq.enrollmentStatus === 'Awaiting Term Start'
                                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                                      : 'bg-amber-50 text-amber-600 border-amber-200'
                                  }`}>
                                    {inq.enrollmentStatus || 'Pending Documents'}
                                  </span>
                                </div>
                                
                                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                  <span>{inq.code} • {inq.gradeLevel}</span>
                                  <span className="uppercase tracking-wider font-extrabold text-brand-gold">
                                    {inq.admissionType === 'Boarding' || inq.isBoarding ? 'Boarder' : 'Day'}
                                  </span>
                                </div>

                                {/* Checklist summary badges */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold ${
                                    inq.docsSubmitted ? 'bg-emerald-50 text-emerald-750 border border-emerald-200' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    📄 Docs {inq.docsSubmitted ? '✓' : '✗'}
                                  </span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold ${
                                    inq.uniformIssued ? 'bg-emerald-50 text-emerald-750 border border-emerald-200' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    👕 Uniform {inq.uniformIssued ? '✓' : '✗'}
                                  </span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold ${
                                    inq.booksIssued ? 'bg-emerald-50 text-emerald-750 border border-emerald-200' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    📚 Books {inq.booksIssued ? '✓' : '✗'}
                                  </span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-mono font-bold ${
                                    inq.feesCleared ? 'bg-emerald-50 text-emerald-750 border border-emerald-200' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    ₦ Paid {inq.feesCleared ? '✓' : '✗'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Right panel: Details & update controls */}
                <div className="lg:col-span-6 text-left">
                  {selectedAdmitted ? (
                    <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-5 animate-in fade-in duration-200">
                      <div className="border-b pb-3 flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">Admitted Status Record</span>
                          <h4 className="font-extrabold text-brand-blue text-base">{selectedAdmitted.studentName}</h4>
                          <p className="text-xs text-gray-500">Ref Code: <span className="font-mono font-bold text-brand-gold-dark">{selectedAdmitted.code}</span></p>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${
                          selectedAdmitted.admissionType === 'Boarding' || selectedAdmitted.isBoarding
                            ? 'bg-indigo-55 text-indigo-700 border border-indigo-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {selectedAdmitted.admissionType === 'Boarding' || selectedAdmitted.isBoarding ? 'Boarder' : 'Day Student'}
                        </span>
                      </div>

                      {/* Editing fields */}
                      <div className="space-y-4 text-xs font-sans text-gray-700">
                        {/* 1. Enrollment status dropdown */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-gray-500 font-bold block">Enrollment Milestone Status</label>
                          <select
                            value={monEnrollmentStatus}
                            onChange={(e) => setMonEnrollmentStatus(e.target.value)}
                            className="w-full bg-slate-50 border border-gray-200 rounded-lg p-2.5 outline-none font-semibold text-brand-blue focus:border-brand-gold cursor-pointer"
                          >
                            <option value="Pending Documents">Pending Documents Verification</option>
                            <option value="Awaiting Term Start">Awaiting Academic Term Start</option>
                            <option value="Fully Enrolled">Fully Matriculated & Enrolled</option>
                            <option value="Withdrawn">Withdrawn Admissions</option>
                          </select>
                        </div>

                        {/* 2. Checkboxes Checklist */}
                        <div className="space-y-2 pt-1 text-left">
                          <span className="text-gray-500 font-bold block mb-1">Mandatory Checklist Requirements</span>
                          
                          {/* Docs */}
                          <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-gray-150 cursor-pointer hover:bg-slate-100 transition">
                            <input
                              type="checkbox"
                              checked={monDocsSubmitted}
                              onChange={(e) => setMonDocsSubmitted(e.target.checked)}
                              className="w-4.5 h-4.5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-brand-blue block">Enrollment Documents Submitted</span>
                              <span className="text-[10px] text-gray-400">Previous report sheets, birth certificate, vaccination cards.</span>
                            </div>
                          </label>

                          {/* Uniform */}
                          <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-gray-150 cursor-pointer hover:bg-slate-100 transition">
                            <input
                              type="checkbox"
                              checked={monUniformIssued}
                              onChange={(e) => setMonUniformIssued(e.target.checked)}
                              className="w-4.5 h-4.5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-brand-blue block">Academy Uniforms Issued</span>
                              <span className="text-[10px] text-gray-400">Blazers, house colors jerseys, crests, and sportswear.</span>
                            </div>
                          </label>

                          {/* Books */}
                          <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-gray-150 cursor-pointer hover:bg-slate-100 transition">
                            <input
                              type="checkbox"
                              checked={monBooksIssued}
                              onChange={(e) => setMonBooksIssued(e.target.checked)}
                              className="w-4.5 h-4.5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-brand-blue block">Textbooks & Stationery Pack Issued</span>
                              <span className="text-[10px] text-gray-400">Complete core academic textbook packages provided.</span>
                            </div>
                          </label>

                          {/* Fees */}
                          <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-gray-150 cursor-pointer hover:bg-slate-100 transition">
                            <input
                              type="checkbox"
                              checked={monFeesCleared}
                              onChange={(e) => setMonFeesCleared(e.target.checked)}
                              className="w-4.5 h-4.5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-brand-blue block">Tuition Ledger Cleared</span>
                              <span className="text-[10px] text-gray-400">Term ledger receipts cleared and verified by Bursar desk.</span>
                            </div>
                          </label>
                        </div>

                        {/* 3. Boarding Assigned Room (Only for Boarders) */}
                        {(selectedAdmitted.admissionType === 'Boarding' || selectedAdmitted.isBoarding) && (
                          <div className="space-y-1.5 pt-1 text-left">
                            <label className="text-indigo-800 font-extrabold block text-[10px] uppercase tracking-wider">Boarding Room Allocation *</label>
                            <input
                              type="text"
                              value={monBoardingRoom}
                              onChange={(e) => setMonBoardingRoom(e.target.value)}
                              placeholder="e.g. Room 104, Sterling Block"
                              className="w-full bg-slate-50 border border-gray-200 rounded-lg p-2.5 outline-none font-semibold text-brand-blue focus:border-brand-gold"
                            />
                            <p className="text-[10px] text-indigo-500 italic">Preferred House: {selectedAdmitted.boardingHousePreference || 'Goldbridge Boys House'}</p>
                          </div>
                        )}
                      </div>

                      {/* Save Action button */}
                      <button
                        type="button"
                        onClick={() => handleUpdateMonitoring(selectedAdmitted.code, {
                          enrollmentStatus: monEnrollmentStatus,
                          docsSubmitted: monDocsSubmitted,
                          uniformIssued: monUniformIssued,
                          booksIssued: monBooksIssued,
                          feesCleared: monFeesCleared,
                          boardingAssignedRoom: monBoardingRoom
                        })}
                        disabled={actionLoading}
                        className="w-full py-3 bg-brand-blue hover:bg-brand-blue-light text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition"
                      >
                        <ClipboardCheck className="w-4 h-4 text-brand-gold" />
                        <span>Update Monitoring Records</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white border rounded-2xl h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-2 py-20">
                      <Users className="w-12 h-12 text-slate-300" />
                      <p className="text-xs font-bold font-mono">SELECT A STUDENT TO VIEW AND UPDATE STATUS</p>
                      <p className="text-[10px] text-gray-400">Monitor document collections, textbook packages, blazers distribution, and hostel allocations.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 1. ADMISSION PROCESS & REQUIREMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-6 text-left">
          
          {/* Left panel step tracker */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-gold">Registration Protocols</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue tracking-tight font-display uppercase">
                Admission In 4 Easy Steps
              </h2>
            </div>

            <div className="space-y-4">
              {steps.map((st, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-brand-gray border border-gray-150 relative">
                  <span className="w-10 h-10 rounded-xl bg-brand-blue font-mono font-bold text-brand-gold flex items-center justify-center shrink-0">
                    01
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-brand-blue text-sm md:text-base">
                      {st.title} Step
                    </h4>
                    <p className="text-xs md:text-sm text-gray-550 leading-relaxed font-sans">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel requirements card */}
          <div className="bg-brand-blue text-white p-8 rounded-3xl border border-brand-blue-light space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl" />
            <div className="space-y-2">
              <span className="text-brand-gold font-mono font-bold uppercase tracking-wider text-[10px]">Standard Registrations</span>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight font-display text-brand-gold-light">
                Required Credentials Dossier
              </h3>
              <p className="text-xs text-gray-300">
                Please compile and submit following credentials alongside physical application papers:
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm font-sans pt-2">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Standard birth certificate or official passport copy metrics.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Last two semesters of certified academic transcripts from former schools.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Four colorful passport photoraphs of the candidate under white backdrop.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Clear medical clearance and blood group immunizations history files.</span>
              </li>
            </ul>

            {/* Print Admission physical form card */}
            <div className="bg-brand-blue-light/50 p-4 border border-brand-blue-light rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left font-sans space-y-0.5">
                <span className="font-bold text-xs block text-brand-gold-light">Offline Admission Paper Form</span>
                <span className="text-[10px] text-gray-300 block">Print officially and fill physically</span>
              </div>
              <button 
                onClick={handlePrintAdmissionForm}
                className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition active:scale-95 shrink-0 cursor-pointer shadow hover:shadow-lg animate-pulse"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print & Fill Form</span>
              </button>
            </div>
          </div>
            {/* 2. TUITION FEES MATRIX */}
        <div className="space-y-8 pt-6" id="fees-section">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block bg-brand-gold/10 text-brand-gold-dark text-[10px] uppercase font-mono px-3 py-1 rounded-full font-bold">Fiscal Transparency</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue font-display tracking-tight uppercase">
              Tuition & Termly Fees
            </h2>
            <p className="text-xs md:text-sm text-gray-550 font-sans">
              Detailed per-class fee schedules for day scholars and boarding residents. Filter by division to locate your specific scholar class.
            </p>
          </div>

          {/* Division filters */}
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto bg-brand-gray/30 p-1.5 rounded-2xl border border-gray-150">
            {(['All', 'Early Years', 'Primary School', 'Junior Secondary', 'Senior Secondary'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setTuitionCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-150 cursor-pointer ${
                  tuitionCategoryFilter === cat
                    ? 'bg-brand-blue text-brand-gold shadow'
                    : 'text-gray-550 hover:bg-white hover:text-brand-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Granular Table */}
          <div className="max-w-8xl mx-auto bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-lg">
            <div className="max-w-full overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-sans min-w-[650px] lg:min-w-full lg:table-fixed">
                <thead className="bg-brand-blue text-white uppercase font-mono font-bold tracking-wider text-[11px] border-b-2 border-brand-gold">
                  <tr>
                    <th className="py-4.5 px-4 lg:w-[28%]">Class / Program</th>
                    <th className="py-4.5 px-3 text-right lg:w-[10%]">Tuition</th>
                    <th className="py-4.5 px-3 text-right lg:w-[10%]">Dev. Levy</th>
                    <th className="py-4.5 px-3 text-right lg:w-[10%]">Materials</th>
                    <th className="py-4.5 px-4 text-right bg-emerald-800 text-emerald-300 lg:w-[14%]">Day Scholar Total</th>
                    <th className="py-4.5 px-3 text-right lg:w-[14%]">Boarding Surcharge</th>
                    <th className="py-4.5 px-4 text-right bg-brand-gold-dark text-brand-blue font-extrabold lg:w-[14%]">Boarder Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {TUITION_FEES.filter(f => tuitionCategoryFilter === 'All' || f.category === tuitionCategoryFilter).map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-55/60 transition group">
                      <td className="py-4 px-4 font-extrabold text-brand-blue text-[11px] sm:text-xs lg:text-sm group-hover:text-brand-blue-light transition-colors">
                        {fee.program}
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-[10px] sm:text-xs text-gray-800">
                        {fee.tuition}
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-[10px] sm:text-xs text-gray-550">
                        {fee.developmentFee}
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-[10px] sm:text-xs text-gray-550">
                        {fee.materials}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-extrabold text-emerald-700 bg-emerald-50/30 text-[10px] sm:text-xs lg:text-sm border-x border-emerald-100/30">
                        {fee.total}
                      </td>
                      <td className="py-4 px-3 text-right font-mono text-[10px] sm:text-xs text-gray-500">
                        {fee.boardingFee}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-extrabold text-brand-blue bg-amber-50/30 text-[10px] sm:text-xs lg:text-sm border-l border-amber-100/30">
                        {fee.boardingTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 md:p-6 bg-brand-gray/50 border-t border-gray-150 text-[11px] text-gray-400 font-sans grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <span>* Base fees are listed per term (3 terms per year). Co-educational lunch programs and transport shuttles are optionally bundled.</span>
              <span>** Primary 1 to Senior Secondary 3 offer premium hostel boardings. Sibling tuition rebate schemes are applied automatically in the estimator below.</span>
            </div>
          </div>

          {/* INTERACTIVE FEE CALCULATOR & SIBLING PLANNER */}
          <div className="max-w-8xl mx-auto bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-[32px] p-8 md:p-12 space-y-8 shadow-2xl text-left relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 border-b border-white/15 pb-6">
              <span className="text-brand-gold uppercase tracking-widest text-[11px] font-mono font-bold block">✦ Personal Tuition Estimator</span>
              <h3 className="text-2xl md:text-3xl font-extrabold font-display uppercase text-brand-gold-light tracking-tight">
                Interactive Tuition Fee Planner & Estimator
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-2xl leading-relaxed">
                Configure your student's target division, core residency parameters, and optional scholastic facility items to instantly generate an official, transparently priced cost projection.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-7 space-y-6 font-sans text-sm">
                
                {/* 1. Class Selection */}
                <div className="space-y-3">
                  <label className="text-gray-200 font-extrabold text-xs uppercase tracking-wider block">
                    1. Target Scholar Class (Select any directly)
                  </label>
                  <div className="space-y-3.5">
                    {(['Early Years', 'Primary School', 'Junior Secondary', 'Senior Secondary'] as const).map((cat) => {
                      const classesInCat = TUITION_FEES.filter(f => f.category === cat);
                      return (
                        <div key={cat} className="space-y-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                          <span className="text-brand-gold-light text-[10px] font-mono uppercase font-bold tracking-wider block">
                            {cat}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {classesInCat.map((fee, idx) => {
                              const isSelected = calcClass === fee.program;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => {
                                    setCalcClass(fee.program);
                                    if (fee.boardingNum === 0) {
                                      setCalcAdmissionType('Day');
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                                    isSelected
                                      ? 'bg-brand-gold text-brand-blue border-brand-gold shadow'
                                      : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  <span>{fee.program}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Admission Type Selection */}
                <div className="space-y-2">
                  <label className="text-gray-200 font-extrabold text-xs uppercase tracking-wider block">
                    2. Admission Pathway Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCalcAdmissionType('Day')}
                      className={`py-4 px-5 rounded-2xl font-extrabold flex items-center justify-center gap-3 border-2 transition text-sm cursor-pointer ${
                        calcAdmissionType === 'Day'
                          ? 'bg-brand-gold text-brand-blue border-brand-gold shadow-lg shadow-brand-gold/10'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Day Scholar Option</span>
                    </button>
                    <button
                      type="button"
                      disabled={(() => {
                        const item = TUITION_FEES.find(f => f.program === calcClass);
                        return item ? item.boardingNum === 0 : false;
                      })()}
                      onClick={() => setCalcAdmissionType('Boarding')}
                      className={`py-4 px-5 rounded-2xl font-extrabold flex items-center justify-center gap-3 border-2 transition text-sm cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${
                        calcAdmissionType === 'Boarding'
                          ? 'bg-brand-gold text-brand-blue border-brand-gold shadow-lg shadow-brand-gold/10'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      <Bed className="w-4 h-4" />
                      <span>Boarding Wing</span>
                    </button>
                  </div>
                  {(() => {
                    const item = TUITION_FEES.find(f => f.program === calcClass);
                    if (item && item.boardingNum === 0) {
                      return <p className="text-xs text-brand-gold-light italic">Boarding housing is unavailable for Early Years levels.</p>;
                    }
                    return null;
                  })()}
                </div>

                {/* 3. Has Sibling Checkbox */}
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                  <input
                    id="calc-sibling"
                    type="checkbox"
                    checked={calcSibling}
                    onChange={(e) => setCalcSibling(e.target.checked)}
                    className="w-5 h-5 text-brand-gold bg-transparent border-white/20 rounded focus:ring-brand-gold cursor-pointer mt-1"
                  />
                  <div className="space-y-0.5">
                    <label htmlFor="calc-sibling" className="font-extrabold text-white cursor-pointer block text-sm">
                      Sibling Rebate Discount (10% Off Tuition Component)
                    </label>
                    <span className="text-xs text-gray-300 block leading-relaxed">
                      Toggle active if you have another child currently registered or studying inside Goldbridge Academy divisions.
                    </span>
                  </div>
                </div>

                {/* 4. Optional Day Add-ons (only visible if Day Student selected) */}
                {calcAdmissionType === 'Day' && (
                  <div className="space-y-4 border-t border-white/15 pt-4">
                    <span className="font-extrabold text-brand-gold-light text-xs uppercase tracking-wider block">
                      3. Optional Day Scholar Facilities
                    </span>
                    
                    {/* Shuttle selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wide text-gray-300 font-bold block">
                        Goldbridge Secure Shuttle Transit
                      </label>
                      <select
                        value={calcTransport}
                        onChange={(e) => setCalcTransport(e.target.value as any)}
                        className="w-full bg-white/10 border-2 border-white/10 rounded-xl p-3 outline-none text-white focus:border-brand-gold text-xs sm:text-sm [&>option]:text-brand-blue"
                      >
                        <option value="None">No Transport Shuttle Needed (Self Drop-off / Pick-up)</option>
                        <option value="Zone A">Zone A Shuttle Axis (Close proximity route: ₦80,000 / term)</option>
                        <option value="Zone B">Zone B Shuttle Axis (Extended routing: ₦120,000 / term)</option>
                      </select>
                    </div>

                    {/* Cafeteria meal plan */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wide text-gray-300 font-bold block">
                        Cafeteria Hot Gourmet Lunch Plan
                      </label>
                      <select
                        value={calcLunch}
                        onChange={(e) => setCalcLunch(e.target.value as any)}
                        className="w-full bg-white/10 border-2 border-white/10 rounded-xl p-3 outline-none text-white focus:border-brand-gold text-xs sm:text-sm [&>option]:text-brand-blue"
                      >
                        <option value="None">Lunchbox Packed From Home (No charges apply)</option>
                        <option value="Gourmet Meal">Termly Full Hot Lunch Plan (Nutritionist Certified: ₦65,000 / term)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 5. Generic Add-ons */}
                <div className="space-y-3 border-t border-white/15 pt-4">
                  <span className="font-extrabold text-brand-gold-light text-xs uppercase tracking-wider block">
                    {calcAdmissionType === 'Day' ? '4.' : '3.'} Academic Materials & Academy Bundles
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCalcUniformBook(!calcUniformBook)}
                      className={`p-4 rounded-2xl border-2 font-extrabold flex items-center justify-between text-left transition ${
                        calcUniformBook 
                          ? 'bg-brand-gold/15 text-brand-gold border-brand-gold shadow-lg shadow-brand-gold/5' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="block text-xs sm:text-sm">Uniforms & Textbooks Set</span>
                      <span className="text-[11px] font-mono font-bold bg-white/15 px-2 py-0.5 rounded text-white shrink-0 ml-2">
                        +₦45,000
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcExtraSTEM(!calcExtraSTEM)}
                      className={`p-4 rounded-2xl border-2 font-extrabold flex items-center justify-between text-left transition ${
                        calcExtraSTEM 
                          ? 'bg-brand-gold/15 text-brand-gold border-brand-gold shadow-lg shadow-brand-gold/5' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="block text-xs sm:text-sm">STEM Robotics & Music Club</span>
                      <span className="text-[11px] font-mono font-bold bg-white/15 px-2 py-0.5 rounded text-white shrink-0 ml-2">
                        +₦25,000
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Invoice Slip Output */}
              <div className="lg:col-span-5 bg-white text-brand-blue p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-between self-stretch border border-gray-150 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                {(() => {
                  const item = TUITION_FEES.find(f => f.program === calcClass) || TUITION_FEES[0];
                  const tuition = item.tuitionNum || 0;
                  const dev = item.devNum || 0;
                  const materials = item.materialsNum || 0;
                  const boarding = calcAdmissionType === 'Boarding' ? (item.boardingNum || 0) : 0;
                  
                  const discount = calcSibling ? Math.round(tuition * 0.10) : 0;
                  const transCost = calcAdmissionType === 'Day' && calcTransport === 'Zone A' ? 80000 : calcAdmissionType === 'Day' && calcTransport === 'Zone B' ? 120000 : 0;
                  const lunchCost = calcAdmissionType === 'Day' && calcLunch === 'Gourmet Meal' ? 65000 : 0;
                  const uniCost = calcUniformBook ? 45000 : 0;
                  const stemCost = calcExtraSTEM ? 25000 : 0;

                  const totalCost = (tuition + dev + materials + boarding) - discount + transCost + lunchCost + uniCost + stemCost;

                  return (
                    <>
                      <div className="space-y-5">
                        <div className="border-b-2 border-dashed border-gray-200 pb-3 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-brand-gold-dark font-mono block tracking-wider">Goldbridge Academy</span>
                            <span className="font-extrabold text-sm block uppercase tracking-wide">Estimator Invoice Slip</span>
                          </div>
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                            calcAdmissionType === 'Boarding' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {calcAdmissionType === 'Boarding' ? 'Boarder' : 'Day Scholar'}
                          </span>
                        </div>

                        {/* Scholar class line */}
                        <div className="text-xs sm:text-sm border-b border-gray-150 pb-3">
                          <p className="font-black text-brand-blue text-base">{item.program}</p>
                          <p className="text-[10px] text-gray-450 mt-0.5">Section: {item.category} • Academic Term Cycle</p>
                        </div>

                        {/* Itemized charges list */}
                        <div className="space-y-2.5 text-xs font-sans">
                          <div className="flex justify-between items-center py-0.5">
                            <span className="text-gray-500 font-medium">Base Tuition Fee:</span>
                            <span className="font-mono font-bold text-gray-800">₦{tuition.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-0.5">
                            <span className="text-gray-500 font-medium">Development Levy:</span>
                            <span className="font-mono font-bold text-gray-800">₦{dev.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-0.5">
                            <span className="text-gray-500 font-medium">Activities & Lab Materials:</span>
                            <span className="font-mono font-bold text-gray-800">₦{materials.toLocaleString()}</span>
                          </div>
                          {boarding > 0 && (
                            <div className="flex justify-between items-center text-indigo-700 font-semibold py-0.5 bg-indigo-50/50 px-2 rounded-lg">
                              <span>Boarding Wing Levy:</span>
                              <span className="font-mono">₦{boarding.toLocaleString()}</span>
                            </div>
                          )}
                          {discount > 0 && (
                            <div className="flex justify-between items-center text-emerald-700 font-bold py-0.5 bg-emerald-50/50 px-2 rounded-lg">
                              <span>Sibling Discount (10%):</span>
                              <span className="font-mono">-₦{discount.toLocaleString()}</span>
                            </div>
                          )}
                          {transCost > 0 && (
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-gray-500 font-medium">Shuttle ({calcTransport}):</span>
                              <span className="font-mono font-bold text-gray-800">₦{transCost.toLocaleString()}</span>
                            </div>
                          )}
                          {lunchCost > 0 && (
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-gray-500 font-medium">Cafeteria Lunch Plan:</span>
                              <span className="font-mono font-bold text-gray-800">₦{lunchCost.toLocaleString()}</span>
                            </div>
                          )}
                          {uniCost > 0 && (
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-gray-500 font-medium">Uniforms & Books Set:</span>
                              <span className="font-mono font-bold text-gray-800">₦{uniCost.toLocaleString()}</span>
                            </div>
                          )}
                          {stemCost > 0 && (
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-gray-500 font-medium">Robotics/Music Club:</span>
                              <span className="font-mono font-bold text-gray-800">₦{stemCost.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-5 border-t-2 border-dashed border-gray-200 mt-6 space-y-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-black uppercase text-brand-blue-light">Total Termly Fee:</span>
                          <span className="text-2xl md:text-3xl font-black text-brand-blue tracking-tight font-mono">
                            ₦{totalCost.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center italic">
                          * Quotation is computed per term. Multi-child sibling discounts apply automatically.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            window.print();
                          }}
                          className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-lg shadow-brand-blue/20 uppercase tracking-wider"
                        >
                          <FileText className="w-4 h-4 text-brand-gold" />
                          <span>Print Itemized Quotation</span>
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>      </div>

        {/* 3. NEW SECTION: BOARDING HOUSES & RESIDENCY */}
        <div id="boarding-section" className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block bg-brand-gold/10 text-brand-gold-dark text-[10px] uppercase font-mono px-3 py-1 rounded-full font-bold">Elite Residency Program</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue font-display tracking-tight uppercase">
              Boarding & Campus Hostel Wings
            </h2>
            <p className="text-xs md:text-sm text-gray-550 font-sans">
              Discover a home away from home. Goldbridge Academy offers supportive, highly supervised, co-educational boarding options designed to foster moral integrity and self-reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            
            {/* Boarding Info Card 1 */}
            <div className="bg-brand-gray/40 border border-gray-150 p-6 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue text-brand-gold flex items-center justify-center">
                <Bed className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-brand-blue text-lg">Elite Dormitories</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Separate girls' and boys' wings featuring fully air-conditioned rooms, individual reading desks, secure lockboxes, and high-speed water systems supervised by 24/7 resident housemasters.
              </p>
              <div className="border-t pt-2.5 font-mono text-[10px] text-brand-gold-dark font-bold">
                WINGS: Goldbridge Manor & Alao House
              </div>
            </div>

            {/* Boarding Info Card 2 */}
            <div className="bg-brand-gray/40 border border-gray-150 p-6 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue text-brand-gold flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-brand-blue text-lg font-display">Residency Levies</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Boarding student fees carry a supplementary charge of <strong>₦450,000 per term</strong>. This comprehensively offsets nutritious 3-course meal cycles, laundry services, 24/7 solar backup, and emergency health insurance.
              </p>
              <div className="border-t pt-2.5 font-mono text-[10px] text-brand-gold-dark font-bold">
                BILLING: Termly Surcharges Apply
              </div>
            </div>

            {/* Boarding Info Card 3 */}
            <div className="bg-brand-gray/40 border border-gray-150 p-6 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue text-brand-gold flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-brand-blue text-lg font-display">Daily Schedule</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Our boarding environment thrives on structured habits. Resident scholars follow dedicated quiet study hours, organized sports matches, mandatory visual arts clubs, and moral mentoring clinics.
              </p>
              <div className="border-t pt-2.5 font-mono text-[10px] text-brand-gold-dark font-bold">
                Motto: Self-Reliance & Character
              </div>
            </div>

          </div>
        </div>

        {/* 4. ONLINE ADMISSION INQUIRY FORM */}
        <div id="inquiry-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          {/* Inquiry form - col span 7 */}
          <div className="lg:col-span-7 bg-brand-gray/40 border border-gray-150 p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] uppercase font-bold text-brand-gold block font-mono">✦ Direct Admissions Office Response</span>
              <h2 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tight text-brand-blue">
                Online Admission Inquiry
              </h2>
              <p className="text-xs text-gray-500 font-sans">
                Complete terms below. Our Registrar Office automatically updates you on enrollment matches within 24 hours.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200 font-sans text-brand-blue">
                <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base md:text-lg">Inquiry Form Successfully Logged!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                    Thank you. We have recorded your parameters under secure registry archives.
                  </p>
                </div>
                {/* Reference ID card */}
                <div className="bg-white border rounded-xl p-3 shadow-inner text-xs font-mono font-bold uppercase tracking-wide px-6">
                  Reference ID: <span className="text-brand-gold-dark">{submissionCode}</span>
                </div>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 px-6 rounded-lg text-xs cursor-pointer active:scale-95 transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs md:text-sm">
                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-gray-600 font-bold block">Parent/Guardian Full Name *</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Engr. Kolawole Alao"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-gray-600 font-bold block">Child's Primary Name *</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Tolulope Alao"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-gray-600 font-bold block">Child's Gender *</label>
                    <select
                      value={studentGender}
                      onChange={(e) => setStudentGender(e.target.value as any)}
                      className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm font-semibold h-11"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-gray-600 font-bold block">Child's Age (Years) *</label>
                    <input
                      type="number"
                      min="2"
                      max="18"
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      placeholder="e.g. 6"
                      className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm h-11"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-gray-600 font-bold block">Parent's Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. kolabayo@gmail.com"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5 text-left">
                  <label className="text-gray-600 font-bold block">Active Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 000 0000"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5 sm:col-span-2 text-left">
                  <label className="text-gray-600 font-bold block">Grade/Level of Interest *</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm font-semibold"
                  >
                    <optgroup label="Early Years">
                      <option value="Kindergarten">Kindergarten (ages 2–4)</option>
                      <option value="Nursery">Nursery School (ages 4–5)</option>
                    </optgroup>
                    
                    <optgroup label="Primary School">
                      <option value="Primary 1">Primary 1 (age 6)</option>
                      <option value="Primary 2">Primary 2 (age 7)</option>
                      <option value="Primary 3">Primary 3 (age 8)</option>
                      <option value="Primary 4">Primary 4 (age 9)</option>
                      <option value="Primary 5">Primary 5 (age 10)</option>
                      <option value="Primary 6">Primary 6 (age 11)</option>
                    </optgroup>
                    
                    <optgroup label="Junior Secondary School">
                      <option value="JSS 1">Junior Secondary 1 (JSS 1)</option>
                      <option value="JSS 2">Junior Secondary 2 (JSS 2)</option>
                      <option value="JSS 3">Junior Secondary 3 (JSS 3)</option>
                    </optgroup>
                    
                    <optgroup label="Senior Secondary School">
                      <option value="SS 1">Senior Secondary 1 (SS 1)</option>
                      <option value="SS 2">Senior Secondary 2 (SS 2)</option>
                      <option value="SS 3">Senior Secondary 3 (SS 3)</option>
                    </optgroup>
                  </select>
                </div>

                {/* PATHWAY CHOOSER TAB TIGHTLY INTEGRATED */}
                <div className="sm:col-span-2 space-y-2 text-left">
                  <label className="text-gray-600 font-bold block">Select Admission Pathway *</label>
                  <div className="grid grid-cols-2 gap-3 bg-brand-gray p-1 rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setAdmissionType('Day');
                        // also keep isBoarding boolean fallback synced if needed
                        setApplyBoarding(false);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        admissionType === 'Day'
                          ? 'bg-brand-blue text-brand-gold shadow-sm'
                          : 'text-gray-550 hover:text-brand-blue'
                      }`}
                    >
                      <span>Day Scholar Route</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAdmissionType('Boarding');
                        setApplyBoarding(true);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        admissionType === 'Boarding'
                          ? 'bg-brand-blue text-brand-gold shadow-sm'
                          : 'text-gray-550 hover:text-brand-blue'
                      }`}
                    >
                      <Bed className="w-3.5 h-3.5" />
                      <span>Boarding Route</span>
                    </button>
                  </div>
                </div>

                {/* Day Student Fields */}
                {admissionType === 'Day' && (
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-left animate-in fade-in duration-150">
                    <div className="sm:col-span-2">
                      <span className="font-bold text-brand-blue block text-[11px] uppercase tracking-wide">Day Scholar Customizations</span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Shuttle Transport Service</label>
                      <select
                        value={busServiceRoute}
                        onChange={(e) => setBusServiceRoute(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm font-semibold"
                      >
                        <option value="None">None (Parent Drop-off)</option>
                        <option value="Zone A Shuttle Route">Zone A (Close Axis — ₦80k/term)</option>
                        <option value="Zone B Shuttle Route">Zone B (Extended Axis — ₦120k/term)</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Gourmet Hot Meal Lunch Plan</label>
                      <select
                        value={lunchPlan}
                        onChange={(e) => setLunchPlan(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm font-semibold"
                      >
                        <option value="None">No (Send Lunchbox)</option>
                        <option value="Gourmet Termly Meals Cycle">Yes (Hot Cafeteria Lunch — ₦65k/term)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Boarding Student Fields */}
                {admissionType === 'Boarding' && (
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-left animate-in fade-in duration-150">
                    <div className="sm:col-span-2">
                      <span className="font-bold text-brand-blue block text-[11px] uppercase tracking-wide">Boarding Scholar Customizations</span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Boarding House Preference *</label>
                      <select
                        value={boardingHousePreference}
                        onChange={(e) => setBoardingHousePreference(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm font-semibold"
                      >
                        <option value="Goldbridge Manor (Boys)">Goldbridge Manor (Boys Dormitory)</option>
                        <option value="Alao House (Girls)">Alao House (Girls Dormitory)</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Dietary Restrictions / Allergy Disclosures</label>
                      <input
                        type="text"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                        placeholder="e.g. Peanut allergy, Lactose intolerant, None"
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Lagos/Nigeria Local Guardian Name *</label>
                      <input
                        type="text"
                        value={localGuardianName}
                        onChange={(e) => setLocalGuardianName(e.target.value)}
                        placeholder="e.g. Chief John Alao"
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                        required={admissionType === 'Boarding'}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-gray-600 font-bold block">Guardian Contact Phone *</label>
                      <input
                        type="tel"
                        value={localGuardianPhone}
                        onChange={(e) => setLocalGuardianPhone(e.target.value)}
                        placeholder="e.g. +234 815 000 0000"
                        className="bg-white border border-gray-200 rounded-lg p-2.5 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                        required={admissionType === 'Boarding'}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-1.5 sm:col-span-2 text-left">
                  <label className="text-gray-600 block font-bold">Special inquiries or school remarks (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Provide details of previous school GPA, sports capabilities, or other customized inquiries."
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold resize-none text-xs sm:text-sm"
                  />
                </div>

                {/* Supporting Images Upload block */}
                <div className="flex flex-col space-y-2 sm:col-span-2 text-left">
                  <label className="text-gray-600 block font-bold">Upload Supporting Images (Student Passport Photo, Academic Records, etc.)</label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center cursor-pointer ${
                      dragActive 
                        ? 'border-brand-gold bg-brand-gold/5' 
                        : 'border-gray-200 hover:border-brand-gold bg-white'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="file-upload-input" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                    <Upload className="w-8 h-8 text-brand-gold mb-2" />
                    <p className="text-xs font-bold text-brand-blue">
                      Drag & Drop your images here, or <span className="text-brand-gold font-extrabold hover:underline">browse files</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">Supports PNG, JPG, JPEG up to 5MB</p>
                  </div>

                  {/* Uploaded Images List with placeholders */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-2 mt-1">
                      {uploadedImages.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-150 rounded-xl">
                          <div className="flex items-center space-x-3 overflow-hidden">
                            {/* [IMAGE REMOVED: Uploaded Image Thumbnail Preview] */}
                            <div className="w-10 h-10 rounded bg-brand-gray flex items-center justify-center text-brand-gold border border-gray-100 shrink-0">
                              <FileImage className="w-5 h-5" />
                            </div>
                            <div className="text-left overflow-hidden">
                              <p className="text-xs font-bold text-brand-blue truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                              <p className="text-[10px] text-gray-400 font-mono">{file.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(idx);
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-extrabold outline-none py-3.5 px-6 rounded-lg text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <span>Logging details to registry...</span>
                    ) : (
                      <>
                        <span>Submit Admission Inquiry</span>
                        <Send className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right inquiry logger panel - col span 5 */}
          <div className="lg:col-span-5 bg-white border border-gray-150 p-6 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-brand-gold shrink-0" />
                <h3 className="font-extrabold text-brand-blue text-sm uppercase tracking-wide">
                  Your Private Inquiry Tracker
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-sans text-left">
                These are form submissions filed exclusively from your device. Use reference IDs inside communications with administrative desks.
              </p>

              {myInquiries.length === 0 ? (
                <div className="border-2 border-dashed border-gray-150 rounded-2xl p-6 text-center space-y-2">
                  <Inbox className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-[11px] text-gray-400 font-bold tracking-wide uppercase">No inquiries submitted yet</p>
                  <p className="text-[10px] text-gray-400 font-sans leading-normal">Online entries appear here sequentially.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 no-scrollbar font-sans">
                  {myInquiries.map((inq, idx) => (
                    <div key={idx} className="p-3 bg-brand-gray border border-gray-150 rounded-xl text-xs space-y-2 text-left">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <span className="font-bold text-brand-blue block text-[13px]">{inq.studentName}</span>
                          <span className="text-[10px] block text-brand-gold-dark font-mono font-bold uppercase">{inq.code}</span>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            Division: {inq.gradeLevel} • Submitted: {inq.date} {inq.isBoarding ? '• Boarding' : ''}
                          </span>
                        </div>
                        <span className={`py-1 px-2.5 rounded font-mono font-bold text-[9px] uppercase border tracking-wider shrink-0 ${
                          inq.status === 'Accepted'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : inq.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {inq.status}
                        </span>
                      </div>

                      {/* Render Staff Reply Notice if Answered */}
                      {inq.staffAnswer && (
                        <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg space-y-1">
                          <span className="text-[9px] uppercase font-mono font-extrabold text-emerald-700 block">
                            ✓ REGISTRAR FEEDBACK NOTE:
                          </span>
                          <p className="text-[11px] text-emerald-800 font-sans leading-normal">
                            "{inq.staffAnswer}"
                          </p>
                          <span className="text-[8px] text-emerald-600 block text-right font-mono">
                            Signed: {inq.answeredBy || 'Registrar'} ({inq.answeredAt || 'Lately'})
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-brand-gray border border-gray-150 rounded-2xl text-[11px] font-mono leading-relaxed text-gray-550 pt-3 text-left">
              <span>Registrar desks operational hours: <br /><strong>Monday – Friday: 8:00 AM – 4:00 PM</strong>. Quick queries can route to WhatsApp floating tools bottom right.</span>
            </div>
          </div>
        </div>

        {/* 5. NEW SECTION: BURSARY PORTAL & SIMULATED PAYMENTS */}
        <div id="payment-portal" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 text-left">
          
          {/* Left panel: School Bank Account Linking Details */}
          <div className="lg:col-span-5 bg-brand-blue text-white p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-1.5">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-[10px] font-mono block">
                Official School Financial Accounts
              </span>
              <h3 className="text-lg md:text-xl font-extrabold font-display uppercase text-brand-gold-light">
                Direct Settlement Channels
              </h3>
              <p className="text-xs text-gray-300">
                Linked banks for direct ledger deposits. Use candidate names as transfer comments.
              </p>
            </div>

            <div className="space-y-4">
              {officialAccounts.map((acc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-brand-blue-light/35 border border-white/10 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-xs text-brand-gold-light uppercase tracking-wide">{acc.bank}</span>
                    <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-200">{acc.purpose}</span>
                  </div>
                  <div className="space-y-1 font-mono">
                    <p className="text-sm font-extrabold text-white tracking-wider">{acc.accountNumber}</p>
                    <p className="text-[10px] text-gray-300 font-sans">{acc.accountName}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-brand-blue-light/25 border border-white/10 rounded-xl text-[10px] font-sans leading-relaxed text-gray-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Provide your generated transaction references below after completing the transfer to update your student ledger instantly.</span>
            </div>
          </div>

          {/* Center panel: Submit payment slip or details */}
          <div className="lg:col-span-7 bg-brand-gray/40 border border-gray-150 p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-brand-gold block font-mono">✦ Direct Bursary Link (Parent Slip submission)</span>
              <h2 className="text-xl md:text-2xl font-extrabold font-display uppercase tracking-tight text-brand-blue">
                Submit Transfer Ledger Slip
              </h2>
              <p className="text-xs text-gray-550 font-sans">
                Logged a bank transfer? Enter details below for instant verification by the Bursary Desk.
              </p>
            </div>

            {paymentStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200 font-sans text-brand-blue">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 animate-bounce" />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base md:text-lg">Payment Registered with Bursary!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                    Thank you. The Bursar is currently auditing the incoming ledger transfers.
                  </p>
                </div>
                <div className="bg-white border rounded-xl p-3 shadow-inner text-xs font-mono font-bold uppercase tracking-wide px-6">
                  Txn Reference: <span className="text-brand-gold-dark">{paymentReference}</span>
                </div>
                <button 
                  onClick={() => setPaymentStatus('idle')}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 px-6 rounded-lg text-xs cursor-pointer active:scale-95 transition"
                >
                  Log Another Payment
                </button>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-600 font-bold block">Candidate's Full Name *</label>
                  <input
                    type="text"
                    value={paymentStudentName}
                    onChange={(e) => setPaymentStudentName(e.target.value)}
                    placeholder="e.g. Tolulope Alao"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-600 font-bold block">Parent/Depositor Name *</label>
                  <input
                    type="text"
                    value={paymentParentName}
                    onChange={(e) => setPaymentParentName(e.target.value)}
                    placeholder="e.g. Engr. Kolawole Alao"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-600 font-bold block">Deposited Amount (₦) *</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="e.g. 450000"
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs sm:text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5 font-semibold">
                  <label className="text-gray-600 font-bold block">School Bank Deposited Into *</label>
                  <select
                    value={paymentAccount}
                    onChange={(e) => setPaymentAccount(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs font-semibold"
                  >
                    <option value="Access Bank (Goldbridge Main - 1029384756)">Access Bank — Main Tuition</option>
                    <option value="GTBank (Goldbridge Fees - 0987654321)">GTBank — Early Years</option>
                    <option value="Zenith Bank (Goldbridge Boarding - 5060708090)">Zenith Bank — Boarding Wing</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 font-semibold">
                  <label className="text-gray-600 font-bold block">Student Class Division *</label>
                  <select
                    value={paymentDivision}
                    onChange={(e) => setPaymentDivision(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs font-semibold"
                  >
                    <option value="Kindergarten">Early Years (Kindergarten / Nursery)</option>
                    <option value="Primary 1-3">Lower Primary Wing (P1 - P3)</option>
                    <option value="Primary 4-6">Upper Primary Wing (P4 - P6)</option>
                    <option value="JSS Division">Junior High Wing (JSS1 - JSS3)</option>
                    <option value="SS Division">Senior College Wing (SS1 - SS3)</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 font-semibold">
                  <label className="text-gray-600 font-bold block">Payment Method *</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg p-3 outline-none text-brand-blue focus:border-brand-gold text-xs font-semibold"
                  >
                    <option value="Bank Transfer">Direct Bank Transfer</option>
                    <option value="Bank Deposit Slip">Cash Deposit over Teller Desk</option>
                    <option value="Online Card Payment">Simulated Mastercard / Visa</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 sm:col-span-2 p-3 bg-white border border-gray-200 rounded-2xl">
                  <input
                    id="payment-boarding"
                    type="checkbox"
                    checked={paymentBoarding}
                    onChange={(e) => setPaymentBoarding(e.target.checked)}
                    className="w-4 h-4 text-brand-gold bg-gray-100 border-gray-300 rounded focus:ring-brand-gold cursor-pointer"
                  />
                  <div>
                    <label htmlFor="payment-boarding" className="font-extrabold text-brand-blue cursor-pointer flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-brand-gold" />
                      <span>This payment includes Boarding / Hostel Levies</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={paymentStatus === 'submitting'}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue font-extrabold py-3.5 rounded-xl shadow flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    <span>Log Bank Transfer Slip</span>
                    <Coins className="w-4 h-4 shrink-0 text-brand-blue" />
                  </button>
                </div>
              </form>
            )}

            {/* Parent ledger overview tracking device isolation */}
            <div className="mt-8 border-t pt-6 space-y-4">
              <h4 className="font-extrabold text-sm text-brand-blue">Your Transfer Verification Requests</h4>
              {myPayments.length === 0 ? (
                <p className="text-xs text-gray-400 font-sans italic">No payments logged from this browser.</p>
              ) : (
                <div className="space-y-3 font-sans text-xs">
                  {myPayments.map((p, idx) => (
                    <div key={idx} className="p-3 bg-white border border-gray-150 rounded-xl flex justify-between items-center gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-brand-blue block">{p.studentName} ({p.division})</span>
                        <span className="text-[10px] font-mono text-brand-gold-dark block font-bold">{p.reference}</span>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          Amount: <strong>₦{p.amount.toLocaleString()}</strong> • Channel: {p.bankAccountLinked.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className={`py-1 px-2.5 rounded font-mono font-bold text-[9px] uppercase border tracking-wider ${
                          p.status === 'Verified'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : p.status === 'Declined'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {p.status}
                        </span>
                        {p.verifiedBy && (
                          <span className="text-[9px] text-gray-400 block font-mono">By {p.verifiedBy}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 6. COLLAPSIBLE FAQ SECTION */}
        <div id="faq-section" className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block bg-brand-gold/10 text-brand-gold-dark text-[10px] uppercase font-mono px-3 py-1 rounded-full font-bold">Frequently Asked Questions</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-blue font-display tracking-tight uppercase">
              Help & FAQ Directory
            </h2>
            <p className="text-xs md:text-sm text-gray-550 font-sans">
              Find instant responses to tuition queries, standard timetables, curriculum frameworks, and lunch plans.
            </p>
          </div>

          {/* Tab Categories for FAQ */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {(['All', 'Admissions', 'Academics', 'General', 'Student Life'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-4 py-2 border rounded-full text-xs font-bold transition cursor-pointer ${
                  faqCategory === cat 
                    ? 'bg-brand-blue border-brand-blue text-brand-gold' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Collapsible FAQ list cards */}
          <div className="max-w-3xl mx-auto space-y-3 font-sans">
            {filteredFaqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:border-brand-gold transition duration-150 text-left"
                >
                  <button
                    onClick={() => handleFAQToggle(faq.id)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 text-xs sm:text-sm font-bold text-brand-blue/98 outline-none cursor-pointer"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-gold shrink-0" /> : <ChevronDown className="w-4 h-4 text-brand-gold shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-gray-550 bg-slate-50 border-gray-100 animate-in slide-in-from-top-1.5 duration-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 7. PHYSICAL ADMISSION PAPERS VIEW FOR WINDOW PRINT AND SAVE */}
      <div id="print-area" className="hidden">
        {/* Printable styled admission sheet */}
        <div className="border-4 border-double border-brand-blue p-8 space-y-8 bg-white max-w-3xl mx-auto text-brand-blue font-sans text-xs">
          <div className="flex justify-between items-center border-b pb-4 text-left">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-12 h-12 text-brand-blue font-bold" />
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">GOLDBRIDGE ACADEMY</h1>
                <p className="text-[9px] uppercase tracking-wider font-mono">Nurturing Intellect, Refining Character</p>
              </div>
            </div>
            <div className="text-right font-mono text-[9px] leading-tight text-gray-600">
              <p>Form No: GDBG-ADM-2026</p>
              <p>Class Session: 2026/2027</p>
              <p>Registry Office Lagos</p>
            </div>
          </div>

          <div className="text-center space-y-1 py-2">
            <h2 className="text-lg font-bold uppercase tracking-wider underline">OFFICIAL APPLICATION FOR ADMISSION</h2>
            <p className="text-[10px] text-gray-500 italic">Instructions: Fill out blocks using blue ink. Attach credentials passport photo.</p>
          </div>

          <div className="space-y-4 pt-2 text-left">
            <h3 className="font-bold border-b pb-1 text-sm uppercase">1. CANDIDATE ENROLLMENT DETAILS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Student Full Name: _____________________________________</div>
              <div>Proposed Entry Grade: __________________________________</div>
              <div>Date of Birth: _____ / _____ / ________</div>
              <div>Gender: [ ] Male  [ ] Female  [ ] Boarder [ ] Day Scholar</div>
              <div>Languages Spoken: ____________________________________</div>
              <div>Previous Institution Attended: _________________________</div>
            </div>
          </div>

          <div className="space-y-4 pt-4 text-left">
            <h3 className="font-bold border-b pb-1 text-sm uppercase">2. PARENTS / GUARDIAN COMMUNICATIONS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Father/Grd Name: ____________________________________</div>
              <div>Mother/Grd Name: ____________________________________</div>
              <div>Primary Telephone: ____________________________________</div>
              <div>E-mail Address: _______________________________________</div>
              <div className="col-span-2">Residential Address: ____________________________________________________________________</div>
            </div>
          </div>

          <div className="space-y-4 pt-4 text-left">
            <h3 className="font-bold border-b pb-1 text-sm uppercase">3. MEDICAL HISTORY AUDITS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>Blood Group Type: _________________</div>
              <div>Genotype: _________________________</div>
              <div className="col-span-2">Allergies/Special Directives: ______________________________________________________________</div>
            </div>
          </div>

          <div className="space-y-8 pt-8 text-center border-t">
            <div className="flex justify-between max-w-xl mx-auto pt-4 text-[10px]">
              <div>
                <p>_____________________________________</p>
                <p className="font-bold">Parent / Guardian Signature</p>
              </div>
              <div>
                <p>_____________________________________</p>
                <p className="font-bold">Admissions Registrar Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
