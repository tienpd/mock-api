const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = "vi";

const randomCategoryList = n => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400)
      };

      productList.push(product);
    });
  }

  return productList;
};

const randomReferralList = n => {
  if (n <= 0) return [];

  const referralList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const referral = {
      id: faker.datatype.uuid(),
      businessName: faker.company.companyName(),
      ownerName: faker.name.findName(),
      ownerNumber: faker.phone.phoneNumber(),
      status: "pending",
      isPaid: faker.datatype.boolean(),
      amount: Number.parseFloat(faker.finance.amount()),
      rejectNote: faker.lorem.sentence(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    referralList.push(referral);
  });

  return referralList;
};

// IIFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const referralList = randomReferralList(10);

  // prepare db object
  const db = {
    referrals: referralList,
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po"
    }
  };

  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully!");
  });
})();
