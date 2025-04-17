import {
  faClipboard,
  faCreditCard,
  faPaperclip,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage.css";
import Whatsapp from "../assets/whatsapp.png";
import Google from "../assets/google.png";
import {
  ActivityResponseInterface,
  Category,
} from "../types/Types";
import { useEffect, useState } from "react";
import RecentActivityCard from "../components/RecentActivityCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useQuery } from "@tanstack/react-query";
import { GetAllRecentActivites } from "../services/PasswordServices";
const category_cards = [
  {
    icon: faCreditCard,
    title: "Card",
    cardNo: 1,
  },
  {
    icon: faClipboard,
    title: "Password",
    cardNo: 2,
  },
  {
    icon: faShield,
    title: "Login",
    cardNo: 3,
  },
  {
    icon: faPaperclip,
    title: "API",
    cardNo: 4,
  },
];
const recent_activity = [
  {
    img: Google,
    title: "Google",
    account: "mehrozfarooq127@gmail.com",
    activityType: "Last Edited",
    time: "12:30pm",
    date: "24/07/2024",
  },
  {
    img: Google,
    title: "Netflix",
    account: "mehrozfarooq127@gmail.com",
    activityType: "Last Used",
    time: "12:30pm",
    date: "24/07/2024",
  },
  {
    img: Whatsapp,
    title: "Whatsapp",
    account: "mehrozfarooq127@gmail.com",
    activityType: "Last View",
    time: "12:30pm",
    date: "24/07/2024",
  },
  {
    img: Google,
    title: "Google",
    account: "mehrozfarooq127@gmail.com",
    time: "12:30pm",
    activityType: "Last Edited",
    date: "24/07/2024",
  },
];
const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: recentActivities } = useQuery<ActivityResponseInterface[]>({
    queryKey: ["recentActivities"],
    queryFn: GetAllRecentActivites,
  });
  useEffect(() => {
    if (category_cards) {
      setCategories(category_cards);
    }
  }, [category_cards]);

  return (
    <>
      <div className="home_page">
        <p className="company_register_text">
          Register a company to enable advanced features{" "}
          <Link to={ROUTES.COMPANYREGISTER}>click here</Link>
        </p>
     
        <div className="home_page_recent_activity_container">
          <h3 className="section_heading">Recent Activity</h3>
          <div className="home_page_recent_activity_boxs">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities
                .map((activity: ActivityResponseInterface, index: number) => (
                  <RecentActivityCard key={index} activity={activity} />
                ))
                .reverse()
            ) : (
              <>
                <p>No recent activities</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
