const SOLUTIONS = [
  "מתאים",
  "חיוני",
  "מתקשה",
  "חוזרת",
  "דרישה",
  "כלכלה",
  "חירות",
  "מיעוט",
  "הרחבה",
  "להלחם",
  "תועלת",
  "חמישי",
  "להציב",
  "להציג",
  "שיקול",
  "ניסוי",
  "צעירה",
  "דווקא",
  "מועטה",
  "תפקיד",
  "אמנות",
  "אומנם",
  "זיהוי",
  "ארמון",
  "מחודש",
  "מדרגה",
  "יעילה",
  "קיבוץ",
  "דורשת",
  "חריפה",
  "שליטה",
  "מחייב",
  "אומרת",
  "מקיים",
  "ניקוד",
  "אזורי",
  "השראה",
  "חורבן",
  "מיידי",
  "משפיע",
  "למחוק",
  "מחסור",
  "בולטת",
  "מורשת",
  "מוקדם",
  "ספרות",
  "חלוקה",
  "סיכום",
  "תיעוד",
  "ויכוח",
  "פתרון",
  "כדורי",
  "מפלגה",
  "מוחלט",
  "בישול",
  "למרות",
  "מתגלה",
  "מביאה",
  "רשימה",
  "העברה",
  "מסלול",
  "מוזמן",
  "שגויה",
  "עיתון",
  "מעלים",
  "כפייה",
  "נוחות",
  "ריבוי",
  "אנושי",
  "טייסת",
  "נוספת",
  "שמונה",
  "שינוי",
  "אופרה",
  "דיכוי",
  "מקורה",
  "ניצול",
  "חופשי",
  "מתבטא",
  "דבורה",
  "נגינה",
  "אמונה",
  "כתובה",
  "טכנית",
  "מכירה",
  "ספריה",
  "השפלה",
  "אזרחי",
  "מתמיד",
  "מוסמך",
  "פועלת",
  "רעיון",
  "חידוש",
  "יישום",
  "מחליט",
  "חיסול",
  "גרילה",
  "חסידי",
  "אובדן",
  "יכולת",
  "מעיין",
  "השכלה",
  "מינוי",
  "מדידה",
  "ייצוג",
  "עתיקה",
  "תוכנה",
  "שכונה",
  "אלמוג",
  "משתרע",
  "משפחה",
  "פעילה",
  "צירוף",
  "כתיבה",
  "דמיון",
  "חמישה",
  "מימוש",
  "נפרדת",
  "שיקום",
  "חישוב",
  "בניין",
  "בסיסי",
  "מועתק",
  "חיזוק",
  "אדירה",
  "מסוגל",
  "מהירה",
  "סיכון",
  "מדעית",
  "עשרים",
  "מתרחש",
  "מחצית",
  "קבורה",
  "מיקום",
  "תאריך",
  "לקנות",
  "סביבה",
  "תרגום",
  "תקיפה",
  "לעשות",
  "איסור",
  "אימון",
  "בגדים",
  "מאפשר",
  "עיבוד",
  "מספיק",
  "קלאסי",
  "כוונה",
  "חשמלי",
  "מתנגד",
  "החזקה",
  "תופים",
  "תפילה",
  "מעורר",
  "נצחון",
  "מכובד",
  "תמורה",
  "ניווט",
  "שארית",
  "השחתה",
  "תומכת",
  "מחליף",
  "סיבוב",
  "כלומר",
  "מציין",
  "הצלחה",
  "בנייה",
  "מסגרת",
  "אמיתי",
  "גירוש",
  "ציורי",
  "אירוע",
  "נשיאה",
  "הצבעה",
  "סתירה",
  "דוגמה",
  "מוצלח",
  "ממשלה",
  "החלטה",
  "מקומם",
  "פיתוח",
  "הפוכה",
  "לוואי",
  "יישוב",
  "רפואה",
  "פירוק",
  "הבהרה",
  "מבצעי",
  "אספקה",
  "ייעוץ",
  "רישום",
  "יוצאת",
  "חברות",
  "כרטיס",
  "השפעה",
  "הומור",
  "דיווח",
  "גובלת",
  "כינוי",
  "למידה",
  "נראים",
  "ברירה",
  "הופכת",
  "מסכים",
  "סופרת",
  "הודעה",
  "תרופה",
  "שילוב",
  "ראייה",
  "תכנון",
  "פתיחה",
  "עצמית",
  "רציפה",
  "עיצוב",
  "מימון",
  "ממשיך",
  "מסיבה",
  "חבורה",
  "כיסוי",
  "אחראי",
  "הסברה",
  "תביעה",
  "כללית",
  "ליווי",
  "חתימה",
  "אשכול",
  "תוספת",
  "גיטרה",
  "מאמין",
  "תופעה",
  "מועצה",
  "לחיצה",
  "שושלת",
  "הגדרה",
  "נפשית",
  "מכשיר",
  "מוסרי",
  "ניתוח",
  "ייצור",
  "תצפית",
  "עשירה",
  "מוזכר",
  "מסייע",
  "מתבסס",
  "צמצום",
  "מובהק",
  "מומחה",
  "תחרות",
  "עימות",
  "כיפור",
  "שנייה",
  "מתקבל",
  "נקודה",
  "מכוסה",
  "כימיה",
  "נדירה",
  "פעולה",
  "עריכה",
  "אחרון",
  "זיהום",
  "גדולה",
  "שחורה",
  "פיצוץ",
  "קיצור",
  "אסורה",
  "כותרת",
  "שמירה",
  "נוסחה",
  "מסתבר",
  "מפורט",
  "מכפלה",
  "מחזיק",
  "אצולה",
  "מסודר",
  "פגיעה",
  "מסורת",
  "קדימה",
  "העברת",
  "יסודי",
  "מציעה",
  "מאוחר",
  "פנימי",
  "שחקים",
  "עדיין",
  "טוענת",
  "משחקת",
  "מפתיע",
  "מורחב",
  "מעדיף",
  "משיכה",
  "מזכיר",
  "מקבלת",
  "רשמית",
  "אקלים",
  "תשתית",
  "מופיע",
  "פינוי",
  "עברית",
  "נסיגה",
  "לחימה",
  "ציפור",
  "קיסרי",
  "תלויה",
  "כפולה",
  "יהודי",
  "מקווה",
  "מכילה",
  "ירידה",
  "תנועה",
  "ידועה",
  "פקודה",
  "מישהי",
  "תמונה",
  "שיעור",
  "מכונה",
  "פיקוח",
  "חנוכה",
  "עיסוק",
  "זמנית",
  "מהנדס",
  "פירוש",
  "אמצעי",
  "עצומה",
  "מיוחד",
  "נסיעה",
  "מכוון",
  "אתמול",
  "ארגון",
  "מתקדם",
  "ארוכה",
  "כתובת",
  "משתתף",
  "רימון",
  "ראיות",
  "גרעין",
  "להציע",
  "מחוסר",
  "חשיבה",
  "דירוג",
  "עלולה",
  "משתנה",
  "הורים",
  "התאמה",
  "מכלול",
  "כשלון",
  "מפריע",
  "מדרום",
  "שחרור",
  "איכות",
  "נפוצה",
  "שלטון",
  "דוגמא",
  "מתברר",
  "צילום",
  "מליון",
  "מיוחס",
  "מונעת",
  "סמכות",
  "מדובר",
  "מעשית",
  "מיועד",
  "מלאכה",
  "סליחה",
  "מהווה",
  "טבעית",
  "ראשון",
  "יתרון",
  "חשיפה",
  "מישהו",
  "עוצמה",
  "מגדיר",
  "הדרכה",
  "מיוצר",
  "נושאת",
  "שיתוף",
  "מקובל",
  "רשיון",
  "מתמקד",
  "עובדה",
  "טיפול",
  "עממית",
  "טיפוס",
  "מוערך",
  "אחורה",
  "כמובן",
  "איחוד",
  "גיבור",
  "כלשהו",
  "פלישה",
  "אחדות",
  "אזכור",
  "מפעיל",
  "תקופה",
  "מידות",
  "חגיגה",
  "מצווה",
  "פנייה",
  "משאבי",
  "ניסוח",
  "שריון",
  "חלקיק",
  "שימור",
  "ממוצע",
  "פרווה",
  "מוכשר",
  "ביקור",
  "ספורט",
  "הוכחה",
  "משפטי",
  "תקליט",
  "ריכוז",
  "השערה",
  "מצליח",
  "מבוגר",
  "עקרון",
  "נטייה",
  "מרבית",
  "תקווה",
  "ייתכן",
  "מיותר",
  "סבירה",
  "מסוים",
  "ביטוי",
  "עיירה",
  "נתונה",
  "אומות",
  "אלבום",
  "כאילו",
  "קדושה",
  "גורמת",
  "חקלאי",
  "חלקית",
  "מעורב",
  "משרדי",
  "ביצוע",
  "תכונה",
  "תרבות",
  "מציגה",
  "מועמד",
  "תיכון",
  "מתרגם",
  "כלשהי",
  "הלבנה",
  "פשוטה",
  "נחושת",
  "נרחבת",
  "נותנת",
  "גילוי",
  "מייסד",
  "אטומי",
  "בדיקה",
  "מקיפה",
  "נכונה",
  "חיובי",
  "נידון",
  "מוכרת",
  "מחולק",
  "עצמאי",
  "הצדקה",
  "פולחן",
  "שלישי",
  "תיקון",
  "מעולה",
  "עיטור",
  "שירות",
  "ריקוד",
  "מושבה",
  "בחירה",
  "מגוון",
  "מנהיג",
  "הפעלה",
  "תרומה",
  "חירום",
  "חקיקה",
  "מדריך",
  "נובעת",
  "איזון",
  "מערכה",
  "משולב",
  "תחושה",
  "תשומת",
  "מצטער",
  "כיבוש",
  "פיקוד",
  "משתמש",
  "נמצאת",
  "דיבור",
  "חיפוש",
  "הוראה",
  "ידיעה",
  "אזהרה",
  "סגנון",
  "אחידה",
  "מדויק",
  "מחזור",
  "הופעה",
  "מבטיח",
  "הפיכה",
  "פחותה",
  "סגורה",
  "קביעה",
  "אקראי",
  "תעתיק",
  "צינור",
  "מגזין",
  "ישיבה",
  "סופית",
  "מעניק",
  "שימוש",
  "אינני",
  "קדומה",
  "נעשית",
  "אדומה",
  "מסופר",
  "אפשרי",
  "סימון",
  "אנחנו",
  "קורבן",
  "ממושך",
  "טיעון",
  "עידוד",
  "צריכה",
  "עכשיו",
  "מערבי",
  "הפסקה",
  "שרשרת",
  "קובעת",
  "תשלום",
  "מזוהה",
  "כלכלי",
  "הסדרה",
  "רביעי",
  "רפואי",
  "כמורה",
  "תקציב",
  "משטרה",
  "אוויר",
  "מתמטי",
  "מגילה",
  "הגירה",
  "תסריט",
  "ניהול",
  "למעלה",
  "מרכזי",
  "מסביר",
  "שולחן",
  "מדברי",
  "מהפכה",
  "איסוף",
  "חלבון",
  "סיירת",
  "עמוקה",
  "הפניה",
  "ציוני",
  "חקירה",
  "לכבוד",
  "חיתוך",
  "ארבעה",
  "אישור",
  "תוצאה",
  "הכרעה",
  "מבוסס",
  "משולש",
  "מוטלת",
  "בטחון",
  "מלווה",
  "יחדיו",
  "חייבת",
  "תפיסה",
  "תלמוד",
  "נהוגה",
  "לראות",
  "משורר",
  "מנועי",
  "בידור",
  "ראויה",
  "שלושה",
  "ראשית",
  "השלמה",
  "בנויה",
  "עוסקת",
  "מהותי",
  "פתאום",
  "מסחרי",
  "מתחלק",
  "זכרון",
  "פרסום",
  "תחילה",
  "וידאו",
  "נדרשת",
  "קבוצה",
  "עניין",
  "חמורה",
  "מחשבה",
  "מילון",
  "שגיאה",
  "תמיכה",
  "גידול",
  "תעופה",
  "עבודה",
  "סיכוי",
  "קידום",
  "מצוין",
  "מקורי",
  "יצירה",
  "סכסוך",
  "מחיקה",
  "מושלם",
  "חומצה",
  "ממוקם",
  "נגזרת",
  "אפילו",
  "מצביע",
  "תקדים",
  "אודות",
  "בצורת",
  "עומדת",
  "לימוד",
  "זווית",
  "טלפון",
  "מולדת",
  "מקצוע",
  "איטית",
  "מוגבל",
  "ביטוח",
  "לבחור",
  "תהליך",
  "עלייה",
  "רווחה",
  "קריאה",
  "מוכנה",
  "נסיון",
  "תלמיד",
  "הוצאה",
  "נמשכת",
  "מרשים",
  "איגוד",
  "מראים",
  "עיקרי",
  "כניסה",
  "המוני",
  "מסומן",
  "בכורה",
  "קרובה",
  "ישירה",
  "יציבה",
  "מוסיף",
  "מנוחה",
  "תענית",
  "ישראל",
  "יוצרת",
  "נוצרי",
  "פתוחה",
  "חטיבה",
  "יודעת",
  "מלחמה",
  "מעביר",
  "רגילה",
  "פירוט",
  "מושפע",
  "תכנות",
  "מקביל",
  "ריגול",
  "יחסית",
  "מישור",
  "מזרחי",
  "תבנית",
  "קהילה",
  "הכנסה",
  "תאוצה",
  "פנימה",
  "חיבור",
  "התקפה",
  "שתיים",
  "חינוך",
  "סידור",
  "עליון",
  "רוחני",
  "משימה",
  "לשמור",
  "עולמי",
  "כיוון",
  "נבחרת",
  "שייכת",
  "לשאול",
  "מחלקה",
  "יהדות",
  "ציבור",
  "כותבת",
  "מניות",
  "לסיים",
  "מרחבי",
  "סיפור",
  "יורדת",
  "מוגדר",
  "קרינה",
  "מערכת",
  "יציאה",
  "יחידה",
  "תחתית",
  "מתואר",
  "הכשרה",
  "הסכמה",
  "מחובר",
  "עבירה",
  "ממליץ",
  "הקבלה",
  "לאומי",
  "הפרדה",
  "נשיפה",
  "העתקה",
  "מרגיש",
  "שידור",
  "מדיני",
  "מגנטי",
  "פסנתר",
  "מסוכן",
  "מייצג",
  "קבועה",
  "מוביל",
  "משותף",
  "חוקית",
  "עשויה",
  "מורכב",
  "בלבול",
  "מירוץ",
  "בגרות",
  "כספית",
  "מכריע",
  "ציטוט",
  "מתחיל",
  "מדינה",
  "חשבון",
  "תשובה",
  "תגובה",
  "תוחלת",
  "מומלץ",
  "שיפור",
  "עלילה",
  "מלחין",
  "הפרעה",
];

function getSolution() {
  const gameEpoch = new Date("February 07 2022 00:00:00");
  var gameTime = new Date(Date.now());
  gameTime.setHours(0, 0, 0, 0);
  var numDays = Math.floor((gameTime - gameEpoch) / 86400000);
  return [numDays, SOLUTIONS[numDays % SOLUTIONS.length]];
}

export default getSolution;
