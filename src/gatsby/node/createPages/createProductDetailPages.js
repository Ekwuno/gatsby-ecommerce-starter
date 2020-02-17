const path = require('path')

const createProductDetailPages = async ({ graphql, createPage }) => {
  const { errors, data } = await graphql(`
    {
      allStripeSku {
        edges {
          node {
            id
            attributes {
              color
              size
            }
            fields {
              slug
            }
            product {
              id
              active
              name
              metadata {
                defaultSize
              }
            }
          }
        }
      }
    }
  `)

  if (errors) {
    Promise.reject(errors)
  }

  data.allStripeSku.edges.forEach(({ node: sku }) => {
    createPage({
      path: sku.fields.slug,
      component: path.resolve('src/templates/ProductDetailPage/index.js'),
      context: { productId: sku.product.id, skuId: sku.id },
    })
  })
}

module.exports = createProductDetailPages
