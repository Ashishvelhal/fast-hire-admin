import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
    Box,
    Typography,
    Divider,
    Grid,
    Paper,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
    useMediaQuery
} from '@mui/material';

const numberToWords = (num) => {
    const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const formatTenth = (digit, prev) => digit === 0 ? '' : ' ' + (digit === 1 ? double[prev] : tens[digit]);
    const formatOther = (digit, next, denom) => (digit !== 0 && next !== 1 ? ' ' + single[digit] : '') + (next !== 0 || digit > 0 ? ' ' + denom : '');
    let str = '';
    let rupees = Math.floor(num);
    let paise = Math.round((num - rupees) * 100);
    if (rupees > 0) {
        const crores = Math.floor(rupees / 10000000) % 100;
        if (crores > 0) str += numberToWords(crores) + ' Crore';
        const lakhs = Math.floor(rupees / 100000) % 100;
        if (lakhs > 0) str += (str !== '' ? ' ' : '') + numberToWords(lakhs) + ' Lakh';
        const thousands = Math.floor(rupees / 1000) % 100;
        if (thousands > 0) str += (str !== '' ? ' ' : '') + numberToWords(thousands) + ' Thousand';
        const hundreds = Math.floor((rupees % 1000) / 100);
        if (hundreds > 0) str += (str !== '' ? ' ' : '') + single[hundreds] + ' Hundred';
        const tensValue = Math.floor(rupees % 100);
        if (tensValue > 0) str += (str !== '' ? ' ' : '') + (tensValue < 10 ? single[tensValue] : tensValue <= 19 ? double[tensValue - 10] : formatTenth(Math.floor(tensValue / 10), tensValue % 10) + formatOther(tensValue % 10, 0, ''));
        str += ' Rupees';
    }
    if (paise > 0) str += (str !== '' ? ' and ' : '') + (paise < 10 ? single[paise] : paise <= 19 ? double[paise - 10] : formatTenth(Math.floor(paise / 10), paise % 10) + formatOther(paise % 10, 0, '')) + ' Paise';
    return str || 'Zero Rupees';
};

const Billing = ({ email: propEmail, employer }) => {
    const plan = employer?.employerPlans?.[0]?.plan || {};
    const startDate = employer?.employerPlans?.[0]?.startDate;
    const endDate = employer?.employerPlans?.[0]?.endDate;

    const [invoice, setInvoice] = useState({
        amount: plan.price || 0,
        discountper: 0,
        gstAmount: 0,
        totalAmount: 0,
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const email = propEmail || sessionStorage.getItem("email");
    const subtotal = invoice.amount || 0;
    const discountAmount = invoice.discountper ? (subtotal * invoice.discountper / 100) : 0;
    const amountAfterDiscount = subtotal - discountAmount;
    const gstAmount = invoice.gstAmount || 0;
    const totalAmount = invoice.totalAmount || (amountAfterDiscount + gstAmount);

    return (
        <Container maxWidth="md">

            <style>
                {`
       @media print {
         @page {
           margin: 15mm;
           size: A4 portrait;
         }
         body {
           margin: 0 !important;
           padding: 0 !important;
           font-size: 12px !important;
           line-height: 1.3 !important;
         }
     body * {
    visibility: hidden !important;
  }
  #invoice-content, #invoice-content * {
    visibility: visible !important;
  }
         #invoice-content {
           position: absolute;
           top: 0;
           left: 0;
           width: 100% !important;
           max-width: none !important;
           margin: 0 !important;
           padding: 20px !important;
           box-shadow: none !important;
           page-break-inside: avoid;
           font-size: 11px !important;
           border: 2px solid #333 !important;
           border-radius: 8px !important;
           box-sizing: border-box !important;
           min-height: 100vh !important;
         }
         #invoice-content .MuiTypography-h6 {
           font-size: 16px !important;
           margin-bottom: 8px !important;
           line-height: 1.4 !important;
         }
         #invoice-content .MuiTypography-subtitle1 {
           font-size: 14px !important;
           margin-bottom: 6px !important;
           line-height: 1.3 !important;
         }
         #invoice-content .MuiTypography-body2 {
           font-size: 11px !important;
           line-height: 1.4 !important;
           margin-bottom: 4px !important;
         }
         #invoice-content .MuiPaper-root {
           margin-bottom: 12px !important;
           padding: 10px !important;
           border: 1px solid #ddd !important;
         }
         #invoice-content .MuiTable-root {
           font-size: 11px !important;
           width: 100% !important;
           table-layout: fixed !important;
         }
         #invoice-content .MuiTableCell-root {
           padding: 8px 10px !important;
           font-size: 11px !important;
           word-wrap: break-word !important;
           overflow-wrap: break-word !important;
           white-space: normal !important;
           line-height: 1.3 !important;
         }
         #invoice-content .MuiGrid-container {
           margin: 0 !important;
         }
         #invoice-content .MuiGrid-item {
           padding: 6px !important;
         }
         #invoice-content .MuiDivider-root {
           margin: 12px 0 !important;
         }
         #subhead {
           color: rgb(81, 158, 235) !important;
           font-size: 14px !important;
           padding: 8px 12px !important;
           margin-bottom: 8px !important;
           line-height: 1.3 !important;
         }
         #invoice-content img {
           height: 45px !important;
           width: 55px !important;
         }
         #invoice-content .MuiContainer-root {
           max-width: none !important;
           padding: 0 !important;
           margin: 0 !important;
           width: 100% !important;
         }
         #invoice-content .MuiBox-root {
           word-wrap: break-word !important;
           overflow-wrap: break-word !important;
           white-space: normal !important;
           max-width: 100% !important;
           margin-bottom: 8px !important;
         }
         #invoice-content .MuiBox-root:last-child {
           margin-bottom: 0 !important;
         }
         #invoice-content .MuiTypography-root {
           word-wrap: break-word !important;
           white-space: normal !important;
           line-height: 1.4 !important;
         }
         #invoice-content .MuiTableContainer-root {
           margin-bottom: 10px !important;
         }
       }
     `}
            </style>
            <Paper id="invoice-content" sx={{ p: isMobile ? 4 : 5, mx: "auto", my: 5, border: '2px solid #333', borderRadius: 2, minHeight: '80vh' }}>
                <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} mb={4}>
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems={isMobile ? "flex-start" : "center"}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                PJSofttech Pvt Ltd
                            </Typography>
                            <Typography variant="body2">
                                Mangal Murthy Complex, Office No. 203
                            </Typography>
                            <Typography variant="body2">
                                Tilak Road, Near Hirabagh Chowk, Abil Building
                            </Typography>
                            <Typography variant="body2">
                                Dadawadi, Sukrawar Peth, Pune, Maharashtra – 411002
                            </Typography>
                            <Typography variant="body2">Email: info@pjsofttech.com</Typography>
                        </Box>
                    </Box>
                    <Box textAlign={isMobile ? "left" : "right"} mt={isMobile ? 2 : 0}>
                        <Typography variant="h6" color="primary">Plan Invoice</Typography>
                        <Typography variant="body2">Invoice No: {invoice.invoiceNo}</Typography>
                        <Typography variant="body2">
                            Date: {dayjs().format("DD/MM/YYYY")}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box mb={4}>
                    <Typography variant="subtitle1" id="subhead" fontWeight="bold" sx={{ mb: 2, pl: 2, backgroundColor: "#1976d2", color: "#fff" }}>Bill To:</Typography>
                    <Paper variant="outlined" sx={{ p: 2.5, backgroundColor: "#f9f9f9" }}>
                        <Typography variant="body2"><strong>Institute Name:</strong> {invoice.instituteName}</Typography>
                        <Typography variant="body2"><strong>Address:</strong> {invoice.address}, {invoice.city}, {invoice.state} - {invoice.pincode}</Typography>
                        <Typography variant="body2"><strong>Email:</strong> {invoice.instituteEmail}</Typography>
                        <Typography variant="body2"><strong>Contact:</strong> {invoice.phoneNumber}</Typography>
                        <Typography variant="body2"><strong>GSTIN:</strong> {invoice.gstNo || "N/A"}</Typography>
                    </Paper>
                </Box>

                <Box mb={4}>
                    <Typography variant="subtitle1" id="subhead" fontWeight="bold" sx={{ mb: 2, pl: 2, backgroundColor: "#1976d2", color: "#fff" }}>Plan Details:</Typography>
                    <Paper variant="outlined" sx={{ p: 2.5, backgroundColor: "#f9f9f9" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Plan Name:</strong> {plan.name || 'N/A'}</Typography></Grid>
                            <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Plan Price:</strong> ₹{plan.price || '0.00'}</Typography></Grid>
                            <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Validity:</strong> {invoice.validity} Months</Typography></Grid>
                            <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Start Date:</strong> {dayjs(invoice.subscriptstartDate).format('DD/MM/YYYY')}</Typography></Grid>
                            <Grid item xs={12} sm={6}><Typography variant="body2"><strong>End Date:</strong> {dayjs(invoice.subscriptendDate).format('DD/MM/YYYY')}</Typography></Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box mb={4}>
                    <Typography variant="subtitle1" id="subhead" fontWeight="bold" sx={{ mb: 2, pl: 2, backgroundColor: "#1976d2", color: "#fff" }}>Billing Summary:</Typography>
                    <TableContainer sx={{ border: "1px solid #ccc" }}>
                        <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '70%', wordWrap: 'break-word' }}><Typography fontWeight="bold" variant="body2">Description</Typography></TableCell>
                                    <TableCell align="right" sx={{ width: '30%', wordWrap: 'break-word' }}><Typography fontWeight="bold" variant="body2">Amount (₹)</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow><TableCell sx={{ wordWrap: 'break-word' }}><Typography variant="body2">Base Price</Typography></TableCell><TableCell align="right" sx={{ wordWrap: 'break-word' }}><Typography variant="body2">₹{subtotal.toFixed(2)}</Typography></TableCell></TableRow>
                                {invoice.discountper > 0 && <TableRow><TableCell sx={{ wordWrap: 'break-word' }}><Typography variant="body2">Discount ({invoice.discountper}%)</Typography></TableCell><TableCell align="right" sx={{ wordWrap: 'break-word' }}><Typography variant="body2">-₹{discountAmount.toFixed(2)}</Typography></TableCell></TableRow>}
                                <TableRow><TableCell sx={{ wordWrap: 'break-word' }}><Typography variant="body2">Subtotal</Typography></TableCell><TableCell align="right" sx={{ wordWrap: 'break-word' }}><Typography variant="body2">₹{amountAfterDiscount.toFixed(2)}</Typography></TableCell></TableRow>
                                <TableRow><TableCell sx={{ wordWrap: 'break-word' }}><Typography variant="body2">GST</Typography></TableCell><TableCell align="right" sx={{ wordWrap: 'break-word' }}><Typography variant="body2">₹{gstAmount.toFixed(2)}</Typography></TableCell></TableRow>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}><TableCell sx={{ wordWrap: 'break-word' }}><Typography fontWeight="bold" variant="body2">Total</Typography></TableCell><TableCell align="right" sx={{ wordWrap: 'break-word' }}><Typography fontWeight="bold" variant="body2">₹{totalAmount.toFixed(2)}</Typography></TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography mt={2} fontWeight="bold" variant="body2">Amount in Words: {numberToWords(totalAmount)} Only</Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" gap={2}>
                    <Box sx={{ flex: 1, mr: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">Payment Info</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>Bank:</strong> HDFC Bank shanivar peth pune</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>Account:</strong> Pjsofttech Pvt. Ltd</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>Acc No:</strong> 50200096782420</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>IFSC:</strong> HDFC0000427</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>UPI:</strong> 8605090509@hdfcbank</Typography>
                    </Box>
                    <Box textAlign={isMobile ? 'left' : 'right'} sx={{ flex: 1, ml: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">Thank You!</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>Contact:</strong> fasthire@gmail.com</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>Phone:</strong> +91 7020615206</Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt={4}>
                    <Typography variant="body2" color="textSecondary">
                        This is a computer-generated invoice and does not require a physical signature.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

Billing.propTypes = {
    email: PropTypes.string,
    employer: PropTypes.object,
    onBack: PropTypes.func.isRequired
};

export default Billing;
// import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
// import dayjs from 'dayjs';
// import {
//   Box,
//   Typography,
//   Divider,
//   Grid,
//   Paper,
//   Button,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const numberToWords = (num) => {
//   const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//   const formatTenth = (digit, prev) => digit === 0 ? '' : ' ' + (digit === 1 ? double[prev] : tens[digit]);
//   const formatOther = (digit, next, denom) =>
//     (digit !== 0 && next !== 1 ? ' ' + single[digit] : '') +
//     (next !== 0 || digit > 0 ? ' ' + denom : '');
//   let str = '';
//   let rupees = Math.floor(num);
//   let paise = Math.round((num - rupees) * 100);
//   if (rupees > 0) {
//     const crores = Math.floor(rupees / 10000000) % 100;
//     if (crores > 0) str += numberToWords(crores) + ' Crore';
//     const lakhs = Math.floor(rupees / 100000) % 100;
//     if (lakhs > 0) str += (str !== '' ? ' ' : '') + numberToWords(lakhs) + ' Lakh';
//     const thousands = Math.floor(rupees / 1000) % 100;
//     if (thousands > 0) str += (str !== '' ? ' ' : '') + numberToWords(thousands) + ' Thousand';
//     const hundreds = Math.floor((rupees % 1000) / 100);
//     if (hundreds > 0) str += (str !== '' ? ' ' : '') + single[hundreds] + ' Hundred';
//     const tensValue = Math.floor(rupees % 100);
//     if (tensValue > 0)
//       str +=
//         (str !== '' ? ' ' : '') +
//         (tensValue < 10
//           ? single[tensValue]
//           : tensValue <= 19
//           ? double[tensValue - 10]
//           : formatTenth(Math.floor(tensValue / 10), tensValue % 10) +
//             formatOther(tensValue % 10, 0, ''));
//     str += ' Rupees';
//   }
//   if (paise > 0)
//     str +=
//       (str !== '' ? ' and ' : '') +
//       (paise < 10
//         ? single[paise]
//         : paise <= 19
//         ? double[paise - 10]
//         : formatTenth(Math.floor(paise / 10), paise % 10) +
//           formatOther(paise % 10, 0, '')) +
//       ' Paise';
//   return str || 'Zero Rupees';
// };

// const Billing = ({ email: propEmail, employer, onBack }) => {
//   const printRef = useRef();
//   const plan = employer?.employerPlans?.[0]?.plan || {};
//   const startDate = employer?.employerPlans?.[0]?.startDate;
//   const endDate = employer?.employerPlans?.[0]?.endDate;

//   const [invoice] = React.useState({
//     amount: plan.price || 0,
//     discountper: 0,
//     gstAmount: (plan.price || 0) * 0.18,
//     totalAmount: (plan.price || 0) * 1.18,
//   });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const email = propEmail || sessionStorage.getItem("email");

//   const subtotal = invoice.amount || 0;
//   const discountAmount = invoice.discountper ? (subtotal * invoice.discountper / 100) : 0;
//   const amountAfterDiscount = subtotal - discountAmount;
//   const gstAmount = invoice.gstAmount || 0;
//   const totalAmount = invoice.totalAmount || (amountAfterDiscount + gstAmount);

//   // 🔹 PDF download logic
//   const handleDownloadPDF = async () => {
//     const input = printRef.current;
//     if (!input) return;

//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = (canvas.height * pageWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
//     pdf.save(`Invoice_${email || "Billing"}.pdf`);
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper
//         ref={printRef}
//         id="invoice-content"
//         sx={{
//           p: isMobile ? 3 : 5,
//           mx: "auto",
//           my: 4,
//           border: '2px solid #333',
//           borderRadius: 2,
//           boxShadow: 3,
//           minHeight: '80vh'
//         }}
//       >
//         {/* Header */}
//         <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} mb={4}>
//           <Box>
//             <Typography variant="h6" fontWeight="bold">PJSofttech Pvt Ltd</Typography>
//             <Typography variant="body2">Mangal Murthy Complex, Office No. 203</Typography>
//             <Typography variant="body2">Tilak Road, Pune, Maharashtra – 411002</Typography>
//             <Typography variant="body2">Email: info@pjsofttech.com</Typography>
//           </Box>
//           <Box textAlign={isMobile ? "left" : "right"} mt={isMobile ? 2 : 0}>
//             <Typography variant="h6" color="primary">Plan Invoice</Typography>
//             <Typography variant="body2">Invoice No: INV-{Math.floor(Math.random() * 100000)}</Typography>
//             <Typography variant="body2">Date: {dayjs().format("DD/MM/YYYY")}</Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* Bill To */}
//         <Box mb={4}>
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, backgroundColor: "#1976d2", color: "#fff", p: 1, borderRadius: 1 }}>Bill To:</Typography>
//           <Paper variant="outlined" sx={{ p: 2.5, backgroundColor: "#f9f9f9" }}>
//             <Typography variant="body2"><strong>Company Name:</strong> {employer?.companyName || "N/A"}</Typography>
//             <Typography variant="body2"><strong>Email:</strong> {email}</Typography>
//             <Typography variant="body2"><strong>Industry:</strong> {employer?.industry || "N/A"}</Typography>
//           </Paper>
//         </Box>

//         {/* Plan Details */}
//         <Box mb={4}>
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, backgroundColor: "#1976d2", color: "#fff", p: 1, borderRadius: 1 }}>Plan Details:</Typography>
//           <Paper variant="outlined" sx={{ p: 2.5, backgroundColor: "#f9f9f9" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Plan Name:</strong> {plan.name || 'N/A'}</Typography></Grid>
//               <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Plan Price:</strong> ₹{plan.price || '0.00'}</Typography></Grid>
//               <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Start Date:</strong> {dayjs(startDate).format('DD/MM/YYYY')}</Typography></Grid>
//               <Grid item xs={12} sm={6}><Typography variant="body2"><strong>End Date:</strong> {dayjs(endDate).format('DD/MM/YYYY')}</Typography></Grid>
//             </Grid>
//           </Paper>
//         </Box>

//         {/* Billing Summary */}
//         <Box mb={4}>
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, backgroundColor: "#1976d2", color: "#fff", p: 1, borderRadius: 1 }}>Billing Summary:</Typography>
//           <TableContainer sx={{ border: "1px solid #ccc" }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#1976d2" }}>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Description</TableCell>
//                   <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>Amount (₹)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow><TableCell>Base Price</TableCell><TableCell align="right">₹{subtotal.toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell>GST (18%)</TableCell><TableCell align="right">₹{gstAmount.toFixed(2)}</TableCell></TableRow>
//                 <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableCell><strong>Total</strong></TableCell>
//                   <TableCell align="right"><strong>₹{totalAmount.toFixed(2)}</strong></TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Typography mt={2} fontWeight="bold" variant="body2">
//             Amount in Words: {numberToWords(totalAmount)} Only
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 4 }} />

//         {/* Footer */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle2" fontWeight="bold">Payment Info</Typography>
//             <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Bank: HDFC Bank</Typography>
//             <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Acc No: 50200096782420</Typography>
//             <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>IFSC: HDFC0000427</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} textAlign={isMobile ? "left" : "right"}>
//             <Typography variant="subtitle2" fontWeight="bold">Thank You!</Typography>
//             <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Email: fasthire@gmail.com</Typography>
//             <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>Phone: +91 7020615206</Typography>
//           </Grid>
//         </Grid>

//         <Box textAlign="center" mt={3}>
//           <Typography variant="body2" color="textSecondary">
//             This is a system-generated invoice and does not require a physical signature.
//           </Typography>
//         </Box>
//       </Paper>

//       {/* PDF Download Button */}
//       <Box display="flex" justifyContent="flex-end" mt={3} mb={4}>
//         <Button
//           variant="contained"
//           startIcon={<PictureAsPdfIcon />}
//           onClick={handleDownloadPDF}
//           sx={{
//             backgroundColor: "#1976d2",
//             "&:hover": { backgroundColor: "#1565c0" },
//           }}
//         >
//           Download PDF
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// Billing.propTypes = {
//   email: PropTypes.string,
//   employer: PropTypes.object,
//   onBack: PropTypes.func.isRequired,
// };

// export default Billing;
