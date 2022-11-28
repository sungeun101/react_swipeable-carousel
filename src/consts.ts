export const stores = [
  {
    name: "1 ABC 그랜드스테이지",
    floor: -1,
  },
  {
    name: "가먼츠 유니온",
    floor: -2,
  },
  {
    name: "가메골 만두",
    floor: -2,
  },
  {
    name: "가민",
    floor: -3,
  },
  {
    name: "루이가또즈 셔츠",
    floor: 1,
  },
  {
    name: "에잇세컨즈",
    floor: 1,
  },
  {
    name: "JJ지고트",
    floor: 1,
  },
  {
    name: "LAP",
    floor: 1,
  },
  {
    name: "MLB",
    floor: 1,
  },
  {
    name: "SI",
    floor: 1,
  },
  {
    name: "게스",
    floor: 1,
  },
  {
    name: "까르뜨블랑슈",
    floor: 1,
  },
  {
    name: "13 까스텔바작121212",
    floor: 1,
  },
  {
    name: "꾸즈",
    floor: 1,
  },
  {
    name: "나우",
    floor: 2,
  },
  {
    name: "나이스클랍",
    floor: 2,
  },
  {
    name: "1 ABC 그랜드스테이지",
    floor: -1,
  },
  {
    name: "가먼츠 유니온",
    floor: -2,
  },
  {
    name: "가메골 만두",
    floor: -2,
  },
  {
    name: "가민",
    floor: -3,
  },
  {
    name: "루이가또즈 셔츠",
    floor: 1,
  },
  {
    name: "에잇세컨즈",
    floor: 1,
  },
  {
    name: "JJ지고트",
    floor: 1,
  },
  {
    name: "LAP",
    floor: 1,
  },
  {
    name: "MLB",
    floor: 1,
  },
  {
    name: "SI",
    floor: 1,
  },
  {
    name: "게스",
    floor: 1,
  },
  {
    name: "까르뜨블랑슈",
    floor: 1,
  },
  {
    name: "13 까스텔바작121212",
    floor: 1,
  },
  {
    name: "꾸즈",
    floor: 1,
  },
  {
    name: "나우",
    floor: 2,
  },
  {
    name: "나이스클랍",
    floor: 2,
  },
  {
    name: "나이스클랍",
    floor: 2,
  },
];

let arrWithAlphbet = [];
for (let i = 65; i < 91; i++) {
  arrWithAlphbet.push(String.fromCharCode(i));
}

let arrWithNums = [];
for (let num = 0; num < 10; num++) {
  arrWithNums.push(num);
}

export const keyboards = [
  {
    type: "ko",
    name: "ㄱ ㄴ ㄷ",
    consonants: [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ],
  },
  {
    type: "en",
    name: "A B C",
    consonants: arrWithAlphbet,
  },
  {
    type: "num",
    name: "1 2 3",
    consonants: arrWithNums,
  },
];
