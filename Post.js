// 在 Google Apps Script 編輯器裡建立一個名為 "Post" 的 HTML 檔案
var postData = [
  {
    version: "🚀 - 網站升級 (61002",
    isExpanded: true,
    logs: [
      {
        tag: "新增",
        title: "智能搜尋",
        content: "新增智能搜尋，支援多關鍵字組合查詢更精準！"
      },
      {
        tag: "優化",
        title: "搜尋結果類別呈現",
        content: "結果雙類別清晰呈現，快速找到所需文章。"
      },
      {
        tag: "優化",
        title: "搜尋結果圖示",
        content: "強化圖示提升閱讀體驗。"
      },
      {
        tag: "優化",
        title: "網頁公告",
        content: "訊息分類清晰更易讀。"
      },
      {
        tag: "修正",
        title: "手機版陰影BUG",
        content: "修復手機陰影顯示問題，提升視覺品質。"
      },
      {
        tag: "修正",
        title: "網頁公告紅點標示異常",
        content: "修復公告紅點異常，訊息通知更準確。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (61001",
    isExpanded:  false,
    logs: [
      {
        tag: "上架",
        title: "Windows 教學",
        content: "手把手教你 Win11 安裝、優化與常用設定。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60924",
    isExpanded: false,
    logs: [
      {
        tag: "上架",
        title: "[05] LINE 教學",
        content: "零基礎到進階應用，21 篇完整 LINE Bot 教學。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60918",
    isExpanded:  false,
    logs: [
      {
        tag: "上架",
        title: "[04] Google 教學",
        content: "涵蓋帳戶、Chrome 瀏覽器與 Blockly 遊戲教學。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60915",
    isExpanded: false,
    logs: [
      {
        tag: "上架",
        title: "[07] USART HMI 教學",
        content: "發布 ex01~ex10 篇教學。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60914",
    isExpanded: false,
    logs: [
      {
        tag: "上架",
        title: "[03] MIT App Inventor 教學",
        content: "6 大單元全面上架，含 37 個實務範例。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60909",
    isExpanded: false,
    logs: [
      {
        tag: "上架",
        title: "[11] ASRPRO 語音模組",
        content: "發布 ex01~ex10 篇教學。"
      }
    ]
  },
{
    version: "🚀 - 網站升級 (60908",
    isExpanded: false,
    logs: [
      {
        tag: "修正",
        title: "網頁架構",
        content: "加強系統安全防護並優化架構，網頁運作更流暢。"
      }
    ]
  },
  {
    version: "📖 - 新講義 (60907",
    isExpanded: false,
    logs: [
      {
        tag: "上架",
        title: "[02] Android studio 教學",
        content: "發布 01~24 篇教學，附3篇D1 mini結合應用。"
      }
    ]
  },
  {
    version: "🚀 - 網站升級 (60904",
    isExpanded: false,
    logs: [
      {
        tag: "新增",
        title: "搜尋功能",
        content: "增關鍵字搜尋，輸入字詞快速找到所需教學。"
      },
      {
        tag: "修正",
        title: "手機版/電腦版切換",
        content: "調整搜尋與介面佈局，並修復已知Bug問題。"
      },
      {
        tag: "修正",
        title: "網站公告",
        content: "解決展開內容過多導致重疊的Bug問題。"
      }
    ]
  },
  {
    version: "🚀 - 網站升級 (60902",
    isExpanded: false,
    logs: [
      {
        tag: "新增",
        title: "介面優化",
        content: "全新修飾網站介面，呈現更清爽簡潔的視覺。"
      },
      {
        tag: "新增",
        title: "網站公告",
        content: "網站公告正式上線，即時掌握所有重要通知。"
      },
      {
        tag: "新增",
        title: "手機版/電腦版切換",
        content: "支援手機與電腦版切換，隨心選擇最佳瀏覽模式。"
      },
      {
        tag: "優化",
        title: "網站架構",
        content: "將網頁架構重新規劃調整。"
      }
    ]
  },
  {
    version: "🚀 - 網站升級 (60831",
    isExpanded: false,
    logs: [
      {
        tag: "上線",
        title: "加加研究室教學網頁",
        content: "全新上線！提供完整的加加研究室教學內容！"
      }
    ]
  }
];
