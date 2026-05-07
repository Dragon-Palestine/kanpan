# Projects Page - Architecture

## نظرة عامة

تم إعادة تنظيم صفحة المشاريع بحيث تتبع نمط **Clean Architecture** مع فصل الاهتمامات (Separation of Concerns).

## هيكل الملفات

```
src/
├── pages/
│   └── Projects.jsx                    # صفحة المشاريع الرئيسية (نظيفة وبسيطة)
│
├── components/
│   ├── ProjectsHeader.jsx              # مكون الـ Header والعنوان
│   ├── ProjectControls.jsx             # مكون التحكم (بحث، فلتر، ترتيب، عرض)
│   ├── ProjectsList.jsx                # مكون قائمة المشاريع (شبكة أو قائمة)
│   └── ProjectCard.jsx                 # مكون بطاقة المشروع الفردية
│
├── hooks/
│   └── useProjects.js                  # Custom Hook لـ State Management والفلترة
│
└── utils/
    └── projectHelpers.js               # دوال مساعدة وتحويلات
```

## مكونات المشروع

### 1. **Projects.jsx** - صفحة رئيسية نظيفة

- تستدعي `useProjects` Hook للحصول على البيانات والـ state
- تجمع المكونات الفرعية بطريقة منظمة
- لا تحتوي على logic معقدة

```jsx
const Projects = () => {
  const { projectsData, viewMode, ... } = useProjects();

  return (
    <ProjectsHeader />
    <ProjectControls />
    <ProjectsList />
  );
};
```

### 2. **useProjects.js** - Custom Hook

يدير:

- تحميل البيانات من الـ API (محاكاة)
- التصفية حسب الحالة (Status)
- الترتيب حسب الأولوية/الحالة/الاسم
- حالة العرض (Grid أم List)

```javascript
const {
  projectsData, // البيانات المعالجة (مُصفاة ومرتبة)
  viewMode, // نوع العرض
  setViewMode, // تغيير نوع العرض
  sortBy, // معيار الترتيب
  setSortBy, // تغيير معيار الترتيب
  filterStatus, // الحالة المختارة للفلترة
  setFilterStatus, // تغيير حالة الفلترة
} = useProjects();
```

### 3. **projectHelpers.js** - دوال مساعدة

وظائف نقية (Pure Functions) للعمليات المتكررة:

- `getStatusColor()` - الألوان حسب حالة المشروع
- `getPriorityColor()` - الألوان حسب الأولوية
- `filterProjectsByStatus()` - فلترة المشاريع
- `sortProjects()` - ترتيب المشاريع
- `getTeamMember()` - الحصول على معلومات العضو

### 4. **مكونات العرض** (Presentation Components)

#### **ProjectsHeader.jsx**

- يعرض العنوان والعد
- زر "إنشاء مشروع جديد"

#### **ProjectControls.jsx**

- حقل البحث
- تبديل نوع العرض (Grid/List)
- اختيار الفلتر
- اختيار الترتيب

#### **ProjectsList.jsx**

- يعرض قائمة المشاريع بناءً على `viewMode`
- رسالة "لا توجد مشاريع" عند عدم وجود نتائج

#### **ProjectCard.jsx**

- بطاقة المشروع الفردية
- يدعم عرضين: Grid و List
- يعرض جميع المعلومات: الاسم، الحالة، الأولوية، التقدم، الفريق

## مزايا هذا النمط

✅ **قابلية الصيانة**: كل ملف له مسؤولية واحدة واضحة
✅ **إعادة الاستخدام**: المكونات والـ Hooks قابلة لإعادة الاستخدام في مناطق أخرى
✅ **سهولة الاختبار**: سهل كتابة اختبارات لكل جزء منفصل
✅ **الأداء**: استخدام `useMemo` لتحسين الأداء
✅ **النظافة**: الصفحة الرئيسية نظيفة وسهلة الفهم

## كيفية إضافة ميزات جديدة

### مثال: إضافة البحث (Search)

1. أضف state للبحث في `useProjects.js`
2. أضف دالة `searchProjects()` في `projectHelpers.js`
3. استخدمها في الـ `useMemo` للفلترة
4. ربطها بـ input في `ProjectControls.jsx`

### مثال: إضافة فئة جديدة من المشاريع

1. أضف خيار جديد في فلتر `ProjectControls.jsx`
2. حدّث دالة `filterProjectsByStatus()` في `projectHelpers.js`
3. كل شيء آخر سيعمل تلقائياً!

## الالتزام بـ Best Practices

- 📝 **JSDoc Comments**: توثيق كل دالة وملف
- 🎯 **Single Responsibility**: كل ملف له مسؤولية واحدة
- ♻️ **DRY**: عدم تكرار الكود
- 🧹 **Clean Code**: كود نظيف وسهل الفهم
