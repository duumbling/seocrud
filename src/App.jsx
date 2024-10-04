import { useEffect, useState } from "react";
import "./App.css";
import { CollapsedNewsItem } from "./components/CollapsedNewsItem/index";
import { ExpandedNewsItem } from "./components/ExpandedNewsItem/ui/ExpandedNewsItem";
import { CreateNewsItemScreen } from "./components/CreateNewsItemScreen";

function App() {
  const [isNewsItemExpanded, setIsNewsItemExpanded] = useState(false);
  const [newsItemsList, setNewsItemsList] = useState([]);
  const [expandedItem, setExpandedItem] = useState({});
  const [isCreateMode, setIsCreateMode] = useState(false);
  const lsArrayName = "NEWS_ITEMS_LIST";

  function createID() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  function breakTitle(text) {
    const maxLength = 80;
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  function localStorageSet(array) {
    localStorage.setItem(lsArrayName, JSON.stringify(array));
  }

  function localStorageGet() {
    return JSON.parse(localStorage.getItem(lsArrayName));
  }

  let startNewsItem = {
    id: createID(),
    title: "Я тестовая новость №1",
    text: "loremdqwdqwdbqwiduqwdibqwuhdiuhqwuihdiuhqwuihduiqwiuduiqwihduihqwuihduiqhwuihduiqwhiuhduihqwiuhdiuhqwihdiqwhiuhdiuqwhiuhidu",
  };
  let startNewsItem2 = {
    id: createID(),
    title: "Я тестовая новость №2",
    text: "loremdqwdqwdbqwiduqwdibqwuhdiuhqwuihdiuhqwuihduiqwiuduiqwihduihqwuihduiqhwuihduiqwhiuhduihqwiuhdiuhqwihdiqwhiuhdiuqwhiuhidu",
  };

  useEffect(() => {
    let localStorageList = localStorageGet();
    if (localStorageList && localStorageList.length != 0) {
      setNewsItemsList(localStorageList);
    } else {
      setNewsItemsList([startNewsItem, startNewsItem2]);
    }
  }, []);

  function expandNewsItemHandler(id) {
    if (isNewsItemExpanded) {
      setIsNewsItemExpanded(false);
      setExpandedItem({});
    }

    if (!isNewsItemExpanded) {
      setIsNewsItemExpanded(true);
      setExpandedItem(newsItemsList.filter((item) => item.id === id)[0]);
    }
  }

  function createNewsItemHandler(title, text) {
    let newNewsItem = {
      id: createID(),
      title,
      text,
    };
    localStorageSet([...newsItemsList, newNewsItem]);
    setNewsItemsList([...newsItemsList, newNewsItem]);
    setIsCreateMode(false);
  }

  function editNewsItemHandler(newTitle, newText) {
    let newsItem = newsItemsList.find(
      (newsItem) => newsItem.id === expandedItem.id
    );
    newsItem.title = newTitle;
    newsItem.text = newText;
    setExpandedItem({ id: expandedItem.id, title: newTitle, text: newText });
    localStorageSet(newsItemsList);
  }

  function exitCreateModeHandler() {
    setIsCreateMode(false);
  }

  function removeNewsItemHandler(id) {
    let newNewsItemsList = newsItemsList.filter(
      (newsItem) => newsItem.id !== id
    );
    setNewsItemsList(newNewsItemsList);
    localStorageSet(newNewsItemsList);
  }

  return (
    <>
      <section className="news_sontainer">
        {isCreateMode && (
          <CreateNewsItemScreen
            oncreate={createNewsItemHandler}
            onback={exitCreateModeHandler}
          />
        )}
        {isNewsItemExpanded ? (
          <ExpandedNewsItem
            title={expandedItem.title}
            text={expandedItem.text}
            onclick={expandNewsItemHandler}
            onedithandler={editNewsItemHandler}
          />
        ) : (
          newsItemsList.map((newsItem) => {
            return (
              <CollapsedNewsItem
                id={newsItem.id}
                title={breakTitle(newsItem.title)}
                onclick={expandNewsItemHandler}
                onremove={removeNewsItemHandler}
                key={newsItem.id}
              />
            );
          })
        )}
      </section>
      <button
        className="createNewsItemButton"
        onClick={(e) => {
          e.preventDefault();
          setIsCreateMode(true);
        }}
      >
        Добавить новую новость
      </button>
    </>
  );
}

export default App;
