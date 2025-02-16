import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = () => {
  return (
    <div className="home_page_search_container">
      <div className="home_page_search_box">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" placeholder="search" />
      </div>
    </div>
  );
};

export default SearchBox;
