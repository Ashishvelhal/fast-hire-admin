// src/config/navigationConfig.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HubIcon from "@mui/icons-material/Hub";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupIcon from "@mui/icons-material/Group";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

export const NAVIGATION = [
    {
      title: "Main Dashboard",
      segment: "/fasthireadmin/admin/dashboard",
      icon: <DashboardIcon />,
      description: "View main dashboard",
      roles: ["superAdmin", "branch"],
    },
    {
      title: "Job Post",
      segment: "/fasthireadmin/admin/jobpost",
      icon: <PersonSearchIcon />,
      description: "Manage inquiries",
      system: "Lead Management Software", 
      roles: ["superAdmin", "branch",  "staff"],
    },
    {
      title: "Application Form",
      segment: "/fasthireadmin/admin/applicationform",
      icon: <AddHomeIcon />,
      description: "Manage Application",
      system: "Application Management Software", 
      roles: ["superAdmin", "branch",  "staff"],
    },
    {
      title: "Job Record",
      segment: "/fasthireadmin/admin/jobrecord",
      icon: <ReceiptLongIcon />,
      description: "Manage Registration",
      system: "Registration Management Software", 
      roles: ["superAdmin", "branch",  "staff"],
    },
    // {
    //   title: "Contact Us",
    //   segment: "/fasthireadmin/admin/ContactUs",
    //   icon: <HelpOutlineIcon />,
    //   description: "Manage Contact Us",
    //   system: "Contact Us Management Software", 
    //   roles: ["superAdmin", "branch"],
    // },
    {
      title: "Create Job Post",
      segment: "/fasthireadmin/admin/createjobpost",
      icon: <WorkOutlineIcon />,
      description: "Marketing Management",
      system: "Marketing Management System",
      roles: ["superAdmin"],
    },
    // {
    //   title: "Income & Expense",
    //   segment: "/fasthireadmin/admin/incomeexpense",
    //   icon: <CurrencyRupeeIcon />,
    //   description: "Income & Expense",
    //   system: "Income/Expense Management Software", 
    //   roles: ["superAdmin", "branch",  "staff"],
    // },
    // {
    //   title: "Branch",
    //   segment: "/fasthireadmin/admin/CreateBranch",
    //   icon: <HubIcon />,
    //   description: "Create Branch",
    //   roles: ["superAdmin"],
    // },
    // {
    //   title: "Staff",
    //   segment: "/fasthireadmin/admin/CreateStaff",
    //   icon: <GroupIcon />,
    //   description: "Create Staff",
    //   roles: ["superAdmin"],
    // },
    // {
    //   title: "Partner Details",
    //   segment: "/fasthireadmin/admin/partner",
    //   icon: <HelpOutlineIcon />,
    //   description: "Partner Details",
    //   roles: ["superAdmin"],
    // },
    //  {
    //   title: "Blog Management",
    //   segment: "/fasthireadmin/admin/blog",
    //   icon: <ArticleIcon />,
    //   description: "Manage Blog Content",
    //   system: "Blog Management System",
    //   roles: ["superAdmin"],
    // },
    //  {
    //   title: "Course Finder",
    //   segment: "/fasthireadmin/admin/CourceFinder ",
    //   icon: <SchoolIcon />,
    //   description: "Course Finder",
    //   roles: ["superAdmin","branch","staff"],
    // },
    //  {
    //   title: "Courses",
    //   segment: "/fasthireadmin/admin/courses",
    //   icon: <MenuBookIcon />,
    //   description: "Manage Courses",
    //   roles: ["superAdmin"],
    // },
    {
      title: "Settings",
      segment: "/fasthireadmin/admin/settings",
      icon: <SettingsIcon />,
      description: "System Settings",
      roles: ["superAdmin"],
    },
  ];