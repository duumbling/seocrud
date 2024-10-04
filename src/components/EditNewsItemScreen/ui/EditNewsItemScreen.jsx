import { useEffect, useState } from "react";
import cls from "./style.module.scss";

export const EditNewsItemScreen = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { currentTitle, currentText, onedit, onback } = props;

  useEffect(() => {
    setTitle(currentTitle);
    setText(currentText);
  }, []);

  return (
    <div className={cls.editNewsItemScreen}>
      <input
        type="text"
        className={cls.editNewsItemScreen_titleInput}
        placeholder="Введите заголовок новости.."
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <textarea
        name="textInput"
        id="textInput"
        className={cls.editNewsItemScreen_textInput}
        placeholder="Введите текс новости.."
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      ></textarea>
      <div className={cls.editNewsItemScreen_buttonsContainer}>
        <button
          className={cls.editNewsItemScreen_goBackBtn}
          onClick={(e) => {
            e.preventDefault();
            onback();
          }}
        >
          Назад
        </button>
        <button
          className={cls.editNewsItemScreen_createBtn}
          onClick={(e) => {
            e.preventDefault();
            onedit(title, text);
            onback();
          }}
        >
          Завершить редактирование
        </button>
      </div>
    </div>
  );
};
