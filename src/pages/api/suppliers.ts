// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    suppliers: Array.from(Array(7).keys()).map((_) => ({
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
      shippingAddress: {
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
      },
      billingAddress: {
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
      },
      returnAddress: {
        addressOne: faker.address.streetAddress(),
        addressTwo: "",
        city: faker.address.city(),
        country: faker.address.country(),
        countryCode: faker.address.countryCode(),
        id: faker.datatype.uuid(),
        name: faker.company.name(),
        phone: faker.phone.number(),
        postalCode: faker.address.zipCode(),
        stateCode: faker.address.stateAbbr(),
      },
      brands: Array.from(Array(3).keys()).map((_) => ({
        brandId: faker.datatype.uuid(),
        brandName: faker.company.name(),
      })),
    })),
  };
  res.status(200).json(response);
}
