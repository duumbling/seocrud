import { useState } from "react";
import { EditNewsItemScreen } from "../../EditNewsItemScreen/ui/EditNewsItemScreen";
import cls from "./style.module.scss";

export const ExpandedNewsItem = (props) => {
  const { title, text, onclick, onedithandler } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      {isEditMode ? (
        <EditNewsItemScreen
          currentTitle={title}
          currentText={text}
          onedit={onedithandler}
          onback={() => {
            setIsEditMode(false);
          }}
        />
      ) : (
        <div className={cls.newsItemExpanded}>
          <header className={cls.newsItemExpanded_header}>
            <nav className={cls.newsItemExpanded_nav}>
              <button
                className={cls.newsItemExpanded_goBackBtn}
                onClick={(e) => {
                  e.preventDefault();
                  onclick();
                }}
              >
                {"Назад"}
              </button>
              <button
                className={cls.newsItemExpanded_editBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditMode(true);
                }}
              >
                Изменить
              </button>
            </nav>
          </header>
          <div className={cls.newsItemExpaded_contentContainer}>
            <h4 className={cls.newsItemExpanded_title}>{title}</h4>
            <div className={cls.newsItemExpanded_textContainer}>
              <p className={cls.newsItemExpanded_text}>{text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
