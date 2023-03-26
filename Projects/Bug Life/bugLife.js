document.addEventListener("keydown", handleKey); //*״מקשיב״ ללחיצה על אחד המקשים שבלוח המקשים
document.addEventListener("DOMContentLoaded", startGame); // ״מקשיב״ לתוכן המסמך כשהוא עולה

let theLadyBug = new Bug();//* קביעת משתנה כאובייקט  - החיפושית
let theTarget = new Target();// קביעת משתנה כאובייקט  - היהלום, המטרה
let playGround = document.querySelector(".parent"); //*קביעת לוח המשחק שמצוי בדיב באיץ׳ טי אם אל, עם הקלאס שלו 
let points = 0; // קביעת  משתנה הנקודות
const pointsPar = document.querySelector("#points");//* משיכת הפרגרף מהאיץ׳ טי אמ אל עם האי די שלו בו מופיעים הנקודות
let spiders = [];// קביעת העכבישים כמערך שבתוכו יופיע האובייקט

function startGame() { //* הפעלת המשחק, קובע מה יופיע עם העלאת המסמך, בהסתמך על הפקודה בשורה 2
    spidersApear(7);//  18 קביעת מספר העכבישים שיופיעו בתחילת המשחק בהפעלת הפונקציה בשורה 
    playGround.appendChild(theLadyBug.html);//* מצרף את הילד - החיפושית בתחילת המשחק
    playGround.appendChild(theTarget.html);//  מצרף את הילד -  המטרה/היהלום בתחילת המשחק 
    //* theTarget = addTarget();
}

function spidersApear(numberOfSpiders) { // פונקציה הקובעת את מספר העכבישים שיופיעו בתחילת המשחק
    for (let index = 0; index < numberOfSpiders; index++) { //* במשתנה מספר העכבישים הוא 0, אם המשתנה קטן ממספר הכשים בפמטר של הפונקציה, יש להוסיף למשתנה עוד עכביש
        spiders[index] = new Spider(); // הוספת אובייקט העכביש על פי הלולאה והפעלת הפונקציה שבשורה 12
        spiders[index].addSpider();//* המשתנה עם המערך מוסיף את העכבישים בהתאם לכל השורות הנ״ל הנמצאות בפונקציה
    }
}
removeChild
function handleKey(event) {  // פונקציה שמטרתה הוא לקבוע מה יקרה בלחיצה על מקש כלשהו בלוח המקשים מסתמך על הפקודה בשורה  1   
    if (theLadyBug.direction == event.key) { //* ...אם הכיוון של אובייקט החיפושית תואם לאירוע הלחיצה במקש אז
        theLadyBug.move(event.key);// האובייקט יזוז בהתאם למקש 
    }
    else { //* אחרת..
        theLadyBug.rotate(event.key);// האובייקט יסתובב
    }//* בפונקציה זו קבענו שהאובייקט יכול לזוז ולהסתובב באותם המקשים
}

function isWin() { // פונקציה שפועלת במידה והשחקן מנצח כלומר מצליח לאסוף יהלום או להגיע למטרה
    if (theTarget.locationRow == theLadyBug.locationRow && //* ...אם מיקום היהלום בשורה תואם את מיקום החיפושית בשורה ו
        theTarget.locationColumn == theLadyBug.locationColumn) { // מיקום היהלום בטור תואם את מיקום החיפושית בטור
        points++; //* תוסיף נקודות
        pointsPar.textContent = points; // ותעדכן את הפרגרף עם מספר הנקודות
        theTarget.removeTarget();//* תעלים את היהלום
        theTarget = new Target();// תוסיף שוב את האובייקט יהלום
        theTarget.addTarget();//* גורם לאובייקט יהלום להופיע מחדש במקום אקראי
    }
}

function isLose() { // פונקציה שפועלת במידה והשחקן מפסיד כלומר החיפושית נוגעת בעכביש
    for (let index = 0; index < spiders.length; index++) {//* העכביש נמצא במערך, בלולאה בודקים אם מספר האינדקס קטן ממספר העכבישים
        if (spiders[index].locationRow == theLadyBug.locationRow && // ...אם מיקום העכבישים בשורה תואם את מיקום החיפושית בשורה ו
            spiders[index].locationColumn == theLadyBug.locationColumn) { //* מיקום העכבישים בטור תואם את מיקום החיפושית בטור
            // points--;  // תוריד נקודות
            document.getElementById("game-over").style.display = 'block';
            document.removeEventListener("keydown", handleKey);
            /* pointsPar.textContent = points; //* ותעדכן את הפרגרף עם מספר הנקודות
            spiders[index].removeSpider();// תעלים את העכביש שנמצא באותו מיקום כמו החיפושית
            spiders[index] = new Spider();//* תוסיף שוב את האובייקט העכביש שנעלם
            spiders[index].addSpider();// גורם לאובייקט העכביש להופיע מחדש במקום אקראי */
        }
    }
}

function Bug() { //* פונקציית בנייה - קנסטרקטור
    this.direction = "ArrowRight";//* קובע את החץ הימני בקונסטרקציית הכיוון.
    this.locationColumn = 2; // קובע את המיקום של האובייקט בטור. עובד רק עם הפקודה המשנה את הסי אס אס בשורה 66
    this.locationRow = 2;//* קובע את המיקום של האובייקט בשורה. עובד רק עם הפקודה המשנה את הסי אס אס בשורה 65
    this.html = document.createElement("img"); // יוצר את אלמנט התמונה
    this.html.src = "images/ladybug.png"; //* מכניס את מקור התמונה
    this.html.className = "bug"; // קובע את הקלאס לתמונה
    this.html.style.gridRow = this.locationRow; //* קובע בסי אס אס אינסטרקטור כמשתנה שאפשר להשתמש בו לקביעת המיקום בשורה
    this.html.style.gridColumn = this.locationColumn; // קובע בסי אס אס אינסטרקטור כמשתנה שאפשר להשתמש בו לקביעת המיקום בטור
    this.rotate = function (pressedKey) { //* קובע פונקציה שתקבע כי לחיצה על כפתור תגרום לו להסתובב
        this.direction = pressedKey; // קובע מחדש את הכיוון שהוא הפרמטר של הפונקציה
        if (pressedKey == "ArrowDown") {//* אם המקש חץ למטה נלחץ
            this.html.style.transform = "rotate(180deg)";// אם המקש חץ למעלה נלחץ
        }
        if (pressedKey == "ArrowUp") {
            this.html.style.transform = "rotate(0deg)";//* שנה בסי אס אס, את התנועה בסיבוב המעלות שבסוגריים
        }
        if (pressedKey == "ArrowRight") {// אם המקש חץ ימינה נלחץ
            this.html.style.transform = "rotate(90deg)";//* שנה בסי אס אס, את התנועה בסיבוב המעלות שבסוגריים
        }
        if (pressedKey == "ArrowLeft") {// אם המקש חץ שמאלה נלחץ
            this.html.style.transform = "rotate(270deg)";//* שנה בסי אס אס, את התנועה בסיבוב המעלות שבסוגריים
        }
    };
    this.move = function (pressedKey) { // קובע פונקציה שתקבע כי לחיצה על כפתור תגרום לו לזוז
        if (pressedKey == "ArrowDown") {//* אם המקש חץ למטה נלחץ
            if (this.locationRow < 13) {// אם המיקום קטן מ 13 השורות שנקבעו בסי אס אס
                this.html.style.gridRow = this.locationRow + 1;//* שנה בסי אס אס את המיקום בשורה בנוסף לאחד כדי שצמוד לקצה גם יעבוד
                this.locationRow = this.locationRow + 1;//תוסיף תזוזה אחת למטה בכל לחיצה
            }
        }
        if (pressedKey == "ArrowUp") {//*אם המקש חץ למעלה נלחץ
            if (this.locationRow > 1) {//אם המיקום גדול מהשורה הראשונה השורות שנקבעו בסי אס אס
                this.html.style.gridRow = this.locationRow - 1; //*שנה בסי אס אס את המיקום בשורה בפחות אחד כדי שצמוד לקצה גם יעבוד
                this.locationRow = this.locationRow - 1; //תוסיף תזוזה אחת למעלה בכל לחיצה
            }
        }
        if (pressedKey == "ArrowRight") {//*אם המקש חץ ימינה נלחץ
            if (this.locationColumn < 20) {//אם המיקום קטן מ 20 הטורים שנקבעו בסי אס אס
                this.html.style.gridColumn = this.locationColumn + 1; //*שנה בסי אס אס את המיקום בטור בנוסף לאחד כדי שצמוד לקצה גם יעבוד
                this.locationColumn = this.locationColumn + 1; //תוסיף תזוזה ימינה אחת בכל לחיצה
            }
        }
        if (pressedKey == "ArrowLeft") {//*אם המקש חץ שמאלה נלחץ
            if (this.locationColumn > 1) { //*אם המיקום גדול מהשורה הראשונה הטורים שנקבעו בסי אס אס
                this.html.style.gridColumn = this.locationColumn - 1;//*שנה בסי אס אס את המיקום בטור בפחות אחד כדי שצמוד לקצה גם יעבוד
                this.locationColumn = this.locationColumn - 1;//תוסיף תזוזה אחת שמאלה בכל לחיצה
            }
        }
        isWin() //*מפעיל את הפונקציה
        isLose()//מפעיל את הפונקציה
    };
}

function Target() {
    this.locationColumn = parseInt(Math.random() * 20) + 1; //* קובע שהמיקום של האובייקט בטור יופיע רנדומלית על המסך המילה פלור קובעת שהמספרים יהיו שלמים ולא עשרוניים
    this.locationRow = parseInt(Math.random() * 13) + 1;//קובע שהמיקום של האובייקט בשורה יופיע רנדומלית על המסך המילה פלור קובעת שהמספרים יהיו שלמים ולא עשרוניים
    this.html = document.createElement("img");//* יוצר את אלמנט התמונה
    this.html.src = "images/diamond.png"; // מכניס את מקור התמונה
    this.html.className = "diamond"; //* קובע את הקלאס לתמונה
    this.html.style.gridRow = this.locationRow; // קובע בסי אס אס אינסטרקטור כמשתנה שאפשר להשתמש בו לקביעת המיקום בשורה
    this.html.style.gridColumn = this.locationColumn; //* קובע בסי אס אס אינסטרקטור כמשתנה שאפשר להשתמש בו לקביעת המיקום בטור
    this.addTarget = function () { //מוסיף את המטרה/היהלום
        playGround.appendChild(this.html)
    }
    this.removeTarget = function () {//* מסיר את המטרה/היהלום
        playGround.removeChild(this.html)
    }
}

function Spider() {
    do {
        this.locationColumn = Math.floor(Math.random() * 20) + 1;
        this.locationRow = Math.floor(Math.random() * 13) + 1;
    } while (
        this.locationColumn === theTarget.locationColumn &&
        this.locationRow === theTarget.locationRow
    )

    this.html = document.createElement("img");
    this.html.src = "images/spider.png";
    this.html.className = "spider";
    this.html.style.gridRow = this.locationRow;
    this.html.style.gridColumn = this.locationColumn;
    this.addSpider = function () {
        playGround.appendChild(this.html)
    }
    this.removeSpider = function () {
        playGround.removeChild(this.html)
    }
}

