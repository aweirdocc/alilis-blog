import { useData } from 'vitepress';
import { ref, unref, reactive, watch, onMounted } from 'vue';
import figlet from 'figlet';
import usePixi from './pixi'

const toTimestamp = (date) => +new Date(date);

export const usePostList = (posts = [], tag = '', sort = 1) => {
  // 为了保证排序的一致性，使用 Map 而不是对象
  const postMap = new Map();

  let postList = posts.reduce((acc, cur) => {
    const { url, frontmatter } = cur;
    const postYear = url.split('/')[2];

    const shouldHidden = frontmatter.isHidden || (tag.length && frontmatter.tag !== tag);

    if (!shouldHidden) {
      if (acc[postYear]) {
        acc[postYear].push({
          ...frontmatter,
          url
        })
      } else {
        acc[postYear] = [{
          ...frontmatter,
          url
        }]
      }
    }

    return acc;
  }, {})

  Object.keys(postList).sort((a, b) => { return sort ? +b - +a : +a - +b }).forEach((cur) => {
    const arr = postList[cur].sort((a, b) => { return sort ? toTimestamp(b.createDate) - toTimestamp(a.createDate) : toTimestamp(a.createDate) - toTimestamp(b.createDate) })

    postMap.set(cur, arr)
  });

  return postMap
}

export const useColor = (lightColor = '#000', darkColor = '#fff') => {
  const { isDark } = useData();
  const color = ref('');

  watch(
    () => isDark.value,
    (val) => {
      if (isDark.value) {
        color.value = darkColor;
      } else {
        color.value = lightColor;
      }
    },
    {
      immediate: true
    }
  )

  return color;
}

export const useFlglet = (inputRef, optionsRef) => {
  const data = ref('');
  const selectedFont = ref('Standard');
  const loadedFont = reactive([]);
  const fonts = ["1Row", "3-D", "3D Diagonal", "3D-ASCII", "3x5", "4Max", "5 Line Oblique", "Acrobatic", "Alligator", "Alligator2", "Alpha", "Alphabet", "AMC 3 Line", "AMC 3 Liv1", "AMC AAA01", "AMC Neko", "AMC Razor", "AMC Razor2",
    "AMC Slash", "AMC Slider", "AMC Thin", "AMC Tubes", "AMC Untitled", "ANSI Regular", "ANSI Shadow", "Arrows", "ASCII New Roman", "Avatar", "B1FF", "Banner", "Banner3-D", "Banner3", "Banner4", "Barbwire", "Basic", "Bear", "Bell", "Benjamin", "Big Chief", "Big Money-ne", "Big Money-nw", "Big Money-se", "Big Money-sw", "Big", "Bigfig", "Binary", "Block", "Blocks", "Bloody", "Bolger", "Braced", "Bright", "Broadway KB", "Broadway", "Bubble", "Bulbhead", "Caligraphy", "Caligraphy2", "Calvin S", "Cards", "Catwalk", "Chiseled", "Chunky", "Coinstak", "Cola", "Colossal", "Computer", "Contessa", "Contrast", "Cosmike", "Crawford", "Crawford2", "Crazy", "Cricket", "Cursive", "Cyberlarge", "Cybermedium", "Cybersmall", "Cygnet", "DANC4", "Dancing Font", "Decimal", "Def Leppard", "Delta Corps Priest 1", "Diamond", "Diet Cola", "Digital", "Doh", "Doom", "DOS Rebel", "Dot Matrix", "Double Shorts", "Double", "Dr Pepper", "DWhistled", "Efti Chess", "Efti Font", "Efti Italic", "Efti Piti", "Efti Robot", "Efti Wall", "Efti Water", "Electronic", "Elite", "Epic", "Fender", "Filter", "Fire Font-k", "Fire Font-s", "Flipped", "Flower Power", "Four Tops", "Fraktur", "Fun Face", "Fun Faces", "Fuzzy", "Georgi16", "Georgia11", "Ghost", "Ghoulish", "Glenyn", "Goofy", "Gothic", "Graceful", "Gradient", "Graffiti", "Greek", "Heart Left", "Heart Right", "Henry 3D", "Hex", "Hieroglyphs", "Hollywood", "Horizontal Left", "Horizontal Right", "ICL-1900", "Impossible", "Invita", "Isometric1", "Isometric2", "Isometric3", "Isometric4", "Italic", "Ivrit", "Jacky", "Jazmine", "Jerusalem", "JS Block Letters", "JS Bracket Letters", "JS Capital Curves", "JS Cursive", "JS Stick Letters", "Katakana", "Kban", "Keyboard", "Knob", "Konto Slant", "Konto", "Larry 3D 2", "Larry 3D", "LCD", "Lean", "Letters", "Lil Devil", "Line Blocks", "Linux", "Lockergnome", "Madrid", "Marquee", "Maxfour", "Merlin1", "Merlin2", "Mike", "Mini", "Mirror", "Mnemonic", "Modular", "Morse", "Morse2", "Moscow", "Mshebrew210", "Muzzle", "Nancyj-Fancy", "Nancyj-Improved", "Nancyj-Underlined", "Nancyj", "Nipples", "NScript", "NT Greek", "NV Script", "O8", "Octal", "Ogre", "Old Banner", "OS2", "Pagga", "Patorjk's Cheese", "Patorjk-HeX", "Pawp", "Peaks Slant", "Peaks", "Pebbles", "Pepper", "Poison", "Puffy", "Puzzle", "Pyramid", "Rammstein", "Rectangles", "Red Phoenix", "Relief", "Relief2", "Reverse", "Roman", "Rot13", "Rotated", "Rounded", "Rowan Cap", "Rozzo", "Runic", "Runyc", "S Blood", "Santa Clara", "Script", "Serifcap", "Shadow", "Shimrod", "Short", "SL Script", "Slant Relief", "Slant", "Slide", "Small Caps", "Small Isometric1", "Small Keyboard", "Small Poison", "Small Script", "Small Shadow", "Small Slant", "Small Tengwar", "Small", "Soft", "Speed", "Spliff", "Stacey", "Stampate", "Stampatello", "Standard", "Star Strips", "Star Wars", "Stellar", "Stforek", "Stick Letters", "Stop", "Straight", "Stronger Than All", "Sub-Zero", "Swamp Land", "Swan", "Sweet", "Tanja", "Tengwar", "Term", "Test1", "The Edge", "Thick", "Thin", "THIS", "Thorned", "Three Point", "Ticks Slant", "Ticks", "Tiles", "Tinker-Toy", "Tombstone", "Train", "Trek", "Tsalagi", "Tubular", "Twisted", "Two Point", "Univers", "USA Flag", "Varsity", "Wavy", "Weird", "Wet Letter", "Whimsy", "Wow"];

  figlet.defaults({ fontPath: "/fonts" });

  function loadFont(fontName) {
    if (!fontName) return;

    selectedFont.value = fontName;
    if (loadedFont.includes(fontName)) {
      generate();
    } else {
      figlet.preloadFonts([fontName], generate);
      loadedFont.push(fontName);
    }
  }

  function generate() {
    const { horizontalLayout, verticalLayout, fontWidth } = unref(optionsRef);

    data.value = figlet.textSync(inputRef.value, {
      font: selectedFont.value,
      horizontalLayout,
      verticalLayout,
      width: +fontWidth || undefined,
      whitespaceBreak: true,
    });
  }

  watch(
    () => [inputRef.value, optionsRef.value],
    ([val]) => {
      if (val) {
        generate();
      }
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    loadFont(selectedFont.value);
  });

  return {
    data,
    fonts,
    loadFont,
    generate
  }
}

export async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  }
  catch {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');
    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS
    const selection = document.getSelection();
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null;
    document.body.appendChild(element);
    element.select();
    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand('copy');
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges(); // originalRange can't be truthy when selection is falsy
      selection.addRange(originalRange);
    }
    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
}

export const useCopy = (textRef, btnRef) => {
  const textEle = textRef?.value;
  const btnEle = btnRef?.value;

  if (textEle?.innerText.length) {
    copyToClipboard(textEle.innerText).then(res => {
      if (btnEle) {
        btnEle.classList.add('copied');

        setTimeout(() => {
          btnEle.classList.remove('copied');
          btnEle.blur();
        }, 2000)
      }
    })
  }
}

export const file2Blob = (file) => new Blob([file], { type: file.type });

export const blob2Base64 = (data, callback, error) => {
  const fileReader = new FileReader();

  fileReader.onload = function (e) { callback(e.target.result); };
  fileReader.readAsDataURL(data);
};

export default {
  usePostList,
  useColor,
  useFlglet,
  copyToClipboard,
  useCopy,
  file2Blob,
  blob2Base64,
  usePixi
}