import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCard = ({
  setFilteredCategory,
  category,
}: {
  category: { icon: any; title: string; cardNo: number };
  setFilteredCategory: any;
  filteredCategory: any;
}) => {
  return (
    <div
      className={`home_page_category_box box_${category.cardNo}`}
      onClick={() => setFilteredCategory(category.title)}
    >
      <div className="home_page_category_box_icon">
        <FontAwesomeIcon icon={category.icon} />{" "}
        {/* Correctly using dynamic icon */}
      </div>
      <p>{category.title}</p> {/* Correctly using dynamic title */}
    </div>
  );
};

export default CategoryCard;
