import * as fs from "fs";
import { GetServerSideProps } from "next";
import { getAllCategories } from "../services/categories";
import { getAll } from "../services/products";
import { getAllTypes } from "../services/types";
import { ICategory } from "../types/categories";
import { IProduct } from "../types/product";
import { IType } from "../types/types";

const Sitemap = () => {
  return null;
};

export const getServerSideProps:GetServerSideProps = async ({ res }) => {
  const BASE_URL = "http://localhost:3000";

const staticPaths = [`${BASE_URL}`, `${BASE_URL}/contact`]

const products:IProduct[]  = await getAll()
const categories:ICategory[] = await getAllCategories()
const types:IType[] = await getAllTypes()

const dynamicPaths = [
    ...products.map((singleProduct:IProduct) => `${BASE_URL}/product/${singleProduct._id}`),
    ...categories.map(category => `${BASE_URL}/category/${encodeURIComponent(category.name)}`),
    ...types.map(type => `${BASE_URL}/products/${encodeURIComponent(type.name)}`)
]

const allPaths = [...staticPaths, ...dynamicPaths]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;