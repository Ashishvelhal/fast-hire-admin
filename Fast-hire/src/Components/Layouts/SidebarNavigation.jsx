import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddHomeIcon from "@mui/icons-material/AddHome";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const NAVIGATION = [
  {
    title: "Main Dashboard",
    segment: "/admin/fasthireadminlayout/dashboard",
    icon: <DashboardIcon />,
    description: "View main dashboard",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Create Employe",
    segment: "/admin/fasthireadminlayout/employe",
    icon: <WorkOutlineIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["MANAGER"],
  },

  {
    title: "Create Manager",
    segment: "/admin/fasthireadminlayout/manager",
    icon: <WorkOutlineIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["SUPERADMIN"],
  },
  {
    title: "Create Plans",
    segment: "/admin/fasthireadminlayout/plans",
    icon: <ContactPageIcon />,
    description: "Marketing Management",
    system: "Marketing Management System",
    roles: ["SUPERADMIN"],
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
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Job Record",
    segment: "/admin/fasthireadminlayout/jobrecord",
    icon: <ReceiptLongIcon />,
    description: "Manage Registration",
    system: "Registration Management Software",
    roles: ["SUPERADMIN", "MANAGER"],
  },
  {
    title: "Settings",
    segment: "/admin/fasthireadminlayout/settings",
    icon: <SettingsIcon />,
    description: "System Settings",
    roles: ["SUPERADMIN"],
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
      }
    ]
  }

];