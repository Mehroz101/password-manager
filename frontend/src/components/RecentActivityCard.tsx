import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecentActivityCard = ({
  activity,
}: {
  activity: {
    img: string;
    title: string;
    time: string;
    date: string;
    account: string;
    activityType: string;
  };
}) => {
  return (
    <div className="home_page_recent_activity_box">
      <div className="recent_activity_box_left">
        <img src={activity.img} alt="google" />
      </div>
      <div className="recent_activity_box_center">
        <p className="activity_box_title">{activity.title}</p>
        <p className="activity_box_account">{activity.account}</p>
        <p className="activity_box_account">
          <span>
            {activity.activityType}: {activity.date}
          </span>{" "}
          <span>{activity.time}</span>
        </p>
      </div>
      <div className="recent_activity_box_right">
        <FontAwesomeIcon icon={faClipboard} />
      </div>
    </div>
  );
};

export default RecentActivityCard;
