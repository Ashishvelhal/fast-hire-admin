import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddHomeIcon from "@mui/icons-material/AddHome";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';

export const NAVIGATION = [
  {
    title: "Main Dashboard",
    segment: "/admin/fasthireadminlayout/dashboard",
    icon: <DashboardIcon />,
    description: "View main dashboard",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Employer",
    segment: "/admin/fasthireadminlayout/employe",
    icon: <WorkOutlineIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["SUPERADMIN", "MANAGER"],
  },
    {
    title: "Billing",
    segment: "/admin/fasthireadminlayout/billing",
    icon: <PaymentsIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Manager",
    segment: "/admin/fasthireadminlayout/manager",
    icon: <ReceiptLongIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["SUPERADMIN"],
  },
  {
    title: " Plans",
    segment: "/admin/fasthireadminlayout/plans",
    icon: <ContactPageIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Job Post",
    segment: "/admin/fasthireadminlayout/jobpost",
    icon: <PersonSearchIcon />,
    description: "Manage inquiries",
    system: "Lead Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Application Form",
    segment: "/admin/fasthireadminlayout/applicationform",
    icon: <AddHomeIcon />,
    description: "Manage Application",
    system: "Application Management Software",
    // roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Job Record",
    segment: "/admin/fasthireadminlayout/jobrecord",
    icon: <ReceiptLongIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  // {
  //   title: "User",
  //   segment: "/admin/fasthireadminlayout/users",
  //   icon: <PersonOutlineIcon />,
  //   description: "Manage Registration",
  //   system: "Registration Management Software",
  //   roles: ["SUPERADMIN", "MANAGER"],
  // },

  // {
  //   title: "College",
  //   segment: "/admin/fasthireadminlayout/college",
  //   icon: <SchoolIcon />,
  //   description: "Manage Registration",
  //   system: "Registration Management Software",
  //   roles: ["SUPERADMIN", "MANAGER"],
  // },

  {
    title: "Contact Us",
    segment: "/admin/fasthireadminlayout/contactus",
    icon: <ContactPageIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Plan Leads",
    segment: "/admin/fasthireadminlayout/leads",
    icon: <LeaderboardIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Degree Leads",
    segment: "/admin/fasthireadminlayout/degreeleads",
    icon: <Rotate90DegreesCwIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Degree Setting",
    segment: "/admin/fasthireadminlayout/degreesetting",
    icon: <ContactPageIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },

  {
    title: "Settings",
    segment: "/admin/fasthireadminlayout/settings",
    icon: <SettingsIcon />,
    description: "System Settings",
    roles: ["SUPERADMIN", "MANAGER"],
    children: [
      {
        title: "Location",
        segment: "/admin/fasthireadminlayout/settings/location",
        icon: <LocationOnIcon />,
        roles: ["SUPERADMIN"],
      },
      {
        title: "Skills",
        segment: "/admin/fasthireadminlayout/settings/skills",
        icon: <WorkOutlineIcon />,
        roles: ["SUPERADMIN"],
      },
      {
        title: "Education",
        segment: "/admin/fasthireadminlayout/settings/education",
        icon: <WorkOutlineIcon />,
        roles: ["SUPERADMIN"],
      },
      {
        title: "Company",
        segment: "/admin/fasthireadminlayout/settings/company",
        icon: <WorkOutlineIcon />,
        roles: ["SUPERADMIN"],
      },
      {
        title: "Courses",
        segment: "/admin/fasthireadminlayout/settings/courses",
        icon: <WorkOutlineIcon />,
        roles: ["SUPERADMIN"],
      }
    ]
  }
];
