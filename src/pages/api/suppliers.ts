// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

const TOTAL_SUPPLIER_COUNT = 2;
const BRAND_COUNT = 2;

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const generateAddress = () => ({
    addressOne: faker.address.streetAddress(),
    addressTwo: "",
    city: faker.address.city(),
    country: faker.address.country(),
    countryCode: faker.address.countryCode(),
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    phone: faker.phone.number(),
    postalCode: faker.address.zipCode(),
    state: faker.address.stateAbbr(),
    stateCode: faker.address.stateAbbr(),
  });

  const brands = Array.from(Array(BRAND_COUNT).keys()).map((_) => ({
    brandId: faker.datatype.uuid(),
    brandName: faker.company.name(),
  }))

  const suppliers = Array.from(Array(TOTAL_SUPPLIER_COUNT).keys()).map((_) => ({
    id: faker.datatype.uuid(),
    supplierName: faker.company.name(),
    inventorySettings: {
      minInventoryPerSku: 0,
    },
    shippingDelayCopy: "",
    shippingSettings: {
      useOurPackaging: false,
      shipsToPOBoxes: true,
      shipsToInternational: false,
      shipsFromInternational: false,
    },
    syncSettings: {
      syncPrices: false,
      syncContent: false,
    },
    active: true,
    contacts: [
      {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        role: "UNKNOWN",
      },
    ],
    shippingAddress: generateAddress(),
    billingAddress: generateAddress(),
    returnAddress: generateAddress(),
    brands,
  }));

  const response = {
    pagination: {
      page_size: 10,
      page_index: 1,
      next_page_exists: true,
      items_total: 33,
      next_page_index: 1,
      next_page_url:
        "http://staging-sune-api.cortinaplatform.com/api/merchant/2023-01/suppliers?page_index=1&page_size=10",
      pages_total: 1,
    },
    suppliers,
  };
  res.status(200).json(response);
}
