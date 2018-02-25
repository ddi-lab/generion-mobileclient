export const categories = [];
let categoryId = 1;
const createCategory = (name, alias) => {
  const category = { id: categoryId++, name, alias };
  categories.push(category);
  return category;
};

const educationCategory = createCategory('Образование', 'education');
const medicineCategory = createCategory('Медицина', 'medicine');

export default [{
  category: educationCategory,
  name: 'Диплом о наличии степени бакалавра',
  imageUrl: 'http://hackathon2025storage.dev.initflow.com/images/doc_1.png',
  verification: {
    verifiedAt: '2001-02-16 01:00:00',
    expirationAt: null,
  },
}, {
  category: educationCategory,
  name: 'Свидетельство о стажировке в Национальном институте Права',
  imageUrl: 'http://hackathon2025storage.dev.initflow.com/images/doc_2.png',
  verification: {
    verifiedAt: null,
    expirationAt: null,
  },
}, {
  category: medicineCategory,
  name: 'Аллергомониторинг ',
  imageUrl: 'http://hackathon2025storage.dev.initflow.com/images/doc_3.png',
  verification: {
    verifiedAt: '2001-02-16 01:00:00',
    expirationAt: null,
  },
}];
