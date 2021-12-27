class Docs {
  constructor(fileName, fileDate, fileType) {
    this.fileName = fileName;
    this.fileDate = fileDate;
    this.fileType = fileType;
  }
}

const doc1 = new Docs("“三个敬畏”主题学习活动", "2021-10-09 12:23", "DOC");
const doc2 = new Docs("地面信息系统OMMS(H5)培训", "2021-12-12 15:45", "PPT");
const doc3 = new Docs("2021安康杯实操练习", "2021-11-13 23:12", "DOC");
const doc4 = new Docs(
  "2021.10.15机场员工消防知识年度考试题库",
  "2021-11-04 14:45",
  "DOC"
);
const doc5 = new Docs("消防检查", "2021-11-04 14:45", "DOC");

const docs = [doc1, doc2, doc3, doc4, doc5];
const pptIcon =
  '<i class="fas fa-file-powerpoint doc-icon" style="color:red"></i>';
const docIcon = '<i class="fas fa-file-word doc-icon"></i>';

const containerUl = document.querySelector(".doc-ul");

const createDocItem = function (doc, i) {
  let icon = "";
  if (doc.fileType === "PPT") {
    icon = pptIcon;
  } else if (doc.fileType === "DOC") {
    icon = docIcon;
  }
  const itemHtml = `<li>${icon}</i>&nbsp&nbsp&nbsp;<a href="/doc${i + 1}">${
    doc.fileName
  }</a><span class="doc-date">${doc.fileDate}</span></li>`;
  return itemHtml;
};

const displayAllDocs = function () {
  containerUl.innerHTML = "";
  docs.forEach((doc, i) => {
    const html = createDocItem(doc, i);
    containerUl.insertAdjacentHTML("beforeend", html);
  });
};

displayAllDocs();

const searchDocInput = document.querySelector(".doc-search-input");

const displaySearch = function (inputContent) {
  let html = "";
  docs.forEach(function (doc, x) {
    for (let i = 0; i < doc.fileName.length; i++) {
      for (let j = 0; j < inputContent.length; j++) {
        if (doc.fileName[i + j] !== inputContent[j]) {
          break;
        }
        if (j === inputContent.length - 1) {
          html += createDocItem(doc, x);
        }
      }
    }
    containerUl.innerHTML = html;
  });
};

searchDocInput.addEventListener("input", function (e) {
  const inputContent = searchDocInput.value;
  if (inputContent === "") {
    displayAllDocs();
  } else {
    displaySearch(inputContent);
  }
});
