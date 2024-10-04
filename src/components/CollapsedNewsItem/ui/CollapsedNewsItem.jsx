import { useState } from "react";
import deleteIcon from "../img/delete.svg";
import cls from "./style.module.scss";

export const CollapsedNewsItem = (props) => {
  const { id, title, onclick, onremove } = props;

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  return (
    <div
      className={cls.newsItemCollapsed}
      onMouseOver={() => {
        setIsButtonVisible(true);
      }}
      onMouseLeave={() => {
        setIsButtonVisible(false);
      }}
    >
      <h4
        className={cls.newsItemCollapsed_title}
        onClick={(e) => {
          e.preventDefault();
          onclick(id);
        }}
      >
        {title}
      </h4>
      <button
        className={`${cls.newsItemCollapsed_deleteButton} ${
          isButtonVisible ? cls.visible : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onremove(id);
        }}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};
