import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddHomeIcon from "@mui/icons-material/AddHome";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
export const NAVIGATION = [
    {
      title: "Main Dashboard",
      segment: "/admin/fasthireadminlayout/dashboard",
      icon: <DashboardIcon />,
      description: "View main dashboard",
      roles: ["SUPERADMIN", "EMPLOYER"],
    },
    {
      title: "Job Post",
      segment: "/admin/fasthireadminlayout/jobpost",
      icon: <PersonSearchIcon />,
      description: "Manage inquiries",
      system: "Lead Management Software", 
      roles: ["SUPERADMIN", "EMPLOYER"],
    },
    {
      title: "Application Form",
      segment: "/admin/fasthireadminlayout/applicationform",
      icon: <AddHomeIcon />,
      description: "Manage Application",
      system: "Application Management Software", 
      roles: ["SUPERADMIN", "EMPLOYER"],
    },
    {
      title: "Job Record",
      segment: "/admin/fasthireadminlayout/jobrecord",
      icon: <ReceiptLongIcon />,
      description: "Manage Registration",
      system: "Registration Management Software", 
      roles: ["SUPERADMIN", "EMPLOYER"],
    },
    // {
    //   title: "Contact Us",
    //   segment: "/admin/admin/ContactUs",
    //   icon: <HelpOutlineIcon />,
    //   description: "Manage Contact Us",
    //   system: "Contact Us Management Software", 
    //   roles: ["superAdmin", "branch"],
    // },
    {
      title: "Create Job Post",
      segment: "/admin/fasthireadminlayout/createjobpost",
      icon: <WorkOutlineIcon />,
      description: "Marketing Management",
      system: "Marketing Management System",
      roles: ["SUPERADMIN"],
    },
    // {
    //   title: "Income & Expense",
    //   segment: "/admin/admin/incomeexpense",
    //   icon: <CurrencyRupeeIcon />,
    //   description: "Income & Expense",
    //   system: "Income/Expense Management Software", 
    //   roles: ["superAdmin", "branch",  "staff"],
    // },
    // {
    //   title: "Branch",
    //   segment: "/admin/admin/CreateBranch",
    //   icon: <HubIcon />,
    //   description: "Create Branch",
    //   roles: ["superAdmin"],
    // },
    // {
    //   title: "Staff",
    //   segment: "/admin/admin/CreateStaff",
    //   icon: <GroupIcon />,
    //   description: "Create Staff",
    //   roles: ["superAdmin"],
    // },
    // {
    //   title: "Partner Details",
    //   segment: "/admin/admin/partner",
    //   icon: <HelpOutlineIcon />,
    //   description: "Partner Details",
    //   roles: ["superAdmin"],
    // },
    //  {
    //   title: "Blog Management",
    //   segment: "/admin/admin/blog",
    //   icon: <ArticleIcon />,
    //   description: "Manage Blog Content",
    //   system: "Blog Management System",
    //   roles: ["superAdmin"],
    // },
    //  {
    //   title: "Course Finder",
    //   segment: "/admin/admin/CourceFinder ",
    //   icon: <SchoolIcon />,
    //   description: "Course Finder",
    //   roles: ["superAdmin","branch","staff"],
    // },
     {
      title: "Employ Form",
      segment: "/admin/fasthireadminlayout/employe",
      icon: <ContactPageIcon />,
      description: "Employe Form",
      roles: ["SUPERADMIN"],
    },
    {
      title: "Settings",
      segment: "/admin/fasthireadminlayout/settings",
      icon: <SettingsIcon />,
      description: "System Settings",
      roles: ["SUPERADMIN"],
    },
  ];