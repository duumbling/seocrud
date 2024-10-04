import { useState } from "react";
import cls from "./style.module.scss";

export const CreateNewsItemScreen = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { oncreate, onback } = props;

  return (
    <div className={cls.createNewsItemScreen}>
      <input
        type="text"
        className={cls.createNewsItemScreen_titleInput}
        placeholder="Введите заголовок новости.."
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <textarea
        name="textInput"
        id="textInput"
        className={cls.createNewsItemScreen_textInput}
        placeholder="Введите текс новости.."
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      ></textarea>
      <div className={cls.createNewsItemScreen_buttonsContainer}>
        <button
          className={cls.createNewsItemScreen_goBackBtn}
          onClick={(e) => {
            e.preventDefault();
            onback();
          }}
        >
          Назад
        </button>
        <button
          className={cls.createNewsItemScreen_createBtn}
          onClick={(e) => {
            e.preventDefault();
            oncreate(title, text);
          }}
        >
          Создать
        </button>
      </div>
    </div>
  );
};
