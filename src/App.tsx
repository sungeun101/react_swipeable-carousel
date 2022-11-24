import React, { useEffect, useState } from "react";
import { initialCons, stores } from "./consts";
import NavBar from "./NavBar";

const reESC = /[\\^$.*+?()[\]{}|]/g;
const reChar = /[가-힣]/;
const reJa = /[ㄱ-ㅎ]/;
const offset = 44032;
const orderOffest = [
  ["ㄱ", 44032],
  ["ㄲ", 44620],
  ["ㄴ", 45208],
  ["ㄷ", 45796],
  ["ㄸ", 46384],
  ["ㄹ", 46972],
  ["ㅁ", 47560],
  ["ㅂ", 48148],
  ["ㅃ", 48736],
  ["ㅅ", 49324],
];
const con2syl = Object.fromEntries(orderOffest as readonly any[]);
const pattern = (ch: string) => {
  let r;
  if (reJa.test(ch)) {
    // 한글 자음
    const begin =
      con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
    const end = begin + 587;
    r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else if (reChar.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    if (chCode % 28 > 0) return ch; // 종성이 있으면 문자 그대로 찾기
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else r = ch.replace(reESC, "\\$&");
  return `(${r})`;
};

function App() {
  const [selectedCons, setSelectedCons] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    searchMatchingStores();
  }, [selectedCons]);

  const handleInputChange = (e: any) => {
    setSelectedCons(e.target.value);
  };

  const handleConClick = (e: any) => {
    let text = e.target.innerText;
    text = selectedCons.concat(e.target.innerText);
    setSelectedCons(text);
  };

  const searchMatchingStores = () => {
    const createFuzzyMatcher = (selectedCons: string) => {
      const reg = selectedCons.split("").map(pattern).join(".*?");
      return new RegExp(reg);
    };
    const regex = createFuzzyMatcher(selectedCons);
    const isConsonantsMatched = (query: string, target: string) => {
      const reg = new RegExp(query.split("").map(pattern).join(".*?"), "i");
      const matches = reg.exec(target);
      return Boolean(matches);
    };
    const matchedResult = stores
      .filter((store) => isConsonantsMatched(selectedCons, store.name))
      .map((store) => {
        let totalDistance = 0;
        const matchingWords = store.name.replace(regex, (match, ...groups) => {
          const letters = groups.slice(0, selectedCons.length);
          let lastIndex = 0;
          let highlighted = [];
          for (let i = 0, l = letters.length; i < l; i++) {
            const idx = match.indexOf(letters[i], lastIndex);
            highlighted.push(match.substring(lastIndex, idx));
            highlighted.push(letters[i]);
            if (lastIndex > 0) {
              totalDistance += idx - lastIndex;
            }
            lastIndex = idx + 1;
          }
          return highlighted.join("");
        });

        return { matchingWords, totalDistance };
      });
    let consecutedOnly: string[] = [];
    matchedResult
      .filter((item) => item.totalDistance === 0)
      .forEach((item) => consecutedOnly.push(item.matchingWords));
    setFilteredStores(
      stores.filter((store) => consecutedOnly.includes(store.name))
    );
  };

  const deleteOneCon = () => {
    if (selectedCons === "") return;
    setSelectedCons((prev) => prev.slice(0, -1));
  };

  return (
    <section className="bg-mainBg w-screen h-screen">
      <div className="w-[1920px] h-[1080px]">
        <main className="border-2 px-[220px] py-[60px]">
          <header className="text-[45px]">매장안내</header>
          {filteredStores.length === 0 ? (
            <div className="border-b-2 h-[500px] flex justify-center items-center text-3xl text-grey">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="border-b-2 h-[500px]">
              <ul className="grid grid-cols-4 gap-9">
                {filteredStores.map((store: any, _index: number) => (
                  <li
                    className="w-[335px] h-[125px] bg-white flex"
                    key={store.name}
                  >
                    <div className="basis-2/3 border-r-2">icon</div>
                    <div className="flex items-center justify-between w-full p-4">
                      <span>{store.name}</span>
                      <div className="flex flex-col h-full justify-between items-center">
                        <span className="border-b-2 flex justify-center w-4">
                          {store.floor}F
                        </span>
                        <span>icon</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <section className="py-8 px-4 flex gap-10">
            <div className="flex flex-col gap-2 justify-between">
              <button className="bg-white w-[200px] h-[55px]">
                초성/알파벳 검색
              </button>
              <button className="bg-white w-[200px] h-[55px]">
                카테고리 검색
              </button>
              <button className="bg-white w-[200px] h-[55px]">층별 검색</button>
            </div>

            <div className="w-full flex flex-col mr-60">
              <div className="mx-auto relative">
                <input
                  type="text"
                  name="search"
                  placeholder="찾고자 하시는 매장의 초성을 선택해주세요."
                  className="bg-black w-[574px] h-[45px] rounded-3xl text-white pl-36"
                  onChange={handleInputChange}
                  value={selectedCons}
                />
                <button
                  className="bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center absolute right-2 bottom-1.5"
                  onClick={deleteOneCon}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-20">
                <ul className="flex flex-col gap-2">
                  <button className="bg-white w-[95px] h-[35px] rounded-3xl ">
                    ㄱ ㄴ ㄷ
                  </button>
                  <button className="bg-white w-[95px] h-[35px] rounded-3xl ">
                    A B C
                  </button>
                  <button className="bg-white w-[95px] h-[35px] rounded-3xl ">
                    1 2 3
                  </button>
                </ul>
                <ul className="flex flex-col gap-4 pt-4">
                  <div className="flex gap-7">
                    {initialCons
                      .slice(0, 11)
                      .map((con: string, _index: number) => (
                        <button
                          className="w-[35px] h-[35px] rounded-full bg-grey"
                          onClick={handleConClick}
                          key={con}
                        >
                          {con}
                        </button>
                      ))}
                  </div>
                  <div className="flex gap-7">
                    {initialCons
                      .slice(11, 17)
                      .map((con: string, _index: number) => (
                        <button
                          className="w-[35px] h-[35px] rounded-full bg-grey"
                          onClick={handleConClick}
                          key={con}
                        >
                          {con}
                        </button>
                      ))}
                  </div>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <NavBar />
      </div>
    </section>
  );
}

export default App;
