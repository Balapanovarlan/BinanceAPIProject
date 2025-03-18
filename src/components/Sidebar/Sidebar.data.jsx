import { PageRoutes } from "../../constants/PageRoutes";
import { Home } from "lucide-react";
import styles from './Sidebar.module.css';

export const sidebarData = [
    {
        label: "Home",
        path: PageRoutes.COMMON.MAIN,
        icon: <Home className={styles.navIcon} />,
        activeRoutes: [PageRoutes.COMMON.MAIN],
    },
]