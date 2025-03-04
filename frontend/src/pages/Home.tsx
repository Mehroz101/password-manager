import {
  faClipboard,
  faCreditCard,
  faPaperclip,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage.css";
import Whatsapp from "../assets/whatsapp.png";
import Google from "../assets/google.png";
import SearchBox from "../components/SearchBox";
import { Category, RecentActivity } from "../types/Types";
import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import RecentActivityCard from "../components/RecentActivityCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
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
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  useEffect(() => {
    if (category_cards) {
      setCategories(category_cards);
    }
  }, [category_cards]);
  useEffect(() => {
    if (recent_activity) {
      setRecentActivities(recent_activity);
    }
  }, [recent_activity]);
  return (
    <>
      <div className="home_page">
        {/* <SearchBox /> */}
        <p className="company_register_text">
          Register a company to enable advanced features{" "}
          <Link to={ROUTES.COMPANYREGISTER}>click here</Link>
        </p>
        {/* <div className="category_container">
          <h3 className="section_heading">Category</h3>
          <div className="category_boxs">
            {categories &&
              categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
          </div>
        </div> */}
        <div className="home_page_recent_activity_container">
          <h3 className="section_heading">Recent Activity</h3>
          <div className="home_page_recent_activity_boxs">
            {recentActivities &&
              recentActivities.map((activity, index) => (
                <RecentActivityCard key={index} activity={activity} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
