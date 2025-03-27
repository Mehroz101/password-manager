import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ActivityResponseInterface } from "../types/Types";
import { formatDate } from "../utils/function";

const RecentActivityCard = ({
  activity,
}:{
    activity: ActivityResponseInterface;
  }

) => {
  const [activities,setActivities] = useState<ActivityResponseInterface | null>(null)
  useEffect(() => {
    if (activity?.passwordID) {
      setActivities({
        passwordID: {
          type: activities?.passwordID.type
        },
        createdAt: activity?.createdAt,
        actionType: activity?.actionType,
      });
    }
  }, [activity]);

  if (!activities) return null;
  return (
    <div className="home_page_recent_activity_box">
      <div className="recent_activity_box_left">
        <img src={`http://localhost:5000/uploads/${activity?.passwordID?.type}.png`} alt="google" />
      </div>
      <div className="recent_activity_box_center">
        <p className="activity_box_title">{activity?.passwordID?.type}</p>
        {/* <p className="activity_box_account">{activity?.passwordID?.email}</p> */}
        <p className="activity_box_account">
          <span>
            {activity?.actionType}: {formatDate(activity?.createdAt)}
          </span>{" "}
          {/* <span>{activity.time}</span> */}
        </p>
      </div>
      {/* <div className="recent_activity_box_right">
        <FontAwesomeIcon icon={faClipboard} />
      </div> */}
    </div>
  );
};

export default RecentActivityCard;
